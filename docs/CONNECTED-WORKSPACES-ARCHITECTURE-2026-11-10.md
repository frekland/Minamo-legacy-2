# Minamo — Connected Workspaces, Continuity and Personalisation

> Owner-approved development commission, 10 November 2026. This is a living architecture and lab-development PR. **It is not a production-release PR.**

## Product intention
Minamo should preserve not only what someone knows or makes, but how their curiosity, questions and understanding develop. Its surfaces—Projects, Library, Notes, My Work and ChatGPT via MCP—should be different views of one durable, source-grounded workspace.

## Original setup sequence — superseded by the owner's 11 November decision

The following was the *initial* commissioning order, retained for history. It is **not** a prerequisite to continuing Lab development. The active sequence is: finish the substantive PR #99 Lab scope → owner personally evaluates and requests iterations → verify and reconcile public/private source parity → consider a separately authorised production migration. Do not block Lab work on source reconciliation now.

1. Record and reconcile the **actual deployed production V149** source (`665d70b3ad64bc0e1a0df1e030ac9b47a69ead0a`) against `frekland/Minamo`. Promote reviewed shared implementation, preserving public licensing/contributor files and excluding protected/private runtime material. Verify the resulting public source code matches the deployed implementation. Documentation-only steps do not cause production deployment.
2. Reset the **existing** Minamo Visual Lab Site (`appgprj_6aeba0aa528c81918be19dd51427b2cb`) to the production-equivalent code and MCP, preserving the lab Site identity and **its own** D1/R2 resources. Do not copy production data or credentials. The existing V95 lab deployment remains a recoverable historical version. Publish the clean lab baseline, then perform auth, persistence, MCP and browser smoke checks.
3. Only then start architecture work in the lab. Do not merge this PR or promote it to the live Minamo Site merely because the lab works.

## Architecture to investigate
### Canonical work and relationships
- Keep canonical Project/Library/Note/asset records and retained revisions as source of truth; avoid detached summary documents and duplicated material.
- Model a small number of **typed, provenance-bearing, stable relationships** across exact record and part identities: related material, working artifact, evidence, decision, open question, superseded idea, source passage and cross-project reuse.
- Distinguish stored facts and user/GPT-authored interpretations from **suggested** connections. Never silently promote inference to recorded fact.
- Preserve change attribution, exact revisions, CAS/idempotent writes, ambiguous/unresolved reference visibility, owner scoping and source rights.
- Reconsider `composition.workThreads` as one possible presentation of relationships, not a compulsory parallel data silo.

### Shared context service
- Build one server-side context retrieval contract consumed by the website and MCP: active Project, current material, relevant exact artefacts, last changes, open questions, prior decisions and link provenance.
- Return concise or detailed views without fabricating sessions, achievement, completion, code execution or learner mastery.
- Distinguish last edited, last opened and last read; consider per-user server-persisted read cursors rather than browser-local recency alone.
- Make “continue this Project” work in a truly fresh GPT conversation with minimal user recap.

### Projects and workspaces
- Permit freeform growth and multiple perspectives without making six layout patterns or fixed stages the learner's information architecture.
- Surface meaningful context when returning to long Projects; support genuine executable code, diagrams, observations and source materials as connected artifacts.
- Minimise navigation chrome. Simple Projects remain simple; deep views appear only when the work needs them.

### Settings and MCP
- Add owner-scoped versioned behavioural preferences on the server, synchronised across devices and readable by MCP.
- Explore global defaults and optional Project overrides for context depth, presentation perspective, relevant-material suggestions, GPT collaboration initiative, Note placement, computing/language controls and motion.
- Keep a stable minimum MCP discovery/control contract and implement changes in server-side tool behaviour immediately. Dynamic `tools/list` profiles are **conditional on actual client refresh and authentication support**; verify separately rather than promising instantaneous tool-schema changes.
- Preferences do not grant authority to write unrelated content. Preserve explicit user-requested updates and server-enforced protections.

