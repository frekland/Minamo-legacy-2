# Visual Lab V122 — live Canvas continuation and readable saved evidence
10 November 2026 · PR #99 · Visual Lab only

## Why V122
V121 derived Work links for exact saved browser Canvas observations, but positive live acceptance was still missing. The previous Radio Island Project contained no Canvas observation; generic “observation added” entries did not convey the finding and the authored Question summary could be stale.

## Live acceptance before code changes (V121)
Used the existing **River Cherwell · Six months of evidence** synthetic Project, not a disconnected fixture. Its reporting-limit Work question already had an exact link to the `experiments / cherwell-censor-canvas` Python Canvas.
1. In the authenticated Cloud Browser, selected Heyford station **H** and executed the retained Canvas. Output showed **no Heyford rows in 2022 (n=0)**, distinct from the earlier Marston 2022 record (five sampled rows, all below detection). For Heyford 2017 and 2020, observed below-limit rows give no detected-only median; half-limit substitution yields 0.015 mg/L as N. Detected-only medians for 2019 and 2023–2025 ranged 0.0425–0.0525 while half-limit medians were 0.015. This is a browser-reported computation from the retained source rows in the synthetic Project, **not field observation or independent verification**.
2. Saved an accurately qualified observation through the visible **Save result to Project** UI. Site confirmed “Observation saved in this Project” and showed paired callout + JSON source capture.
3. Actual installed `get_project_composition` retrieved Project **rev37**, observation `observation-02dc4a40a0025548e6a684daa0fa3a3c` and `-inputs` with exact source `experiments / cherwell-censor-canvas` and digest `e394472a54f5dbd0c0fba05a7dfdb1f7f6ad669ac9183736eec1551e5816000d`.
4. Installed `read_project_changes` returned both parts in rev37 with `linkedThreadIds:['censoring']`, `linkBasis:'saved-capture-source'`, `definitionMatchesSavedEdition:true`. Cloud Browser **Questions → What changes below the reporting limit? → Recent linked changes** showed the new revision, without manually authoring a relationship.
5. Older rev35 observation still showed `definitionMatchesSavedEdition:false`, a provenance caveat requiring historical source comparison; no automatic conclusion about its validity was made.

**Result:** The positive V121 acceptance case genuinely passed on live UI and actual installed connector. The work continued an existing Project and connected Work question. It did not prove that every class of new observation or Notes automatically links.

## V122 implementation
- `readProjectChanges` now includes a bounded **`captureExcerpt`** on an exact saved-edition observation callout change, only when the structural source relation was validated. The excerpt derives solely from that historical callout text before its `Browser-reported` stamp; it is limited to 280 characters. The JSON inputs/output part never contributes a duplicate excerpt.
- The Question's **Recent linked changes** list renders up to two excerpts per revision as restrained secondary text, alongside exact revision number/date/source identity. The full observation and inputs remain in Project content/history. No generated interpretation, refreshed authored summary, Activity/Attempt entity, or extra panel.
- Removed and revised observations use the respective *exact saved record edition*, never current text mislabelled as historical content. Unlinked parts expose no capture excerpt in the relationship feed.

Focused checks: `node --test tests/project-changes-read.test.mjs tests/pr83-polish.test.mjs` **6/6 passed**, including source-grounding, revision mismatch, idempotency, owner isolation and excerpt/no-JSON duplicate assertions. `pnpm typecheck`, `pnpm build` and `git diff --check` passed. Full historical suite not run.

## Deployment
- Lab source commit: `945783e8ef3629588daeb491a1b4c4a2bb36b1dd`.
- Saved version: `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_539be22ba6ac81918490422405d9ce31`.
- Deployment: `appgdep_6af383da478c8191a28a7bb148328615`.
- Status: **succeeded**, `has_mcp:true`, URL https://minamo-visual-lab.jscymru.chatgpt.site/. Cloud Browser reload on Question 4 showed both rev37 (Heyford) and rev35 (Marston) source-grounded excerpts directly beneath their edition entries, with the historical source-digest mismatch caveat preserved. Authored question summary was not silently overwritten.
- Installed connector `read_project_changes` after deployment returned rev37 `captureExcerpt` (280-character saved-edition text), source match `true`, Work `censoring`, and no duplicate excerpt on JSON part. Rev35 returned its own preserved excerpt with source match `false`. No Project writes were performed for the V122 release.
- Production V149 unchanged, PR #99 draft/unmerged. No MCP *tool input schema* changed; no connector reinstall should be required.

## Critical limitations and next work
The excerpt is a verbatim user/GPT-authored description, not an independently verified conclusion. It may itself be wrong or become superseded; revision and classification remain visible. A deep reference to the exact historical part would improve navigation. Source-package file changes, Notes and major conclusions still need stronger source-grounded Work integration. Avoid auto-summarising by semantic guesswork or forcing new authoring schemas.
