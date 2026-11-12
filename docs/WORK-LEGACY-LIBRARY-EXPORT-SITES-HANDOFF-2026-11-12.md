# Work / Sites handoff: one-click legacy Minamo Library export

**Owner's priority: a real downloadable backup of the old Library.** The owner will not use Git, a developer console or a pasted script. Work should implement and validate a normal **Export Library** button in the actual native legacy Site and then enable the equivalent in the promoted current Minamo.

## Identity and links
- **Legacy Site**: https://minamo-legacy-2.jscymru.chatgpt.site/ (V149; holds original Library content).
- **Current Site**: https://minamo.jscymru.chatgpt.site/ (former Lab V165).
- **Legacy issue #10**: https://github.com/frekland/Minamo-legacy-2/issues/10 — the monolithic `/api/recovery/export` encrypted full backup times out for large page-backed Libraries. Do not rely on it.
- **New Minamo implementation branch**: https://github.com/frekland/minamo/tree/feature/portable-content-foundation — `app/library-backup-button.tsx`, `app/library-browser.tsx`, `lib/library-backup-client.ts`, tests and documentation.

## Files in THIS legacy branch
- `scripts/legacy-library-backup-snippet.js`: complete read-only same-origin browser exporter. It is a standalone proof-of-concept and reference implementation, **not** a feature that requires owner DevTools.
- `tests/library-backup-snippet.test.mjs`: synthetic test for safe origin, GET-only operations and ZIP production. Run `node --test tests/library-backup-snippet.test.mjs`.
- This handoff is a source/deployment commission; **the old public GitHub repo is not verified to match deployed V149**. Do not blindly copy legacy GitHub `main` to Sites.

## What Work should do

1. Open the **actual V149 native source** using Sites. Inspect its existing Library view and authenticated read routes, especially `/api/query`, `/api/context`, `/api/records/changes`, `/api/records/revision`, `/api/assets` and `/api/media`. The new Minamo source has a UI integration already, but its exact V165 file edits must be adapted to legacy V149.
2. Implement a **simple, owner-facing Export Library button** in the legacy Library interface. Reuse the GET-only bounded read logic in this branch / new Minamo's `lib/library-backup-client.ts`; separate the engine from the console wrapper. The owner should only need to click Export Library and save a ZIP. Do not call the broken recovery endpoint or require the owner to use snippets.
3. Perform native source lint/typecheck and relevant tests; deploy **only** this bounded change through legacy Sites, preserving auth, MCP, DB, and environment configuration. Inspect source diff before deployment.
4. **Actual browser acceptance**: sign in as owner, click Export Library, confirm a ZIP download completes; open `manifest.json`, verify counts, record JSON and accessible retained revisions; verify included image/media SHA-256/byte lengths. Check current head identities before/after export and mark unavailable assets as **PARTIAL**, not complete. Test the real Library size and the previously failing large-Library scenario.
5. Once a complete legacy backup exists locally, port/check the current Minamo branch's Library export UI in actual V165 Sites source, deploy minimally, and browser-test. Keep the two Sites and data separate. Update BOTH PRs with exact evidence; don't claim a GitHub commit itself deploys code.

## Explicit safety and limits
- **Read-only export.** No POST/PUT/DELETE record requests, restores, generation changes, resets, migrations, imports, beta-access changes, credential changes, or tldraw changes.
- Archive is **unencrypted private content**. Do not upload it, its content, personal identifiers, thumbnails or secret values to public GitHub; report only non-sensitive counts and technical verification.
- The archive format is `minamo-library-archive@1`; this is a personal **content rescue**, not an import-ready or whole-workspace backup. It may exclude Notes, Projects, catalogue sidecars, independent Questions and unrelated/unattached assets. See manifest exclusions; report these honestly.
- If Site/native route compatibility differs, adapt and test—do not silently fall back to incomplete records or silently skip media.
- If full live verification is blocked, report precisely where. Never claim backup success from synthetic tests alone.
