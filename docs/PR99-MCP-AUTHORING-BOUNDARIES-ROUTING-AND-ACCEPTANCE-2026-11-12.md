# PR #99 — MCP authoring boundaries, routing, continuity and acceptance

_Date: 12 November 2026_  
_Status: owner-approved implementation refinement; not yet implemented or accepted_  
_Scope: owner-private Visual Lab V165; production V149 unchanged_

## Decision and rationale

The 37-tool MCP catalogue has significant working infrastructure: exact revision/CAS protection, guarded Project edits, stable operation receipts, cross-record references, Library publishing, and preserved learner contributions. A live test invoked 36 tools (34 positive responses, two feature/data blockers); the remaining tool was deliberately not invoked because it directly generates a Note.

The main issue is **how GPT is directed and permitted to use these capabilities**, not lack of another persistence system. This is a focused refinement of PR #99, **not** a wholesale redesign, a new mandatory workflow, a checkpoint system, or an integration/production-migration commission.

**Product boundary:** GPT develops learning content in Projects, Questions and Library; the learner owns Notes as their thoughts, observations, reflections and questions. GPT may read and cite admitted learner Notes, and may offer provisional review of learner Project contributions. GPT must not generate Notes as substitute GPT output, or overwrite/present its own writing as learner-authored Note material. Nor should GPT infer achievements, completion or intent from saved material. Preserve historical records and rights.

The previous V165 fresh-conversation exercise **incorrectly** created a GPT-authored Note after a targeted Project preview failed. The earlier mechanical save/readback evidence remains valid, but **its authoring placement is not accepted**. MCP-only follow-up established the Project update was valid when `upsertRelation` was correctly addressed: `link.sectionId/partId` identify a passage in the *target* record; `sourceContext` refers to the originating Project location. A subsequent 37-tool audit actually committed a three-operation compound Project edit (paragraph, callout, pinned Library passage), alongside proper Library Article, Area and Question authoring. Do not claim the compound editor itself was broken.

## Slice 1 — enforce authoring roles and route content to the correct place

**Goal:** prevent GPT-generated Notes at the permission boundary, while making it straightforward to update Projects or Library instead.

### Responsibilities

| Family / surface | Primary actor and acceptable GPT action |
| --- | --- |
| Project (`journey`) | GPT can create, organise, revise, extend and link substantial learning work at a relevant existing section/part; preserve learner contributions and directly edited content under existing CAS/rights |
| Question (`investigation`) | GPT or learner can open or develop a genuinely distinct line of enquiry as appropriate; no fabricated task lifecycle |
| Library Article / Area | GPT can create or deepen reusable reference material after checking current coverage; no compulsory exercises or pseudo-progress |
| Note | **Learner-authored.** GPT may retrieve and cite eligible Notes, but no GPT-origin Note create/update/trash/restore or content substitution; metadata operations that mutate a Note (including pins) require an explicit, separately designed policy instead of being an implicit authoring fallback |
| Learner Project contributions | Learner supplies work; GPT may review a specific exact revision with provisional, clearly attributable feedback. Do not silently rewrite learner cells |
| Relationships | GPT may maintain appropriate grounded links under explicit permissions and current revision/edition checks; unaccepted proposals are not verified links |

### Implementation scope

1. Trace all GPT/MCP Note-write routes, at least `record_minamo_learning_update`, `preview_minamo_command`/`apply_minamo_command` with `family:note`, `apply_project_update.noteChanges`, `set_note_page_pin`, manuscripts and authoring packages, plus any other wrappers. Apply a **consistent server-side GPT-actor policy** to Note writes without breaking browser/learner Note creation and editing. Read and permitted citation should still work.
2. Retire or redesign `record_minamo_learning_update` as an *authoring route*: it currently advertises creation of a projectless Note and a learning-development semantic index. Keep existing historical records readable; never delete/reattribute data automatically. If a tool remains for legacy reads or explicit user-supplied content, define an owner-approved safe contract instead of assuming permission to author.
3. Do not replace an unsuccessful Project mutation with a newly generated Note. Diagnose errors and retry a valid targeted command, propose an alternate existing Project placement, or publish genuinely reusable Library material where appropriate.
4. Put the responsibilities and simple routing rule into the effective MCP tool guidance/editorial policy. Keep the website's learner-owned Notes dock and direct learner edits intact. Explicit Project authoring remains direct by default when the owner requests it.
5. Consider historic GPT-created synthetic Notes separately: label/provenance correctly, offer deliberate migration or cleanup after review, **no blanket deletion**.

