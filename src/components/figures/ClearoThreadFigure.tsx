type Line =
  | { kind: "time"; text: string }
  | { kind: "me" | "agent"; text: string };

const thread: Line[] = [
  { kind: "time", text: "iMessage · Today 4:12 PM" },
  { kind: "me", text: "selling my desk, 48 in wide" },
  { kind: "agent", text: "Got it. Any scratches?" },
  { kind: "me", text: "a couple on top" },
  { kind: "agent", text: "It’s listed at $60. I’ll text you when someone wants it." },
  { kind: "time", text: "5:03 PM" },
  { kind: "agent", text: "Someone offered $55 and can pick up Saturday at 3. Take it?" },
  { kind: "me", text: "yes" },
];

/** An iMessage thread between a seller and the Clearo agent. */
export function ClearoThreadFigure() {
  return (
    <ol className="thread" aria-label="iMessage thread between a seller and the Clearo agent">
      {thread.map((line, i) =>
        line.kind === "time" ? (
          <li key={i} className="thread-time">
            {line.text}
          </li>
        ) : (
          <li key={i} className={`bubble bubble-${line.kind}`}>
            <span className="visually-hidden">{line.kind === "me" ? "Seller: " : "Agent: "}</span>
            {line.text}
          </li>
        ),
      )}
    </ol>
  );
}
