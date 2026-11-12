# PR #99 — Visual Lab V119–V120 source inspection acceptance

**10 November 2026. Lab only.** Production V149 untouched, PR #99 unmerged. Follows [V118 live ZIP acceptance](CONNECTED-WORKSPACES-LAB-V118-LIVE-PACKAGE-ACCEPTANCE-2026-11-10.md).

## Changes and iteration

V118's native package was downloadable, but file paths did not provide a way to inspect or navigate to a specific canonical code part. V119 added a compact on-demand file selector and a read-only full-source preview within the Project package card; source remains in canonical Project parts, not a separate record. It also changed composition retrieval to request the displayed `record.rev` for historical inventories, and corrected deterministic ZIP headers from invalid zero DOS date to **1980-01-01**.

V119 authenticated Cloud Browser acceptance found a genuine flaw: **Edit source section** opened the correct large content section but scrolled to its midpoint among many anonymous code textareas. V120 corrected this by targeting the exact `sectionId`/`partId` textarea, scrolling and focusing it, and displaying declared file paths as editor labels. The action now reads **Edit this file**. Saving remains through the existing Project editor and its revision/CAS/draft rules. No new Activity/Attempt system, required checkpoints, source duplication, or MCP schema changes.

## Deployment evidence

- **V119** native source `ea3b9a5a45f4652d19ae3059a8457baf01b62532`; deployment `appgdep_6af3778f5b9481918abf024c55e586e4` succeeded, with UX defect above.
- **V120** native source `f51c3e3c85e3b61d436820a590a4d0b979025dfb`; version `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_41c2a816ed34819187e9334fdce72454`; deployment `appgdep_6af378d81fdc8191af502721ee872336` **succeeded** (`has_mcp=true`), owner-private. https://minamo-visual-lab.jscymru.chatgpt.site/

Focused `node --test tests/project-code-package.test.mjs`: **2/2 pass**, including exact older revision inventory and ZIP date; `pnpm typecheck`, `pnpm build`, `git diff --check` pass. Existing Piper externalization, asset URL and large-chunk build warnings remain. Full historical suite deliberately not run.

## Live browser and MCP acceptance

- Expanded Radio Island's package File paths and selected `radio_island/map.py`. Its complete 5,618-byte canonical code appeared in a scrollable preview.
- **Edit this file** opened the existing Project editor at the exact textarea, visibly labelled `radio_island/map.py`, with focus ring and appropriate scroll. The edit view still contains other files farther down; this is not a separate IDE.
- Cancelled without saving. Installed Lab MCP then reported **revision 36**, eight available/downloadable source files (**44,868 bytes**), four Work threads intact.
- Downloaded the new browser ZIP. `unzip -l` showed all nine entries dated **1980-01-01**. Extraction and independent `python3 -m unittest discover -s tests -q` ran **59 tests: OK**.

This is independent local Python verification, not Minamo in-browser package execution or human playtests. The Project fixture is synthetic.

## Limits and next work

Historical package inventory was covered by focused server integration, but a superseded Project edition was **not** independently opened and downloaded in Cloud Browser. The inspector lacks syntax highlighting, cross-file search, inline per-file save, package execution in Python Canvas and a full file-diff view. The existing section editor still contains multiple large textareas. Work relationships reveal exact linked part changes, but new observations and summary prose can still become disconnected/stale without deliberate authoring. Checkpoint-free authoring remains unchanged; historical read-only terminology was not fully audited here. Preferences were unchanged. No production deployment.
