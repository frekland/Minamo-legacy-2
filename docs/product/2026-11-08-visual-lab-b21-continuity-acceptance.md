# Minamo Visual Lab B2.1 — independent continuity, reference integrity and interactive acceptance

**8 November 2026.** Full implementation and acceptance in the **separate owner-private Visual Lab**, building on B2/V77. **Production Minamo was read-only and untouched.** This document supplements, rather than replaces, the [B2 functional evidence](2026-11-07-visual-lab-b2-functional-integration-evidence.md) and A1–A6.2 history. PR #90 remains a **draft documentation handoff**, not a production implementation.

## Verified identities and scope

| Item | Exact identity |
| --- | --- |
| Private Lab | https://minamo-visual-lab.jscymru.chatgpt.site/ — select **Living Projects · B1** |
| Lab Sites project | `appgprj_6aeba0aa528c81918be19dd51427b2cb` |
| Recoverable B2/V77 baseline | Source `7cd62340d3ef98bcd397a48e5c5f3bb381ba9e3e`, version `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_1aaf2de13be08191a4f66bdc4aec39a8`, deployment `appgdep_6aefb455e6548191b41d73f9088da730` |
| B2.1 V78 | Source `ff550cfa322a8933e6cee31f322dfa1ebceca6a7`, version `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_94bdd13ca2308191986e2d3359f47e9e`, succeeded deployment `appgdep_6af04b474c288191a3a8b8501a294743` |
| B2.1 V79 | Source `99bb860c9a63dae69fda9f152b4e24907a3e5ea1`, version `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_633d6e7cec6c8191b0d2e0a399389161`, succeeded deployment `appgdep_6af04e7798b48191aca37941d9dd914c` |
| B2.1 V80 | Source `4b73f209127d76b731fd141ae1f97e57bf442b81`, version `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_8dd79aadcabc8191a6eca5f80d66d091`, succeeded deployment `appgdep_6af051e9fd048191acbba4cb7eb38ee9` |
| B2.1 V81 | Source `9432b569813bf5d4f8e0513fef0a7a22e8cd5a50`, version `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_2f56be3a999c8191893dc114949ac4e8`, **succeeded** deployment `appgdep_6af0535dbf9c81919777a5f28d354c80` |
| B2.1 V82 (final) | Source `dbafe7d752d05e2331b574744b707e814ef9af19`, version `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_93efa440c5a8819187ddb975fb034ca3`, **succeeded** deployment `appgdep_6af05475d240819181a719a88f5e70af` (MCP enabled) |
| Production (read-only check) | Native V116, source `fc93ce4bbcffa4298097b8c7fe50fae75555d072`; public GitHub branch and protected source not assumed identical |

## 1. Independent fresh-chat installed-MCP acceptance

**This acceptance was deliberately performed before reading the B2 source or previous evidence report.** The current ChatGPT conversation inherited a broad user project-memory summary, so it is not literally a no-memory identity, but the factual Project revisions and material were obtained from the newly reinstalled **Minamo Visual Lab MCP**, not assumed from memory. No direct HTTP or test fixture was substituted for the plugin.

The installed plugin exposed private owner-scoped workspace discovery, exact `get_project_composition`, `read_project_changes`, `read_project_contributions`, `apply_project_update` and operation readback. An initial independent workspace query with `includeSynthetic:true` found the Cherwell six-month investigation at revision **33**, Radio Island at revision **28**, their authored work threads, histories and saved observations. Cherwell's stored **browser-reported** phosphate observation was identified as a saved artefact, not as a field measurement independently performed by the agent. A separate `read_project_contributions` returned **zero** typed learner contributions for Cherwell even though the Project contained authored Notes and observations; those categories must not be conflated.

The bounded independent write took the current Cherwell conclusion thread from **revision 33 to 34**, adding an exact reference/summary for the saved browser observation, using operation `lab-b21-independent-observation-reference-20261108-01`. The installed MCP returned a committed receipt, another MCP read showed the edited thread and unchanged other content, a replay of the same operation returned an already-committed result, and a stale expected revision **33** was rejected with `revision_conflict`. Chrome then showed the updated thread against the saved material. Radio Island remained at revision **28**.

