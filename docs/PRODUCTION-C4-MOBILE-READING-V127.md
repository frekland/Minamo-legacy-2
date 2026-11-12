# Production C4 — content-first mobile Project reading (V127 → V128)

Date: 9 November 2026. This is an implementation and release handoff, not a migration proposal.

## Source and publication

- Existing Minamo production Site: https://minamo.jscymru.chatgpt.site/
- Final protected Sites native source commit: `10c02d0ddd6a54d9d2e3155238929362157d3867` (V128); initial layout commit: `86ae48ecb4b860596cb92952e30bcade1972a4d0` (V127).
- Previous deployed baseline: V126 / `de233e06e823dee58108e131717d9501690b5bf1`
- Final saved Sites version: **V128**, `appgprj_6ad8a4e85eb48191accd6e78976b47e3~appgver_a74e3d17803481918a43a351a2f9b06b`.
- Final production deployment: `appgdep_6af1bbe8fed08191a2f399d7fb1984fa`, **succeeded**; MCP advertised. V127 was also published successfully as the intermediate acceptance pass.
- This public PR is documentation only. The protected Site was directly implemented, pushed, saved and deployed through Sites; merging this PR does **not** deploy it.

## What changed

1. **Contextual breadcrumb.** A Project detail now reads `Projects › [Project title]`, with Projects navigating to the collection. Library article breadcrumbs continue to display Library context. Home and collection/index views omit the pointless `Workspace › Projects` breadcrumb. Breadcrumbs identify the current record and truncate safely.
2. **Compact phone-sized Project header.** Project title remains accessible and editable, while the lengthy description is available under an ordinary `About this Project` disclosure. Desktop retains visible descriptions.
3. **Native mobile section navigation.** The horizontal numbered section rail and redundant layout kicker/heading become one accessible Project-section selector with previous/next and edit controls. Topic tabs stay one row beneath it, with the substantive Reader following directly. Desktop section rail, six native patterns and canonical identities remain intact.
4. **Content spacing.** Reduced mobile topic padding, removed the oversized inherited Reader-header margin and moved the existing server-backed Favourite control from its solitary content row into the mobile section toolbar in V128. No new shell, Project creator, session/attempt lifecycle or handoff.
5. **Furigana.** C3's top-navigation global furigana control remains visible in Japanese material, hidden on Home, and its saved preference remained effective after navigating back. No new speech engine introduced.

## Focused verification

- `pnpm typecheck` — PASS.
- `node --test tests/project-reading-topics.test.mjs tests/ux-navigation.test.mjs tests/japanese-furigana.test.mjs` — **6/6 PASS**.
- `pnpm build` — PASS (existing non-fatal Vite/Piper dependency warnings; no new type/build failure).
- `git diff --check` — PASS.
- Live Cloud Browser at narrow CSS viewport produced through Chrome zoom:
  - The Project breadcrumb read `Projects › [Project name]`.
  - A mobile `Project section` select offered real native sections.
  - Next section changed the selected section and Reader material, without losing the topic navigation.
  - The top-nav furigana checkbox toggled from `Hide furigana` to `Show furigana`, and Japanese ruby output changed.
  - `About this Project` expanded and collapsed, preserving the content.
  - V128 put the accessible `Add to Favourites` control alongside the section selector, next/previous and edit actions; the solitary diamond row vanished and the first paragraph moved upward.
  - The original mobile sidebar opened and Home navigation worked.
  - Home showed no breadcrumb and no Japanese-only furigana control.
  - Desktop initially displayed its conventional left sidebar and section rail; desktop reader content and Japanese speech controls remained present.
- Separate post-refresh production MCP verification in the same development turn: `read_project_changes` returned exact revisions 11–8 and next-page 7–5, with paging cursors and stable section/part change IDs. This verifies registration and readback, not a new write/review transaction.

## Remaining polish / honest limits

- The Favourite control was moved into the toolbar in V128. Its underlying server-state mutation was not repeated in C4; test the state transition when next doing bookmark-focused acceptance.
- Mobile verification used a narrow browser CSS viewport (zoom), not a physical Android handset. Actual device browser toolbar/soft-keyboard and audible Piper playback were not re-tested in C4.
- Synthetic language Project used for interaction checks. Valuable learner content was not edited or migrated during this pass.
- Readback via the installed MCP is known reliable; repeating a fresh-chat readback acceptance campaign is unnecessary unless the MCP contract changes.

## Next integration

Continue A5/B1 learner experience polishing and contribution usability in a compact Project reader, then integrate `read_project_changes` into GPT-led continuity as needed. Separately retire obsolete Activity/Attempt UI and dependencies after mapping current consumers; do not make contributions depend on attempts. Preserve direct editing, actual revisions, server-backed contributions, six native layouts, Notes and sidebar. No A6/B2 work-thread UI or whole-app redesign in this release.
