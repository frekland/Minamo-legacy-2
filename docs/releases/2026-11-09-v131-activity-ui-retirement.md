# Minamo V131 — legacy Activity presentation retirement and contextual furigana

**Production:** https://minamo.jscymru.chatgpt.site/  
**Final native source:** `8f6852e807d66284c0a64e912ef6fc71097af3a7` (V131)  
**Sites version ID:** `appgprj_6ad8a4e85eb48191accd6e78976b47e3~appgver_e9a9f76238588191be51df9256d756de`  
**Deployment ID:** `appgdep_6af1cae064f08191ad4668ce875b8e8e` — succeeded 9 November 2026.  
**Intermediate V130 source:** `05c65c02afbd5f3240cf49476bd68d08e9be165f` (deployed; superseded by V131).

## Decision and boundaries

The native baseline already enforced Activity/Attempt retirement at the server: new Activity creation is rejected (410), submission/attempt/hint/publish/browse/capability routes are absent (404), and old Activity MCP tools are not exposed. B1 contributions, interactive Project artefacts and revision history remain independent. No database deletion or legacy migration was needed.

This increment removed the **user-facing dormant Activity Studio path**:

- Disconnected `LegacyActivityViewer` and its Activity-only reading disclosure from production Workspace; removed the server environment toggle controlling it.
- Left the useful `TypedOutputView` accessible for saved run output bundles without enabling Activity Studio.
- Renamed `Attempts & runs` to **Runs & output** in Your Work and distinguished archived learner writing from observed tool output when the historical fields are present. Removed an unnecessary achievement/mastery disclaimer and the obsolete “Open Activity” navigation label.
- Kept owner Notes, read-only older records, Project editing, B1 contributions, sidebar, six layouts, and the Python/Canvas/tldraw/parameter/game content paths.
- No new exercise, attempt, scoring, checkpoint or handoff workflow.

During live acceptance we found a separate contextual bug: the six-layout computing Project contains an isolated Japanese ruby demonstration in a later section. The global furigana control appeared throughout this computing Project, even after reload. V131 makes an explicitly computing-only Project override incidental Japanese sample parts, while preserving the control for Japanese-language Projects and unclassified Japanese reading material.

## Focused verification

- `node --test tests/japanese-context.test.mjs tests/activity-retirement.test.mjs tests/ux-personal-work-recovery.test.mjs`: **8 pass, 0 fail**.
- `pnpm typecheck`: pass.
- `pnpm build`: pass (existing Vite chunk/external-module warnings remain).
- `git diff --check`: pass.
- Native source was pushed to the existing Sites main branch; the saved V131 archive was built from that exact commit. No Site audience or binding change.

## Cloud Browser acceptance on production

- **Your Work:** opens on a fresh V130+ load and shows **Runs & output**, Notes, Annotations, Flags and Trash. No Activity/Attempt authoring UI. The filtered Runs & output view had no eligible records in this browser session, so rendering of an old run output bundle was verified by build/source and not by a live saved run.
- **Japanese Live:** Project breadcrumb **Projects > Japanese Live**, existing left nav, Notes dock, section/topic tabs, and editing affordances visible. Global furigana Show/Hide toggled; setting restored on. Language text retained ruby.
- **TEST — Simulation Playground (Six-Layout Walkthrough):** code section renders HTML source with Copy/Wrap controls. Existing separate **Your code variations 1** group expanded to show a saved learner variation and Edit control; canonical code remained intact.
- **Contextual fix:** before V131 the simulation displayed Hide furigana even on a fresh reload. On V131 reloading the simulation showed **no furigana control**; opening Japanese Live showed it again.
- A pre-V130 page initially failed to load an old dynamic Your Work JS chunk while the deployment was changing; a full refresh after V130 completed loaded the new UI. No persistent failure reproduced.

## Outstanding and next increment

1. **Content-first Project polish:** desktop reading still repeats section names and active topic/part headings; some authored “how to use these six views” and “not an achievement report” prose is product chrome embedded in content. Reduce those repeated surfaces (including on mobile) without hiding real reading titles or editing controls. This was observed but not altered in this narrow retirement release.
2. **read_project_changes:** already callable through the installed MCP. A read of `japanese-live-20261105` returned real revisions (current rev 2). Next small improvement should put this exact revision diff contract to work in natural GPT continuity and validate changes after edits, rather than add a duplicate API.
3. **Activity/Attempt final cleanup:** remove unused preview/legacy source components and dormant test fixtures after inventorying references; retain read-only old evidence where valuable. No broad migration ceremony or new attempt lifecycle.
4. **Run output acceptance:** find a safely reusable existing owner run with an output bundle (or create a focused synthetic one) and browser-check `TypedOutputView`. Test compact mobile reading chrome on a narrow viewport. No evidence of a production break was found; these are unverified.
5. Embedded Japanese in a computing-only Project intentionally does not promote the workspace-wide toggle. If a future mixed-language Project needs section-sensitive furigana, derive it from the active section rather than all Project parts.

Private native source is authoritative; this public PR is an implementation/evidence handoff and deliberately does not pretend to contain private Sites source.
