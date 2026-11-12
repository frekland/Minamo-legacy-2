# V114 — Historical-read wording and new-authoring validation
Date: 2026-11-10  
Site: [Minamo Visual Lab](https://minamo-visual-lab.jscymru.chatgpt.site/) (private and independent of production)  
Private Lab source commit: `d9cead0c5488687ace68f68223c1868de8b9edc0`  
Saved Site version: `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_0e43ff727a308191ab03d921ef9a6da2`  
Deployment: `appgdep_6af3420af50081918dcb9bd99e8bd00a`

## Why V114 followed V113
The live installed MCP service on V113 confirmed that new checkpoint writer tools had been retired and `checkpointGuide` was absent, but historical *read* responses still described retained interpretations as checkpoints; the editorial-policy resource standard still mentioned Activities. The V113 acceptance report remains separate and honest.

## Implemented
1. In `validateLearning`, a new or changed `learningShape.stages[].checkpoint` is rejected for direct Project authoring (including legacy-style API commands). Earlier stored checkpoint fields survive unchanged revision and remain readable. Stage titles and optional authoring content need no progress metadata. No D1 historical rewrite was run.
2. Revised retained-context prose to say **earlier interpretation** or **historical record** rather than instruct GPT to treat old choices as the current plan. Exact source chronology, authored claims, truncated-detail signals, and uncertain evidence stay explicit. Kept legacy JSON keys such as `checkpointReading`, `checkpointRead`, `priorCheckpoints` and `canonicalChangedSinceCheckpoint` as compatibility aliases; these are not tool inputs or authoring requirements.
3. Revised the read-only grouped Project context and source-history notices; an older source is never presented as evidence of completion. The front-end historical-source selector now labels old records “Earlier interpretation”.
4. Updated the global editorial reference standard to create owner-requested Projects and Questions, not Activities as a default workflow. Kept personal Notes and independent sourced evidence separate. New policy `minamo-editorial-2026-11-10.3`; server content contract `minamo-v2-2026-11-10.21`.
5. Clarified that `manage_minamo_recovery` action `checkpoint` means an **encrypted workspace backup**, completely separate from learning, and changed the retired public write error to describe a legacy learning-development route without recommending the old authoring concept.

## Focused validation
- `node --test --test-concurrency=2 tests/retired-checkpoint-authoring.test.mjs tests/checkpoint-free-project-authoring.test.mjs tests/collaboration-preferences.test.mjs`: **10 passing**.
- The new fixture rejects a newly created Step with checkpoint metadata; a pre-migration record with a retained field is injected directly into isolated test D1, read back exactly, and revised without changing that field. An attempted alteration is rejected. No ordinary authoring API seeds the legacy state.
- `node --test --test-name-pattern='S03 synthetic scenario' tests/scenario-controller.test.mjs`: **1 passing**.
- `pnpm typecheck` and `pnpm build`: passed. The build emits existing third-party Piper TTS browser-externalisation and chunk-size warnings; no new blocking warning.
- Historical full regression suite **not run** (owner-directed risk-proportionate tests).

## Live acceptance
**Deployment succeeded**, `has_mcp:true`, URL as above. Actual installed Minamo Visual Lab connector calls returned `minamo-editorial-2026-11-10.3` and `minamo-v2-2026-11-10.21`. The editorial standard now describes owner-requested Projects and Questions without Activities or a progress ceremony. An actual `get_minamo_learning_context(scope:journey)` read of the retained six-section synthetic Project returned five distinct Step groups, provenance notices about earlier interpretations, preserved source identities and **no** `checkpointGuide` recipe. The deployed browser displayed that Project and its real Python block after reload, with Help guidance “Keep native work” and “Save and review your work”, neither requiring checkpoint fields. Browser WebMCP `minamo_preview_learning_material` also described naturally authored Project sections with no progress fields. A direct actual MCP `preview_minamo_command` with a deliberately invalid checkpoint-shaped Project was blocked by `editorial_preflight_required` *before* Stage validation, so it cannot prove live validation; isolated worker tests are the evidence for that guard. The installed ChatGPT connector's tool catalogue is cached from before this deployment, and the owner must reinstall to verify the new static descriptions.

## Honest boundary
“Checkpoint-free Project authoring” now includes MCP schema/description, old write-tool retirement, direct new-stage validation, and web UI forms. It does **not** mean a destructive rename of old D1 columns or recovery snapshot operations. Existing retained learning-development records and their serialized response fields remain readable; the read-side compatibility names are technical debt for a future versioned migration, not an authoring model. No Activity/Attempt replacement was added. Production V149 remains unchanged and PR #99 is unmerged.

## Next
- Reinstall the Visual Lab MCP connector once after V114 so a *fresh client* receives the new catalogue and policy. Independently verify a substantial freeform Project create/edit/retrieve and cross-Project links using exact revisions and inspect the browser result.
- Continue longitudinal Project/Work/source continuity and settings UX only after observing real retrieval and navigating a dense multi-session Project. Do not create a new progress-tracking structure.
