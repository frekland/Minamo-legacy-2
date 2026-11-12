# V132 — Project reading hierarchy and chrome polish

Date: 9 November 2026  
Status: **Deployed** to [Minamo](https://minamo.jscymru.chatgpt.site/)  
Native source commit: `8602049b3fc5822b04de2088f45c6f98f5b92371`  
Sites version: **132**  
Deployment: `appgdep_6af1cdfd4d2c8191892831d1a7558fba` (**succeeded**)  
Public repository: documentation/handoff only. The private Sites native source is authoritative.

## Goal

Make actual Project material prominent, with less repeated chrome above it, without removing the existing left navigation, section/topic navigation, editing, Notes, contributions, or Japanese furigana.

## Changes

- `app/project-sections.tsx`: Replace the full, always-expanded desktop Project description and separate mobile disclosure with a single collapsed **About this Project** disclosure at all widths. The title and Project edit action remain visible.
- `app/project-sections.css`: Style the common disclosure and retire the previous desktop/mobile description variants.
- `app/project-reading.tsx`: In multi-topic sections, remove the redundant pattern/section-name header above topic tabs. Keep topic tabs as the direct reading navigation and retain the section Edit pencil beside them. Single-topic sections keep a compact heading/edit control.
- `app/project-reading.css`: Align topic tabs and edit pencil in one compact row, with responsive handling so the existing mobile section edit control is not duplicated.

This is a small native UI change, not a Project data migration, MCP contract change, or redesign of content records. It continues earlier V128–V131 migration work. The breadcrumb remains **Projects > Project name**, not the earlier generic **Workspace > Projects**.

## Checks before publication

- `node --test tests/project-reading-topics.test.mjs tests/project-contributions-ui.test.mjs`: 3 passed, 0 failed.
- `pnpm typecheck`: pass.
- `pnpm build`: pass (existing non-fatal Vite dependency/chunk warnings).
- `git diff --check`: pass.
- Full legacy regression suite intentionally not run, per the fast release workflow.

## Live Cloud Browser acceptance after publication

- Opened the deployed **Japanese Live** Project and visually confirmed compact Project title, collapsed About disclosure, section rail, topic tabs, Edit pencil, main content, Notes dock, and global furigana control.
- Switched between **Start here** and **What we actually practised**; content changed as expected.
- Switched to **Grammar notebook**; its topics and Japanese ruby content rendered.
- Toggled furigana off and on; control labels changed between *Show furigana* and *Hide furigana*. Restored the initial shown preference.
- Entered a section's editor via pencil, confirmed native editing controls appeared, then cancelled without saving.
- Opened a computing **Simulation Playground** Project; confirmed no Japanese-only furigana control and intact section/topic navigation.
- Opened **Code beside investigation**; code block rendered and existing **Your code variations 1** contribution loaded. No content was changed.
- Returned browser to Japanese Live for owner review.

## Follow-up / limits

- Mobile device-sized Cloud Browser verification was not performed in this release. The existing owner-provided mobile screenshot informed the chrome reduction, and responsive CSS was adjusted, but physical/mobile acceptance is still useful.
- Existing authored material can itself begin with narrative introductions or symbols; this release does not rewrite source text.
- Some content pages still have potentially dense passages, tables, and long Projects. Treat content density separately from duplicated application chrome.
- No MCP reinstall is required for V132; server tool schemas did not change.