### Library, Notes and My Work
- Enable exact, bidirectional contextual links, not copies: Library passage ↔ Project part ↔ Note ↔ artefact ↔ other Project.
- Make discovery explainable, relevant and dismissible. Search should navigate to the correct working context and preserve deep-link/rights semantics.
- My Work should expose authentic artefacts and relationships, not a second disconnected tracker.

## Non-goals
No compulsory stages, achievements, checkpoints, scored attempts, GPT handoff cards or automatically inferred learning success. No wholesale production data migration or auth/access changes. No blanket full-suite/browser campaign without a distinct owner opt-in. No new Site when the existing lab can be reused.

## Work and acceptance
- **A. Source baseline:** record paths and protected differences, update public code and dependencies without overwriting public licence/docs, compare shared runtime modules, run focused builds/tests, record source pins.
- **B. Lab parity:** same code, build, schema and MCP behavior; different Site identity, authenticated scope, D1/R2 and user records. Test distinct live URLs, real loading, editing, Note persistence, Project CAS, library retrieval, drawing/code availability and MCP `tools/list`.
- **C. Model feasibility:** time-separated sequential changes through multiple real sessions; preserve sources and reason correctly about unresolved/contradictory material.
- **D. Interface viability:** browser acceptance as a user. Favour less cognitive overhead and good spatial/interaction feel, not extra dashboards.
- **E. Preference behaviour:** server round-trip, cross-device setting persistence, fresh-chat context response, tool refresh compatibility and denial of disallowed writes.
- **F. Promotion:** each accepted increment has explicit checks, limitations and a reversible path; production promotion is a separate requested action.

## Demanding scenarios
1. Japanese Live developed across sessions, including TTS/furigana/Notes/flashcards.
2. Six-month Bash/networking/Python work with real code, executable artefacts, recorded results, revisions and changes of direction.
3. Open-ended research/writing with conflicting sources, abandoned interpretations and cross-project reuse.
4. Negative cases: deleted/moved parts, stale revisions, ambiguous links, unrelated suggestions, fresh conversations and inconsistent client preferences.

## Decision log
- 10 Nov: Owner approved a new architecture PR, production-source consolidation, a production-equivalent isolated lab reset and lab-first implementation.
- Record deviations and rejected approaches here as implementation proceeds; do not treat initial proposals as mandatory UX.

## Status
Architecture scope agreed. Baseline reconciliation and lab replacement are tracked separately from feature implementation. Do not describe the feature work as already complete.

## 10 November direction refinement — cross-domain continuity (after V124)

**Decision:** preserve all accepted Python/code-package work as a native artefact capability; it is neither shelved nor the organising principle for Minamo. Shift the **next implementation and acceptance slices** toward continuity that works for language, scientific, creative and computing Projects alike. The owner explicitly approved this change of emphasis without stopping PR #99.

### Shared content-neutral contract

1. A Project can be just freeform canonical material. **Work questions are optional**; a Project with no work threads still needs usable revision, Note, Library and artefact continuity.
2. Keep stable IDs, exact editions, source attribution, CAS and owner rights across prose, dialogue, exercises, research data, diagrams, photos, drafts and code. Treat content-specific renderers and executors as adapters, not the underlying relationship model.
3. Separate structural facts (a source was revised; an exact reference cites a saved edition; a derived artefact names its inputs) from authored interpretations (a conclusion changed; a grammar explanation was corrected; a plot decision was abandoned). Detect the first deterministically; never fabricate the second.
4. Show revisions, withdrawals and exact relationships in context, with minimum added UI chrome. Do not require users or GPT to maintain a second record merely to preserve continuity.
5. Allow explicit, sourced updates to questions, notes and conclusions. Do not silently rewrite an authored summary or infer learner achievement, correctness, experimental results or creative intent.
6. Code packages remain a supported specialised source/artefact adapter, with further import/edit/execution work queued for an appropriate slice. No regression or schema withdrawal is implied by changing the current test focus.

### Required cross-domain acceptance matrix