### Acceptance

- From a new conversation, independently discover a long Project, read learner Notes only as admitted evidence, make an actual *Project-targeted* update with current CAS and later read it back. No new Note and no learner Note mutation.
- Create/deepen an Article in Library after coverage inspection and link an exact edition to the relevant Project; avoid duplicate reference articles.
- GPT-origin Note create/update via every applicable MCP route returns a consistent denial **without** changing the Note. Learner/browser Note creation, editing and display still succeed.
- A valid learner contribution remains text-identical after GPT provisional feedback; no inferred achievement or completed task.
- Existing source rights, author attribution, exact older renditions and recovery data are preserved.

## Slice 2 — lower tool-selection friction and improve diagnostics/history

**Goal:** make GPT's normal authoring path clear and predictable without introducing new mandatory approvals or duplicating stores.

### Proposed authoring routes (guidance, not new user-facing screens)

1. **Create:** search saved Projects and Library, identify genuine scope, publish a Project/Question or reusable Library material via the existing suitable route, then read it back.
2. **Continue:** `get_project_composition` + `read_project_changes` + grounded context → targeted `apply_project_update` or `apply_minamo_command` with exact rev/operation ID → readback. Use optional preview for ambiguity, large rearrangements or destructive edits; do not require a ceremonial preview for every bounded change.
3. **Reusable resource:** `query_minamo_library`/exact read → improve existing Article or publish via manuscript/package when appropriate → establish proven source links.
4. **Learner work:** retrieve Notes/contributions with exact source identities → review supplied contribution or explain in conversation → don't convert reflections into GPT-authored Notes.
5. **Relationship-only:** use the smallest exact-revision link operation where supported, distinguishing *sourceContext* from target *sectionId/partId*, and live identity links from edition-pinned links.

Keep low-level tools for specialised operations; expose a **short decision/routing guide**, not another proliferation of duplicated tools. Avoid hiding useful specialist functions just to shrink the number 37.

### Error clarity

- In descriptions/schema explain explicitly: `upsertRelation.link.sectionId` and `partId` address the *linked destination record*. `upsertRelation.link.sourceContext.sectionId` addresses the originating Project section. A Note can be linked at whole-record level without invented section/part IDs.
- Wrong destination passage should return an actionable field-level validation error when authorised, with a safe suggestion to omit destination passage fields or use `sourceContext`. Current `destination_unavailable` is misleading when a target is simply addressed with the source's IDs. Do not leak inaccessible record existence or contents to callers without access.
- Use consistent read-only/preview-only and revision-conflict guidance. When a write result is uncertain, use `read_minamo_operation` and retry only the exact original operation ID/payload.
- Improve editorial preflight workflow: declare inspected current coverage in manuscript/package inputs; distinguish absence of supplied coverage evidence from actual absence of similar resources.

### Revision history

- Report exact changes to cover, favourite, block visibility, arrangement, layout lock, relationship locations/editions, and Project metadata. Do not merely advance the revision with `arrangementChanged:true` and no visible change item.
- Reproduce with the audit Project `pr99-mcp-catalogue-20261112`: r1→r2 attached a staged image cover and favourited a block, yet `read_project_changes` showed no itemised r2 changes and `read_minamo_record_changes` showed no fields. r3 paragraph/callout, r4 relationship changes were reported better.
- Present saved dates, exact revision IDs and actor/provenance, never infer learning sessions, effort, intent or understanding from revisions.
- Verify safe bounded history on large Projects; preserve pagination and deferred evidence distinctions.

### Acceptance

