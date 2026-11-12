# Visual Lab V143 — exact incoming page pins across domains

Date: 11 November 2026  
PR: #99, draft and unmerged  
Environment: owner-private Minamo Visual Lab only  
Production: V149, unchanged

## Decision and outcome

V143 fixes a real gap between canonical saved citations and the relationship overview: one Note could cite multiple distinct parts of a Project's older edition, yet the Project's incoming relationship list stopped after the first matching citation. The same Note therefore appeared to have only one source path, even though the Note and parts were correctly saved.

The change makes each admitted, exact incoming page pin recoverable through the bounded, rights-scoped working-context read and visibly distinguishes those pins in Project Connections and the Note reader. It is domain-neutral: citations work for language dialogue/grammar and scientific methods/results, with a creative-source regression. No mandatory Work thread, Activity/Attempt entity, learner-progress record or automatic inference is introduced.

V143 was implemented, built, deployed and inspected live. A substantive new GPT-authored synthetic science Note was also saved through the installed MCP to test the intended authoring-to-retrieval loop.

## Deployment and verification

- **Private Site source:** `05a41cfa521a3737091022c473dd97fd63612152`.
- **Saved Site version:** `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_42d5a657a3308191a2f10a1309cab205`.
- **Deployment:** `appgdep_6af4887737248191bd584a4a51240553`, status **succeeded**, MCP present.
- **URL:** https://minamo-visual-lab.jscymru.chatgpt.site/
- **Checks:** 18/18 relevant focused tests passed, including a targeted rerun of 9/9 server tests after the final edge-case correction; `pnpm typecheck` and `pnpm build` passed. No full legacy regression suite was run.
- **Production:** no write, release or deployment. PR #99 remains draft and unmerged.

## What changed

### Server and MCP working context

In `lib/working-context-read.ts`, the incoming-reference traversal no longer stops at the first pin from a given source Note. It retains distinct links to different Project sections/parts in the saved edition while respecting the existing bounded list (12 relations), authorisation, historical revision and coverage semantics. The response now includes a `citedDestination` for each admitted exact inbound reference.

An important negative case emerged during regression testing: a section or part without a pinned rendition does **not** justify constructing a supposedly exact historical URL. The code now uses a broad current-Project destination for that unpinned case. It does not imply an exact saved edition or fabricate a numeric revision.

### Calm, precise presentation

The common relation presentation helper now formats section/part and edition descriptions without borrowing titles from today's edition of an old source. The Project Connections panel shows one source Note card with separate compact links for each exact page pin. Retained anchors participate in deduplication so two different passages do not collapse. The Note pin list differentiates same-titled saved pages through edition and section/part information. No canonical Note, Article or Project text is rewritten.

Files addressed: `lib/working-context-read.ts`, `lib/working-relation-presentation.ts`, `app/project-connections.tsx` and CSS, `app/working-context.tsx`, `app/notes-panel.tsx` and CSS. Focused regression files: `tests/working-context-read.test.mjs`, `tests/project-connections.test.mjs`, `tests/project-continuity-orientation.test.mjs`.

## Live MCP evidence: do saved references survive a fresh conversation?

| Domain | Canonical current source | Independent MCP result | Interpretation / limitation |
| --- | --- | --- | --- |
| Japanese Live | Project `TEST-ONLY-a3-japanese-ten-sessions` r11 | One existing GPT-authored Note `minamo-lab-a3-sequence-and-response-20261110` r1 supplied **two distinct incoming paths**, both to the older Project **r10** rendition: `dialogue/a3-s9-full-story` and `grammar/a3-grammar-sequence`. | This is exact persisted citation evidence, not an inference that the learner completed either activity; latest Project remains r11. |
| River Cherwell | Project `TEST-ONLY-a61-cherwell-six-month-water-quality` r37 | A newly authored independent GPT Note supplied separate exact incoming r37 methods and results pins (below). Working-context coverage reported `completeWithinScope: true`. | Two paths are observable without forcing a Work relationship or altering the Project. Coverage describes the scoped read, not omniscient discovery. |
| Visual composition | Project `lab-visual-composition-questions-20261110` r4 | Outgoing retained Article citation and reciprocal incoming Article and independent Note links still returned. | Existing creative relationships were retained; no inferred agreement or learner progress. |

The independent reader must still reconstruct *why* the authors changed a hypothesis from the literal dated record; MCP does not certify an author's intent where it was not written. Equally, a missing relationship must remain absent rather than be inferred from topical similarity.

### Substantive science authoring in the Lab

Created through installed `preview_minamo_command` / `apply_minamo_command`:

- **Independent Note:** `lab-cherwell-three-comparisons-20261111` r1, “Cherwell — three comparisons, three different questions.”
- **Authorship:** GPT-written analysis, explicitly `synthetic: true`; no learner achievement or new field measurement claimed.
- **Sources:** exact saved Project r37 rendition `r-2ce98441552165f94c4a7a3aaef394f16a2859b542a6b6950d74ff501df48328`, pinned `methods/cherwell-units-policy` and `results/cherwell-paired-output`; and a retained edition of the Library Article “Comparing uneven time series,” `s3/p8`.
- **Substance:** contrasts pooled Marston phosphate 0.215 mg/L (n=49) with 0.140 mg/L (n=33), upstream Heyford year-balanced change 0.022 mg/L, and 38 eligible matched station-month phosphate comparisons (early n=8, later n=27); explicitly discusses unequal sampling, censoring, units, interpretation versus observation, and unresolved station-coverage questions.
- **Saved result:** Note r1, rendition `r-39e79e3ed1d90dc78bdcb24de84b62ffd098813fd9fae75da30f5db516d1a86b`. Installed MCP read-back of Cherwell now returns the Note and **both** exact incoming Project paths.