**More stringent subsequent round-trip:** On the real hosted Cherwell B1 page, the agent pressed **Run analysis** on the saved Python/Canvas definition for Marston Road ammoniacal nitrogen. The browser executed Pyodide and rendered the chart. Its output included `2016: n=12, below limit=7; detected-only=0.038; half-limit=0.015` and `2025: n=12, below limit=11; detected-only=0.032; half-limit=0.015` (mg/L as N), explicitly identifying half-limit substitution as an analytical assumption. A browser **Save observation** produced Project **revision 35** with:

- Observation part `experiments/observation-0bd364abafc8f11682ffe4759df399f5`, adjacent source-input part `experiments/observation-0bd364abafc8f11682ffe4759df399f5-inputs`.
- `classification:"browser-reported"`, timestamp `2026-11-08T10:31:38.933Z`, source interactive `cherwell-censor-canvas`, definition digest `ab3213c2e52e808b543f00fce800f13a163cab01c571dd6e121ee2eea56a4c92`, `inputs:{station:"M"}`, deterministic seed 16 and the actual computed result.
- A new installed-MCP read retrieved revision 35 and those exact parts in this independent ChatGPT context; a revisioned MCP update `lab-b21-cherwell-ammonia-browser-link-20261108-01` linked both to the “censoring” thread at **revision 36**. Readback reported **zero reference issues**. Chrome reload displayed both evidence and input provenance in that thread.

This demonstrates the **browser → private server → freshly installed MCP → GPT thread edit → server → browser** loop, with no invented learner achievement and no claim of new river measurement.

## 2. General work-thread architecture

B2's question-oriented reading UX was retained. B2.1 generalises the authoring operations and makes references safer without adding on-site AI or session/checkpoint records.

- A Project's existing `projectComposition.workThreads[]` is the sole organisational layer: `id`, `title`, `question`, `summary`, optional `unresolved`, ordered `items[]` carrying `sectionId`, `partId`, `role`, and optionally exact `revision`. It points to the original canonical parts rather than duplicating code, diagrams, tables, observations or Notes.
- The installed MCP `apply_project_update` accepts general `changes:[{op:"upsertWorkThread",thread:{...}}]` and `changes:[{op:"removeWorkThread",id:"..."}]` with `expectedGeneration`, `expectedProjectRev` and unique `operationId`. The same CAS/operation-receipt contract protects ordinary direct edits. No special Cherwell/Radio-only path is required.
- Server-side `lib/work-thread-integrity.ts` reconciles **every Project update** under revision/CAS; it follows an unambiguous content-identical part move by its stable ID. Rename, hide/show, layout reorder and part text edit do not erase a current reference. A deleted part becomes an explicit `unresolvedRef` (reason and `lastSeenRevision`), not a silently retargeted citation. Later reuse of an ID by unrelated content remains `identity-uncertain`.
- A historical reference is resolved against the **actual retained D1 revision**, not merely a plausible current ID. Newly invalid current or historical references are rejected server-side; metadata-only reorder and removal remain deliberate GPT editorial choices.
- `get_project_composition` returns `workThreadReferenceIssues`; B1's work-thread view shows a meaningful unresolved-reference warning instead of a disappearing reference. A deleted reference and its last-known revision can be investigated without guessing the replacement.

**Focused proof:** `tests/work-thread-integrity-b21.test.mjs` exercised generic thread authoring, operation replay, content-identical move, hide/rename, subsequent edit, deletion, ID reuse, invalid current/historical citations, stale revision 409 and MCP readback. It passed against isolated private D1; the actual installed MCP exercised the separate hosted Cherwell edits. These are independent evidence types.

