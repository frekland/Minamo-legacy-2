# Connected Workspaces — Visual Lab V110 preference-enforced continuity (10 Nov 2026)

**Scope:** Independent owner-private Visual Lab only. Production V149 unchanged. PR #99 unmerged. Continues [V108–V109 exact Project return](CONNECTED-WORKSPACES-LAB-V109-ACCEPTANCE-2026-11-10.md).

## Found by examining preference enforcement

The existing owner-scoped `relatedMaterial: none` preference removed `relations` from `get_minamo_working_context`. However, a separately assembled **focused continuity evidence feed** still traversed incoming saved links and returned a Note's title, preview body, exact source ID and path. The UI option **Saved connections → Hide** therefore did not actually hide all linked material within a Project context.

The synthetic V107 DNS Project and its independently pinned Note were a direct real-world Lab reproduction. This is a server-read policy flaw, not a cosmetic preference issue.

## V110 implementation

- `lib/working-context-read.ts`: with `relatedMaterial:none` and a Project/Question `focus`, **do not run the linked-evidence discovery**. Return an explicitly preference-limited empty evidence page, with an honest incomplete-coverage notice and `related-material-disabled-by-preference` in the combined coverage gaps. It must not claim that the owner has no saved relationships.
- Still return directly selected eligible records. A `focus`-only Project read retains the Project's title, exact revision and bounded canonical section preview; an explicit exact Note selection remains readable. Muted `relations` stay empty.
- Reject incoming evidence cursors while a focused read is muted, rather than silently accepting an inaccessible pagination state.
- UI: saving global or Project collaboration settings now raises an internal refresh event. `ProjectConnections` and `WorkingContextHost` reread owner-scoped server context while open. No new stored relationship, inferred progress or write authority.
- No MCP tool-schema changes or reinstall; current stable tool surface stays intact.

This is **not a general hide-all-content mode**. An unfocused recent-work feed and a deliberately selected exact source have a different purpose from discovery of sources related to one focused Project. That distinction is deliberate and should remain clear in the Settings copy.

## Test evidence

Added a regression in `tests/collaboration-preferences.test.mjs`, first observed **failing on V109**: the hidden related Note remained in `evidence.items`, with its full preview despite `relatedMaterial:none`.

After the fix the regression verifies:

1. With the default saved-links policy, the Note appears as evidence of an exact saved page pin.
2. With hidden links, a Project-focused MCP read returns its explicitly selected Project but **no relation edges or linked evidence bodies**.
3. Incomplete coverage and an explicit preference gap prevent the empty result being mistaken for evidence that there are no links.
4. A deliberately selected Note remains available; an evidence cursor cannot bypass the hidden mode.
5. A Project-specific override takes effect even when the global policy permits saved links; global settings remain intact outside that Project.

The two focused test files `tests/collaboration-preferences.test.mjs` and `tests/working-context-read.test.mjs` yielded **11 passed, 0 failed**; the extended regression was rerun after the final assertions and passed. `pnpm typecheck` and `pnpm build` passed. Existing non-blocking Piper/browser bundling warnings remain. Full historical suite not run.

## V110 provenance

- Site: https://minamo-visual-lab.jscymru.chatgpt.site/
- Private Site source commit: `052e71d9a7127389fe8f11154bee866f7498cd3e`.
- Saved **V110**: `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_54206c8f38cc819198c91e1a7c852ec4`.
- Deployment `appgdep_6af3296956088191b7ecb08df5679af4`, **succeeded**.
- Public GitHub PR is the acceptance ledger; the working private Lab code remains in its independent Sites Git source.

## Installed MCP acceptance — not a local mock

Using the **actual installed Minamo Visual Lab MCP**:

1. `get_minamo_collaboration_preferences` for synthetic Project `ms-1daba79f97c81f70e2aa6a1ac4b81aa98eaf95a7` showed global `balanced/saved/requested` and initially inherited Project settings. The focused context returned the synthetic Note `pr99-v107-dns-cache-analysis` as eligible saved writing.
2. Set a temporary Project override `relatedMaterial:none` using the versioned `set_minamo_collaboration_preferences` tool. A new `get_minamo_working_context` returned the Project selection, **zero relations, zero linked evidence items**, and explicit incomplete coverage with the preference gap.
3. Called the same read with an **explicit Note selection**: the selected Note's legitimate preview returned, while relation/evidence discovery remained muted.
4. Restored the Project overrides to `{}` through the MCP and verified that linked evidence reappeared.
5. The browser test below also saved and restored the same synthetic Project override. Final MCP read confirmed **`project.overrides={}`**, effective `balanced/saved/requested`. The preference revision advanced as an audit of these deliberate test operations; no learner work or source pins changed.

## Cloud Browser acceptance — V110 UI

On the deployed DNS Project's native tab **03 A small controlled model**:

- Expanded **Connections** and saw the linked synthetic Note, its restrained excerpt and the exact return link; Project code remained visible below.
- Opened **Project options → GPT context for this Project**. All three selects correctly showed inherited global values (Balanced / Include / Only on request).
- Changed **Saved connections → Hide**. The setting saved and the **already-open Connections panel refreshed automatically** to say links were hidden, with a partial-view notice; the Note excerpt vanished without a page reload.
- Changed the option back to **Use global (Include)**. Saving completed; the same Note link and excerpt returned automatically.
- Rechecked the restored overrides through installed MCP. Left the Project UI open for owner inspection.

No manual browser cache manipulation or private API bypass was used for acceptance.

## Critical limitations and next slices

1. `initiative: requested|offer` remains chiefly advisory for GPT wording; it does not yet control a server-generated suggestion list or enforce an authoring path.
2. No settings yet distinguish source categories, authoring depth, or draft-versus-direct editing. Such controls must have precise semantics and server-verified consequences, not additional decorative toggles.
3. The **expanded Connections panel occupies a tall block above the reader**. This is functional but visually intrusive for long Projects; consider a compact side/inline access pattern.
4. The recent-work feed without a Project focus remains available even when saved links are hidden; this is intentional, but the UI should explain the difference between independent recent records and linked evidence.
5. Still needed: the substantial six-month mixed-artefact longitudinal scenario; cross-Project and Work references through revisions; a third genuinely fresh-chat continuation; safe historical-section reading.
6. This slice did not modify manuscript or MCP checkpoint authoring instructions. Existing checkpoint-free Project authoring continues; remaining legacy checkpoint language in separate historical development/recovery APIs deserves a distinct audit.

No production deployment, PR merge, Activity/Attempt authoring, mandatory checkpoints, achievement claim, or GPT handoff document.
