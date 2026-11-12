# PR #99 — V148/V149 browser-led cross-domain acceptance and remaining work (11 November 2026)

## Decision boundaries

- Owner-private Visual Lab is the development product. **Production Minamo V149 remains unchanged.** PR #99 remains draft and unmerged.
- The owner has explicitly **deferred public PR/private Lab source reconciliation until personally satisfied with the completed Lab scope and experience**. This gap is an acknowledged later integration gate, not an implementation blocker now.
- Substantial new synthetic Projects, Notes, saved Library material, annotations, flags, revision histories and activity are expressly authorised for Lab acceptance. Truthful provenance, permission, exact rendition and revision semantics remain mandatory; repeated synthetic banners are not desired in ordinary UI.
- Do not add compulsory Work threads, learner achievements, checkpoints, Activity/Attempt workflows or GPT handoff documents. Projects are optional for independent Notes and questions.

## Deployed source and verification

| Lab | Source SHA | Verification | Outcome |
| --- | --- | --- | --- |
| V148 | `f64136dcf95b0987a4be5b164c39cd072b76832e` | 21 focused tests; typecheck and build | Published owner-private |
| V149 | `78a9f355a946cd7f0ed842efb89cc624703d3b50` | 22/22 focused tests; typecheck and build | Published owner-private |

V149 deployment `appgdep_6af4a2692a5881919d0ea4cc8215efda` succeeded. Sites independently returned latest version **149**, active project, at `https://minamo-visual-lab.jscymru.chatgpt.site/`. This is Lab V149, **not production V149**. Do not infer identity from coincident version numbers.

### 1. Project → connected Your Work → Show all → refresh

Live Cloud Browser, in Other scope:
1. Opened River Cherwell Project and its connected-work navigation.
2. Your Work displayed the one Note relevant to this Project, correctly contextualised rather than a global notes dump.
3. Clicking **Show all work** cleared the contextual filter **and** removed `context=journey:...` from the URL while retaining Other scope.
4. A real browser refresh retained the unfiltered state, displaying 10 Notes. Previously, the URL silently restored the stale context after refresh.

V149 implements `personalWorkContextSearch` and updates the browser's current history state on context-filter changes. The focused regression covers both clearing and replacing context, preserving unrelated view and workspace parameters.

### 2. Science discovery and classification: source of confusion

The River Cherwell investigation is a science Project in Other, but a related Subject and two Articles had been classified Computing because their *methods* involved Python. Other Library therefore misleadingly showed no Subjects. Existing immutable classification sidecars support deliberate source edits independently of canonical content.

Using the installed Lab MCP, read exact current revisions and wrote owner-authorised, **metadata-only** CAS classification for:
- Subject **Working with environmental data** (`area:ms-09ad84416e7dcbbf85b3c01997f35a7f9ba3a31a`)
- Article **Comparing uneven time series** (`article:ms-af1a9e59ae3f6fa6077c5d8d2d7a7ea5aee1d4c4`)
- Article **Reading Environment Agency water-quality observations** (`article:ms-5e2781d9cfe73b5d59816c7603528ed979beb105`)

Each now has an explicit `learningScope:{version:1,spaces:[],provenance:'classification'}` and `learningScopeRev:1` from 0. Canonical `rev:1`, immutable rendition, and content were unchanged; MCP readback established this. Browser Other Library subsequently displayed four Articles and the science Subject with two articles. Cross-subject links remained readable.

**Architectural implication:** the sidecar contract is promising, but organisation should distinguish subject matter from techniques used. A science Project may contain Python without belonging exclusively to Computing. Currently, the user lacks an intuitive on-site classification control for existing records; 'Other' is a residual bucket, not a meaningful science/creative subject taxonomy.

### 3. Home, Project discovery, visual reading and citations

- Live Home All shows recent Projects, Notes, Library and independent questions, with a Browse all Projects path. The all-subject Project listing found **23 Projects** and supports card/list and search. Other scope found nine Projects.
- The Project detail for **Visual composition — framing and attention**, revision 4, showed three navigable sections and hypothesis changes. Its Connections panel, after loading, showed an independently authored Note r5 citing Project r4, one exact Project citation, and an Article with *both* outgoing Article r1 (older retained edition) and incoming Article r2 (cites Project r4). These are separate authenticated saved relationships, not inferred title matches.
- **Actual browser visual defect:** many Project and Note titles and previews prominently repeat `TEST` / `TEST ONLY`, though the owner already knows the Lab is synthetic. Connections previews expose raw Markdown (e.g. `#` and `**`) and long provenance preambles; the two-column panel therefore looks more like acceptance instrumentation than a calm reading experience. This is distinct from genuine source-authority metadata, which must remain retrievable.
- The visual composition Project has a duplicated adjacent section heading in the reading view, with a tall header and a separate Connections expansion pushing content down. Content is legible, but long-history navigation remains cognitively heavy.
- The Notes dock remains present at screen bottom. The large Home hero and context controls deserve another visual-density review, particularly on desktop and narrow mobile layouts.

