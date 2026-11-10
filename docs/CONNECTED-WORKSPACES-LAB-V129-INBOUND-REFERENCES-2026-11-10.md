# Visual Lab V129 — incoming exact references across Projects, Library and Notes
10 November 2026 · PR #99 · Visual Lab only

## Objective
Extend the source-grounded outgoing relationships accepted in V128. A Project should also discover an owner-admitted Library Article or Note that explicitly refers to its exact retained edition, without inventing associations from titles, text similarity, or assumed intent. This is a general creative/research/writing continuity slice; the earlier Radio Island Python package work remains intact.

## Deployed implementation
- Private Visual Lab source commit: `dc9d571740efe49aec982f6a419e175d7de24a8b`.
- Visual Lab deployment: **V129**, `appgdep_6af39a03682881919567b3113a900fb1` — **succeeded**.
- Production: **V149 unchanged**. PR #99 remains **open, draft, unmerged**.
- `lib/working-context-read.ts`: bounded, owner-scoped inbound candidate query against explicit canonical identifiers (`links`, `pagePins`, `projectComposition.blocks.ref`, exact anchors). Candidates and their saved exact Project targets are independently admitted under source/owner permissions. The resulting relationship has `direction: incoming`, `quality: saved-inbound-record-link`, and `citedProject` recording the exact Project rendition. No semantic matching or source-body interpretation.
- Candidate cap: `MAX_INBOUND_CANDIDATES=24`, existing relation cap 12. Coverage reports partial when truncated; `relatedMaterial: none` avoids inbound scan.
- `app/project-connections.tsx` and `app/working-context.tsx`: readable **“references this Project”** for incoming citations, **“cited edition”** for outgoing exact citations. An incoming Note relation is not repeated if it already appears in the Note evidence list.

## Focused verification
- `A-INBOUND-LIBRARY` integration test independently covered: incoming Article and Note with explicit Project references; unrelated same-title Article excluded; Project r2 does not silently retarget a citation to Project r1; cross-owner exclusion; removal of trashed source; no records created on read.
- **11/11** focused working-context / Project Connections tests, **6/6** focused collaboration-preferences tests, TypeScript typecheck and production build all passed; `git diff --check` passed. **The full historical regression suite was not run.**

## Real installed MCP and Cloud Browser evidence
The synthetic, explicitly labelled visual composition Project `lab-visual-composition-questions-20261110` is at **r4**, exact rendition `r-6fece7555a4cde806f041f796b863efb8d2f1b384aeb867b5fb7970d34d87f7e`. Its native diagram node/edge cite the earlier r1 of synthetic Library Article `ms-5fc60f7facbe98b2b440b27f2dbd4d436bd54965`.

Using the actual installed Visual Lab MCP connector, `apply_minamo_command` updated the Article from r1 to **r2** (operation `lab-framing-inbound-article-r2-20261110`) with an authored explicit link back to Project r4. A subsequent **installed** `get_minamo_working_context` returned **two different directional facts**:

1. Project r4 **cites Article r1**; `quality: older-edition`, original diagram citation provenance, with Article r2 reported separately as `newerEdition`.
2. **Article r2 references Project r4**; `quality: saved-inbound-record-link`, `direction: incoming`, `citedProject` remains exact r4.

The focused MCP read returned `coverage.completeWithinScope: true`. These are references, not independent verification of the creative hypothesis or a viewer observation.

After reloading the live V129 Cloud Browser Project, the **Connections** panel visibly displayed both Article entries with distinct labels, the original “Newer edition available” link, the correct authored provenance and the exact Library navigation. Layout remained charcoal/cyan and understandable, but duplicated titles and explanatory text consume notable vertical space.

## Critical limitations and next decisions
- **Truthful but duplicative UI:** two cards with the same Article title represent meaningful different editions/directions. Grouping by source identity with explicit directional/edition subrows may simplify the surface, but must not hide the older exact citation or the newer reciprocal reference.
- **Bounded explicit discovery:** owner-scoped JSON identity shortlist is capped at 24 candidates, then 12 admitted relationships. It will not discover unstructured prose citations, implied dependencies or semantic supersession. A limited result is not a claim of exhaustive context.
- **No invented findings:** the Article and Project are synthetic acceptance fixtures; no photographed images, viewer eye-tracking, playtest, learner progress or user preference was observed.
- **Author intent and drift:** a derived link says that a saved record *cites* an exact source; it does not decide whether the cited conclusion remains sound. Withdrawals/trash are admission-checked; nuanced retraction/supersession narrative still needs deliberate source-grounded authoring.
- **Usability:** native diagrams need discoverable inline source affordances; the Connections panel is still tall for sustained use. Test language and research projects with real varied Notes and Library sources before declaring broad continuity complete.
- **Source parity:** public PR #99 documentation tracks the implementation, but the public branch is **not a byte-for-byte mirror** of the private deployed Lab application source. Reconcile before any proposed production promotion.

No MCP tool input schema was changed in V129, so no connector reinstall was required. The private Lab remains the only deployment target.