**Arbitrary new Project, not just named fixtures:** A synthetic `TEST-ONLY-b21-interactive-continuity-20261108` Project was created with one workbench layout, two separate canonical blocks, a drawing part and an uploaded image. The installed MCP authored a general `artefact-continuity` thread. V79 added such projects to the B1 catalogue if they have work threads, while hiding the TEST label in the learner-facing card. V81 adjusted **All sections** to display all blocks in a multi-block layout (the earlier A4 renderer showed only the first), without changing the A4/A5/A6.2 preserved alternatives.

**Limit:** The server preserves referential consistency, but does not decide what question deserves a thread or whether new evidence changes a scientific conclusion. GPT remains responsible for semantic organisation. The page does not offer a dedicated rich manual thread editor; this is deliberate MCP-first operation, but discoverability and user consent to major reorganisations need a production design decision.

## 3. Interactive artefact results

| Workflow | Actual evidence | Verdict |
| --- | --- | --- |
| Python Canvas inactive | B2.1 replaced the large blank pre-run canvas with a compact, intentional run placeholder; Chrome confirmed initial compact layout. | **Pass** |
| Real Python/Canvas run | Cherwell saved definition executed via browser Pyodide; plotted a real chart and produced the actual Marston Road censoring summary, not a static image. | **Pass** |
| Browser observation → MCP → thread | Observation and exact JSON source inputs saved at rev35, read through installed plugin, threaded at rev36 and recovered after Chrome reload. | **Pass** |
| Radio Island Python game | Actual saved Python modules loaded; Start advanced from round 1/7; Forest Track advanced state and revealed witness footprints clue. After reload Chrome showed **Resume 1 saved turns**. | **Pass**, this is **not Pygbag** |
| Private Project image | Synthetic 240×140 PNG was uploaded to R2 as `image-cfdf1e8d6344da098f9802471f1a53901bb5d16ebdd7c78e4d9d54bfa50f73b9`, attached in canonical content with alt/caption and visibly rendered in Classic after reload. MCP at rev3 retrieved its owner-scoped identity. A separate rev4 MCP thread edit linked the image, and readback showed the **same asset ID**, all other original content and zero reference issues. | **Pass** |
| tldraw drawing | The control bar appeared briefly but the editor became empty. The browser console repeatedly reported **“No tldraw license key provided!”**. Lab `/api/projects/runtime-config` returns no `TLDRAW_LICENSE_KEY`. No shapes were created or saved; `get_project_drawing` reported `drawing_unavailable` for the new synthetic Note. V80's stable-store hypothesis did **not** resolve this. V81 changes the UI to a clear missing-licence notice without touching saved state. | **Blocked: Lab-specific authorised licence configuration** |
| Pygbag packaged game | Native wrapper validates admitted `application/vnd.minamo.pygbag+html` bytes/digest, strict upstream archive 0.9 Python 3.12 HTML envelope, sandboxed iframe, Run/Restart/Stop and a 300s maximum; focused new `tests/pygbag-envelope-b21.test.mjs` passed allowlist and rejection cases. No saved admitted runnable Pygbag package was available, so loading, STOP, timeout and game recovery were **not** browser accepted. | **Contract-tested only; runtime unverified** |

The production Site has a tldraw licence secret mentioned in earlier owner discussions; this commission did **not** retrieve, copy or repurpose it. The private Lab needs a valid licence authorised for its own domain. Do not silently replace tldraw with a second drawing backend. Once configured: draw actual shapes, save, reload, read via `get_project_drawing`, then perform a stale-write conflict check and image-backed shape test.

Pygbag requires a genuinely built, admitted standalone `--html` fixture and its upstream pinned runtime to be accessible. The Radio Island Python runner has a different execution path and must not be counted as packaged-game acceptance.

## 4. UX assessment after returning to substantial Projects

**Versus A5:** B1/B2.1 makes one question and its *actual* materials visible together, instead of small contextual note affordances scattered around a big Project. Current view, evidence, reasoning and unresolved questions remain close. Saved observations appear next to their source, not in a separate progress log.

**Versus A6.2:** “Past changes” is supporting evidence on demand. It no longer dominates the initial view with chronology. Exact prior methods and source revision are available when relevant, which is preferable to a six-month list of 31 saves as primary navigation.

