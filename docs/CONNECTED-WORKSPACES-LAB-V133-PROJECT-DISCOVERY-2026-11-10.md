# Visual Lab V132–V133 — Project discovery, Home and subject navigation (10 November 2026)

## Owner problem and observed cause

The owner could see only a handful of Projects on Home, and cycling learning spaces did not reveal the substantial existing Lab corpus. Prior to V132, the Home shelf and Projects catalogue explicitly discarded `synthetic` Projects, even though this owner-authorised Lab contains numerous constructed Project histories. The normal workspace snapshot is also capped by records of unrelated families; it is not a complete Project index. Finally, switching learning spaces forcibly returned the user from Projects to Home. Subject metadata was missing on 16 of 23 existing Projects.

**Scope:** Visual Lab only. Production Minamo V149 unchanged; PR #99 remains a draft and unmerged. No synthetic history was represented as learner achievement, no Activity/Attempt workflow was introduced, and no checkpoints were authored.

## Implemented in V132

- Home's short Project shelf now includes eligible constructed examples alongside ordinary Projects, prioritising actual recent opens. It labels them as *Constructed example* and links to **Browse all Projects**. Home Library and recent Notes previews likewise no longer conceal constructed examples and show provenance.
- Projects is a dedicated server-paginated directory: `/api/query?family=journey&limit=40`, scoped by the current learning space, searchable by text and continued with a cursor. This avoids the unrelated-family cap in `/api/workspace`, prevents stale search pages overwriting newer results, and keeps Trash out.
- Scope and count are visible; list/card presentation and existing Project links remain available. An ordinary empty page does not falsely claim records are gone when more server pages remain.
- A focused browser-visible directory and Home correction replaced fixture-exclusion assumptions; legacy owner-only development controls were not reinstated.

## V133 acceptance-driven follow-up

- Learning-space switching preserves collection overviews (Projects, Home, Library, Your work, Sources, independent questions). When a specific record is open and no explicit cross-scope reader action was requested, the safe Home fallback remains.
- Clarified the distinctions between All learning, subject-specific collections and Other. The visible label **Other** consistently maps to the pre-existing `unclassified` data key; it includes records without a classified learning subject.
- Reclassified exactly seven unequivocal *constructed Lab examples* through the existing `classifyLearningScope` CAS sidecar, not canonical content updates: Radio Island (Computing, Project r36), Pulse threshold (Computing, r3), Moon Cheese continuation (Computing, r3), TCP continuation (Computing, r3), TCP baseline (Computing, r2), Japanese continuation (Languages/ja, r3), Japanese native baseline (Languages/ja, r1). All seven classification commands committed; MCP readback showed unchanged canonical revision numbers and new scope sidecar revision 1.
- Deliberately left scientific, creative, mixed and non-assigned examples in Other rather than inferring an unsupported subject from Python embedded in a science Project.

## Evidence

| Evidence | Result |
| --- | --- |
| V132 Site source | `1b5c12be9e8962b4019dc701739ca9d1a697e425` |
| V132 private deployment | `appgdep_6af3a93c8da88191a8750c2476b17412`, succeeded |
| V133 Site source | `93ea1304666299a08c0e2ed42ea5b58009ef9b7f` |
| V133 private deployment | `appgdep_6af3ab2458c08191bec814a856593994`, succeeded, MCP present |
| Code verification | 13 focused tests passed (discovery, Home visits, learning-scope/classification/recovery); typecheck and build passed |
| V133 browser, All learning | **23 Projects**, including Japanese, River Cherwell, pond, game, visual composition, Kali/TCP, Python and Radio Island |
| Browser search | `Cherwell` returned the exact six-month river Project |
| Browser, Computing | **10 Projects**, including reclassified Radio Island and TCP examples |
| Browser, Languages | **4 Japanese Projects** |
| Browser, Other | **9 Projects**, including creative, night-sky, acoustics, pond and game studies |
| Browser navigation | Scope changes stayed on the Projects catalogue, with correct URL and data |

## Guardrails and next work

1. Home intentionally previews three Projects; the Projects catalogue is the complete discoverable view. Future datasets beyond 40 Project records must exercise Load more and search-continue buttons in a live environment; these paths have code-level coverage but the current Lab corpus fits on one page.
2. There are still legitimate unclassified Projects. The two-category model (Computing/Languages) is insufficient to represent science and creativity as first-class named subjects. Do not automatically classify them as Computing because an artefact happens to contain Python; explore an owner-controlled subject vocabulary separately.
3. Preserve the cross-domain continuity work already in PR #99: Radio Island executable artefacts, revision-aware source links, Notes, Library and saved editions. Next acceptance should exercise a non-computing Project being revised, a Note pinning its exact earlier rendition, its canonical source relationship, and a fresh GPT context read, without inventing learning progress.
4. Public PR #99 remains architecture/report/selected-code work, not a byte-identical mirror of the current private Site source. Reconcile before production migration or claiming full public code-review parity.
5. Production V149 unchanged and PR #99 unmerged. No MCP input schema changes in V132–V133; an MCP reinstall was not needed.

Visual Lab: https://minamo-visual-lab.jscymru.chatgpt.site/?learningSpace=all&view=journeys
