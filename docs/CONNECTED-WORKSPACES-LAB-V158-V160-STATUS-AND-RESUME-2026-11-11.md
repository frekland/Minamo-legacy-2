# PR #99 — V158–V160 implementation, acceptance and continuation

11 November 2026. Work paused at the owner's request to conserve remaining usage. **The full PR #99 Lab commission is not complete.** This is a resumable state report, not a claim of comprehensive acceptance.

## Exact state and boundaries

- Owner-private Lab: **V160**, https://minamo-visual-lab.jscymru.chatgpt.site/ .
- Latest private source: `c143716f631f3ae4d94d3c72810d5fd75103d9fb`.
- V160 deployment: `appgdep_6af4c4091c808191afd259a9705bf437`, **succeeded**, MCP present.
- Production remains **V149**, unchanged. PR #99 remains draft/unmerged.
- **Public/private source reconciliation is explicitly deferred until the owner personally accepts the substantive Lab work. Do not make reconciliation or production migration the next task.**
- Private implementation checkout used in this session: `/workspace/scratch/a9b17658d605/lab`. Its changes are committed and pushed to the existing private Sites source repository. A later agent should retrieve the latest private source through Sites rather than depend on that transient checkout.
- No new Site, access change, database reset, production deployment or recovery activation occurred.
- Substantial synthetic Lab authoring remains authorised. Preserve source truth without repeated page-top test banners.

| Version | Private source | Deployment |
|---|---|---|
| V158 | `6367ce32bf737d7757f8c7a07ac2f7bc0f48c715` | `appgdep_6af4be57ddec8191a4b3cfcb3a9d8b0e`, succeeded |
| V159 | `cf2db53d1a866f6953a51e57f9559e6dd0bc31b3` | `appgdep_6af4bfae15bc819199d473e50fae97bc`, succeeded |
| V160 | `c143716f631f3ae4d94d3c72810d5fd75103d9fb` | `appgdep_6af4c4091c808191afd259a9705bf437`, succeeded |

## Owner decision — tldraw deferred (11 November 2026)

The owner confirms that the working tldraw licence is available only in production Minamo. **Defer tldraw functionality/acceptance in the Visual Lab. It is not a blocker to completing the remaining substantive PR #99 Lab scope or preparing for the owner's assessment.** Preserve the existing drawing implementation, saved data and truthful unavailable status. Do not pursue Lab licensing, copy production credentials, bypass the licence gate or deploy production. Drawing save/reload/image/conflict/MCP acceptance remains explicitly unverified in the Lab and may be revisited in a separately authorised integration phase.

## Implemented

### Shared saved-reference projection

New `lib/saved-relationships.ts` supplies `readWorkingContext`, the installed MCP working-context tool and the website Connections panels. Standalone Notes, Questions and Library records now receive incoming/outgoing references, rather than relying solely on the browser's loaded record subset.

It reuses existing RecordLinks and typed references: native diagram citations, Project composition references, Note page pins, anchors, excerpts and whole-record bookmarks. No extra relationship store, mandatory Work thread or inferred association was introduced. Two-reference Note paths remain explicitly derived paths.

Each destination is admitted through current ownership, source permissions, exact rendition and location checks. Incoming citations distinguish the citing source from the older/current target edition. Actor and synthetic provenance accompany relation receipts. Matching titles and co-visits never establish links.

Pages contain at most 12 relations and scan at most 24 candidates. `coverage.relationships.nextCursor` is passed back through the existing working-context `cursor` argument. It is separate from continuity-evidence pagination. Cursors bind selection, namespace snapshot and collaboration revisions; edits require restarting. UI provides Show more/Load more controls. Existing evidence cursors remain supported.

Project and generic reading Connections use this same service. V160 adds separate links to the exact cited edition for incoming non-Project references. Whole-record bookmarks are now included in the canonical extractor; inactive bookmarks are omitted from this relationship projection.

**Remaining architectural qualification:** legacy Project context, list filtering, graph and continuity-evidence adapters still exist. This change consolidates working/read-side relationships; it does not prove that every old retrieval path has identical enumeration or eliminate all duplication.

### Flexible subjects without a new hierarchy

Optional `learningScope.subjects` accepts up to eight distinct, trimmed labels of 1–64 characters. Existing classification sidecars/CAS handle them, without changing canonical content revision or rendition. Labels are not silently copied onto linked independent Notes.

Manage → Learning space now includes Subjects. Project cards show labels; Project/global record search can find them. Search evidence explicitly labels these as **current metadata**, includes classification revision and does not present a label as an immutable passage.