**Versus B1/V73:** Cherwell's five question-led threads and Radio's four engineering threads are more comprehensible on return. Radio's source is collapsed behind an honest named 166-line file control while the playable engine remains accessible. However, threads initially required deliberate bespoke authoring; B2.1 adds general MCP authoring and server-side reference maintenance.

**Versus B2/V77:** The true fresh-context MCP test is now demonstrated, and a browser observation was transformed into a semantically linked thread in the same Project without duplication. The inactive Python visual is less visually disruptive. A new arbitrary Project becomes a genuine B1 thread view; all blocks of a multi-block native layout must remain reachable. Drawing and Pygbag limitations are more precisely understood.

**Japanese Live remains intentionally different.** The compact ten-session language fixture has no work-thread metadata, so it still opens the existing six-section topic view with furigana, pronunciation, translation/explanation disclosures and history available on demand. Its display is not burdened with long engineering-project controls.

**Still awkward:**

1. Work threads rely on GPT to select meaningful evidence and write concise conclusions. If too many or poorly named threads accumulate, their index could itself become a clumsy outline. No automatic semantic maintenance is promised.
2. The “Questions and work” reading presentation still puts a significant portion of content below the fold, and some large code blocks require expansion. Better than the prior chronology, but not a complete substitute for an IDE or notebook.
3. B1's entry into the canonical editable native layout is explicit (“All sections”/“Open in section”); it is a reasonable boundary, but users may not immediately know when to switch.
4. Tldraw has a real Lab credential blocker and Pygbag lacks a live fixture; these are acceptance gaps, not cosmetic polish.
5. No comprehensive mobile/a11y test, long-term performance soak, full drawing conflict test or real user months-later adoption result was established in B2.1.

## 5. Production versus Lab and recommendation

| Capability | Production V116 | Lab B2.1 | Integration position |
| --- | --- | --- | --- |
| Six native Project layouts, direct edits, owner-scoped images | Existing native implementation | Preserved; B1 multi-block All sections correction, image upload + persistent R2 readback | Reconcile native sources before any port; don't copy Lab wholesale |
| Revisioned Projects, D1 history, CAS, operation receipts | Established | Established plus generic thread actions and server-side integrity | **Strong candidate** for a bounded production integration |
| GPT/MCP work-thread read/write | Not present as Lab B2.1 generic question overlay | Installed plugin and fresh-context read/write demonstrated | Consider **optional** long-Project view after product acceptance |
| Learner-authored contributions | Existing native systems, exact current capability must be rechecked | B1 contextual contribution source/reviews preserved; Cherwell 0 typed contributions in independent read | Keep contribution provenance distinct from Notes/observations |
| Python Canvas and saved observations | Native runner exists | Real hosted run, save, MCP readback, preserved source digest | Compact placeholder and provenance UI are promising |
| tldraw and drawing-to-MCP | Production may have configured licence; not independently retested here | Missing Lab key; no shape/save/MCP acceptance | **Do not promote on the Lab's current drawing evidence** |
| Pygbag packaged pygame | Native wrapper present | Envelope tests only; no runnable packaged fixture | Requires an actual packaging/runtime acceptance |
| Japanese compact view | Production native language view | Remains topic-based and uncluttered | Preserve unchanged; do not impose threads by default |

**Recommendation:** Keep B2.1 deployed in the **private Lab**, keep PR #90 **draft**, and invite the owner to use Cherwell and Radio Island for sustained work. The general work-thread architecture and browser↔GPT/MCP↔server continuity merit a future **bounded, reversible, opt-in** production commission. They are not permission to automatically promote the current Lab source. Establish a Lab-domain tldraw licence and packaged Pygbag fixture, run their genuine acceptance, then decide which narrow interface/contract changes are worth merging. No production deployment, learner records or MCP permissions were changed.

## 6. Commands, receipts and evidence classification

