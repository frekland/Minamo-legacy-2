# Visual Lab V127 — source-grounded arrangement classification (10 November 2026)

Status: **deployed and accepted in the owner-private Visual Lab**.

- Production V149: unchanged.
- PR #99: remains draft/unmerged.
- Lab Site: https://minamo-visual-lab.jscymru.chatgpt.site/
- V127 source SHA: `da4bf9b2b8e64fa07ba730adcf26a5dfa516271b`
- Private deployment: `appgdep_6af39498df748191a5551549bb87fda2` — succeeded.
- Previous V125 and V126 reports remain part of PR #99.

## Reproduced failure

The constructed three-revision creative Project `lab-visual-composition-questions-20261110`, created and updated through the actual installed MCP connector, had:
- r1: framing hypothesis, three alternative arrangements as a native table, authored diagram and proposed comparison method.
- r2: revised only the canonical framing explanation; the reader section layout and all block placement stayed unchanged.
- r3: extended a proposed comparison method, again without changing layout.

In V126, r2’s Saved editions row incorrectly included **“Arrangement.”** Exact prior-revision `get_project_composition` reads showed identical section and block layout; only an empty `protectedIds: []` metadata field had been added by normal update processing. The old `arrangementChanged` check compared the entire serialized `projectComposition`, conflating operational bookkeeping with visual arrangement.

## Implementation

V127 computes an exact **reader-presentation signature**, comparing:
- ordered layout sections and their stable IDs, headings, patterns, display/collapse state and slot order;
- positioned blocks, source section mapping, visibility, pin and width;
- deliberate favourites.

It excludes optional empty authoring metadata, protection bookkeeping, code package definitions and Work-thread summaries. This avoids fabricated layout events. A genuine section rename, rearrangement or presentation change still counts.

The existing V125–V126 generic Saved editions UI and native artefact labels are preserved. No new activity, checkpoint, achievement, auto-authored Work thread, or inferred relationship was introduced.

## Tests and live verification

- Focused test suite `tests/project-changes-read.test.mjs`: **6/6 passed** with a new API-level regression creating table, flashcards and diagram definitions, a content-only Project update that normalizes optional metadata, and an actual reader-layout edit. Assertions reject the false positive and require detection of the true change.
- `pnpm typecheck`: passed.
- `pnpm build`: passed (pre-existing dependency/chunk warnings only).
- `git diff --check`: passed.

**Installed Visual Lab MCP after V127:** `read_project_changes` for the constructed creative Project reported:
- r3 `arrangementChanged:false`; two added and one revised method parts.
- r2 `arrangementChanged:false`; one added and one revised framing part.
- r1 exact created parts, without a later invented arrangement event.

The Japanese ten-revision Project continued returning exact section changes and source-defined dialogue, language-reveal and flashcard labels; no Work links were invented.

**Cloud Browser after V127:** expanded creative Project Saved editions. r2 showed **“Framing and attention”** with no false “Arrangement”; r1 showed explicit table caption and authored diagram description. Navigated to “Alternative arrangements” and confirmed the current 3-variant table and 3-node/2-connection diagram render. Closed the history disclosure and left the Project open for owner inspection.

Creative Project deep link: https://minamo-visual-lab.jscymru.chatgpt.site/?view=journeys&family=journey&id=lab-visual-composition-questions-20261110

## Critical outcome and remaining work

**Improved:** a fresh reader of a non-computing Project can now find exactly what changed over editions; source labels are meaningful for prose, language practice, tables, diagrams and creative artefacts; internal normalization no longer masquerades as a user-visible arrangement.

**Not solved:** what a change *means* still requires inspecting source material and deliberately recording a reasoned interpretation; exact previous rich-part editions are not fully opened in UI; the creative fixture has no confirmed Project/Note/Library relationships; current Work summaries are authored and can become outdated; literal candidate search has false-positive and poor multi-term recall. Do not mark cross-record continuity as generally accepted.

**Source hand-off warning:** the public PR branch is an architecture and evidence branch, not yet a byte-for-byte mirror of the separate Lab Site source repository, now at V127 SHA above. Reconcile this before production migration or public code-review parity claims.

## Recommended next vertical slice

Stress test **cross-record** continuity across Japanese, research and creative Projects with an explicit Note and independent Library source, exact edition links, a revised or withdrawn interpretation, and an unrelated lookalike candidate. Test MCP fresh-context retrieval and UI Connections without automatically promoting literal matches to semantic truth. Preserve the Python package export path from V123–V124.