Live examples: creative Project r4 now has Photography / Visual composition; Cherwell r37 has Water quality / Environmental science; the independent framing Note r5 has Photography / Research methods; Radio Island r36 has Game design / Python. Their canonical revisions remain unchanged. Broad Computing/Languages/Other navigation remains; these labels supplement it rather than establish a new required taxonomy.

The server's authoring schemas now describe subjects. Existing installed command-tool authoring accepted them through its unknown data payload. Typed manuscript/Project clients may require catalogue refresh to expose the new optional field; this session did not reinstall the plugin.

### Browser-led corrections

- Project management was displaying related Note saves under its recent changes. It now displays only that record's own saves, labelled Website save / GPT save / System change rather than implying human authorship from a browser channel.
- Synthetic Note connection previews now use the same substantive excerpt rule as Home/Your Work.
- Drawing previously said “Drawing loaded” while tldraw rendered a blank editor. The actual DOM contained `data-testid="tl-license-expired"`. Installed tldraw 5.5.2 uses that gate for expired **or unlicensed-production** states, so the exact underlying key problem is not established.
- V160 detects that gate, disables drawing saving and shows: **“Drawing unavailable: tldraw has not accepted its licence for this site. Saved drawing data is preserved.”** Live browser acceptance confirmed that visible alert after V160 deployed. No licence bypass, key modification or drawing replacement occurred.

## Independent MCP / browser evidence

### Continuity and natural contributions

This new conversation independently discovered current work through installed MCP, read collaboration preferences, architecture/reports and the actual V157 private source. It retrieved creative, Cherwell, Japanese and Radio Island context, plus independent Notes/Questions.

Japanese context distinguished current Project r11 from the Note's two exact r10 page pins. Creative context distinguished the Project's citation of Article r1 from Article r2's return citation. V158 live MCP reading the standalone creative Article returned those directions and the independent Notes, with actor/synthetic attribution.

A new independent Note, **Framing — separate the viewing task from the contrast**, was created through MCP:
`lab-framing-task-and-contrast-20261111`.
It separates contrast/direction comparisons and viewing tasks, citing exact framing Note r5 and Library Article r2. It asserts no viewer observations. Replaying the identical create operation returned `replayed:true`; a later read of its source Note rediscovered the incoming contribution without being supplied its ID.

Browser opened that Note in the persistent dock. A subsequent automated typing command timed out and inserted partial text at the wrong position. The task-created synthetic Note was closed and restored to its original body through exact-revision MCP update: **current r5**, original body/rendition restored. Interrupted browser saves r2–r4 remain truthful synthetic history; they must not be called learner contributions or a successful editor acceptance. Saved actor `user` represents the website channel here, not proof of a human author. No original learner Note was edited.

Another subsequent *conversation* reading this new contribution has not been tested; later independent tool reads in this conversation are not that evidence.

### Preferences: real denials, not just readback

Browser temporarily changed global MCP access to read-only. A cached installed saving tool was rejected with `mcp_read_only`; reading the proposed probe ID confirmed no Note existed. Browser restored saving.

Browser separately selected Project Previews only. An exact no-content-change Project update was rejected with `project_preview_only`; direct Project editing was restored.

Final installed MCP preferences: global **revision 10**, balanced context, saved related material, requested initiative, balanced authoring, direct Project editing, authoring tools. These are the original values. Dynamic client catalogue rediscovery was not independently demonstrated; cached-call server enforcement was.

### Subjects and retained artefacts

Browser searching Projects for “Photography” found the creative Project and its labels. Manage Project exposed the editable optional subject field. Installed MCP searching Photography without exact IDs found both the Project and independent Note; match evidence said `subject-label`, `metadataOnly:true`, classification rev1, and current-record URLs.

Radio Island composition read still returned r36 and all **eight available files**, downloadable, 44,868 bytes, with source hashes. No package files changed and its historical 59-test result was not rerun or newly claimed.

The retained synthetic private image rendered in the browser. The packaged game created an isolated frame, but remained white at “Runtime loading”; its frame declared the pygame-web 0.9 bootstrap script. This session did **not** establish successful game execution or the cause of the blank frame. Stop removed the frame and returned “Stopped.” Earlier successful game reports are historical evidence, not a pass for this run.

Drawing create/save/reload/conflict acceptance is **owner-deferred for the Lab** because the working licence is only in production. It does not block the remaining Lab scope. Preserve its saved Note/assets and unavailable status; do not pursue a Lab key or bypass licensing.

