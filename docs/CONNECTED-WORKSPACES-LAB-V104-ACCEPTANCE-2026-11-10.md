# Connected Workspaces — Visual Lab V103–V104 implementation and acceptance (10 Nov 2026)

**Scope:** owner-private Minamo Visual Lab only. Production remained V149; PR #99 remains open/draft and unmerged. This receipt adds to the existing V98–V102 reports; it does not supersede their complete evidence.

## Deployed source and release identities

| Version | Lab source commit | Deployment | Result |
| --- | --- | --- | --- |
| V103 | `ec838a15c1d6ca02cb309c3800e491cc4be45f44` | `appgdep_6af2f301a5ac8191b33de7f4207ba9c4` | Succeeded, private MCP-enabled |
| V104 | `2aa0c6e2a1fe23b62ad7a6598c9848b4437cf963` | `appgdep_6af2f86e75888191b53e8fc046ff7fc4` | Succeeded, private MCP-enabled, environment set revision 2 |

Site: https://minamo-visual-lab.jscymru.chatgpt.site/. Version V104 source was pushed to the independent Lab source Git remote and packaged from the exact source commit. No public-production deployment or PR merge occurred.

**Source-of-truth caution:** These code commits currently live in the Lab's independent Sites Git repository, *not* in this public GitHub PR branch. PR #99 remains the architectural/acceptance ledger and cannot yet be treated as a standalone mergeable implementation. A future bounded code-port phase must reconcile it with public main/V149 rather than blindly merging a Lab snapshot.

## V103 code: authoring, saved relationships, preferences

1. **Checkpoint-free new Project authoring.** `lib/manuscript.ts` no longer creates a `Checkpoint` field for Project H2 sections, or warns that Intent/Outcome/Checkpoint are required. The new project manuscript is ordinary headings and prose, with optional author-chosen structures. Legacy explicit fields can still be read without dictating future writing. Tool descriptions in `lib/domain-handler.ts`, WebMCP text in `lib/beta-site-tools.ts`, editorial guidance and starter content were changed to stop encouraging checkpoints. The schema retains optional legacy checkpoint data for read compatibility.
2. **Saved canonical references imply connections.** `lib/atlas/project.ts` now reads the exact `projectComposition.blocks[].ref` and Note page pins as saved relationship evidence. The former duplicate outgoing `links` array is not required merely to make a source already embedded in a Project discoverable. Current owner/edition eligibility is checked independently during reads.
3. **Focused context starts from its Project.** `lib/working-context-read.ts` automatically seeds a specifically requested Journey/Project focus into the read selection if no other selected refs were supplied. It does *not* create a persisted working set, task priority, activity event, or inferred achievement.
4. **Project-specific GPT context control.** `app/project-context-settings.tsx` and styles add an on-demand three-field editor under Project options, with `Use global` inheritance and revision-checked saves. Existing global and Project preferences remain server-backed: concise/balanced/detailed; include/hide saved connections; only-on-request/may-offer connections. They govern MCP read projections and instruction hints, **not** write permission or automatic authoring.

V103 focused proof: manuscript preview/publish/revise/read without a checkpoint; focused Project relation read; TypeScript check; production build. Actual Lab MCP confirmed that a Project preference changed to concise with an effective evidence limit of 5 and then returned to global inheritance. The deployed browser's live WebMCP authoring preview described natural headings, without required progress labels.

## V104 code: fixes found through browser use

1. **Your Work now recognises inbound canonical Project references.** The server-side personal query locates eligible Projects whose `projectComposition` references a Work record; `/api/query` returns distinct `projectContexts`, and the UI displays the actual Project title. Its `Unlinked` filter and Project-context search include those saved incoming relationships. Neither Work content nor outgoing `links` is changed, and retained exact editions remain differentiated. Owner isolation, trashed Projects, and missing source editions are accounted for; the context list is bounded with an explicit incomplete flag.
2. **Terminal evidence provenance no longer assumes a human learner.** `lib/note-terminal.ts` now describes external terminal output with provenance in its Note, without saying that the learner ran a command or that Minamo executed it. This was a concrete defect observed in the real browser with GPT-authored synthetic Note output.
3. **Focused tests**: new `tests/pr99-incoming-project-context.test.mjs` verifies incoming Project context, Unlinked filter, exact old Note edition, no outgoing-link fabrication, link removal and cross-owner isolation. Updated semantic terminal provenance and the existing organiser test's stale `Attempts & runs` label. 31/31 tests passed together; `pnpm typecheck`, `pnpm build` and `git diff --check` succeeded. An earlier broader focused sweep also passed the discovery rights/continuation tests. No historical full suite was run.

## Longitudinal continuity — independent fresh-conversation test

Used the already retained, substantial **synthetic** Radio Island Python Project `TEST-ONLY-a61-radio-island-code-history` rather than generating another shallow fixture. It contained 28 saved Project revisions and actual multi-module Python source (`map`, `clues`, `state`, `engine`, `cli`, `replay`, tests), historical alternatives, executable run records and four Work threads. All fictional chronology and unobserved play remain clearly labelled synthetic.

