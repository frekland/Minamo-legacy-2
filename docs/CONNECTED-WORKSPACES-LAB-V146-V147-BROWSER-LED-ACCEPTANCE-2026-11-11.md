# Visual Lab V146–V147 — Browser-led cross-domain acceptance (11 November 2026)

**Status:** V147 deployed successfully to the existing owner-private Visual Lab. Production remains V149, unchanged. PR #99 remains draft and unmerged. The public PR branch is **not** a byte-for-byte mirror of the deployed private Lab; per the owner's decision, source reconciliation is deferred until the Lab scope is complete and personally accepted.

**Lab:** https://minamo-visual-lab.jscymru.chatgpt.site/

## Approach and evidence boundaries

This slice followed the actual UI as a user: Library across All/Other, River Cherwell Project Connections and saved editions, contextual Your Work, Note editing/read-back and pinned deep links, and Settings → GPT & context. Browser-observed defects were checked against server contracts and then retested after deployment. MCP availability was used to distinguish missing UI discovery from missing canonical data; a separate preferences readback checked persisted configuration.

These are **observed interface and API behaviours**, not an assertion that a new GPT conversation reconstructs every historical interpretation or that all permissions and native artefacts are accepted. Constructed Lab material remains explicitly distinguishable in persisted provenance; the Lab's pages should not be blanketed with repetitive test disclaimers.

## Defects found and corrected

| Observation in browser | Cause / change | Post-deployment acceptance |
| --- | --- | --- |
| Library appeared empty despite 11 canonical illustrative Library Articles retrievable through MCP. | Library GET/UI did not opt into synthetic entries, although Lab examples were constructed. Made the Lab Library request explicit `includeSynthetic=true` and honoured it on the server; ordinary MCP search continues to suppress such entries without an explicit request. | V146: **All → 11 Articles**, Other → 2 Articles, Article pages and inbound exact links opened. |
| Cherwell Project Connections had a Note pinned to two Project passages, yet Project → “Find connected writing in Your Work” displayed zero records. | Personal-work direct-reference SQL and browser contextual/unlinked classifier omitted `pagePins`, although Connections/MCP already understood them. Added explicit pin references to both selectors. | V147: Cherwell context returned **one related Note**, unrelated creative Note absent; opened Note, inspected both pinned passages and returned to the exact Project rendition/section. |
| Project Connections repeated “Recent saved changes” beside edition history. | Duplicated navigation rather than improving understanding. Removed redundant block while retaining exact links and reciprocal relationships. | V146 browser showed less duplicated chronology. |
| Project saved-editions history overemphasised small edits. | Default to materially changed editions, with transparent counts and “Show all” for full chronology. | Cherwell showed **5 material editions from 8 inspected**; opened historical r31, then returned to current r37. |

### Implementation identifiers

- **V146** source: `f0ae25a66b14884452b19a1ab603de2609807e9d`; deployment `appgdep_6af49701a20c819186b6e8af5782e903`. Focused tests **43/43**, typecheck and build passed.
- **V147** source: `e83205c93ad2bcd27feb56876b686e3898ca3d44`; deployment `appgdep_6af49a27f6c8819195a97b86e1cc5d6f`. Focused tests **37/37**, typecheck and build passed.
- Did **not** run the whole stale/legacy regression suite.
- The latter patch includes focused old-edition page-pin, unrelated Note, owner isolation, contextual MCP query and unlinked classification coverage. A proposed extra `projectComposition` SQL union hit Cloudflare D1's “too many terms in compound SELECT” limit and was **not** retained; this is an architectural risk, not a passing implementation.

## Settings acceptance

In Settings → GPT & context, the browser exposed six owner-facing preference groups: context detail, related material, initiative, Project writing detail, Project editing and MCP tool access.

Temporarily switched MCP access to **Read and preview only**. The installed MCP's collaboration-preferences readback reported revision 5 and `mcpTools: read-only`. Restored **Read and save when asked**; subsequent readback reported revision 6 and `mcpTools: authoring`.

This verifies a live browser → persisted preference → MCP read loop. It **does not** verify dynamically removing advertised tools from an already attached ChatGPT connector, or that every mutation endpoint rejects a prohibited write under read-only settings. Those require separate negative-control acceptance and possibly a new connector session.

## Critical UX observations

