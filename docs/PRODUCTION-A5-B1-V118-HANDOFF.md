# Production Minamo A5/B1 — V118 implementation and acceptance (9 November 2026)

> **Status:** Implemented and deployed to the existing production Site. **Native Sites source is authoritative for this release.** This public GitHub PR is a source-linked handoff and does not itself contain or redeploy the protected native source. Do not mistake it for a code-port PR or merge it in lieu of native source synchronization.

## Exact release identity

- Site: https://minamo.jscymru.chatgpt.site/
- Site project: `appgprj_6ad8a4e85eb48191accd6e78976b47e3`
- **Deployed production V118:** `appgprj_6ad8a4e85eb48191accd6e78976b47e3~appgver_abaf90d606c881919c369a43bf833081`
- **Exact pushed native source:** `f480efe0f179697f7a91695f306dbf57494986c0`
- Deployment: `appgdep_6af19db9e1e08191bcff9b49ac2d9486` — **succeeded**, MCP present.
- V117 integration checkpoint: `77e6f728ce0803d11ec896e4c18c46a4c49c4e68` (saved and successfully deployed before V118 polish).
- Baseline: V116 native `fc93ce4bbcffa4298097b8c7fe50fae75555d072` (subsequent native HEAD contained release-doc updates, no app changes).
- Private Lab source examined: A5 `30bdcd57b037bcf54433caa17f530d7d7a64e9fb`, B1 V73 `67cd94129ad2d0cab168de9831fa8484694c940a`.
- Sources/context: PR #90 (Lab evidence, not its source), PR #83 (native composition), PR #85 (Japanese/Piper), PR #89 (native/public divergence).

The existing custom Site audience, owner data, D1/R2 resources, MCP capability and canonical Project records were retained. No replacement shell, learning-attempt system or bulk backfill was introduced.

## Implemented

### Focused A5-style native Project reading

- `app/project-reading.tsx`, `lib/project-reading-topics.ts`, `app/project-reading.css`: a compact Project-local layout list nested **inside** the existing left navigation. One native section/topic at a time, with keyboard-accessible section/topic tabs and previous/next navigation, readable widths and reduced duplicate headings.
- Real composition layout/slot/block/section/part identities are the only basis for navigation; hidden blocks are skipped. Exceptional long sections split by stable part IDs. No TEST-specific Japanese grouping or A6/B2 history rails.
- `app/reader.tsx`, `app/project-sections.tsx`: canonical Reader retained, now capable of showing the selected real section/parts and contextual after-part UI. Existing editing mode, references, bookmarks, source selections, Notes, flashcards, dialogue, code and native interactive components remain in place.
- V118 polish uses authored section titles rather than paragraphs as tab names; code additions are labelled **Add code variation**.

### Japanese furigana and speech

- `app/semantic-reading.tsx`: compact furigana switch and inline pronunciation for suitable Japanese ruby examples.
- `app/project-speech.tsx`: reuses the production Piper/Piper Plus local synthesis path, with concise Play/Replay, turtle Slow toggle, Stop, loading/error status and accessible control names. No new TTS engine.
- Existing language-reveal, dialogue and flashcard views continue using the same speech component; no voice-picker chrome was added.

### B1 learner contributions, separated from authored content

- `lib/project-contributions.ts`: adapted B1's production-grade owner-scoped D1 protocol. `readProjectContributions` and `applyProjectContribution` validate an exact Project/section/part, preserve independent learner entry identities and revision snapshots, enforce Project/entry CAS and generation fencing, and record per-operation receipts for safe exact replay. GPT review attaches only to the exact learner revision; a learner edit increments revision and clears that review. No automated grading, mastery or exercise attempt.
- `lib/domain-handler.ts`, `lib/domain-routes.ts`: live authenticated HTTP `GET/POST /api/projects/contributions`; MCP `read_project_contributions` and `review_project_contribution` declared and dispatched. The latter is restricted to explicit GPT provisional review, with result + explanation.
- `app/project-contributions.tsx`, CSS: collapsed contextual **Your examples**, **Your responses**, **Your code variations** and **Your observations**; server-backed save/edit/remove, no localStorage persistence; provisional review explanation appears only when its stored revision matches.
- `db/schema.ts`, `drizzle/0016_violet_lifeguard.sql` + metadata: additive `v2_project_contributions`, `v2_project_contribution_revisions`, `v2_project_contribution_operations`. Hosted D1 overview after V117 confirmed all three tables exist. No Activity/Attempt dependency.
- Contexts: grammar tables, ruby language examples, language dialogues, code, Python Canvas/parameter-explorer/Pygbag observations (where the part kind permits). Learner contributions do not silently rewrite a canonical Project part; an explicit GPT/user-directed canonical update remains a separate operation.

## Verification

Focused local tests: `node --test tests/project-contributions.test.mjs tests/project-reading-topics.test.mjs` — **4 passed, 0 failed**. Covers owner isolation, exact-target validation, canonical separation, D1 persistence, MCP JSON-RPC read/review, provisional review invalidation after edit, stale revision rejection, idempotent replay, retained history snapshots, native topic grouping, hidden-block exclusion and long-block stability. `pnpm typecheck` **passed**. `pnpm build` **passed** (existing Piper bundler compatibility/chunk-size warnings, no build failure). Full legacy suite deliberately not run.

