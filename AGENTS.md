# AGENTS.md

Conventions for AI coding agents working in **fredrin-fde-application**. This file is the
canonical entry point under the [AGENTS.md](https://agents.md) standard, and it
is the first thing a Fredrin Worker reads.

It is a stub — the first ticket on the board fills it in.

## Project

_What is this, in a sentence or two?_

## Commands

_How do you run it, test it, and build it?_

## Conventions

_Anything a new contributor would get wrong on their first try._

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
