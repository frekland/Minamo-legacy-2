# Minamo — Connected Workspaces, Continuity and Personalisation

> Owner-approved development commission, 10 November 2026. This is a living architecture and lab-development PR. **It is not a production-release PR.**

## Product intention
Minamo should preserve not only what someone knows or makes, but how their curiosity, questions and understanding develop. Its surfaces—Projects, Library, Notes, My Work and ChatGPT via MCP—should be different views of one durable, source-grounded workspace.

## Agreed setup sequence
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