- Lab source branch: separate native Sites `main`, commits as table above. GitHub PR #90 contains **documentation only**, not copied native implementation source.
- Focused checks: `pnpm typecheck`; `node --test tests/work-thread-integrity-b21.test.mjs tests/cherwell-b2-observation.test.mjs tests/pygbag-envelope-b21.test.mjs` (**3/3 pass**); `pnpm build` (**pass**, existing Vite/Piper compatibility warnings). No blanket legacy suite.
- Real installed ChatGPT MCP: workspace/composition/changes/contributions/operation readback; Cherwell revisions 33→34 with stale/replay checks; browser-generated observation rev35; GPT linking rev36; synthetic image thread rev3→4.
- Real Chrome: Cherwell Python chart run, save and reload; Radio Island game and resumed turn; Japanese furigana/TTS topic layout; synthetic image and drawing failure. Do not equate tests/HTTP with live UI acceptance.
- No material deletions or production changes. B2/V77 and earlier deployments remain recoverable.

**Latest hosted verification:** V82 succeeded with MCP enabled. Chrome confirmed that the arbitrary synthetic Project displayed **Drawing and reasoning** and **Image and evidence** as distinct labelled blocks in B1 **All sections**, rendered the original image after an unrelated Project rev4 MCP update, showed the accurate missing-licence warning instead of an empty drawing editor, and disabled unavailable Save/Fullscreen actions. The final Cherwell B1 page still displayed the actual revision-36 browser observation and exact input provenance in its censoring thread. This is host/browser evidence, not just source analysis.

## 8 November addendum — V83–V85 packaged pygame browser acceptance

**This later continuation supersedes the earlier “Pygbag contract-tested only” verdict above; it does not change the earlier observations.** The native Lab source is in its separate Sites repository. The public GitHub PR remains documentation-only and draft.

| Lab version | Source / deployment | Result |
| --- | --- | --- |
| V83 | Source `1d7e4ca0586e4cc8937a31b43a40ded77308fa6b`; version `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_b316aa33285c0c8795868516`; deployment `appgdep_6af073e0b1f081919459d5cbd0141201` | **Succeeded.** Added the exact 1,279-byte synthetic, admitted standalone HTML game and a separate download page. Focused envelope test, typecheck and build passed. |
| V84 | Source `1e3fe2a7b4b07a10983be242b7c2d05af200c2fd`; version `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_4d2820b40c1c81918ba84682a79c452c`; deployment `appgdep_6af08f472484819186cb9c59638877e8` | **Succeeded.** Live Chrome save exposed `Unsupported field: imageDisplay`: the read-only private-image display projection was mistakenly replayed as authored input. Fixed the Project editor to strip read-only image/media/excerpt projections before save, reject unavailable asset rewrites, and retain canonical originals. Two new focused regression tests, typecheck and build passed. The user-uploaded file was recovered from the retained local draft, then Project save succeeded. |
| V85 | Source `083133acb00fe75cad848e88c53cc9d66ab7701b`; version `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_06f1234faaf8819185d5217c9cf71602`; deployment `appgdep_6af090fa16bc8191a4f3b0b79f27400b` | **Succeeded, MCP enabled.** The first live run only showed a blank iframe: the hard-coded SRI checksum for the pinned official `archives/0.9/pythons.js` did not match its current bytes. Verified the official archive SHA-256 as base64 `4RvpTdFsKcy7A4dzXfWIjgBQdmssWOrmNpESWekVdl8=`; updated the pinned integrity value without removing verification. Four focused tests, typecheck and build passed. |

### Desktop Chrome and installed-MCP evidence (V85)

