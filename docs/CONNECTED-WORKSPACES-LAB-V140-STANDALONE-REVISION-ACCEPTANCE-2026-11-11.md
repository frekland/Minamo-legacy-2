# Visual Lab V140 — standalone revisions, truthful chronology and cross-domain acceptance

**Date:** 11 November 2026  
**PR:** #99, draft/unmerged  
**Production:** V149, unchanged  
**Owner-private Visual Lab:** V140 at https://minamo-visual-lab.jscymru.chatgpt.site/  
**Exact deployed Lab source:** `1bf7b9423e646fe933952d5595ada416f71839d9`  
**Site deployment:** `appgdep_6af432c300a08191bd26bf3c48513653`, **succeeded**, `has_mcp: true`.

This report continues [V138 fresh-conversation acceptance](CONNECTED-WORKSPACES-LAB-V138-FRESH-CONVERSATION-ACCEPTANCE-2026-11-11.md) and the [architecture](CONNECTED-WORKSPACES-ARCHITECTURE-2026-11-10.md). The important process order remains **finish PR #99's Lab product scope → owner reviews and decides whether satisfied → reconcile public source and consider production integration**. Do not treat public-branch parity as a blocker to further Lab development. The owner expressly permits creating or extensively evolving synthetic Lab Projects, independent Notes, annotations, flags, Library and activity material, without arbitrary depth limits, to achieve adequate testing. Such work must never masquerade as genuine learner actions or observed external results.

## Why this slice

The genuinely independent V136–V138 GPT assessment showed that Projects could expose bounded changes and precise older editions, but independent Notes and Library material remained weaker as histories in their own right. The owner is clear that a Project must be optional.

A source inspection also found that `WorkingContextHost` exists in `app/working-context.tsx` but is **not mounted by the main workspace**. Home, Project Connections and general record connections are implemented by other components. Do not claim that the general host's design equates to a live user experience. This is a broader integration gap, not an excuse to introduce another mandatory organisational surface.

## V139 implementation: one integrated, Project-optional continuity contract

Source commit `7f9f14e20ce6b73ccbcd9fbf8f7664eb7ceeaf43` (V139) added:

1. **Owner-scoped exact historical record read** in `lib/domain.ts`, independently checking a currently available record head and reapplying contemporary source/image/media permission projection to the requested numeric revision. A content `rendition` is not assumed to identify one saved revision. A requested revision/rendition mismatch fails closed.
2. **Bounded literal record chronology** in `lib/record-continuity.ts` for Notes, Library Articles, Questions and other record families. Differences include title, body, canonical section part text, section arrangement and saved link/pin structure; every entry gives actual save time, actor, synthetic classification and an exact numeric revision destination. It does **not** infer learning episodes, reasoning causes, external results, achievements or GPT memory. Reads are bounded, owner-scoped, generation-checked and namespace snapshot-checked.
3. **MCP and HTTP retrieval:** new `read_minamo_record_changes` tool with bounded earlier-revision pagination; `read_minamo_record` accepts an exact numeric `revision` in addition to optional retained `rendition`. Existing `get_minamo_working_context` now includes `selectedChanges` for up to two explicitly selected standalone records, without making co-selection a saved relationship or Project requirement. New `/api/records/changes` and `/api/records/revision` read routes share the server contract.
4. **Calm reader disclosure:** optional `Saved editions` for non-Project readable records. Its links carry `family/id/rendition/revision`, and the SSR and client reader verify that identity rather than silently upgrading to the latest content. History is fetched only when expanded; older pages use explicit bounded pagination.

V139 passed typecheck/build and the new integrations, but live acceptance found two genuine defects:

- A long Note whose change was appended late reported a body difference while previewing identical-looking opening text.
- An older Note rendition displayed its historical prose but the record's **current** Related content links, potentially implying a newer Project relationship existed earlier.

## V140 corrective iteration and live evidence

Commit `1bf7b9423e646fe933952d5595ada416f71839d9` (V140) corrects both:

