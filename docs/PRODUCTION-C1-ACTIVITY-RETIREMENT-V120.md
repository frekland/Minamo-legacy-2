# Minamo production C1 — Activity/Attempt retirement (V120)

**Status:** implemented and deployed to the existing production Site on 9 November 2026. This pull request is a **public, documentation-only handoff**; the protected native Sites repository contains the deployable source and retained private assets. Do not deploy this public branch.

## Release evidence

- Site: https://minamo.jscymru.chatgpt.site/
- Starting point: V118, native source `f480efe0f179697f7a91695f306dbf57494986c0`.
- Initial retirement deployment: **V119**, source `b3bc5ba72cf300ac4e4c88980b68727e9468fce1`, saved version `appgprj_6ad8a4e85eb48191accd6e78976b47e3~appgver_b96b4c455f5481918713af0fadfd10f6`. Live inspection found excessive repeated archived prompts.
- Accepted iteration: **V120**, source `a65f85defeaef8bfefd9fbc890260813dc7cce29`, saved version `appgprj_6ad8a4e85eb48191accd6e78976b47e3~appgver_90f6c5b75f108191a25ad1e99c8c97df`, deployment `appgdep_6af1a466d2dc8191a9243fa0477557fa` **succeeded**.
- Audience retained: custom owner plus one existing external viewer; no access policy, D1/R2/MCP bindings or existing Site identity changed.
- V118 remains an immutable rollback point.

## Native source change manifest

1. `app/workspace.tsx`: remove Practice & review from the primary sidebar and replace the legacy Activity Studio form with a retained-reference viewer. Keep Home, Projects, Library, Your work, Practical tools, Trash, persistent Notes and all six Project layouts.
2. `app/learning-home.tsx`: replace the Practice chooser with links to Projects, Library and existing work/Notes. No new top-level creation UI or alternate shell.
3. `app/page.tsx`: old `?view=practice` bookmarks resolve to Library or, when a specific retained experiment/run is targeted, its preserved material.
4. `app/legacy-activity-viewer.tsx` (new) and `app/activity-studio.css`: display old cartridges as source/reference. Keep authored instructions, source ZIP browsing, source-bound audio and trusted visual artefacts where present. Historical practice prompts are **one collapsed list**; no attempt submission, grading or feedback lifecycle is mounted.
5. `lib/domain-handler.ts` and `lib/domain-routes.ts`: retire the seven Activity MCP tools and their corresponding legacy authoring, catalogue, context, reveal, and Attempt HTTP endpoints. Retain only owner-authorised `/api/activities/read` (GET/POST) and `/api/activities/project` (GET) to support archived source validation and download. This prevents obsolete UI code calling an unguarded write path.
6. `lib/domain.ts`: reject any generic create/update payload containing a new `activity` or `attempt` (`410 activity_attempt_retired`). Historical records and immutable renditions remain in D1; no destructive schema migration. Remove now-unused guards from this retired write path, retaining projection/right checks for reads.
7. `tests/activity-retirement.test.mjs` (new): verify old routes disappear, MCP catalogue omits all seven legacy tools, generic Activity creation is rejected, and a new ordinary B1 Project contribution still saves.

## Focused verification

- `pnpm typecheck` — PASS.
- `node --test tests/activity-retirement.test.mjs tests/project-contributions.test.mjs tests/worker-domain-routes.test.mjs` — **5/5 PASS** (including B1 revision/CAS/idempotency/owner isolation and Worker route contract).
- `pnpm build` — PASS (pre-existing Piper browser-polyfill and chunk-size warnings; no new build failure).
- Full legacy test suite and extensive historical browser corpus **not run**, in keeping with the owner’s fast release policy.

### Live Cloud Browser

- V120 sidebar: Home, Projects, Library, Your work; Practical tools and Trash retained; Notes dock present. Practice & review absent.
- Retained Japanese Activity: exact source remains accessible, with collapsed instructions, eleven archived prompts and reflection disclosure; prompts expand on click. No Save Attempt, automatic grade or submission interface.
- Old `?view=practice` bookmark displays Library rather than a broken former practice screen.
- Computing six-layout Project: section navigation and authored HTML/JS code intact; collapsed **Your code variations (1)** expands to the independently saved learner variation (speed 8), leaving original authored speed 3 unchanged.
- This browser campaign checked display/readback, **not actual TTS sound**, full tldraw/Pygbag execution or mobile viewport; those are separate areas.

## Retained dependencies and limits

- Historical `experiment`, `run`, `activity` and `attempt` rows/editions are deliberately retained for source/rights/recovery integrity. There has been **no destructive purge**.
- Older internal Activity Studio, practice modules and synthetic preview routes remain in source for residual developer/retained-reading dependencies, but are no longer the production learner workflow. A later isolated cleanup can remove them once no retained reference or preview depends on them; avoid turning C1 into a schema purge.
- The archived source viewer provides source/visual/audio read access, but legacy guided character/scenario exercises are no longer authorable/submittable. Those teaching activities can be recast into ordinary native Project blocks only if specifically useful.
- Installed personal ChatGPT MCP plugin catalogues may retain stale Activity descriptors until refreshed. Server calls to retired tools are rejected after V120; existing B1 `read_project_contributions` and `review_project_contribution` contracts remain unchanged. A refresh is optional for catalogue hygiene, not required for fresh-chat B1 reads.

## Recommended next phase

**C2: selective interactive artefact parity**, not another whole-app migration: address Python Canvas first-run blankness, then Pygbag package/STOP feedback and reusable saved observations by comparing accepted lab behaviour with the production native implementation. Use one real computing Project and one Japanese Project for focused Cloud Browser checks. Keep A6/B2 work threads, replacement shells and Activity/Attempt submission workflows out of scope.

`read_project_changes` is an independent possible MCP convenience. Given the owner’s consistent successful fresh-chat MCP readback, defer it unless an actual missing-change/revision scenario proves value.
