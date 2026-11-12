# Minamo PR #99 — Visual Lab V142: quieter UI and identifiable saved anchors

**11 November 2026 · owner-private Visual Lab only**

- Deployed Site: https://minamo-visual-lab.jscymru.chatgpt.site/
- Version: **V142**
- Exact private Site source commit: `3674d1e4dffeb457929ad78d8ae2970e57808fe5`
- Saved version: `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_215f9a72244481919e0ae455370d4485`
- Deployment: `appgdep_6af4433374d08191ba80ec9a68d5976f`, **succeeded, MCP enabled**
- Production: **V149, unchanged**. Public PR **draft/unmerged**.

## Owner-directed presentation change

The owner explicitly asked to remove this banner from the top of Lab detail pages:

> TEST ONLY · synthetic record. This content is for visual acceptance, not genuine learner progress.

The Lab's purpose is already understood; repetitive testing warnings interfere with evaluation of ordinary UI layout, legibility and hierarchy.

V142 removes the warning **from the shared workspace shell**, covering Project, Question, Article and Note detail pages without touching their stored content. Its now-unused CSS is removed. It also removes repetitive synthetic/constructed-example badges from **Home Projects, Library, Notes and Question shelves**, the **Projects catalogue**, and the common **record/search/work cards**. Related-Article tiles use a neutral Article label.

These are **display-only** decisions. The server still stores `synthetic`, `actor`, exact revisions, provenance evidence and any source metadata, and MCP continues to return them. Detailed saved-edition history retains actor/synthetic markings when expanded. There is no conversion of synthetic work into learner results or externally observed activity.

**Deliberate limitation:** Many existing record *titles and bodies* themselves contain “TEST ONLY”, “synthetic” or constructed-disclaimer prose. Those are authored, saved record bytes, not automatically generated chrome. V142 does **not** silently rewrite them, pollute revision chronology, or destroy exact citations merely for cosmetic uniformity. Whether to rename curated example content for the owner's later review is a separate content-design choice.

## Saved-relationship readability

The first V141 fresh-conversation review showed that two exact references into different passages of a historical edition can *look* like duplicate connections.

V142 improves common Note/Article/other-record `LearningConnections`:

- Group repeated references by **saved target record identity**, but keep every distinct relation/anchor separately navigable.
- Within a group, say `2 saved references` instead of assuming both are passages.
- For each reference, name the **Section** and **Part** IDs if saved. When the target record still has that exact rendition, use its current admitted section title; for an older edition, show the exact saved section ID without incorrectly borrowing the newer edition's title.
- Say **Earlier edition** (or **Saved edition** when current target is not loaded).
- Surface saved source context where provided. Expand accessibility names to distinguish otherwise similarly named links.
- Hide purely virtual `__article`/other internal section IDs.

An exact-link regression uses two citations to the same historical Japanese-style Project rendition, one to the dialogue section and one to the grammar section. Both destination anchors survive; a misleading title from the current Project edition is not used for the old one.

**Important accuracy boundary:** The real Japanese Live Note also has two distinct **page pins** stored as inbound Project evidence paths (`dialogue/a3-s9-full-story` and `grammar/a3-grammar-sequence` into Project r10, now r11). These are not ordinary outgoing `record.links`. V142's shared linked-record UI helper improves authored record links but does **not yet** present the two page-pin paths independently in the Project's *Connections → Notes and work* summary. That is a specific next-slice opportunity, not a claimed completed fix.

## Validation

- Focused tests: **26/26 passed**, spanning Home and Project browsing, new header-warning removal guard, preserved source link identities/anchor labels, scoped Notes, owner rights and Project connections.
- `pnpm typecheck`: passed.
- `pnpm build`: passed (existing Vite externalization/size warnings; no build failure).
- `git diff --check`: clean.
- Full legacy suite was **not** run by default.

An additional older `educational-reading-ui.test.mjs` check was run during investigation and failed **4/7** on obsolete Project UI expectations (older Step buttons/overview wording), not on changed V142 paths. We did not change functioning Project UI to satisfy those stale assertions. This is reported explicitly; it must not be represented as a passing test.

## Live acceptance

After successful private deployment and a browser reload:

1. **Home (All subjects):** the Project, Library, Note and Question shelves rendered without synthetic/constructed-example chrome badges. Existing Radio Island, Japanese, creative, Library and independent Note content remained discoverable. Saved record titles still contain their authored labels, as explained above.
2. **Standalone Question:** opened `lab-question-framing-evidence-20261111` from Home; the formerly prominent shared page-top warning was absent. Its guide, question body, My work region and Saved editions remained present.
3. **Projects catalogue:** listed 23 current Projects in All learning, retaining Japanese Live, Cherwell, Radio Island and other long histories without repeated catalogue badges.
4. **Japanese Live Project r11:** opened successfully; the warning was absent, while six Project sections, furigana control, connections toggle and saved-edition control remained.

The subsequent browser attempt to expand the Japanese *Connections* panel timed out and reset the browser control session. **Do not claim live acceptance of that panel** from this run; source/test acceptance of the common link renderer was successful. The installed Lab MCP independently read the real Japanese Project relationship evidence, confirming the two distinct r10 page-pin paths as a remaining presentation case.

## PR #99 status and next substantial slice

V142 removes a conspicuous presentation intrusion and makes ordinary source links less ambiguous. It does **not** complete all relationship UX, nor does it represent production readiness.

The next larger Lab-first slice should:

1. Present multiple **inbound page-pin paths** under one Note/Project evidence item, with labels for the exact r10 section/part and a link that opens the historical target without collapsing distinct anchors.
2. Make cross-domain connections easy to revisit from Project, independent Note and Question screens without mandatory Work threads, manual progress administration, or noisy duplicate panels.
3. Check rights/scope, stale revisions, missing original editions and partial pagination with substantial author-authorised synthetic histories.
4. Verify desktop/mobile UX, drawing, images, game and language work in addition to computing.
5. Then continue owner-directed Lab iterations; source reconciliation and production integration are **deferred until the owner personally accepts the completed Lab**.

**Standing owner authority:** Substantial synthetic Lab Projects, Questions, Notes, Library material, annotations, flags and activity can be freely created or extended to perform adequate testing, provided provenance and uncertainty remain truthful. This is not a reason to clutter the UI with recurring “TEST ONLY” warnings. Public PR #99 is still not a byte-for-byte source mirror of the private deployed Lab; do not imply otherwise.
