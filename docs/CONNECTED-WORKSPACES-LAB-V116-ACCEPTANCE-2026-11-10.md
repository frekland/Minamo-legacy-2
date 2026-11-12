# Minamo PR #99 — Independent Radio Island continuity acceptance and Lab V116

Date: 10 November 2026. **Visual Lab only**. Production V149 was not changed, and PR #99 was not merged.

## Method and cold-start boundary

This investigation began in a new GPT conversation. Until the cold-start investigation and meaningful continuation were complete, the assistant used only the currently installed **Minamo Visual Lab MCP connector** for Minamo content and collaboration policy, plus local Python to independently execute source retrieved from MCP. It did not read PR #99, architecture papers, V113–V115 reports, or other agent conclusions first.

- Enumerated the connector tools and read global collaboration policy.
- An ordinary query for *Radio Island* returned a user Note but not the Project; the Project record was **synthetic/test-only** and excluded from default results. An explicit `includeSynthetic: true` query found it. This is a material discovery caveat, not proof of seamless default resume.
- The first `get_minamo_learning_context(scope=resume)` query did not locate Radio Island. Retried through record queries, Project composition, working context, revisions, and linked material.
- Project ID: `TEST-ONLY-a61-radio-island-code-history`; starting **revision 34**.
- Identified seven Python modules, a retained test suite, six Project sections, four authored Work questions (engine, replay, abandoned scoring design, running the game), historical alternatives, revisions and source links.
- Read a real user Note, a synthetic evidence caution Note, and a Library article about immutable state/reproducible tests. Several links retained an older exact edition and surfaced a newer-edition hint; no revision was silently replaced.

The reconstructed design was a deterministic cooperative mystery with an eight-place map, seeded clues, immutable state and replayable validated actions. The long history of scored/race variants was an **authored synthetic development fixture**, not a record of a real person's playtests. Prior output and tests were evidence of local Python executions only; no human entertainment/usability conclusion was justified.

## Substantive continuation through the installed MCP

The assistant reconstructed the exact stored Python package and test suite in an independent local Python environment. All **56 baseline tests passed**. It then reproduced an untested error:

1. The map validator accepted two disconnected ordinary-walking components (provided each place appeared on some ordinary route).
2. A ticket-only edge could misleadingly bridge components, although tickets are not an ordinary walking connection.
3. A single-pass iterable of routes could be consumed during validation and fail downstream.

The correction materialised the routes once and checked reachability through the ordinary-route graph. Three regression tests were added. **59 tests passed** via `python3 -m unittest discover -s tests -q`. These results do **not** verify browser execution, a shipped multi-file package, gameplay quality or real-user observations.

The assistant used the **actual installed Lab MCP** to preview and apply a revision-protected Project update, retaining the six canonical sections, composition, four Work questions, saved refs and provenance. Project advanced **34 → 35**. The update changed map source and tests and added a dated local-execution result and an explicit design/limits decision. MCP readback verified content, exact revisions and attribution. No Activity/Attempt or checkpoint records were created.

## Independence verdict

**Substantively successful, with limitations.** The assistant reconstructed enough of the technical context to identify a genuine defect, execute a coherent correction, record its evidence in the original Project, and verify readback—without access to the preceding conversation.

However:

- First-pass discovery did **not** find the synthetic Project; a capable GPT had to explore specialized read options.
- Multi-file code was stored as separate canonical code parts; the assistant manually reconstructed a local package. There was no first-class downloadable, version-pinned package.
- The Work question summaries were authored prose, not automatically brought into line with changes.
- Some related Notes and Library sources were linked to older editions. Edition drift was visible and honest, but a GPT still had to interpret relevance and provenance.
- A new continuation can see rev35, but discovering fresh material not attached to any Work question remains effortful.
- The constructed history has no genuine human game evaluation; technical tests cannot stand in for it.

After completing the cold test, PR #99 and V113–V115 reports were reviewed. They corroborated the retained synthetic fixture, earlier 56-test boundary, exact edition semantics, and reported limitations. The cold test's map defect and 59-test extension were not simply reconstructed from those reports.