These are interpretations of **retained records**, not independent verification of River Cherwell water quality or newly observed measurements. A separate pre-existing Cherwell Note about units and sampling was not automatically linked merely by topic. This is correct given the saved-link contract.

## Live Cloud Browser acceptance

Using the deployed private Lab:

1. Projects catalogue listed 23 available Projects. Japanese Live r11 opened without the prominent synthetic-record warning removed in V142.
2. Opened Japanese Live **Connections**. A single source Note card displayed **“2 saved references”** with distinct labels for the r10 dialogue and grammar sections/parts.
3. Clicked the r10 dialogue link. The destination displayed **“Retained edition · revision 10”** and the correct `passage-dialogue-a3-s9-full-story` anchor, rather than silently taking the user to r11.
4. Opened Cherwell r37 **Connections**. The newly authored scientific Note appeared as one card with **two** paths to `methods/cherwell-units-policy` and `results/cherwell-paired-output`.

This supports **live acceptance of this defined vertical slice**. It does not certify every historical view, every related surface, performance under hundreds of pins, mobile layout or wider production parity.

## Truth, permissions, and limits

- Saved page pins are authored references, not proof that a source statement is true; provenance and editions remain visible to MCP.
- Inbound reads remain owner/scope bounded. Tests cover unauthorised inbound exclusion and broad fallback for unpinned references.
- The bounded relationship response still caps at 12 edges. `completeWithinScope` must be interpreted with the requested scope and truncation; it is not a global completeness guarantee.
- A Note page-pin record can identify its saved rendition but may not itself expose the human-readable numeric revision directly. The pin list therefore uses a faithful “saved edition” label where necessary.
- Project Connections has asynchronous loading; the observed positive state was inspected after load. Large-corpus latency and multi-owner revocation need their own tests.
- **Newly exposed classification weakness:** the freshly authored independent science Note is listed by workspace discovery with inherited `computing` scope, despite its Cherwell science subject. All-space discovery and exact citations still work, but subject-filtered discovery can misplace it. Correct default independent-record scope inference/selection and test this across domains in the next Lab slice; do not quietly rewrite its content to conceal the defect.
- More comprehensive cross-surface acceptance remains needed for Home, Projects, Library, Your Work, Questions, Notes, annotations, flags, Settings and mobile.
- Source-authority edges (external observation versus data imported into a synthetic Project), negative preference enforcement and permissions under revocation remain key risks.
- The independent MCP acceptance proves specified persisted links can be read in this conversation; useful continuation across *every* record shape and history size is not fully proven.

## Scope policy and migration gate

The owner explicitly authorises creating and evolving **as much synthetic Lab material and activity as needed** for meaningful acceptance, including substantial Project histories, Notes, annotations, flags, Articles, executable artefacts and independent investigations. Preserve truthful authorship and evidence provenance; avoid false learner claims. The Lab itself is already the test setting, so **do not restore repetitive prominent “TEST ONLY · synthetic record” UI banners** that impair ordinary UX assessment. Keep metadata for truthful MCP attribution.

The owner has **deferred public PR branch/source reconciliation until PR #99's substantive Lab scope is complete and the owner personally likes and accepts the Lab**. The public branch is **not** a byte-for-byte mirror of V143. This discrepancy remains a required **later** release/review gate; neither the deployment SHA nor a documentation commit on this public branch proves app-source parity. Do not migrate production, merge or mark PR ready now.

## Critical PR #99 standing and next integrated phase

**Substantially achieved in Lab:** multi-domain Project revisions, independent revisioned Notes and Articles/Questions, historical source citation, source links and reciprocal navigation, existing interactive/code artefacts, owner-scoped GPT working context, successful genuine fresh-conversation reconstruction and selective subsequent authoring, checkpoint-free Project authoring, navigation/discovery improvements. Scientific and language citation fidelity has a positive deployed browser/MCP path.

**Only partially achieved or insufficiently tested:** natural relationships beyond explicit saved citations; complete cross-surface navigational coherence and large-corpus discovery; history-orientation quality on long Notes/Articles; robust negative rights/preferences tests; contextual relevance and usefulness at scale; responsive/mobile UX; nuanced source authority; drawing/game/Python Canvas parity in current Lab after later architecture changes.

**Still central to original ambitions:** genuinely useful **user-controlled collaboration and dynamic MCP settings**, with comprehensible permission/visibility contracts; reliable subject classification of independent Notes/Questions; robust cross-domain Home/Projects/Library/Your Work/Questions coherence; pagination/truncation behaviour under sustained histories; negative rights and revocation acceptance; calm interfaces that help someone see how their questions evolve, without manufacturing progress.

**Recommended next substantial Lab slice:** design and implement a **scoped source-and-collaboration experience** across independent Notes, Projects and Library: unified bounded relationship browsing with deliberate load-more/coverage signals; owner settings for MCP retrieval breadth/tool exposure and explicit permission cues; focused tests for truncation and preference enforcement across subjects; fix independent-record subject classification and seed a larger mixed-domain history to verify the experience end-to-end. Avoid extra administrative record types. Defer code-source reconciliation and production until the owner’s review gate.