- The bounded before/after excerpts centre on the first actual difference (including appended sections); the long shared-prefix regression fixture now asserts changed wording.
- Historical record reading passes the **displayed exact saved edition** into Related content and historical passage-return display. Current incoming links are not projected onto older editions without trustworthy historical authority. “Open current Note in Notes” now opens the current record rather than a retained old body.

**Live synthetic acceptance fixture**, deliberately GPT-authored and marked TEST ONLY:

- Independent Note: `note:lab-independent-framing-note-20261111`, five actual server saves, actor `gpt`, `synthetic:true`.
- r1–r3: competing photographic composition hypotheses, refined contrast-vs-direction distinctions, proposed comparison protocol; **no supplied or observed photographs, gaze data, viewer preference results or learner actions**.
- r4: a deliberate exact link to synthetic Library Article `article:ms-5fc60f7facbe98b2b440b27f2dbd4d436bd54965` r2, specific worked-table destination. The Note's C variant redirects a line while the Article's C removes it; neither is presented as data from a real study.
- r5: a deliberate later exact broad link to synthetic creative Project `journey:lab-visual-composition-questions-20261110` r4. **r4 and r5 share the same content rendition** `r-add1b2a3ef870f17ebd38c30ebf74a8d53ff39467c6319c28b2779ae9ab68f0f`, but differ as revisioned relationship saves.

**Installed MCP readback on deployed V140:** `get_minamo_working_context` returned selected Note r5, `selectedChanges` r5/r4/r3, explicit actor/synthetic labels, two separately admitted exact-edition relationships and uncertainty coverage. r5 shows a relationship-only difference (1 to 2 links); r4's changed-span excerpt identifies “Fourth pass — relating an exact Library method,” and r3 identifies the proposed comparison protocol. The MCP notice correctly disclaims inference about learner intent, external observation and GPT memory. Earlier revisions are available through the separate bounded history route; do not mistake the first three-entry projection for complete history.

**Cloud Browser on V140:** navigated to exact Note r4, reloaded, saw retained-revision banner and **only the exact Library Article relation**. Returning to current r5 added the Project card. Expanding “Saved editions” showed actual save dates, GPT/synthetic provenance, separate r4 and r5 numeric links, and changed-span prose instead of repeated initial sentences. Visual inspection found the disclosure calm and subordinate to primary content.

**Further cross-domain MCP spot-check (read-only):** A deliberately selected real user-authored Cherwell Note (`note:20404d82-bbf6-48c6-a01c-69e9c5124b17`, r1, `synthetic:false`) and GPT-authored synthetic Japanese Live analysis (`note:minamo-lab-a3-sequence-and-response-20261110`, r1, `synthetic:true`) both returned independent `selectedChanges`, correct actor labels and source excerpts. The Cherwell Note remained **unlinked** rather than being falsely joined to its similarly themed Project. The Japanese Note returned a pinned Library edition and an **older-edition** Japanese Project relation; the identical Project target appeared twice through two saved relation structures, an unnecessary duplicate to consolidate in the next UX/data-projection phase. These particular Notes are only r1, so this check does not claim their longitudinal histories were tested.

**Verification:** focused V140 tests **8/8** (standalone revisions, cross-owner denial, trashed record denial, same-rendition exact routes), `pnpm typecheck` passed, `pnpm build` succeeded. Earlier V139 cross-domain Project continuity test cases also passed, and the one existing route expectation that disallowed Article numeric revisions was appropriately updated and passed on focused rerun. The full legacy suite was intentionally not run; no claim of broad regressions passing is made.

**MCP-install caveat:** the installed Visual Lab connector's input tool catalogue still reflects the pre-V139 schema. The existing `get_minamo_working_context` tool successfully returned the new V140 response contract, but directly invoking the *new* `read_minamo_record_changes` tool and `read_minamo_record(revision: ...)` through a freshly installed connector remains to be accepted after a plugin refresh. Their HTTP routes and fixture tests pass; do not label new tool-input acceptance complete.

## Critical current status against PR #99

