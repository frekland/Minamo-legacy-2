# PR #99 — Making Friends acceptance analysis and model-efficient Lab → production migration plan

_Date: 12 November 2026_  
_Decision: owner agrees with a scripted, low-model-usage eventual production transfer. This is **planning authority only**; no production migration or private-source reconciliation has yet occurred._  
_Baseline in current PR: private Visual Lab V165; production V149; PR draft/unmerged. Confirm current source/deployment again at execution._

## 1. Browser inspection: Terra's report has arrived

**Independent browser report:** [PR #99 comment 6822089862](https://github.com/frekland/Minamo/pull/99#issuecomment-6822089862), 12 November 2026. This followed the limited [Chrome page-text inspection](https://github.com/frekland/Minamo/pull/99#issuecomment-6821877593).

**Examined:** real Lab Project `journey:making-friends-japanese-20261112`, **revision 1** / rendition `r-546ec1acfde6c2ec4564795a983e1265f3611a857b3a313249d62d79cfe0abad`; Chrome extension, **2560 × 1271 CSS px** at DPR **1.5**, dark mode, furigana already enabled. Terra reviewed all six sections, took and visually inspected live screenshots, and exercised selected UI controls. **Screenshots were not attached to the PR and are not independently retrievable from that report.** This is a detailed observed account, not independently revalidated imagery or full mobile/accessibility acceptance. No writes or settings changes during inspection.

### 1.1 What actually passed

- All **six section selections** displayed the matching content and selected rail state; the single visible rail and bottom Previous/Next mean the earlier text-only suspicion of visually duplicated section navigation **was not confirmed**. Do not simplify the navigation based solely on duplicate accessibility-tree entries.
- First dialogue translation reveal passed; one next-turn reveal passed (counter 1/8 → 2/8).
- First flashcard flip and next-card advance passed; optional-card-action disclosure passed (individual shuffle/reverse/reset not exercised).
- Language-pattern dropdown change to `聞いたり` + `話したり` updated Japanese and English correctly for that combination.
- Home → reopen showed Making Friends as recently opened, opened section 1, and offered a truthful last-opened hint to Practice. The actual resume control was not tested.
- Initial view, tables, content and small Notes strip were usable in the sampled wide-desktop case; the Notes strip did **not** visibly cover reading content in those views. No Note was edited or created.

### 1.2 Confirmed or strongly evidenced defects / UX weaknesses

**P0/P1 — Japanese reading accuracy, not just typography.**
- Furigana assigned **あさ** over 朝 within **今朝（けさ）**: this breaks the reading of the whole word. The grammar text itself explains the correct word reading, yet the automatic annotation contradicts it.
- **何時（なんじ）** was presented with **なに** over 何. An incorrect contextual reading is worse than no furigana; it actively teaches misinformation.
- Generated furigana duplicates authored inline `（にほんご）` readings and some kanji remain unannotated. Treat conflicting or low-confidence auto readings as a language-quality risk. Prioritise contextual token/word readings or conservative suppression, explicit user-authored readings precedence, and regression tests for words in the real Project. Keep global furigana control. This should be accepted *before* a production promotion of the newer language presentation.

**P1 — literal Markdown markup in reading sections.**
- Saved grammar and nurse parts contain `**...` emphasis syntax, which the browser showed as literal double asterisks instead of formatted emphasis. Check authoring content semantics, rich-paragraph normalization and the actual renderer; don't assume arbitrary Markdown is supported in every `paragraph.text` location. Fix parser/authoring contract or make a clear structured-text alternative. Test mixed Japanese, furigana and emphasis safely (no injected HTML).

**P1 — GPT's internal evidence caution overwhelms natural learner content.**
- Opening section leads with ~483 characters of GPT-written provenance caveats before the actual received Japanese; repeats an evidence ledger/table below. The reply opens with a separate long accuracy disclaimer. Practice sections repeatedly say hypothetical content is not learner-performance evidence.
- These statements preserve valid uncertainty but produce an acceptance dossier rather than a useful conversational Japanese Project. The **authoring choice** caused most of the noise, not a demonstrated renderer malfunction.
- Keep *actual received message*, *user-reported reply*, *prepared draft text*, *GPT-authored explanation* and *hypothetical dialogue* distinct in machine-readable provenance/attribution and optional inspectable details. Show natural labels such as “Message received” / “Practice conversation”, and keep important qualifications available on demand without repeating them in primary prose. Never infer further messages, performance or achievements.

**P2 — reading hierarchy and comparison friction.**
- Entire six-paragraph Japanese reply appears before the entire English translation; side-by-side learning requires large vertical scrolling. Consider optional paired line/paragraph translations, reveal/disclose translations or return-to-paragraph anchors, keeping the original complete message faithfully accessible.
- Grammar consists of nine long paragraphs followed by a useful six-row summary; the concise pattern overview is buried at the bottom. Preserve depth while improving progressive disclosure and paragraph/heading structure.
- Wide desktop uses a relatively narrow centred reading column with expansive margins. This can aid readability, so measure user tasks and suitable maximum width before widening indiscriminately. Table formats and the focused nurse section worked comparatively well.
- Avoid repeating disclaimer prose on future practice. Reevaluate “Add example” in authentic-message sections; not clicked, so no functionality conclusion.

**P2 / unverified.**
- Dialogue Japanese play entered “Loading Japanese voice model…”; completion and actual audible output were not established, and neither slow playback nor audio quality was verified. **Do not call TTS broken or passed.**
- No mobile, assistive-tech, full keyboard, global furigana toggle, whole eight-turn dialogue, reset or notes-write acceptance. One potentially surprising scroll position on a section change was observed once; reproduce before treating as defect.

### 1.3 New conclusion for GPT presentation awareness

Current `get_project_composition` did correctly report six sections, 31 parts, one block per section, language-dialogue (8 turns), flashcards (15), pattern examples (4), and exact revision. That model **cannot** tell GPT that:
- raw Markdown `**` is visible;
- furigana is contextually incorrect or duplicated;
- correspondence and translation are separated by excessive scrolling;
- user-visible disclaimers dominate the opening;
- audio remains in a loading state;
- actual viewport density is materially different from structural hierarchy.

Therefore the stronger evidence-backed need is **feedback from the real frontend renderer and controlled interactions**, not more complex record authoring alone. At the same time, some problems (repetitive disclaimers, order of grammar overview) can be prevented through improved authoring guidance **before** a new screenshot tool exists.

#### Proposed investigation/development sequence, not yet approved as an implementation contract

A. **Fix the immediately observed correctness and rendering defects** with focused tests: word-level furigana for 今朝 and 何時, precedence over authored readings, Markdown rich text compatibility, and representative UI acceptance. 
B. **Improve Project authoring semantics/presentation**: intended role of content (primary correspondence, translation, practice, deep reference), optional compact first view, source type/provenance stored without visible audit prose, direct links to exact parts; do not create Notes or mandatory Work threads.
C. **Presentation-aware feedback loop**: evaluate whether the existing browser/Cloud Browser/Sites infrastructure can expose actual frontend screenshot, accessibility/control tree, viewport, hidden/visible state, exact section/part identities and revision; propose the *smallest* safe MCP API gap rather than a parallel renderer. Optional pre-commit preview for substantial new work, selective post-save inspection, bounded targeted refinements with CAS, verified readback. Define payload limits, failure modes, rights, privacy and cache invalidation. No forced visual loop for every trivial edit.
D. **Cross-domain acceptance**: run the same feedback loop on Japanese (Making Friends), computing (Radio Island/Python Canvas) and noncomputing (framing/Cherwell). Do not implement a Japanese-only content schema or infer learner progress from mere activity.

**Important:** Terra was commissioned for evidence collection, not technical design. The above is this conversation's preliminary analysis **of the report**, not a claim Terra recommended the solution. Detailed implementation planning may be refined with the owner separately.

## 2. Owner-approved direction: minimise model usage in Lab → production transfer

The owner would like to consolidate working Lab improvements into production, and agrees to do so primarily through **ordinary source control, scripted migration and deterministic tests**, using GPT only for actual judgement/conflicts. This changes *future integration planning* from blanket deferral to an agreed direction; it **does not authorise a deployment, data overwrite or production content mutation now**.

The state recorded in PR #99 is:
- Production **V149**, working tldraw licence, saved personal Projects/Library/media/Notes that must not be discarded.
- Private Visual Lab **V165**, source commit `f0c314a0004ff1c42101431134a8d2d19117870e`, new frontend/continuity/MCP features plus extensive synthetic and a genuine Japanese Project.
- **Public GitHub PR branch is a documentation/evidence trail, not a reproducible checkout of the deployed private Lab.** Consolidate the actual private Lab source and production source first. Do not treat a public PR merge as equivalent to deploying the Lab.
- The latest branch/deployments must be re-verified when execution starts; don't assume snapshots remain current.
- Owner previously deferred public/private source reconciliation while Lab development continued; owner **now agrees it belongs in the planned integration phase**, after the agreed remaining development/acceptance. It is not an urgent next tool call.

### 2.1 Phase boundaries and script-first method

**Phase 0: choose accepted baseline and freeze the target for migration planning.**
- Finish/decide the PR #99 MCP authoring-role enforcement and inspect Making Friends findings; fix correctness-critical furigana/rendering issues before promoting.
- Establish an explicit owner-selected cutoff/commit of accepted Lab functionality; stop mutating the source baseline *during* reconciliation. No production changes.
- Record a concise one-page manifest: source SHAs, deployment versions, runtime/MCP contract, environment variables/secrets by name only (no values), schema identifiers, known asymmetries and outstanding acceptance.
- Keep genuine unresolved game interaction, mobile and recovery concerns visible; risk acceptance must be explicit if still open at cutover.

**Phase 1: code and configuration consolidation.**
- Make local checkouts of actual production and actual private deployed Lab source available in one controlled workspace. Verify source identity by SHA/clean status; distinguish the public PR documentation from private code.
- Use `git diff`, `git merge-base`, file manifests/size/hashes, generated schema diffs, dependency lockfile diff and changed test inventory rather than asking GPT to read entire source trees.
- Incorporate accepted Lab code and production-only integration (especially tldraw licence/config) into **one version-controlled source** with environment-specific configurations. Never hard-code or copy secret licence keys into public GitHub.
- Audit MCP tool/schema compatibility, auth/session/rights, remote storage and deployment config. Build once per target using reproducible toolchain.
- Have GPT examine **only** merge conflicts, incompatible contracts or failing focused tests; make decisions explicit in a short change log. Avoid “re-implement V150–V165 from summaries”.

**Phase 2: separate data inventory, selection and transfer.**
- Inventory *production* and *Lab* owners/records, revisions/renditions, link edges, source excerpts, assets/images/drawings/games, backup generation and storage scopes via authenticated **scriptable export/manifests**. Determine whether first-party export/import exists before building a new tool; do not assume access to raw backend.
- Preserve production records by default. Use an explicit content selection manifest for real Lab content (e.g. Making Friends) and any useful examples. Do **not** indiscriminately import all synthetic acceptance artefacts and mock histories; also do not delete useful original examples by default.
- Transfer via an idempotent, batch-oriented routine with a preflight/dry-run and stable mapping between `family:id`, owner, exact revision/rendition, relationship endpoints, external source consent and asset digests. Preserve **old cited editions** as old editions, not by silently retargeting them to current.
- For ID collisions choose documented merge/remap/skip policy, rather than overwriting production by title. Verify binaries by digest/dimensions/MIME; include retained media/drawing snapshots and relevant licensing constraints.
- Content is *not* version-controllable source code; avoid relying on an app deployment to automatically copy user data.
- Respect access/consent: private Japanese WhatsApp material should remain within the owner's intended private workspace, not be published or imported into an inappropriate account.
- If the Sites storage architecture cannot safely export/import this dataset, scope a minimal safe migration mechanism or preserve Lab content until that exists. Don't fall back to thousands of GPT MCP calls.

**Phase 3: non-production rehearsal and deterministic checks.**
- Back up production state and export a verifiable manifest. Restore/copy to an isolated staging environment only when the actual storage/security setup supports it.
- Run static/typecheck/build, focused and full applicable automated tests, content counts/digests, relation endpoint integrity, retained edition reads, auth permission tests, safe negative cases and any schema migration tests.
- Execute the scripted content import twice *in staging* and confirm second run is no-op; validate failure/resume semantics, duplicate prevention, and ability to revert/restore.
- Run a concise **cross-domain browser smoke pack**: Home/Projects/Your Work/Library, Making Friends furigana/Markdown/interactivity, a computing Canvas/game, Questions/Connections, Notes learner edit, settings permissions and production tldraw. Flag known unverified cases rather than falsely marking all green.
- Store evidence in short machine-readable results and failure summaries. Have GPT inspect failing cases and a few representative visual checkpoints, not every passing test log.

**Phase 4: reviewed cutover.**
- Present **one concise go/no-go report**: accepted source SHA, dry-run counts/diffs, selected data, integrity checks, open risks, backup/rollback procedure, release version.
- Production code/data changes require a **fresh, explicit owner instruction at cutover**. Do not implicitly deploy from this planning note.
- Recheck and back up production immediately before change; plan atomic/transactional or resumable data migration, freeze writes only if technically required and owner-authorised. Deploy one coordinated release, verify MCP contract and smoke tests, and follow the tested rollback if necessary.
- Do not claim reverting code alone rolls back data/schema mutations; backups and restore rights must be proven.

**Phase 5: one source, two environments going forward.**
- Make one repository/baseline authoritative for application code. Use Lab/staging and production configurations/secrets/deploy targets; avoid parallel manual implementation and version drift. Keep data physically/logically separate by environment.
- Promote accepted feature changes using reproducible builds, scripted schema changes and a smaller smoke suite. Preserve active Lab as a playground, including synthetic content when desired, without accidental production synchronisation.

### 2.2 How to reduce consumption of GPT/Work model calls

| Use deterministic scripts/CI/normal tools | Reserve model reasoning for |
| --- | --- |
| Source checkout and SHA manifests; `git diff`, merge and copy of unchanged files | Real merge conflicts and platform-specific breakage |
| Schema/config/dependency diff and compatibility checks | Deciding intentional behaviour changes |
| Batch export/import, ID remapping and content checksums | Ambiguous duplicate/ownership/provenance cases |
| Automated unit/integration/e2e checks, typecheck/build | Root-cause analysis of failures |
| Reproducible test reports and concise deltas | Selected browser visual/interaction acceptance |
| Idempotency/dry-run checks and logs | One bounded cutover decision |

**Operational discipline:** one bounded implementation commission per major phase; supply exact SHAs, repo paths, manifests and check outputs as reusable inputs; summarise only failures, decisions and verification evidence. Avoid dozens of fresh conversations repeatedly rediscovering architecture. A coding tool can perform thousands of filesystem/test operations within one workflow; the cost is not literally zero, and no specific account usage savings or model-call count is guaranteed.

### 2.3 Preflight risk register

1. **Highest:** public/docs-only PR versus deployed private Lab source; no verified common source ancestry. Must obtain exact source checkout, not recreate code from conversation memory.
2. **High:** potential data schema, owner authority and retained-edition differences between V149 and V165; batch import may require careful IDs/renditions and asset handling.
3. **High:** contextual furigana misinformation, literal Markdown and provenance-heavy pages confirmed in Making Friends; do not blindly transfer UX defects.
4. **High:** backup/rollback of mutable data, auth and settings; a Git revert alone isn't sufficient.
5. **Medium:** tldraw licence exists in production only; preserve proper configuration, do not require or expose the licence in Lab.
6. **Medium:** packaged-game interaction post-first-paint and real mobile/TTS acceptance incomplete.
7. **Medium:** synthetic Lab records should not swamp production's genuine Projects. Select data intentionally.
8. **Medium:** unknown support for deterministic Sites bulk export/import. Investigate capabilities before writing a migration script.

## 3. Dependencies, priorities and acceptance ownership

**Now:** the agreed MCP authoring-boundaries/usability plan stays a priority; inspect Terra's report and plan presentation improvements. Only this documentation update is performed.

**Before migration:** implement/accept selected fixes (especially accuracy issues), identify actual private source and production baseline, verify scripted data portability/backup, and accept a bounded set of realistic cross-domain tests. Owner decides what “everything” includes (all accepted functionality versus optional Lab content) using a clear manifest.

**At migration:** insist on independently reproduced compilation and data-integrity evidence, selected synthetic-content policy, security/permissions parity, production tldraw continuity, and a tested rollback path. Then ask for cutover authorisation; no implied permission from this plan.

**No mandatory checkpoints, achievement tracking, Work handoffs, learner Notes generated by GPT, production reset or forced review ceremony.** The source-reconciliation deferral is revised only as a *future planned integration prerequisite*, while tldraw Lab licence work remains owner-deferred.

## References

- [Terra's genuine Chrome visual/interaction inspection](https://github.com/frekland/Minamo/pull/99#issuecomment-6822089862).
- [Initial read-only Chrome observation](https://github.com/frekland/Minamo/pull/99#issuecomment-6821877593).
- [MCP authoring boundaries and usability implementation brief](PR99-MCP-AUTHORING-BOUNDARIES-ROUTING-AND-ACCEPTANCE-2026-11-12.md).
- [Lab V161–V165 acceptance and source ledger](CONNECTED-WORKSPACES-LAB-V161-V165-ACCEPTANCE-AND-RESUME-2026-11-12.md).

**Status:** Plan and analysis only. No new Lab/production code changes, deployment, bulk import, source reconciliation, settings changes or Project edits are asserted.
