# Visual Lab V125 — cross-domain saved-edition continuity (10 November 2026)

## Decision and scope

PR #99 continues; code packages, their exact source mappings and execution provenance remain supported. The next acceptance emphasis is domain-independent continuity across language, research, creative and computing Projects. Work questions stay optional. This slice addresses a demonstrated gap: substantial non-computing Projects had exact retained revisions but no discoverable Project-level revision navigation unless GPT had separately authored Work-thread summaries.

**Visual Lab only.** Production remains V149. PR #99 remains draft and unmerged.

- Visual Lab: https://minamo-visual-lab.jscymru.chatgpt.site/
- Saved and deployed Site version: **V125**
- Site source HEAD / deployed archive commit: `f18e1f98221b012661d43179ae017aa47fd1cf87`
- Private deployment: `appgdep_6af390d6ca48819189c19c5e153b95f0` — **succeeded**
- Site release has its own private source repository; the public PR head is **not** yet a byte-for-byte source mirror of V125. See hand-off limitation below.

## Independent cross-domain evidence before implementation

Actual installed Visual Lab MCP:
- `TEST-ONLY-a3-japanese-ten-sessions`: current Project revision 10, six native Japanese sections, ten exact saved revisions, no Work threads and no exact linked-record relationships.
- `TEST-ONLY-a5-pond-eighteen-revisions`: revision 18, six research sections, eighteen exact saved revisions, no Work threads and no exact linked-record relationships.
- `read_project_changes` already gave exact part identities, change kinds, timestamps, provenance and pagination. However `get_minamo_working_context` returned no relations for either Project, and the Cloud Browser Project surface had section tabs and a collapsed Connections control but no revision trail. No authored Work question could expose the existing history.

Both are **constructed acceptance content**, not evidence of genuine learner sessions, physical pond measurements or scientific results.

## Implementation

1. **Generic saved editions panel on every Project with multiple revisions** (new `app/project-revision-trail.tsx` and CSS). Collapsed by default; lazy-loads eight exact changes at a time, paginates to earlier saved editions, and shows actual version numbers, save dates, changed sections, part kinds, bounded source previews and structural changes.
2. **Direct orientation to current canonical material.** A link opens an exact matching current part. When an identity has been removed, no substituted target is fabricated.
3. **MCP/API output enriched without new persistent metadata or tool changes.** `readProjectChanges` now provides `sectionChanges` (per canonical section; exact added/revised/removed part counts) and `textPreview` (bounded original prose from the saved edition; omitted for code and interactive items). This is deterministic; no semantic summary, exercise tracking or inferred relationship is created.
4. **Honest provenance.** Constructed examples are visibly labelled, and a source revision is never described as a verified execution or achieved skill. Current Work-thread changes and code-source mapping behavior are preserved.

No new mandatory Project structure, Note, flag, annotation, Library content, Activity/Attempt record, checkpoint or auto-authored Work thread.

## Verification

Focused checks on the local V125 source:
- `node --test tests/project-changes-read.test.mjs`: **5/5 passed**, including existing Work-linked changes, file mapping, saved browser observations, exact paging and owner isolation; new assertions for per-section grouping, prose preview and description-only non-fabrication.
- `pnpm typecheck`: passed.
- `pnpm build`: passed (existing dependency/chunk warnings, no new build failure).
- `git diff --check`: passed.

**Actual installed Visual Lab MCP after deployment:**
- Japanese revision 10: `sectionChanges` identifies one revised conversation overview and added dialogue/practice/cards parts, with exact 180-character prose previews. No Work relationship was invented.
- Pond revisions 18, 17 and 16: section-level change counts and exact previews expose the later rethinking of rainfall versus pond appearance. These are saved authored claims within a constructed example, not independently verified experiments.
- Read page `nextBeforeRevision` remains usable.

**Actual Cloud Browser after V125:**
- Pond: `Saved editions · revision 18` appears in the Project above the reading sections, with eight collapsed revision rows. Expanding revision 16 shows the field observation, revised competing explanation and new method. Clicking “Open current part” navigated to “Competing explanations” and displayed the exact revised paragraph.
- Japanese: `Saved editions · revision 10` appears without Work threads. Expanding revision 8 shows grammar table, language exercise, flashcards and the revised intransitive/transitive verb explanation. “Earlier editions” loaded revisions 2 and 1.
- Visual inspection: compact and low contrast when collapsed. Expanded history is long, but only by user choice. It does not add a permanent dashboard.

## Critical limitations / next steps

- **History is still structural, not interpretation.** It shows changed source material, but cannot by itself say which inference was withdrawn or why. Those conclusions must remain source-grounded and authored or recoverable from the actual text.
- **Exact prior part viewing in the browser remains incomplete.** The revision trail previews older prose and links to *current* exact identities; a complete historical table, interactive or code part still requires an exact saved-revision read through MCP (or later browser UX).
- **Connections remain sparse.** Both long non-computing Project fixtures have no retained Notes/Library/Work relationships. A fresh GPT may find Project content but still must deliberately investigate separate sources.
- **Candidate recall is literal and noisy.** In the installed connector, broad queries `Japanese`, `pond` and `drawing` returned candidates, but multi-term conceptual queries returned none; `pond` even surfaced a Moon Cheese Project. No suggested relationship was accepted. This argues against automatically promoting title matches to true links.
- **Public source parity:** `feature/connected-workspaces-foundation-20261110` is the architectural/reporting PR branch and currently lacks deployed Lab UI modules including `app/project-connections.tsx` and `app/project-code-packages.tsx`. V125's source-of-truth implementation is the separate Lab Site source commit above. Before any production migration or claimed PR code review, reconcile/mirror the deployed Lab source to the public branch in a deliberate, reviewable source integration. Do not assume PR docs alone are deployable V125 code.
- **Acceptance coverage:** these were two synthetic non-computing Projects plus focused server tests, not a clean fresh conversation showing independent understanding of a *real* creative/scientific Project; mobile not tested in this slice.

## Recommended next bounded slice

Test a source-grounded cross-domain relationship that deliberately changes over several editions: a Japanese reference linked to a grammar question and a research Project with an explicitly superseded interpretation and linked Note/Library source. Confirm exact link edition and current-head behavior through MCP and the browser. Prefer automatic **structural** evidence and explicit user/GPT semantic authoring over generic auto-linked Work questions; keep the direct code-package path intact.