Cloud Browser on **actual production**:
- Japanese Live: left navigation, Notes dock, six layout tabs, realistic content, concise grammar topics after V118, ruby on/off switching and translations all rendered. Flashcards flipped to reveal English answer. Dialogue's native turn-reveal controls remain available.
- TEST Japanese directions: saved synthetic learner response under exact dialogue, edited from rev1→rev2, reloaded, reopened its collapsed group, confirmed rev2 Japanese and translation. Original canonical dialogue unchanged.
- Japanese Piper Plus: Slow toggle turned on; synthesis progressed `Preparing local speech` → `Loading Japanese voice model` → **Replay-ready**. Browser tool cannot independently hear sound from the user's device, so this is synthesis/control state, not verified audible quality.
- TEST Simulation Playground: original authored HTML code remained `speed: 3`; separately saved a `speed: 8` code variation + prediction under its exact code part, reloaded and read back entry rev1. Editing mode opened with existing Project content, then Cancel returned to reading without modification.
- Six layout tabs remain present. Deep execution of Python Canvas, tldraw, Pygbag and responsive phone hardware was **not** repeated as part of this bounded acceptance; their native components were retained.

**Installed ChatGPT MCP status:** **PASS after owner plugin reinstall (9 November 2026).** The refreshed production plugin exposes both new B1 tools. A real installed-plugin read/review, exact idempotent replay, browser edit, stale review rejection, post-edit MCP readback and reload were exercised. This is a same-conversation, cross-interface test; a literally fresh ChatGPT conversation remains an independent follow-up.

## Installed-MCP D1 ↔ browser acceptance after plugin refresh

- `read_project_contributions` independently retrieved the saved synthetic Japanese dialogue response at exact `dialogue/turns`, learner revision **2**, Project revision **1**, and the computing `test-code/tc-html` code variation at entry revision **1**, Project revision **7**. It did not infer data from the preceding browser UI.
- `get_project_composition` confirmed the canonical original Japanese dialogue remained at Project revision **1**, with exact authored turns, while the learner addition lived separately in B1 storage.
- Explicit `review_project_contribution`, operation `v118-ja-dialogue-review-20261109`, used expectedGeneration `legacy@0`, expectedProjectRev `1`, expectedRevision `2`. It committed **entry revision 3** and a `suggestion` with a specific alternative `二つ目の角で右に曲がってください`; marked `gpt-provisional` and `reviewedContributionRevision:2`. This was textual feedback, not a pronunciation assessment.
- Repeating the exact operation returned `replayed:true` and the same revision 3, without another write. The live Project visibly showed the suggestion when expanded.
- A browser edit changed the learner text to `この道をまっすぐ進んで、二つ目の角で右に曲がってください。` and saved **revision 4**. The feedback button disappeared. MCP then read revision 4 with `review:null` and unchanged canonical Project revision 1.
- An attempted new review against stale expectedRevision 3 was **rejected** with `revision_conflict`; no revision or review was added. Replaying the original operation after that edit still returned a historical replay receipt, **without resurrecting feedback**. Final MCP read and browser reload confirmed revision 4, `review:null`.
- Scope limit: this proves installed production MCP/tool continuity with the browser in this chat; it does not establish a new, memory-independent ChatGPT conversation's comprehension, which should be tested separately when desired.

## Follow-up boundaries

1. **Next small independent change: `read_project_changes`.** Lab `lib/project-service.ts` + `lib/domain-handler.ts` already implement a bounded retained-revision diff (exact part IDs, composition changes, timestamps, cursor). Port its read-only contract to current native Project revisions without A6 history UI or work threads. It would improve fresh-chat reconstruction of actual Project evolution.
2. **Activity/Attempt retirement** should be a separate focused cleanup, not an A5/B1 dependency. Inventory: `app/practice-panel.tsx`, `lib/activity/{domain,mcp}.ts`, `lib/domain-handler.ts` tool/route registry, `lib/learning-work.ts`, `lib/bookmarks.ts`, `lib/recovery.ts`, `lib/trash-purge.ts`, `lib/authoring-package.ts`, `lib/project-service.ts`, and legacy tests reference activity/attempt data. Distinguish old attempt submission/achievement UI from **useful interactive artefacts** (code, games, simulations) and keep the latter. Remove the abandoned lifecycle and UI after an exact dependency pass; no blanket protection of obsolete workflows.
3. UI polish: display Project-local topic positioning on reload if desirable; tune the small bookmark diamond; cover larger table/contribution overflow, mobile viewport and audio on physical devices when convenient.
4. Do not import A6 rails, B2 thread views, V91–V95 shell, another creation surface or attempt flow.

## Source ownership and reversal

Protected native source is the source of the V118 Site. The production V117 and V116 saved versions remain available as known recovery points; a rollback would be a deliberate Sites deployment to a saved prior version (D1 additive tables can remain harmless). Public GitHub is not byte-identical to the native source. Future source reconciliation should consciously port reviewed native changes; this document must never be used as a substitute for the private implementation itself.