**Presentation direction for the next slice:** display-only removal of *explicit synthetic acceptance labels* for records actually marked `synthetic:true`, never rewriting canonical titles, citations or MCP names; cleaned Markdown snippets that retain substantive provenance; and context/heading-density adjustments. Test on creative, science, Japanese and computing records, not just one Project.

### 4. Focused regression diagnosis (local only; no V150 claim)

An additional isolated Library runtime test run initially failed two assertions (restricted reference discovery and authored order). Code inspection found those isolated fixtures were marked synthetic while requests omitted `includeSynthetic=true`, now required after ordinary Library queries excluded synthetic records. Updating *only these test requests* yielded **6/6 passing** across the Library rights/order and adjacent workspace-label tests. The rights test covered source revocation, retained redaction, cursor epoch and cross-principal fences; the authored order test covered scoped and foreign/trashed exclusions.

**Caveat:** the older performance sample still queries 70 synthetic records without `includeSynthetic=true` and therefore benchmarks **zero returned items**. Its low query count is not credible as a nonempty-corpus performance guarantee; change this fixture before claiming representative Library performance.

Two additional workspace SSR tests had only stale label expectations; local selective assertion updates passed 3/3. This is targeted test-maintenance evidence, not a run of the entire legacy regression suite.

The development executor became unavailable while starting a subsequent display/classification slice. **No V150 source commit, build or deployment is claimed here.** Some test-only and presentation edits may be uncommitted in the disconnected local checkout. Reinspect its Git status before continuing; do not replay or overwrite blindly.

## Critical progress toward original PR #99 ambitions

| Ambition | Standing |
| --- | --- |
| Cross-conversation GPT continuity | Substantial retrieval contracts; several bounded fresh/conversation studies, but no exhaustive proof of reconstruction and *useful authored continuation* across diverse long histories |
| Durable Project ↔ Note ↔ Library relationships, exact revisions | Strongest area: browser and MCP confirm bidirectional exact-edition citations; multiple independently authored facts remain distinguishable |
| Natural, flexible independent work | Partial: Notes/questions can stand alone, but relation discovery depends on heterogeneous traversals, pagePins and explicit authoring. A flat list or duplicated relation projection may still miss meaningful context |
| User-controlled MCP collaboration | Persisted settings and MCP readback verified; negative live tool-denial and tool-list hot-refresh have not been convincingly accepted in a fresh installed connection |
| Integrated calm Home/Projects/Library/Your Work | Improved routes, direct links and context filters; still visibly crowded by test wording, long excerpts, duplicate headings, and weak subject classification |
| Provenance, rights, persistence | Sidecar CAS and immutable source renditions positively verified; current permission coverage and global source projection still require deeper fault and scale testing |
| Prod feature parity and integration | Lab approximates more real product features, but tldraw, packaged game, Python, mobile, recovery and full cross-domain editing need deeper parity passes; public PR source is intentionally not mirrored yet |

## Next integrated Lab slice — prioritised

1. **Visual context and classification:** user-editable existing-record learning space through metadata-only CAS with conflict recovery, deliberate Other vs Computing vs Languages, and correct current-scope navigation after reclassification; retain cross-disciplinary content, never re-author canonical editions to move a subject. Remove repetitive synthetic acceptance labels from *presentation* only; make connection snippets readable. Browser-accept creative, science, Japanese, Radio Island across Home, Projects, Library and Your Work.
2. **Stable canonical relation projection:** identify and consolidate the disparate incoming/outgoing/pagePin/subject membership queries behind one owner/rights/edition-aware contract. The previously observed D1 `too many terms in compound SELECT` error when adding relationship unions is a real architectural constraint, not merely a presentation issue. Preserve distinct authored citations, precise source versions and bounded pagination. Cover science, language and visual composition.
3. **Fresh installed MCP negative acceptance:** confirm live read-only tool-list behaviour after setting changes, deny cached mutation, reconcile the exact same operation safely and restore authoring; prove new conversation can change an existing revisioned Project or independent Note based solely on saved content and source authority.
4. **Long-history clarity:** test across 20+ revisions and several separate Notes/Library citations. Navigation should answer “what was reconsidered, and why?” without tracking user achievements, injecting an administrative chronology or claiming progress from GPT edits.
5. **Broader parity and failure handling:** drawing/tldraw conflict, images, bundled games, Python Canvas, narrow/mobile reading, retained editions, permission loss/recovery, pagination and nonempty-corpus performance. Use focused coverage per slice, not the entire stale legacy suite by default.
6. **Only after owner acceptance:** reconcile private Lab and public PR source reproducibly, verify commit/archive/source and migration delta against production baseline, then separately consider production integration.

Production must not be deployed and PR #99 must remain draft during these Lab phases.