Mobile viewport controls were attempted, but the observed viewport remained 1363×936. **No mobile-width pass is claimed.** Browser native AX/screenshot observations sometimes lagged DOM actions; later acceptance used fresh Playwright DOM snapshots and screenshots. Do not misdiagnose those stale observations as proven app navigation failures.

### Recovery

Created and independently verified protected backup:
`archive-9193e7771edfa2e266fa6dbd06445fda7f27a9f387a24784`,
namespace version **1364**, **13,802,955 bytes**, state ready / valid true. Verification covered 58 records, 258 revisions, 14 classification sidecars, seven images and one media asset. No recovery staging or activation was performed. The protocol's legacy “checkpoint” action is a backup operation, not a learning requirement.

## Validation

- Working context + Project connection checks: **15/15 passed**.
- New generic relationships: **3/3 passed**; final combined run with six presentation tests: **9/9**. Includes 27 incoming references over multiple pages without omissions/duplicates, standalone typed diagram references, current vs exact older editions, foreign owners, changed snapshots, and bookmark on/off.
- Flexible subjects + existing subject/search/scope checks: **14/14 passed**. Includes CAS/replay, no canonical revision change, cross-owner denial, invalid/duplicate labels, metadata search coordinates, non-inheritance and existing classification recovery coverage.
- Drawing attribution/document/media checks: **6/6 passed**.
- Typecheck and production build passed for all three releases, including final drawing-status correction. Existing bundle/Piper warnings remain warnings.
- No whole legacy suite. The earlier eight stale Home/Continue assertions were not repaired or claimed passing.
- Exact-citation affordance, management-feed filtering and drawing-gate status received typecheck/build; the drawing alert was live-verified. The newly added generic cited-edition click affordance and final filtered management feed still need post-V160 interaction verification.

## Standing against the commission

| Area | Standing at pause |
|---|---|
| Generic incoming/outgoing saved relationships | Implemented and substantially verified; broader legacy-adapter consistency still partial |
| Exact editions / provenance | Implemented; creative and Japanese MCP evidence; remaining full browser matrix incomplete |
| Pagination / negative integrity | Focused integration accepted; large live multi-domain pagination not yet accepted |
| Fresh-conversation contribution | Accepted for this new conversation continuing existing work; another later conversation remains untested |
| Independent Notes and Questions | Working; no Project or Work thread required |
| Flexible cross-domain organisation | Optional searchable labels implemented and live-accepted; broad workspace navigation still coarse |
| MCP preferences | Live cached-write and Project-preview denials verified/restored; client catalogue refresh not demonstrated |
| Home / Projects / Library / Your Work | Improved; comprehensive final owner-experience assessment incomplete |
| Notes dock | Opening/readback observed; automated edit interrupted/restored, so edit/concurrency acceptance incomplete |
| Drawing | **Owner-deferred, non-blocking for Lab completion**; working licence only in production, truthful error fixed, actual Lab drawing acceptance unverified |
| Images / code packages | Retained image rendered; Radio inventory exact/available; deeper interactive matrix incomplete |
| Packaged game / Python Canvas | Game blank in this run; Stop passed. Canvas not re-executed this session |
| Japanese dialogue, TTS, furigana, repetitive instructions | Retained functionality; remaining browser/audio/editorial acceptance not completed this session |
| Mobile | Unverified; attempted controls did not change viewport |
| Recovery | New live backup verified; new labels' recovery validation covered locally; live activation intentionally not tested |
| Production integration | Deferred, not authorised; production V149 unchanged |

## Resume here

1. Read this report, current PR/architecture and actual **V160 private source**. Do not reconcile public/private source or deploy production.
2. **Skip owner-deferred tldraw acceptance.** The working licence is only in production; preserve the Lab implementation/data/error state. No Lab licensing work or production credential transfer is requested. Continue with the remaining Lab scope.
3. Investigate the blank packaged-game runtime, and re-execute a retained Python Canvas. Preserve exact source/output authority.
4. Finish post-V160 connection-click and management-feed browser checks, mobile navigation/Notes layouts, Japanese dialogue/furigana/TTS/editorial density, and broader live pagination/revocation/preferences/concurrency acceptance.
5. Reassess every original PR objective and update the readiness matrix. Do not describe Lab scope as finished merely because V160 deployed.
6. Only after completed Lab functionality and the owner's own assessment may separately authorised source reconciliation/production integration proceed.

**Readiness:** useful for owner exploration of the new relationship/subject behaviour, but **not yet a fully accepted comprehensive Lab or completed PR #99 scope**. Work stops here because the owner requested a usage-saving handover, not because remaining gaps are waived.