| Domain | Sustained Project materials | What continuity must demonstrate | Negative control |
| --- | --- | --- | --- |
| Japanese | Dialogue, grammar, flashcards, learner sentences, TTS/furigana, Notes and Library | A fresh GPT conversation retrieves the appropriate saved editions and can continue practice without ritual Work authoring | Unrelated grammar and unverified mastery are not attached automatically |
| Science/research | Real cited sources, dataset/method, visualisations, evolving hypothesis and contradictory evidence | Corrected derivation and source revision are discoverable; original input and contrary claims remain attributable | A chart edit is not automatically called a disproven hypothesis |
| Creative | Multi-part prose, illustration/drawing, character/location notes and revisions | Current material and relevant older editions remain navigable, without cluttering the reading experience | Coincidentally matching names do not fabricate relationships |
| Computing (retained) | Radio Island multi-file Python, tests, Canvas observations and exact ZIPs | Existing source integrity, Work references and executable evidence remain intact | Package membership alone does not invent a Work connection |

### Execution order

- **First:** use existing Lab material plus deliberate new, explicitly constructed non-computing Projects where necessary to probe the actual retrieval, edit and UI experience. Keep test authorship obvious; no invented learner sessions or scientific observations.
- **Next:** implement one or more content-neutral continuity improvements demonstrated by those observations, using exact source IDs/revisions and focused ownership/revision tests.
- **Then:** repeat fresh-chat MCP and browser acceptance in at least two non-computing domains. Apply changes only to the isolated Lab, update this PR after each accepted deployment, and leave production V149 unchanged.
- **After that:** reassess optional Work UX, Notes/Library relationships, collaboration preferences, legacy read-only checkpoint language and native package depth against the cross-domain evidence.

Do not treat the example Projects as prescribed Project templates or impose fields, stages or required Work threads on real users.

## 11 November owner priority and Lab authoring policy — before V139+

**Decision: complete the substantive PR #99 product scope in the existing owner-private Visual Lab before source reconciliation.** The Lab is intentionally experimental and the owner will make a comprehensive personal UX/product assessment **after** functional scope is substantially complete. Source reconciliation/public reviewable code, production parity audit and promotion remain explicit later gates, **not blockers to Lab iteration**. Do not prioritise branch byte parity over finishing the Lab. Production V149 remains untouched; PR #99 stays draft/unmerged.

**Explicit authoring permission for testing:** During Lab development it is welcome, and sometimes necessary, to create, populate, revise, link, annotate, flag or retire realistic **Lab-only** Projects, independent Notes, Library material, research artefacts, dialog, source files, activities and substantial long histories. There is no quota, snippet limit or requirement to reuse whatever happens to be in the Lab. Use the amount and complexity genuinely needed to exercise functionality, including lengthy multi-subject examples and correction histories. Do not repeatedly stop for permission to author suitable Lab fixtures.

This permission is **not** permission to fabricate actual user achievements, real-world measurements, external observations, source rights, GPT execution or human conversations. Make synthetic/GPT/owner/supplied/browser-reported provenance and uncertain claims explicit, retain exact editions and CAS/rights boundaries, and preserve meaningful existing development (Japanese, Cherwell, creative, Radio Island/Python and other Labs) unless a deliberate integrity-preserving change is necessary. The general product must continue to support standalone Notes and investigations; no mandatory Work thread, checkpoints, progress dashboard, Activity/Attempt workflow or GPT handoff file.

**Next Lab-first integrated slices:**
1. A coherent low-friction relationship/discovery journey across Home, Projects, Notes, Library and Your Work, including unlinked material and older revisions; no semantic inference disguised as persisted relationships.
2. Server-persisted and user-visible collaboration preference behaviour (context depth, related sources and initiative) with negative permissions/edge-case acceptance, not just preference UI.
3. Realistic multi-domain longitudinal authoring, conflicting evidence, annotations, flags, revisions and permissions, including browser/MCP recovery and concurrency.
4. UX consolidation and deliberate deprecation of duplicate/legacy concepts after acceptance; keep distinct readers and executables as subject-specific adapters to a common model.

**Sequence:** Lab development and deep acceptance → owner's hands-on evaluation and requested iteration → reviewed source reconciliation and production parity → separate owner-authorised production promotion.
