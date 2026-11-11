# Connected Workspaces — V150–V157 browser-led classification and cross-domain UX acceptance

11 November 2026 · PR #99 · owner-private Visual Lab only

## Decision and boundary

Continue substantive Lab-first PR #99 work until the owner is personally happy with the experience. **Do not reconcile the public PR branch to private Site source yet**; source parity is a later integration gate. Production remains V149, untouched. PR stays draft/unmerged. It is explicitly acceptable to create, extend or revise substantial illustrative Lab Projects, Notes, flags, annotations, Library material, artefacts and activity for functional testing. Preserve original vs synthetic/learner/GPT/external provenance in persisted data and MCP, but **do not display repeated page-top “TEST ONLY” banners** or force any administrative learning workflow.

## Exact private deployments

| Lab version | Private Site source | Outcome |
|---|---|---|
| V150 | `688208d8197ab6665e2d0f10ac799c84bdce96ec` | Succeeded; home/project/library calm presentation and metadata-only existing-record subject editor |
| V151 | `159535cf3f7263723342f7116eece6deb7a08ae6` | Succeeded; browser-discovered unreachable Project Manage route fixed; Home Favourites and Notes previews refined |
| V152 | `902e2c181df22597e02cbc758fc4730c0ab8fc65` | Succeeded; full Project headings/breadcrumbs use presentation-only title normalisation |
| V153 | `ead723d8e167a647ad13bac9be5a7d3975550488` | Succeeded; retained-edition reader receives the same title treatment and a collapsed, accessible synthetic preamble |
| V154 | `5a76e2e889d8018b307120486c5400cdc56c95a3` | Succeeded; substantive Your Work Note previews and bounded, formatted expansion |
| V155 | `6075900eb4fe339dd906fc48c8ba8442296e1a59` | Succeeded; synthetic Markdown heading and preamble folded into `Source and provenance` without editing Note source |
| V156 | `021826fc46b14a1b0968583b6fa8300c54472113` | Succeeded; mapped Reader preserves canonical DOM/source order; unmapped Your Work preview places disclosure after narrative |
| V157 | `2dc7ae3fc84b22f5ddc4db73a4d85345fe2719ab` | Succeeded (owner-private; deployment `appgdep_6af4b9216d188191b40c498241117b2c`); Home Recent Notes now shares the same substantive synthetic Note excerpt rule, keeping terminal evidence previews |

Private Lab URL: https://minamo-visual-lab.jscymru.chatgpt.site/

**The public PR branch does not contain these private application commits. No source parity is claimed.** The release remains an owner-private prototype with a separate later source reconciliation requirement.

## Implementation

- Introduced a view-only display helper that strips explicit test markers from synthetic record titles, without touching canonical titles, actor attribution, revision identities or rights. Applied across Home, Projects lists, Library searches, connection cards, Project headers/breadcrumbs and Favourites. Cleaner Note previews remove duplicate Markdown headings and formatting tokens, not prose authority.
- Added an optional *Learning space* editor to the existing Manage dialog for independent records and Projects: Other, Computing, Languages or both, with optional language tags. Reuses the server's metadata-only `classifyLearningScope` and exact `expectedRev` / `expectedScopeRev` compare-and-swap contract, stable operation identities and conflict feedback. It never requires a Project or Work thread or rewrites the record.
- Native Project pages initially lacked a way to open that shared Manage dialog. Browser exploration of the creative Project exposed this; V151 added **Project options → Manage Project**, retaining Edit Project details and GPT-specific context settings.
- Removed a duplicate Project section heading in the native reader (the reader already owns the semantic heading) and continued the exact-edition bidirectional citation presentation.
- V153 carried the same calm presentation into the separate generic retained-edition reader. The original `TEST ONLY — ...` source preamble is retained verbatim, now behind the optional **About this example** disclosure. Existing exact captures cause title mapping to use canonical text rather than falsely presenting a rewritten passage.
- Browser inspection of Your Work exposed raw Markdown and giant unequal card expansion for independent creative Notes. V154 now renders a substantive short excerpt without a repeated synthetic preamble, displays a synthetic-aware title, and expands the full canonical Note as formatted Markdown in a bounded, full-width panel. Semantic terminal capture previews survive in ordinary and Trash lists; no Notes, Markdown or terminal data is rewritten.
- V155–V156 refined the shared Markdown Note viewer: only explicit synthetic `TEST ONLY` heading plus provenance paragraph becomes optional `Source and provenance`. In Your Work the substantive inquiry appears first and the disclosure at the end; in a Reader with canonical span mapping, the disclosure remains first in DOM order to preserve selection/citation offsets. No source bodies or revisions are changed. V155 browser acceptance confirmed a visually calm expanded creative Note with readable section headings and prose.
- Final Home browser pass found a second disconnected teaser path: Home Recent Notes still surfaced `Provenance. GPT-authored synthetic…` after Your Work had been cleaned. V157 reuses the same `savedWorkCardPreview` for synthetic Notes on Home while preserving explicit terminal capture labels. That is a view-only excerpt projection, not a change to Note content or authority.
- Corrected stale test fixtures to explicitly request illustrative records and made the 70-record Library performance fixture assert nonempty results rather than silently measuring empty pages.

