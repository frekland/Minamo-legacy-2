# Minamo PR #99 — Lab V117 UX iteration and live preference acceptance

Date: 10 November 2026. **Visual Lab only**. Production remained V149. PR #99 remains unmerged.

Read [V116 independent acceptance](CONNECTED-WORKSPACES-LAB-V116-ACCEPTANCE-2026-11-10.md) first for the cold-start method, Radio Island rev34→35 correction, code checks and exact Work source attribution.

## V117 — Show only source changes relevant to the selected Work question

The first V116 Cloud Browser inspection confirmed correct source attribution but exposed a UX regression: opening **Recent saved changes** displayed all 12 recent Project revisions, even where seven were unrelated to the selected question. It consumed much of the question panel, repeating general Project history unrelated to the user's current reasoning.

V117 modifies `app/project-work-threads.tsx` to:

- Label the disclosure **Recent linked changes**.
- Render **only revisions with exact changed source-part identities currently linked to that question**.
- Count distinct matching revisions; show a bounded empty explanation where none matched.
- Explicitly distinguish derived source-change signals from authored question summaries and unrelated Project revisions.

This reuses V116's exact server attribution and adds no Activity/Attempt infrastructure, guessed semantic links, or duplicate durable data.

**Source:** isolated Visual Lab commit `6a949e4f499b983c74a51f0c38388cc3aa79cd57` (on top of V116 `a0e9d313c43d53f13d4756501ba323512dc09d83`).

**Verification:** 11/11 focused Project changes / Work-thread / working-context tests passed, `pnpm typecheck` passed, `pnpm build` passed, `git diff --check` clean. Existing Piper browser-externalization and large-chunk warnings remain. Historical full regression suite deliberately not run.

**Deployment:** saved Site version **V117**, ID `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_15ebe08ad6b481918c6141ea8f570bb2`; deployment `appgdep_6af3607219508191a7af6cbee10a95c6`, status **succeeded**, `has_mcp: true`, owner-private at https://minamo-visual-lab.jscymru.chatgpt.site/. The saved version resolves to the full source commit above. An archive was built locally, though V117's Sites save used remote build fallback rather than attaching that archive. V116 had been deployed from a local packaged archive.

**Cloud Browser:** verified after V117 deployment in the owner-signed-in Radio Island Project. The replay question's disclosure showed **six** exact linked revisions (including rev35 test source) and omitted six unrelated rows from the same 12-revision page. It remained collapsible by default and retained the actual linked code, Notes dock and question navigation. This is better than V116 but a six-row technical history still occupies significant space when expanded; long-lived projects may need a more compact change summary or revision-depth control.

No MCP input definitions changed between V115–V117, so connector reinstall was not needed.

## Real MCP preference behavioural acceptance

The same installed Visual Lab connector was used to test a reversible per-Project preference on the *synthetic* Radio Island record. Global preferences were **not** edited.

Initial policy: global revision 4 (`balanced/saved/requested/balanced/direct`); Radio Island Project revision 2 with no override. Baseline focused `get_minamo_working_context` returned **two saved related links** (one older exact Note edition and one Library source) and **one continuity-evidence item**.

Set Project override revision 3 to:
- `contextDepth: concise`
- `relatedMaterial: none`
- `projectEditing: preview-only`

Observed via the **installed MCP**:
- Effective policy changed to concise/no-related/preview-only.
- The same focused working-context request returned **zero related links and zero continuity-evidence items**, with `related-material-disabled-by-preference` coverage gap and a notice that links were omitted by policy, *not absent from storage*.
- Authoring guidance stated GPT Project saves are disabled while read-only previews remain available. We **did not perform a prohibited write attempt**, so server enforcement was not independently live-tested by this acceptance step.
- Restored original empty Project overrides with a revision-protected `values: {}` write (Project preference revision 4); final MCP readback confirmed global rev4 unchanged and effective `balanced/saved/requested/balanced/direct`.

This is a real observable, persistent server-side difference in MCP retrieval. It does not demonstrate every optional preference or fresh-device behaviour. Owner/source authority is unchanged by these settings.

## Remaining limitations and next bounded slice

1. **Native multi-file code packages**: Radio Island's seven source files and tests still require manual reconstruction from Project parts. A canonical version-pinned file manifest, verified download and optional Python Canvas execution would be the most valuable next slice. Do not appropriate the legacy Activity/Attempt cartridge pipeline.
2. **New material not yet linked to Work**: rev35's newly authored local execution and decision records were rightly *not* automatically attributed to a question. That protects provenance but means the human/GPT must still find unlinked evidence through sections/revisions. A safe association flow must distinguish exact derivations from conjectural semantic connections.
3. **Authored question summaries**: exact source-change attribution does not rewrite conclusions. Revisions may make a summary stale; Minamo should make this apparent without inventing an updated interpretation.
4. **Settings testing**: verify direct-versus-preview saves, concise/detailed payload bounds and initiative guidance in new GPT conversations, while preserving actual user defaults.
5. **Checkpoint read contracts**: `ProjectContinuation`/`project-context.ts` retain compatibility fields and wording for historical legacy data. New authoring in this slice remained entirely checkpoint-free. Future retirement must be careful not to destroy source/revision integrity.
6. **UX**: code blocks are substantial and can dominate the question panel. An exact multi-file explorer would serve both readability and reusability better than extra prose banners.

Production V149 was never deployed to or modified; no merge of PR #99 was attempted.