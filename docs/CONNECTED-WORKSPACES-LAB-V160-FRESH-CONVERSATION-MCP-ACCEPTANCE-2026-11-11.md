# PR #99 — post-V160 fresh-conversation MCP acceptance (11 November 2026)

## Scope and environment

A new ChatGPT conversation independently continued the existing synthetic Lab after reading PR #99 and the V158–V160 handover. The actual installed **Minamo Visual Lab MCP** performed all data and persistence tests below, not mocks or a hypothetical API. **No Lab code or deployment was changed**, no Site source edited, no production action, and no database restore activated. Visual Lab remains **V160**; production remains **V149**; PR remains draft/unmerged.

The assistant's connected Browser tool returned: `Browser access requires the originating browser context. Open ChatGPT in the browser with the connected extension and try again.` The current tool catalogue exposed GitHub and both Minamo MCPs, **but not Sites source editing/deployment**. Therefore this report records a substantial MCP acceptance slice and its explicit UI/runtime blockers, **not** a new V161 implementation or end-to-end browser acceptance.

The owner has deferred Lab tldraw acceptance because the working licence is in production only. Do not bypass a licence, copy keys or block completion on tldraw.

## Fresh conversation: actual new, source-grounded work

Prior independently saved content was read at exact revisions:
- Previous-conversation independent Note `lab-framing-task-and-contrast-20261111`, **r5**, exact rendition `r-d1d65cd1850cfd38f25dd15542161d1d944d163b11d3fea18eb7aec6b9d80379`.
- Earlier framing Note `lab-independent-framing-note-20261111`, **r5**, exact rendition `r-add1b2a3ef870f17ebd38c30ebf74a8d53ff39467c6319c28b2779ae9ab68f0f`.
- Library Article `ms-5fc60f7facbe98b2b440b27f2dbd4d436bd54965`, **r2**, exact rendition `r-5e554f8ccaf626da17a86bd63f31e752e153740041f5019356c9f19c0094bdce`, including table `s3/p4`.

A genuinely **new independent synthetic Note** was previewed (`valid:true`) and saved through installed `apply_minamo_command`:
- ID: `lab-framing-comparison-decision-register-20261111`
- Title: **Framing — decide the evidence before choosing a variant**
- New r1 at 2026-11-11T20:21:19.968Z; operation `pr99-v160-fresh-chat-choice-register-create-20261111`.
- It distinguishes foreground contrast, line direction and foreground removal, with proposed evidence methods and explicit absence of photographs, subjects, responses or eye-tracking results.
- Exact saved `extends` relationship targets prior Note r5, and exact `source` relationship targets the Article r2 table `s3/p4`. No required Work thread or invented semantic relationship.

It was then deliberately revised through a **successful exact-revision server mutation**:
- `preview_minamo_command` at expectedRev 1 returned `valid:true`; two source links remained.
- `apply_minamo_command` operation `pr99-v160-fresh-chat-choice-register-update-20261111` committed **r2** `r-a4debd393cb341ace16fd1eec759cb69060107a57add86135416313f76dadeff`.
- The added clarification states that source linking is not evidence of use, external observation or learner intent.
- Both exact links survived unchanged.
- A competing stale command with expectedRev **1** and a destructive placeholder title was rejected with `status:conflict`, `code:operation_conflict`; independent current readback confirmed **r2, original title, both links and added text**, with no stale change.
- Retained numeric **r1** was read separately and still returned the old rendition and old body, and `read_minamo_record_changes` returned distinct r1 and r2 history, with saved actor `gpt`.

**Fresh relationship readback:** Without knowing the new note ID inside its queried source, `get_minamo_working_context` on previous Note r5 returned the new r2 as an **incoming saved record link**, including `citedTarget` pointing to the exact **prior Note r5**, not the latest inferred source. An independent creative Project also retained its older Library Article r1 diagram citation while identifying Article r2 as a separate incoming newer source. The Japanese ten-session Project r11 continued to expose older Note pins targeting **Project r10**, never silently upgrading their citations to r11.

**Interpretation:** This is stronger than prior read-only fresh-chat continuity: a subsequent new conversation actually authored, revised, protected and re-discovered linked material. It is **not** a later *fourth* conversation independent read; it also does not assert browser usability or any learner action.

## Broader live negative / pagination acceptance