| Original ambition | Actual state |
| --- | --- |
| GPT continuity without previous conversation | **Substantial.** Independent V138 cross-domain discovery plus live V140 selected standalone history; not automatic GPT recollection or permission to act. |
| Preserve changing questions, work and understanding | **Substantial for authored content and exact saves.** Actual words, structures, citations and chronology; *why* changes happened is only available if authored, never inferred. |
| Flexible Projects and independent Notes/Questions | **Implemented.** r1–r4 independent Note history is a live counterexample to mandatory Project/Work organisation. |
| Exact old editions and citations | **Strong within tested bounds.** Numeric revisions disambiguate shared renditions; rights are projected on old reads. Current/older link presentation corrected in V140. |
| Source authority, rights, provenance | **Partially proven.** Synthetic/GPT classification, old/new relations and cross-owner/trash cases verified; comprehensive source-revocation/generation-race and real mixed-evidence audits remain. |
| Natural meaningful relationships | **Partial.** Deliberate saved links and reciprocal references work; discovery of independent related material still relies on bounded authored links, not inferred topical similarity. |
| Coherent Home, Projects, Library, Your Work | **Partial.** Better Project discovery and exact navigation exist; dormant general Working Context UI, parallel surfaces and scope switching deserve a joined-up UX pass. |
| User-controlled GPT collaboration and dynamic MCP settings | **Partial.** Revisioned preferences alter context projection and authoring guidance; dynamic exposure/grouping of MCP tools based on owner preference is not complete. New schema has an install-refresh gap. |
| Full Lab/production feature parity | **Not yet established.** Lab has advanced features and test corpus; no full parity inventory or migration rehearsal. |
| Reproducible public PR source mirror | **Not achieved, intentionally deferred by owner** until personally accepted Lab scope. No parity claim or silent source port. |

### Additional issues uncovered

- The synthetic Note's Markdown comparison table appears as literal pipe-delimited text in the reader rather than a formatted table. Notes remain useful, but this matters for cross-domain science/design writing and merits GFM/table support or a clearer authoring affordance.
- Historical record connections now favour accuracy over speculative completeness: current incoming links are suppressed when reading an older edition, because a rendition alone cannot establish which later save authored an inbound link. A future exact-revision relation model might improve this without false history.
- Revision summaries describe literal differences, not interpretation of their importance, actual sessions, observed execution or consent for GPT to proceed.
- `WorkingContextHost` is unmounted; avoid duplicating Home or adding administrative panels merely to make it visible.
- Large-corpus paging, mobile behaviour, permission revocation, retention/recovery, and negative collaboration-preference enforcement need wider live acceptance.

## Next substantial Lab-first phase (before owner review and source reconciliation)

1. **Consolidate actual navigation/context surfaces:** trace Home, Projects, Library and Your Work as the user experiences them, including Other/Computing/Language switching. Either integrate useful parts of the dormant Working Context host or remove it; avoid parallel “history” interfaces and redundant navigation. Surface independent Notes/Questions and relevant saved Library relationships without requiring Work threads.
2. **Owner-controlled collaboration as a coherent setting:** reconcile display, context depth, saved-related visibility, authoring initiative, editing mode and tool affordances. Test negative permissions and direct MCP context after switching settings. Design dynamic MCP tool organisation carefully, without turning hidden tools into data/authority loss.
3. **Cross-domain authoring and sustained histories:** add realistic synthetic science and language Note/Library changes with old citations and uncertainty, exercise large paging, source-rights withdrawal, permission/generation race and snapshot failures; improve rich Note tables and presentation.
4. **Full Lab/production capability parity map and owner's hands-on review**, then, **only if the owner is happy**, reconcile private Lab source into reviewable public branch changes, preserve Site secrets/identity boundaries, compare byte hashes, and conduct a separate migration rehearsal. Keep production V149 unchanged until explicit later approval.

PR #99 should remain **draft and unmerged**. This report describes a genuine deployed and accepted Lab slice, **not** production readiness or public-source parity.
