# V113 — Retire checkpoint authoring while preserving retained evidence
Date: 2026-11-10  
Site: [Minamo Visual Lab](https://minamo-visual-lab.jscymru.chatgpt.site/) — owner-private, independent D1/R2 and MCP  
Private Lab source commit: `260d3c3c76d6b0d0c8a3a8aed211f52ed3da449d`  
Saved Site version: `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_f6a945db1fc08191a34bdd4d43039627`  
Deployment: `appgdep_6af33e04622481918c73a86f8d2e781f`

## Implemented
1. Removed `record_minamo_learning_development` and `revise_minamo_learning_development` from the MCP tool catalogue/dispatcher. Deleted the `explicit-user-checkpoint` tool input schema, and removed the optional Step `checkpoint` field from new MCP command and structured-package authoring schema.
2. Retired public `/api/learning-developments` and `/api/learning-developments/revise` writes with HTTP 410 `legacy_authoring_retired`. Existing historic D1 rows, original editions, current eligibility and retrieval remain. A cached obsolete MCP tool invocation cannot save.
3. Removed the read-context `checkpointGuide` recipe. Rewrote the `get_minamo_learning_context` description as historical-source reading and preserved explicit current/historic uncertainty. Updated the content capability contract and editorial examples, versioned as `minamo-v2-2026-11-10.20` / `minamo-editorial-2026-11-10.2`.
4. Simplified the older Project Step editor: new stages use stable section IDs and titles, without suggested evidence or progress fields. Exact earlier `learningShape.stages[].checkpoint` values remain readable, and older records do not undergo silent migration or rewrite.
5. Converted the older Project saved-learning widget from checkpoint creation/correction into a restrained, read-only historical interpretation view (shown only where retained data exists). Preserved evidence links, supersession, revision, deferred details and owner attribution.
6. Kept an optional owner-reviewed original interpretation distinct from progress saving through `/api/learning-interpretations` with `explicit-user-meaning` and exact Note/Run revision. The existing Study reviewed-change UI uses this path; the original Note remains untouched.
7. Corrected visible Help, source-history and recovery labels to avoid training users to add checkpoints. Technical **recovery backups** retain their established `checkpoint` name: they refer to filesystem/data restoration, not learning progress.
8. Updated owner-gated synthetic corpus cleanup to use internal historical test functions. Retired public writes stay closed; the historical scenario fixture can still safely withdraw exact synthetic rows during reset.

## Focused verification (isolated D1 worker)
- `node --test --test-concurrency=2 tests/retired-checkpoint-authoring.test.mjs tests/checkpoint-free-project-authoring.test.mjs tests/collaboration-preferences.test.mjs`: **10 passed**.
- `node --test --test-name-pattern='S03 synthetic scenario' tests/scenario-controller.test.mjs`: **1 passed** after adjusting the former legacy-writing scenario assertion to expect HTTP 410.
- `pnpm typecheck`: passed.
- `pnpm build`: passed (existing third-party TTS bundler/chunk-size warnings only).
- A previous V112 source/archive mismatch was detected by browser: one Help phrase was changed after that build. V112 is not accepted. V113 was built after the final runtime changes; the compiled client bundle was checked for the current Help phrase.

## Live acceptance
**V113 deployment succeeded**, with MCP capability enabled. In the actual deployed browser, the Project’s six authored sections and retained Python code remained readable; the Help view showed the corrected “Keep native work” copy and no progress-checkpoint instruction. The V112 stale-bundle Help text was no longer present. The deployed MCP connector responded with content contract `minamo-v2-2026-11-10.20` and editorial policy `minamo-editorial-2026-11-10.2`, and returned previously saved owner collaboration preferences (revision 4). An actual `get_minamo_learning_context(scope:journey)` read returned the retained Project, Step identities, provenance and chronology, with no `checkpointGuide` authoring recipe. It did still expose *legacy read-only* field names (`checkpointRead`, `checkpointComparison`, etc.) and language: this motivated V114. The installed client catalogue was cached from before V113, so discovery of the new tool descriptions requires connector reinstallation; do not claim that acceptance yet.

## Boundaries and limitations
- Historical learning-development table names, response metadata and internal synthetic fixture code necessarily retain legacy identifiers. They are **not** new authoring instructions. No automatic activity/progress model was added.
- The retired public endpoints are not backward-write-compatible; consumers must use canonical Project/Note work or the explicit reviewed-interpretation route. Historic read/recovery stays supported.
- Historical test suites built around active checkpoint writers need a separate modernisation pass; the entire old regression suite was intentionally not run for this proportionate Lab deployment.
- Connector tool discovery is cached by ChatGPT. Owner reinstall after V113 is required before a completely fresh connector catalogue can be accepted.
- This is a checkpoint retirement vertical slice, not a claim that long-project continuity, source relationship quality or UI integration is now complete. Production V149 is unchanged; PR #99 is not merged.

## Next
1. Reinstall the Visual Lab MCP connector and start a fresh GPT chat for tool catalogue discovery: obsolete writers absent, updated editorial policy, current reading without `checkpointGuide`.
2. In that fresh chat author/revise/retrieve a freeform substantial Project and linked Note/source using real Lab MCP. Check stable revisions, exact owner/source links and browser presentation.
3. Tackle historical source-projection naming and stale scenario fixtures only where they materially distort user/GPT understanding; do not build a replacement progress-tracking system.
