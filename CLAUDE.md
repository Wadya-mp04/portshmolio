# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is a freshly scaffolded Next.js (App Router) project named "portshmolio" — a personal portfolio site. There is currently almost no code: `app/layout.js` defines a bare root layout, and `app/page.js` is empty. There is no git repository initialized yet, no README, and no linter or TypeScript config present despite the `lint` script existing in `package.json`.

## Commands

- `npm run dev` — start the Next.js dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint (note: no ESLint config file exists in the repo yet, so this will need one added before it works)

There is no test setup in this repository yet.

## Stack

**Currently installed:**

- Next.js 16 (App Router, `app/` directory)
- React 19

**Planned, not yet set up — do this before writing any content or components:**

- TypeScript (convert `.js` files to `.tsx`/`.ts`, add `tsconfig.json`)
- Tailwind CSS
- `next-themes` (light/dark mode)
- Zod (content validation at build time)
- Git initialized with a `.gitignore`
- ESLint config so the existing `lint` script actually runs

Treat this setup work as its own group under the process rules below — plan the files, do them one at a time, checkpoint when the group is done. Once complete, update this section to move the planned items into "currently installed" so this file stays accurate.

## Process: one file at a time, no exceptions

1. Before writing any code, post a short plan: the ordered list of files you're about to create or modify, and one line on why each one comes at that point in the sequence (e.g. "types before the content that depends on them").
2. Implement exactly one file per step. Write it, then stop.
3. After each file, report back in plain terms:
   - What this file does
   - Why it's structured the way it is
   - How it connects to the file(s) before it
4. Do not proceed to the next file until I've acknowledged the current one. If I say "continue" or "go" or similar, move to the next file in the plan. If I ask a question, answer it before continuing.
5. Group boundaries need a checkpoint. When you finish a logical group (e.g. all the content-type interfaces, or a full section component + its subcomponents), stop and summarize the group as a whole before starting the next one — even if I've been saying "continue" file-by-file within the group.
6. Never generate a whole directory tree, multiple components, or a full feature in one pass "to save time." Sequencing is the point, not speed.

## Scope discipline

- Build exactly what was asked for. No extra abstraction layers, config options, feature flags, or "while I'm here" additions that weren't requested.
- Default to the simplest implementation that satisfies the actual requirement. No premature generalization — don't build a generic/plugin/config-driven system when a direct implementation of the one thing being asked for would do.
- No new dependencies without asking first, even small ones. State what you want to add and why, then wait.
- If a file is growing past ~150 lines or starting to do more than one job, stop and flag it to me — ask whether to split it, don't just restructure silently.
- If something in the request is ambiguous, state your assumption in a single line and proceed with it. Don't build multiple speculative versions to cover different interpretations.
- Match existing patterns already in the codebase (naming, folder structure, styling approach) rather than introducing a new convention for the same kind of thing.

## When you're unsure

If a requirement genuinely can't be resolved with a reasonable one-line assumption, ask — but keep it to one focused question, not a checklist. Don't block on questions that a sensible default would answer just as well.