## V116 implementation — exact Work source-change attribution

Isolated Visual Lab source commit: `a0e9d313c43d53f13d4756501ba323512dc09d83`.

- `readProjectChanges` now returns `linkedThreadIds` for changed canonical part identities **only when** those parts are currently and exactly referenced by a Work question.
- It excludes historical pinned editions, unresolved identities, explicit earlier-material links, and unrelated new parts. This is deterministic relationship evidence, **not** a semantic inference or an automatic update to prose summaries.
- Added `threadMatchBasis` to describe the exact matching rule.
- Questions UI offers an expandable recent saved-changes view and highlights which currently linked source parts were revised, added or removed.
- Owner isolation, revision paging and source-rights boundaries remain enforced.

Focused test evidence: **11/11** (Project changes, Work references, working context); `pnpm typecheck` passed; `pnpm build` passed. The build still emits pre-existing browser externalization and large-chunk warnings. The entire historical suite was deliberately **not** run.

V116 deployment:

- Site: `appgprj_6aeba0aa528c81918be19dd51427b2cb` (owner-private Visual Lab).
- Version: `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_ecd99bed59588191bb6bd7175d4e2f94`
- Deployment: `appgdep_6af35f0361a08191a51fb3375d5887df`, **succeeded**.
- URL: https://minamo-visual-lab.jscymru.chatgpt.site/
- No tool input schema change; reinstall of the installed MCP connector was not required.

**Live installed-MCP verification** of revision 35: changed `a61-map` attributed to engine question `current`; changed `a61-tests` attributed to replay question `replay`; added local run and decision records had **no** invented question attribution. The installed connector returned the matching basis and actual rev35 changes. This is live MCP acceptance, not solely a local fixture test.

**Cloud Browser** (signed-in owner session) displayed Radio Island rev35 and its four Questions. The engine and replay questions visibly surfaced rev35 updates to the correct current source; 59-test explanation was accessible in the Project. Visual inspection found the initial disclosure noisy: it listed all 12 recent Project revisions as well as the linked ones. A follow-up source change filters the display to revisions linked to the selected question; its deployment/acceptance must be tracked separately, not assumed from V116.

## Collaboration policy and checkpoint boundary

MCP global policy readback was revision 4: context depth `balanced`, related material `saved`, initiative `requested`, authoring `balanced`, editing `direct`. Radio Island's Project override revision 2 contained no non-default overrides. Earlier Lab acceptance documented observable hide/restore of saved material; **this independent run did not change settings and does not claim exhaustive fresh verification** of all policy behaviours.

Checkpoint-free authoring remained intact in this tested path: a canonical content update, not a mandatory Stage/Intent/Outcome/Checkpoint template. Legacy read-side `ProjectContinuation` and `project-context.ts` still contain `checkpoint` names and UI return labels for historical learning-development data. They are not evidence of mandatory new authoring. They need a carefully scoped read-only compatibility audit, not blind destructive renaming.

## Product assessment and next priorities

1. **Multi-file package**: retain exact file paths, source bytes, test/run associations, and download/rebuild from a pinned Project revision. No simulated execution claims, no separate Attempt/Activity infrastructure.
2. **Work summaries**: retain authored narrative for intentions/conclusions, derive only mechanically provable change notifications. Consider a lightweight, optional stale-summary indication; do not auto-invent a revised interpretation.
3. **Discovery**: make selection and inclusion of synthetic fixtures explicit in testing; ordinary live Projects must be discoverable through compact resume workflows.
4. **Sources and revisions**: make old-vs-current attribution readable for human readers without flooding the Questions view with technical metadata.
5. **Personalisation**: test global and per-Project preference changes across fresh conversations, verify effects on MCP payloads and editing policy, retain a stable tool surface.
6. **Historical read contracts**: retire misleading checkpoint labels without changing actual stored revision or source identity.

V116 adds a real deterministic connection from existing Work questions to changed canonical sources, but **does not yet solve** automatic thematic connection of entirely new observations, package reusability, nor refreshing human-authored question summaries.

All changes remained in Visual Lab and the PR #99 development record. Production V149 was untouched.