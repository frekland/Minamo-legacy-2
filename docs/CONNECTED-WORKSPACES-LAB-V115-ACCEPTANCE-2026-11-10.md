# Minamo Visual Lab V115 — connected editions and fresh-conversation continuity
10 November 2026 · PR #99 · Lab-only acceptance

## Deployment and scope

- Lab Site: `appgprj_6aeba0aa528c81918be19dd51427b2cb`, [Visual Lab](https://minamo-visual-lab.jscymru.chatgpt.site/).
- Saved version: **V115**, `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_405ae52924e08191b665f07fea298683`.
- Deployment: `appgdep_6af34ac5483c819192b6301bf281ecec` — **succeeded**, `has_mcp:true`.
- Exact private Site source commit: `29ceb8ec10458907b61622cfa13be39b6211ebdd`.
- Production V149 untouched. No PR merge. No Cloudflare storage reset. No MCP tool definitions changed in V115; the owner-reinstalled connector remained usable.

## Implemented

1. **Revision-safe source continuity.** A saved Project link remains pinned to its exact authored source edition. When the same owner has a newer admitted edition, `get_minamo_working_context` adds `newerEdition.source` and `newerEdition.destination` separately. `get_project_composition` returns analogous metadata for the linked block. Neither modifies the saved reference nor creates an inferred connection, session or achievement.
2. **Browser affordance.** Project Connections now offers a restrained **Newer edition available** link beside an older pinned Note/Article/Work link. Both original and newest link remain individually navigable. Historical source attribution stays exact.
3. **Editorial policy consistency.** `get_minamo_workspace.capabilities.authoring.policyVersion` was stale (`2026-10-27.1`). Its version now derives from the same dependency-free constant as the actual editorial policy (`minamo-editorial-2026-11-10.3`) so future policy bumps cannot silently diverge.
4. **Owner-scoped regression.** Tests assert that a Project's pinned source remains unchanged after an update, both MCP and browser-composition reads expose the newer edition, a current pinned source has no phantom update, and another owner cannot read the Project or revision.

## Actual installed MCP acceptance

The fresh connector exposed 36 Lab tools and **not** the retired `record_minamo_learning_development` / `revise_minamo_learning_development` writers. Live policy: `minamo-editorial-2026-11-10.3`, contract `minamo-v2-2026-11-10.21`. Previously saved global preferences survived reinstallation at revision 4: balanced context, saved related material, requested initiative, balanced authoring detail, direct editing.

Without a handoff, GPT used the **installed Lab MCP** to retrieve the existing synthetic **Radio Island** Project at rev31, read its 31 saved revisions, exact seven-module Python package, optional Work threads, linked seed-sensitivity Note rev2 and immutable-state Library article. This is a genuine fresh-conversation retrieval, not a claim of GPT remembering previous turns.

The seven Python modules and test module were reconstructed from exact retained Project code blocks into an independent local Python 3 process. The existing **55 tests passed**. GPT added one explicit, legal-route comparison regression and reran **56 tests successfully**. It also compared eight preselected seeds against the original and an alternative eight-turn route. At seed 7, evidence balances changed (echo/keeper 2/5 vs 1/7); at seed 11 the balances stayed the same despite distinct state fingerprints. These are observations of the synthetic engine, not human playtests or statistical probabilities.

An actual `preview_project_update` succeeded; an actual `apply_project_update` atomically saved Project rev32 and Note rev3. Subsequent browser-observed inaccuracies prompted a second atomic Project/Note edit to rev33/rev4, and a final Project-only guide correction to rev34. Exact historical code/outputs and the original pinned Note rev2 were retained.

Live MCP readback after rev33 independently showed:
- `get_project_composition` retained the exact old Note **rev2** and returned current **rev4** as `newerEdition`.
- `get_minamo_working_context` did the same with `quality:'older-edition'`; unrelated Library source remained exact.
- `read_project_changes` identified the actual rev32 part edits and rev29 historic regression without inventing a learner session.
- `get_minamo_workspace` returned the corrected current policy version. Rev34 final guide correction was accepted by installed MCP; no last-minute browser retest was claimed.

## Cloud Browser acceptance

The deployed V115 Radio Island page was opened in Cloud Browser as the signed-in user. Project Connections displayed an old pinned Note **and** the **Newer edition available** link; clicking it opened the current Note containing original seed analysis, new route comparison, external-terminal provenance and unresolved questions. Return to Project worked. The Questions view presented canonical code/evidence and a **Recent saved changes** disclosure showing rev32 as a real revision. The UI stayed in the A5-inspired charcoal direction and did not introduce a progress panel.

Browser iteration caught stale opening copy referring to 55 tests, a nonexistent preassembled repo path and a literal Markdown separator; Project rev33 / Note rev4 corrected those. A further Guide view exposed a stale table caption and 54-test label; Project rev34 updated the table to 56 tests and presented the local commands as code, honestly noting that the package consists of retained source blocks rather than a downloadable folder.

## Checks and limits

- `node --test tests/working-context-read.test.mjs`: **7/7 pass**.
- Additional directly related `project-connections`, `project-work-threads-c4` and `checkpoint-free-project-authoring` checks: passed after correcting a test-only missing variable; full historical suite intentionally not run.
- `pnpm typecheck`: pass. `pnpm build`: pass (existing bundle/toolchain warnings only).
- Independent retained Python reproduction: 55 then 56 unit tests pass; **not executed by Minamo**.
- No fresh plugin reinstall needed: V115 changed server responses/UI, not tool schemas.

**Limitations:** Newer-edition discovery does not semantically update authored Work-thread summaries, and it will not infer a relationship where no saved link or Note pin exists. In Radio Island, the Questions view's canonical test reference picked up new text because its part identity was stable; novel parts were discoverable through revision history, not automatically assigned to an authored question. The Python source is retained as code blocks, not packaged for one-click download/execution inside Minamo. Long-project authoring can leave stale adjacent summaries; this test caught and corrected several. This is a synthetic fixture, not human longitudinal learning. Preferences affected real context projection but V115 did not add new preference dimensions.

**Checkpoint retirement:** The V113/V114 authoring/writer retirement remains effective in the fresh connector. Separate read-only historic payload keys such as `checkpointComparison` / `checkpointReading` still refer to preserved legacy interpretations. These are **not new Project requirements**, and silently changing existing read contracts was intentionally avoided. Future changes should prefer non-checkpoint aliases with explicit compatibility and provenance tests rather than erasing legitimate history.

## Proposed next vertical slice

Exercise automatic inbound Note/source connections after revisions where no explicit Project block was manually maintained, and separately measure Work-thread staleness against exact part revision changes without using activity or achievement semantics. Then assess whether the Project's dense code section would benefit from a genuine downloadable or native executable package rather than more metadata. Continue through the actual Lab MCP plus Cloud Browser, with source attribution, rights, owner isolation, bounded tests and PR #99 evidence.