- First-try valid compound Project update: edit existing paragraph, insert block, pin valid Library passage and read all changes back at new revision.
- Negative control: incorrect *destination* passage fails with a useful and non-leaking error; exact appropriate sourceContext succeeds.
- Revisions reflect metadata-only cover/favourite as well as content and links; stale CAS denies save and leaves current content intact.
- Authoring-route guide is discoverable in a fresh GPT conversation and leads to correct Project/Question/Library placement without making a Note.

## Slice 3 — efficient continuity and diagnostic availability

**Goal:** strengthen evidence-based continuity from already-saved records without new checkpoint, handoff or parallel Work databases.

1. Provide a compact initial current-Project overview: exact revision, sections, meaningful latest content changes, explicit links/source editions, relevant learner-supplied Notes and contributions, unresolved questions **only where saved or explicitly qualified**. Retrieve long sections and detailed history on demand.
2. Improve context differentiation: **Project continuity** tracks evolving artefacts and content; **learner continuity** requires actual learner-authored evidence and cannot be inferred from a growing Project, GPT-written summaries or browsing history.
3. Maintain current owner rights and edition-aware relation projection across MCP and web views; do not turn title matches or bounded multi-hop paths into verified relationships.
4. Resolve whether `manage_minamo_test_run` should be enabled for owner-private Lab or hidden when scenario control is disabled. In the 37-tool audit, even its `list` action returned `scenario_control_disabled`. The Lab may hold substantial synthetic content without surfacing test-only ceremony in ordinary learner UI.
5. Keep tldraw Lab licence/data checks owner-deferred. Drawing read on existing B21 references returned `drawing_unavailable` because no saved snapshot was available; this does not establish a broken reader. Packaged-game post-first-paint interaction, mobile widths, recovery activation, accessibility and changed-rights acceptance remain separate PR work, not silently closed by MCP passes.

### Cross-domain fresh-conversation acceptance

Run bounded practical trials on **three types of long-lived work**:
- **Computing:** Radio Island or another executable Project with source, tests, observed outputs distinguished from unexecuted artefacts, exact revision/CAS, code package relationships.
- **Japanese:** evolving conversational/grammar material, 46-part history, TTS/furigana presentation where browser available, learner contributions and older exact citations.
- **Non-computing:** photography/framing or Cherwell research, sources/uncertainty and meaningful methodological choices without invented measurements.

For each: new chat retrieves by natural name; reconstructs current work versus retained history; updates a real Project or appropriate Library record (not a Note); reads back exact change and links; checks that learner Notes and older source editions stay unchanged; distinguishes actual tested results from authored claims. Scope and permission failures must fail safely, without rewriting older material.

## Implementation order and non-goals

1. **Authoring authority + correction of misleading MCP Note routes** — highest priority, because mechanical success currently allows product-inappropriate GPT output.
2. **Routing / error clarity / metadata history** — make the already-proven revision/compound machinery dependable and understandable.
3. **Continuity summarisation / Lab diagnostics / cross-domain acceptance** — verify long-history behaviour before integration decisions.

**Non-goals:** new checkpoint or achievement records; mandatory Work threads; extra user-facing bureaucracy; unrelated rewrite of Minamo's persistence architecture; automatically deleting or relabelling historical Notes; resetting production; public/private code reconciliation; production deployment; tldraw licence provisioning. Those last three remain owner-deferred gates.

## Evidence / audit trail

- PR #99 comment `#issuecomment-6818393354`: fresh V165 MCP exercise, mechanical authoring but inappropriate GPT-created Note.
- `#issuecomment-6818512676`: root cause of misaddressed relation target; corrected compound preview passes.
- `#issuecomment-6819608857`: owner correction — learner-owned Notes.
- `#issuecomment-6820006351`: complete 37-tool inventory, 36 invoked, 34 positive, specific blockers and successful committed Project/Library/package tests.
- V161–V165 deployment and acceptance: `docs/CONNECTED-WORKSPACES-LAB-V161-V165-ACCEPTANCE-AND-RESUME-2026-11-12.md`.

**Readiness:** plan approved for implementation in Lab; none of the fixes described in this document are claimed implemented. PR stays draft/unmerged; private Lab V165 / production V149 remain unchanged by this documentation-only update.