1. **Library classification is wrong for science.** River Cherwell is an Other Project, while two supporting scientific Articles (“Comparing uneven time series” and “Reading Environment Agency water-quality observations”) and their “Working with environmental data” Subject have `learningScope=computing`. The Other Library view shows 2 Articles and no Subjects, hiding scientific context unless the user selects All/Computing or follows an exact citation. Do not arbitrarily relabel computing artefacts: separate *where a person works* from *what an item is about*, and allow cross-domain discovery.
2. **Your Work is still administratively noisy.** On a one-Note contextual result, two rows of filters, a “Legacy Journey” option, “Select saved work below to organise its connections” and generic “Article context” labels overwhelm the actual writing. Its right-side blank area is large. Cards need clearer human-readable context and fewer controls in the primary scan path.
3. **Provenance display needs proportion.** A small “Note · Synthetic” marker remains on Your Work cards, despite the removal of intrusive top-of-page “TEST ONLY” banners requested by the owner. Preserve the true provenance in data and inspectable detail, while leaving the Lab free to resemble the intended everyday product.
4. **Notes dock can obscure work.** The large dock opened over the contextual Your Work view. Exact pinned links worked, but cross-surface navigation should not require managing overlapping surfaces.
5. **Preferences are functional but dense.** Six radio-group sections are understandable; the explanatory “What changes” content extends below the modal viewport. Investigate progressive disclosure and responsive layout after contract validation.
6. **Edition filtering has a limit.** Exact editions are available and named honestly, but a material-change heuristic cannot explain *why* a scientific hypothesis, Japanese usage or visual composition evolved. Author explanations, evidence and uncertainty remain necessary; GPT must not fabricate causes from diffs.

## Architectural diagnosis

The strongest finding is **relationship-query divergence**. Project Connections and MCP understood `pagePins` while Your Work did not. The current approach maintains several similar but nonidentical reference traversals (explicit links, annotations/pins, compositions, bookmarks, renditions) across UI, MCP and SQL. Adding another `UNION` term exposed the D1 compound-select ceiling. This pattern makes cross-domain regression likely as more authored relationships appear.

A preferable next slice is a **shared permission-aware typed relationship projection or normalized index**, used consistently for inbound/outbound discovery, contextual Your Work and MCP context. It should retain source revision, source edition, anchor/passage, link direction, author/provenance, owner scope, last-write/conflict behaviour, and support standalone Notes or investigations without forcing Projects or Work threads. Maintain exact editions even if the current target has since changed.

A second structural issue is **workspace taxonomy versus subject taxonomy**: Library discovery should not silently exclude domain-relevant material merely because its original learning scope was Computing. Home, Projects, Library and Your Work should give consistent paths to the same saved material while preserving user workspace preferences.

## PR #99 standing against its objectives

| Area | Current assessment |
| --- | --- |
| Saved Projects, Notes and Library exact references | **Substantially implemented, now improved and browser verified on Cherwell;** not exhaustively accepted on all content types. |
| Fresh-chat MCP continuity | **Viable in demonstrated read/reconstruction flows, not complete proof** of all four domains, long-history precision, authorship or mutation controls. |
| Work relationships that arise naturally | **Partially achieved.** The page-pin defect proves several traversal paths remained inconsistent; no compulsory thread should be introduced. |
| User-controlled GPT and MCP behaviour | **Persisted settings/readback verified** across browser/MCP. Hot tool-discovery and denied-write behaviour still unverified. |
| Cross-domain coherence | **Improving but materially incomplete.** Cherwell's support material vanishes under Other; creative/Japanese/computing contrasts still require full end-to-end repeat. |
| UI calm and discovery | **Better**, but contextual Your Work, Library taxonomy, Notes dock and Settings still merit focused visual work. |
| Provenance/permissions/revision integrity | Exact old-edition links and one owner-isolation fixture pass; systemic source-authority, write-policy, concurrency and coverage audit remains. |
| Production feature parity and code reconciliation | **Not ready / intentionally deferred** until the owner has assessed and accepted the Lab. Public PR branch must never be represented as the deployed Lab code. |

### Recommended next substantial phase, Lab first

1. **Cross-domain discovery and interface coherence:** decouple workspace from subject classification; validate Home/Projects/Library/Your Work across Cherwell, visual composition, Japanese Live and Radio Island. Simplify contextual Your Work and Note overlay using the browser.
2. **Canonical relationship projection:** consolidate reference traversal and permissions, cover Note page pins, citations, annotations, flags, saved Library links, independent Notes, exact old-edition references and natural authoring. Add fixtures and negative cases so identical relationships appear in UI and MCP.
3. **MCP contract and authorisation acceptance:** new conversation cross-domain reconstruction, long history/truncation limits, provenance/uncertainty, read-only denied mutations, changing tool exposure and revision conflicts.
4. **Remaining native experience tests:** drawing/tldraw, images, packaged game, Python Canvas, mobile and responsive controls, data recovery; fix defects found.
5. **Only after owner sign-off:** reconcile and verify public source against final private Lab implementation, prepare targeted production migration and a separate deployment/rollback decision. Do not deploy production under this PR's Lab commission.

Owner's Lab authoring policy remains: realistic, substantial constructed Projects/Notes/annotations/flags/Library content is welcome for acceptance, with true provenance stored, no redundant page-wide synthetic warnings or invented learner achievements. PR #99 remains draft.