This genuinely fresh conversation:
- Retrieved Project rev 28 through the installed Lab MCP `get_project_composition`, extracted the actual retained source code, ran `python3 -m unittest discover -s tests -v` in an independent local Python 3 process: **54/54 passed**, then ran the CLI demo.
- Investigated five reproducible shuffled-clue seeds under the identical eight-turn route: seed 11 produced echo 2 / keeper 6; seed 23 echo 4 / keeper 3. All had eight clues and were unfinished. This *revised* the assumption that a reproducible trace implies a stable narrative interpretation; no probability or human playtest inference is justified.
- Added a real executable regression `test_seed_changes_evidence_balance_without_implying_a_verdict`; reran the whole retained module: **55/55 passed**. Saved its exact Python code in Project section `tests`, and the uncertainty in `decisions`, through actual Lab MCP `apply_project_update`. Project advanced through revs 29–31 with earlier exact revisions retained.
- Created a synthetic, provenance-labelled Note `radio-seed-sensitivity-20261110`, corrected its capture provenance at Note rev 2, and pinned that exact Note edition plus synthetic Library article `ms-98b94cb793675a8a1dc907d4f2a1502c1ab054e7` in the canonical Project composition.
- Read `get_minamo_working_context` with *only* Project focus through actual installed Lab MCP. It selected the Project and independently returned both exact saved relations. The Project's legacy `record.links` was **empty**. It also found an earlier real user-authored Radio Island Note as separately dated continuity evidence, distinguishing it from synthetic GPT execution.
- Opened the deployed Lab through Cloud Browser: six-section long Project navigation, exact related Note and Library article under Decisions, Project Connections, Your Work, expanded terminal evidence and Unlinked filter. V104 readback showed the Note labelled with the correct Project, no longer “Unlinked”, and no longer “learner-provided”; Unlinked results did not include it.

**Preference toggle follow-up:** Using the installed `set_minamo_collaboration_preferences` tool, changed the Radio Island Project's exact per-Project revision 0 to `relatedMaterial:none` (rev 1). The next `get_minamo_working_context` response kept the explicit Project but returned zero relations and an explicit disabled-by-preference gap. Restored an empty Project override at revision 2; the following MCP read returned both exact Note and Library relations. No global preference was changed. This validates retrieval suppression and inheritance, not autonomous GPT suggestion behaviour.

This establishes that **one new GPT conversation can discover and meaningfully extend retained work** through installed MCP. It does *not* prove that a further completely fresh conversation with a refreshed tool manifest will author naturally without checkpoint language; that remains a specific next acceptance.

## Preference and checkpoint acceptance status

| Capability | Evidence | Status |
| --- | --- | --- |
| Stored global and per-Project preferences across reload / MCP | Server-backed revisions, real browser write and MCP readback | Verified for context depth |
| Context depth changes retrieval limit | Real Project concise override gave effective limit 5; restored inheritance | Verified |
| Saved material preference changes related read projection | Actual installed MCP: synthetic Radio Island Project override `relatedMaterial:none` returned zero relationships and `related-material-disabled-by-preference`; restoring `{}` to global inheritance returned its exact Note and Article again | Verified |
| Initiative may-offer hints | Server returns preference, but actual model behaviour is not deterministically enforced | Partial / advisory |
| New checkpoint-free manuscript creation and revision | Focused end-to-end source tests; fresh deployed WebMCP description and policy | Verified at server/browser preview |
| **Installed ChatGPT MCP authoring-tool description** | Current chat's `publish_minamo_manuscript` definition still cached older mandatory Intent/Outcome/Checkpoint wording after deployment | **Not yet accepted; connector reinstall and fresh conversation required** |
| No Activity/Attempt product | Old retained engine and some historical views/contracts remain in Lab source; not introduced by these slices | **Not fully retired** |

## Remaining critical work

- **Connector manifest refresh**: owner should reinstall *Minamo Visual Lab* MCP plugin; in a truly fresh conversation check the authoring tool descriptions, publish/revise a naturally structured Project without mandatory checkpoint labels, and confirm accurate retrieved context/preferences. Do not conflate live WebMCP/server text with the installed ChatGPT MCP manifest.
- **Semantic continuity beyond explicit refs**: automatic projection removes duplicated bookkeeping for *existing* canonical refs, but connecting a newly created Note to a Project still requires a deliberate choice to embed or pin it. No speculative auto-linking from similar titles or inferred intentions is implemented, intentionally. Cross-Project relationships and changing interpretations deserve their own bounded model.
- **Your Work breadth**: normal personal Work currently covers Notes, Annotations, Flags and Runs, not a genuinely unified native artefact catalogue. The query's per-page inbound context scan has a 240-edge cap and reports incomplete enumeration rather than pretending completeness.
- **Old Activity/Attempt infrastructure and checkpoint-specific historical labels** still exist for compatibility; owner wants a separate retirement pass that does not orphan user-owned data. It should not be reintroduced into the new Project model.
- **UX**: long section/topic titles still wrap or truncate; the A5 visual direction is improved but long coding Projects remain dense. Mobile and drawing/packaged-game deep acceptance were not repeated in these slices. No user-device/cross-device persistence test was performed.
- **GitHub integration**: port appropriately scoped Lab source changes to public PR #99 only once code compatibility with V149 baseline is reconciled; do not merge or deploy production during Lab exploration.

**Recommended next slice:** reinstall/refresh Lab connector and run a truly new-conversation authoring/continuation test; then add a restrained, user-controlled “include this in Project” action for a Note/Work record with exact edition and clear ownership, preserving simple UI and the canonical reference mechanism.