- The owner manually downloaded and selected `minamo-pygbag-smoke.html` using desktop Chrome after browser-automation download capture proved unreliable. The upload acknowledgement contained the expected SHA-256 digest `6d931aa5ac55330f0ba12124157f9cabe87d323123634d2187850f6c2c6d7d66`, asset ID `media-2e0c4f44cfec8a763196d67fef31871261ed930d1095d59df3dfda625cf607cb`. The Site's normal private media pipeline staged it; the V84 Project save attached it as part `assets/interactive-49e771a5-2208-4ad3-b5f2-99c6653ee5c4` at **revision 5**.
- The V85 **Run** fetched the private bytes, verified their digest, created an iframe sandbox with `allow-scripts` and the pinned loader, booted **Python 3.12.2 / pygame-ce 2.5.0.dev1**, printed `MINAMO_PYGBAG_SMOKE_READY`, and visibly rendered the cyan-and-yellow canvas. **Interaction passed**: a click changed `Clicks: 0` to `Clicks: 1` in Chrome.
- **Restart passed:** a fresh runtime returned the visual counter to `Clicks: 0`. **Stop passed:** the frame was removed from the DOM, the status became `Stopped.`, Run re-enabled and Focus canvas disabled. **Reload passed:** after a full page reload, the Project still exposed the saved package and Run booted it again with the ready marker and two pygame canvas elements. In-game counter state intentionally does not persist.
- The installed **Minamo Visual Lab MCP**, not direct HTTP, read Project rev5 and exact drawing/image/Pygbag parts. GPT then made a bounded `upsertWorkThread` update `5→6` with operation `lab-b21-pygbag-browser-evidence-20261108-01`, adding the Pygbag part as evidence and rewriting the thread's summary/unresolved question. Independent MCP readback showed **revision 6, four exact references, zero `workThreadReferenceIssues`**, with the original private image ID unchanged. Chrome B1, after refresh, displayed the packaged game in the thread's **Evidence and checks** and the corrected unresolved list.

**Verdict:** Pygbag package admission, owner-private attachment, live pygame execution, one real interaction, Restart, Stop, reload persistence, MCP readback and GPT thread maintenance are **PASS**. This is a synthetic smoke game rather than acceptance of all real packaged pygame applications.

**Not yet passed:** the actual five-minute automatic timeout was not awaited in Chrome (300-second timer remains code-covered, not live-elapsed). Drawing shape/save/MCP/conflict acceptance still awaits an authorised Lab-domain `TLDRAW_LICENSE_KEY`. General mobile/a11y and arbitrary Pygbag package profiles remain outside this focused test. No production Minamo source, deployment, permissions, records or secrets changed.

## 8 November final presentation pass — V86 Pygbag game-first frame

| Lab version | Exact source and deployment | Result |
| --- | --- | --- |
| **V86** | Source `fe17dbe1c78160beacbe7b3ba285861e248f039c`; version `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_5b66cfda8d008191a38a8488c88632cd`; deployment `appgdep_6af0940b30008191a49d7c10a2fbb554` | **Succeeded, MCP enabled.** Lab-only sandbox-frame presentation CSS hides the upstream Python diagnostic `#stdout` element (retained in the DOM for debugging) and fits the canvas to the available iframe. The status clarifies that verified package launch precedes Python readiness. `pnpm typecheck`, four B2.1 focused tests, `pnpm build` and `git diff --check` passed. |

**Live owner-desktop Chrome verification, Living Projects · B1:** After V86 deployment, the same saved synthetic Project (still Project revision 6) rendered the game immediately in a game-first view without the long upstream console, and the iframe `body` had `scrollHeight=clientHeight=520` while `#stdout` had computed `display:none`. The pygame canvas had natural backing pixels `520×300` and rendered proportionately at `900×520` CSS pixels. Chrome screenshot showed the complete cyan/yellow test game; clicking the displayed canvas changed `Clicks: 0` to `Clicks: 1` despite the CSS sizing. **Restart** rendered `Clicks: 0` again. **Stop** showed `Stopped.`, removed the iframe (`iframeCount=0`) and re-enabled Run. No other saved Project content or asset was altered during this pass.

**Updated verdict:** The V85 genuine Pygbag lifecycle pass is maintained; V86 additionally resolves the identified excessive-console/nested-scrolling UX issue with an actual mouse interaction retest. This is still a *single synthetic smoke fixture* and not a broad claim about every Pygbag game. Five-minute auto-stop remains not live-elapsed; tldraw remains blocked on an authorised Lab-domain licence. Production V116 and owner secrets remain untouched. PR #90 remains **draft and documentation-only**.
