# Visual Lab V126 — useful non-code artefact labels and creative acceptance (10 November 2026)

Scope: incremental, source-grounded refinement of V125’s generic Saved editions view. Python code-package features remain intact, and Work threads are still optional. This is deployed only to the owner-private Visual Lab; production remains V149 and PR #99 is draft/unmerged.

- Source commit: `bfc9f7ebad76d0092986bbbd8ad097726aea1aa9`
- Deployment: `appgdep_6af392ccc4fc8191a3995d67216e94e5` — succeeded (Visual Lab V126)
- Site: https://minamo-visual-lab.jscymru.chatgpt.site/

## Improvement

The initial V125 UI described some saved non-code material only as “Added table” or “Added interactive.” V126 derives a concise `materialLabel` directly from the exact saved part definition, without model inference or additional persisted records:

- Table: original caption, or exact column headings.
- Flashcards: saved card count.
- Language dialogue: saved turn count; language reveal: original source utterance.
- Diagrams: authored description/title or bounded exact node labels.
- Image/media/reference: saved alt, caption, description or link label.
- Code, drawings and other interactive types: concrete artefact type.
- Existing short prose excerpts, source-file paths and exact source identities remain.

## Checks and live connector evidence

- `node --test tests/project-changes-read.test.mjs`: 6/6; new test saves real non-code table/flashcards/diagram definitions, checks exact labels and absence of unverified Work relationships.
- `pnpm typecheck`: passed; `pnpm build`: passed with existing warnings; `git diff --check`: passed.
- Actual installed MCP after V126: Japanese A3 revision 8 returns a table caption, language reveal source utterance and “Flashcards · 5 cards”; Pond A5 revisions return authored table titles/callout labels. The connector tool definitions did not change, so reinstall was unnecessary.

## New real-connector creative test fixture

Created and read back `lab-visual-composition-questions-20261110` on the Lab through the installed `apply_project_update` tool. It is explicitly **synthetic**, a constructed photographic composition study, not user photographs, external playtests or observed viewer behavior.

- Revision 1: a design question, an untested bright-edge framing idea, three alternative variants in a saved table, an authored diagram of hypothetical visual relationships, and a proposed comparison method.
- Revision 2: amended the earlier bright-edge assumption after reasoning about competing contrast; original edition remains exact; no claimed audience study.
- Revision 3: added a controlled proposed A/B/C photo-comparison procedure and an explicit register of unresolved evidence requirements.
- Actual MCP `get_project_composition` read back all 3 revisions and current sections; `read_project_changes` returned section-change counts, explicit source labels, and authored text previews without Work threads or falsely inferred relationships.

Cloud Browser V126 showed the synthetic creative Project as a normal three-topic Project with a Saved editions disclosure, labelled synthetic. The original/revised design rationale was present in the current Framing section.

## Newly exposed defect, V127 follow-up

Actual creative revision 2 performed only a canonical text update, yet its V126 saved-edition row also said **“Arrangement.”** Exact MCP revision reads showed the reader layout was unchanged; the revision had merely acquired `protectedIds:[]` in internal Project composition. The old `arrangementChanged` implementation compared whole composition JSON and treated this normalization as a reader layout edit. V127 will compare only canonical reader-presentation fields and verify that actual rearrangements are still detected.

## Remaining limits

Saved-source labels are useful *orientation*, not interpretations of why a change was correct. Historical table/diagram contents still need exact-edition opening to inspect fully from the UI; current-part links are identity-preserving. The fixture has no Notes/Library relationships; this will be a separate continuity acceptance, not an automatic invented link. The public PR source branch is not yet an exact mirror of the separately deployed Lab source.
