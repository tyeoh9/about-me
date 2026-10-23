#!/usr/bin/env node
// Full-page screenshots of a running site through headless Chrome, with no npm
// dependencies: it speaks the Chrome DevTools Protocol over Node's WebSocket.
//
//   node scripts/screenshot.mjs <url> <outDir> [width[@scale] ...]
//   node scripts/screenshot.mjs http://localhost:3000/ evidence 1280 390@3
//
// Writes <outDir>/<width>.png for each width (default: 1280 and 390@3) and prints
// one JSON line per shot. Set CHROME_PATH to override the Chrome binary.
// Needs Node 22+, or Node 20 with --experimental-websocket.

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, outDir, ...widthArgs] = process.argv.slice(2);
if (!url || !outDir) {
  console.error("usage: node scripts/screenshot.mjs <url> <outDir> [width[@scale] ...]");
  process.exit(2);
}
if (typeof WebSocket === "undefined") {
  console.error("No global WebSocket: use Node 22+, or run Node 20 with --experimental-websocket.");
  process.exit(2);
}

const shots = (widthArgs.length ? widthArgs : ["1280", "390@3"]).map((arg) => {
  const [w, s] = arg.split("@");
  return { width: Number(w), scale: Number(s ?? (Number(w) < 600 ? 3 : 2)) };
});

const chromePath =
  process.env.CHROME_PATH ??
  [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].find((p) => existsSync(p));
if (!chromePath) {
  console.error("Chrome not found; set CHROME_PATH.");
  process.exit(2);
}

const profileDir = mkdtempSync(join(tmpdir(), "verify-app-chrome-"));
const chrome = spawn(
  chromePath,
  ["--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profileDir}`, "--no-first-run", "--hide-scrollbars", "about:blank"],
  { stdio: ["ignore", "ignore", "pipe"] },
);

const cleanup = async () => {
  if (chrome.exitCode === null) {
    const exited = new Promise((resolve) => chrome.once("exit", resolve));
    chrome.kill();
    await exited;
  }
  rmSync(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
};

try {
  const browserWs = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Chrome did not start within 15s")), 15000);
    let buffer = "";
    chrome.stderr.on("data", (chunk) => {
      buffer += chunk;
      const match = buffer.match(/DevTools listening on (ws:\/\/\S+)/);
      if (match) {
        clearTimeout(timer);
        resolve(match[1]);
      }
    });
    chrome.on("exit", (code) => reject(new Error(`Chrome exited early (${code})`)));
  });

  const port = new URL(browserWs).port;
  const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let nextId = 0;
  const pending = new Map();
  const listeners = new Set();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
    } else if (msg.method) {
      for (const fn of listeners) fn(msg);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++nextId;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  const once = (method) =>
    new Promise((resolve) => {
      const fn = (msg) => {
        if (msg.method === method) {
          listeners.delete(fn);
          resolve(msg.params);
        }
      };
      listeners.add(fn);
    });

  await send("Page.enable");
  mkdirSync(outDir, { recursive: true });

  for (const { width, scale } of shots) {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: scale,
      mobile: width < 600,
    });
    const loaded = once("Page.loadEventFired");
    await send("Page.navigate", { url });
    await loaded;
    // Let web fonts settle before measuring.
    await send("Runtime.evaluate", { expression: "document.fonts.ready.then(() => true)", awaitPromise: true });
    const { cssContentSize } = await send("Page.getLayoutMetrics");
    const height = Math.ceil(cssContentSize.height);
    const { data } = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width, height, scale: 1 },
    });
    const file = join(outDir, `${width}.png`);
    writeFileSync(file, Buffer.from(data, "base64"));
    console.log(JSON.stringify({ file, width, height, scale }));
  }

  ws.close();
} catch (error) {
  console.error(String(error));
  process.exitCode = 1;
} finally {
  await cleanup();
}