## Live browser and MCP observations

- **Creative:** Visual composition r4 reads with one section navigation and meaningful alternative framing hypotheses. Connections displays a saved independent Note r5 citing Project r4, an outgoing exact Library Article r1 and incoming Article r2; the older retained destination stays exact. The preview is more readable, though explicit provenance still appears in substantive Note prose.
- **Computing:** Pulse threshold Project r3 showed code-package ZIP, current content and Manage. Its initial MCP state was `spaces:[computing]`, classification revision **1**, canonical `rev:3`, rendition `r-5aaca4c335faaef5e81a2e4e61e22bb1df9f2ef3e5930f55cd84ce11a7c6a177`. Browser saved `spaces:[computing,languages]`, `languages:[ja]`; installed MCP readback returned classification revision **2** while canonical revision/rendition were identical. Browser then restored Computing; MCP readback returned classification revision **3**, still canonical r3 and the same exact rendition. No code or learner content was altered.
- **Japanese:** Japanese Live is a six-section native Project at r11 with working furigana controls, sentence reading, translation/explanation toggles and pronunciation controls. The prominent `(TEST ONLY)` Project heading/breadcrumb remained after V151, prompting V152's additional view-only correction.
- **Retained edition:** Following the Japanese Note r1 reference to Project r10 opened the exact older rendition, separately from the native Project r11 reader. V153 browser acceptance showed a calm older title and a collapsed disclosure; expanding it revealed the original canonical preamble verbatim. Returning to current edition navigated to native r11 without revising the Note’s r10 source identity.
- **Your Work:** Before V154, expanding the long creative Note flooded one two-column card with raw `#`, `**`, table pipes and a page-long provenance preface. The independent Note was not easy to scan. Live V154 browser showed meaningful Creative and Cherwell Note excerpts without test labels; expanding Creative spanned both columns and rendered Markdown, but still exposed a duplicate `(TEST ONLY)` heading and provenance paragraph at the top. This defect directly prompted V155.
- **Home:** Projects, Library and Notes are discoverable across All; Home favourites no longer append synthetic acceptance markers. Recent Note excerpts are less Markdown-like. Home deliberately shows a curated shelf, with the separate Browse all Projects route for the full list; this separation must remain clear and stable after workspace switches.
- **Collaboration:** Installed Lab MCP returned global preference revision **6**: balanced context, saved related material, requested initiative, balanced authoring, direct Project editing and `mcpTools:authoring`. This is readback, not proof of live cached-tool denial or newly installed tool-catalogue refresh.
- **Source authority:** Creative hypotheses are constructed, not observed viewer responses. The Pulse test includes exact terminal reproduction wording and distinguishes it from browser execution. Source rights and canonical content were never rewritten for the UI cleanup.

## Validation