1. `query_minamo_records("Photography", includeSynthetic:true)` returned the independent creative Note and Project, both with `subject-label`, `metadataOnly:true`, `classificationRevision:1`. The newly linked Note was **not** discovered via this label: labels did not silently inherit through links.
2. Workspace `get_minamo_workspace(includeSynthetic:true, limit:10)` iterated **six actual nextCursor pages** yielding 10, 10, 10, 10, 10, 9 = **59 distinct saved records**, **zero duplicate family:id keys**, and a terminal `nextCursor:null`. This was a read-side scan of the declared eligible synthetic corpus, not proof of inaccessible/revoked rows.
3. `get_minamo_working_context` with a fabricated pinned rendition `r-000...000` for an existing r2 Note returned selected `status:unavailable` and `selected-source-unavailable` gap. It did **not** serve the newest edition as if it were the requested immutable one.
4. Explicit historical `read_minamo_record` on the creative Library Article at numeric **r1** returned its actual r1 rendition `r-93c04ffa8ba7074034cee48936cbd9d7166f9693061761840329d9977ec6942d`; the newer r2 remains distinct.
5. Live global collaboration preferences still at **revision 10**: balanced context, saved related material, requested initiative, balanced authoring, direct Project edits and authoring MCP tools. No preferences were changed.

These passes do **not** replace live multi-page working-context relationship pagination, revocation and owner-crossing denial cases, which remain to be tested at the website/runtime layer.

## Additional candidate UX issue: global evidence in a selected Note context

A read with only `selectedRefs:[{family:"note",id:"lab-independent-framing-note-20261111"}]` correctly returned exact relations to its creative sources, **but** `evidence.items` also included unrelated Radio Island and Cherwell Notes under a global scope.

This is **not** proof of false persisted links: the unrelated items were in `evidence`, not `relations`, and both paths preserve their own provenance. However a consumer could present this material as if it were related to the selected creative Note. Review the no-focus fallback/read-side distinction in private source and UI, prefer a selected-source relevance boundary or an unmistakably separate 'Other recent workspace material' section. Do **not** invent links, delete global evidence indiscriminately, or treat `coverage.completeWithinScope` as proof of topical relevance.

A direct Article link and a two-hop derived route to the same Article also appear in the relationship projection. Evaluate UI duplication and grouping without discarding the different grounds/provenance.

## What must happen when Sites and browser are available

1. Retrieve **actual latest V160 private Sites source**, preserve current deployment and source IDs from [V158–V160 handover](CONNECTED-WORKSPACES-LAB-V158-V160-STATUS-AND-RESUME-2026-11-11.md); investigate packaged-game frame stuck white at runtime loading with real console/network/frame evidence. Rerun one retained Python Canvas with verifiable actual browser output.
2. Inspect and implement a bounded, tested fix for the unrelated-global-evidence presentation if confirmed by browser UX. Validate standalone Note / Project focused / explicit selectedRefs / global workspace variants, exact provenance, permissions and cursor boundaries.
3. Continue post-V160 cited-edition clicks, filtered management feed, Note dock editing/concurrency and browser CAS conflict resolution, Japanese furigana/TTS/editorial density, mobile navigation and broader multi-page rights/revocation testing.
4. Preserve tldraw as **owner-deferred and non-blocking**, preserve all existing content, do not add page-top 'synthetic test' banners or mandatory Work threads/checkpoints.
5. Run focused tests, typecheck/build, reasonable legacy regression, live MCP and interactive Cloud Browser acceptance **before** claiming a new deployed version or full PR readiness.
6. Keep public/private source reconciliation and production deployment **deferred** until substantive Lab work and the owner's personal assessment.

## Standing

| Claim | Current evidence |
|---|---|
| Fresh later conversation discovers and authors durable independent Note | **Accepted through live installed MCP** |
| Exact revision CAS, stale-writer rejection, retained r1 and r2 | **Accepted through live installed MCP** |
| Source-linked incoming note and pinned edition readback | **Accepted through live installed MCP** |
| Workspace listing pagination (six pages, 59 unique records) | **Accepted for current eligible corpus** |
| Non-inherited optional subject labels | **Accepted through live search** |
| Invalid requested rendition fails closed | **Accepted through live MCP** |
| Notes website editor/concurrency | **Unverified**; MCP CAS is not browser acceptance |
| Packaged game / Python Canvas execution / Japanese TTS / mobile | **Not exercised in this slice** |
| Sites source implementation or new deployment | **None**; inaccessible tools in this session |
| Tldraw Lab | **Owner-deferred** |
| Owner acceptance / complete PR scope / production merge | **Not claimed** |

No revision or update was made to the real learner's production data or public application. Synthetic Lab content only.