- V150: targeted tests **21/21**, `pnpm typecheck` and `pnpm build` passed. Library performance included 3 area, 30 topic and 18 reference items; seven/eight SQL queries per request, not an empty synthetic fixture.
- V151: focused management/scope/render checks **7/7** (6 existing + 1 new), typecheck and build passed.
- V152: focused checks **6/6**, typecheck and build passed; browser confirmed Japanese Live native Project r11 heading and breadcrumb were calm, with six subject sections, then its Note’s exact r10 citation opened retained edition r10.
- V153: focused checks **7/7**, typecheck and build passed; browser confirmed exact r10 retained notice, calm title, collapsed provenance, reversible expansion with original preamble, and return to r11.
- V154: focused checks **31/31** including Notes/Trash terminal markers, typecheck and build passed; live Your Work showed 14 items, balanced short cards, an expanded creative Note occupying full width with correct Markdown headings/lists, and preserved Terminal Note handling; the remaining prominent synthetic frontmatter was subsequently corrected.
- V155 and V156: focused shared Markdown presentation tests **8/8** each, typecheck and build passed; V156 added an explicit canonical mapped-DOM ordering assertion. V156 live Cloud Browser reloaded the 14-item Your Work view, expanded the creative Note, and confirmed its visible start is the real question and hypotheses; opening `Source and provenance` still reveals original synthetic wording. The mapped Reader source ordering is protected by a focused regression, not a claimed end-to-end capture-interaction test.
- V157: the two relevant filtered Home tests **2/2** passed (synthetic teaser and terminal preview), typecheck/build passed; V157 Cloud Browser Home Recent Notes now presents `Imagine a portrait with its subject…` for the creative Note, not its synthetic provenance; Cherwell still presents its scientific question. Clicking that Home entry opened the dedicated Note Reader with clean heading and a collapsed `Source and provenance` disclosure. Expanding that disclosure revealed the exact original `(TEST ONLY)` heading and GPT-authored-source paragraph, then closing returned to the substantive narrative. The source display was not modified.. A broader legacy `ux-home-journey` invocation also surfaced **eight pre-existing obsolete assertions** expecting removed Home/Continue/checkpoint-era markup. Those failures are not claimed as passes and should be updated selectively during integration testing; the newly added teaser assertion itself passed.
- No full legacy regression suite was run by default as a release gate. Ordinary build warnings about client bundles and Piper externalisation were not conflated with failures.

## Critical standing and remaining work

| Objective | Status and caveat |
|---|---|
| Durable Project/Note/Library relations and exact source editions | Substantial and demonstrated in creative/scientific/language histories; relationship projections still span several separate read paths. |
| Fresh-conversation useful GPT continuity | Promising but **partially accepted**. MCP provides bounded canonical context and independent Note links; long multi-subject discovery, truncation and adversarial permission changes remain insufficiently tested. |
| Flexible independent work | Working for Notes/questions without Projects. Existing-record subject organisation now browser-accessible; **Other remains an overloaded bucket** for science, creativity and other domains. |
| User-controlled GPT/MCP preferences | Working persistence/readback and isolated restrictions; full client-tool re-discovery and stale cached write denial still need live negative acceptance. |
| Calm coherent UX | Improved across Home, Projects, Library and connections. Remaining mixed-related activity labels, repetitive authored Japanese prompts, context density and Notes dock still require judgement. Expanded Note authoring is rendered rather than dumping raw Markdown. |
| Revision integrity and rights | Metadata-only classification verified live with unchanged canonical r3/rendition. Broader denied/changed-rights traversal remains open. |
| Production readiness | **No.** Owner acceptance, cross-domain negative testing, retained artefact/mobile/recovery parity and eventual exact private/public source reconciliation are not done. |

### Prioritised next integrated slice

1. **One rights- and edition-aware relationship projection** used consistently by Project connections, Library, Home/Your Work and MCP, with explicit incoming/outgoing context, complete pagination, truncation signals and source authority. Avoid adding another separate “Work thread” structure or extra per-subject systems.
2. **Cross-domain authoring and subject placement:** natural classification for Notes and scientific/creative/linguistic/coding work, without forcing everything into Computing/Languages/Other; ensure language-only controls depend on actual language presentation rather than a temporary interdisciplinary tag.
3. **Negative end-to-end acceptance:** source revocation, cross-owner denial, exact older editions, stale cached MCP mutation despite read-only preferences, context depth limits, ambiguous save/retry and recovery. Use substantial truthful Lab content freely.
4. **Calm full-product UX and parity:** fix mixed Note/Project activity labels; visually assess Japanese repetitive prompts, Notes dock, Library and Your Work at laptop/mobile widths; re-test drawing, images, Python Canvas, Pygbag/game, tldraw conflicts and backup/recovery.

Reconcile the private source into the public PR branch **only after** the owner reviews the completed Lab scope and explicitly agrees to the integration stage. No production deploy, merge or mandatory checkpoint system is authorised.
