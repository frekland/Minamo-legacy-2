# Visual Lab V144 — explicit Other classification for independent work

Date: 11 November 2026  
PR: #99, draft and unmerged  
Environment: owner-private Visual Lab; production V149 unchanged

## Why this slice followed V143

V143 successfully saved and read a substantive independent River Cherwell scientific Note with two exact Project page pins and a Library reference. A separate read of the post-save workspace exposed a **real subject-discovery defect**: the science Note inherited Computing solely because one linked methodological Library Article had Computing metadata. Consequently, its own scientific subject was not reliably represented by the Other view. That is a cross-domain continuity problem, not a problem with Python or the Note's text.

Previously, the server understood Other as *no classification value*. A Note with no own classification could inherit the subject of any eligible linked source. There was no way to express “this Note belongs in Other” while retaining a Computing-classified methodological citation. Changing or deleting the citation would have obscured meaningful evidence.

## V144 change

An explicit `learningScope` with `{version:1,spaces:[],provenance:"authored"|"classification"}` now means **Other**. It is distinct from absence of a scope, which retains the existing *inherit from saved source links* behaviour. This is organisational metadata only; a Note still need not belong to a Project, and no Work thread or progress entity is created.

The integrated implementation covers:

- **Server validation and querying:** accept empty spaces only with a valid scope schema (no language tag without Languages), match explicit Other in both in-memory and SQL-filtered reads, preserve filtering before pagination, and let explicit Other override inherited Computing/Language scopes on personal records.
- **Revision-safe classification:** existing CAS sidecar can choose Other without changing canonical content, revision, rendition, citations or actor. Generation/revision protection and owner isolation remain.
- **Frontend authoring:** selecting Other while creating a record or a new Note writes explicit Other metadata, even when the record references a different subject. Reading links to an explicitly Other record stay in Other. The record editor displays Other instead of mislabelling an empty scope as Computing.
- **Activity schema consistency:** typed activity metadata validator admits empty spaces as it already admits the same general LearningScope contract. No Activity/Attempt workflow added.

Changed: `lib/learning-spaces.ts`, `lib/linked-reading-scope.ts`, `lib/note-learning-visibility.ts`, `lib/activity/domain.ts`, `app/workspace.tsx`; expanded `tests/learning-spaces.test.mjs`.

The vocabulary is intentionally small: **All / Computing / Languages / Other**, with Other remaining a flexible non-computing/non-language area rather than a new collection of subject-specific systems.

## Verification

- **Site source:** `71a81a42dcd5444ad431d76c04abb9d47c4866cb`.
- **Saved version:** `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_f50f44a15c6c8191ae55d3a031fd6a36`.
- **Deployment:** `appgdep_6af48c7624488191b1e209c076baadf3`; final status **succeeded**, `has_mcp:true`.
- **Checks:** focused subject classification tests **8/8** passed; focused navigation tests **5/5** passed; `pnpm typecheck`, `pnpm build` and `git diff --check` succeeded.
- Adjacent older tests in `learning-spaces-continuity` and `learning-spaces-workspace` still fail on retired Activity/Development APIs and superseded page-heading wording (5 failures of 16 when those were included). These were observed and are **not counted as V144 pass**; no full legacy regression suite was run.

### Live read and write, not only fixture tests

1. Installed Visual Lab MCP read the newly authored `lab-cherwell-three-comparisons-20261111` Note at r1 with `learningScopeInherited:true` and a `computing` scope. It retained its exact previous V143 content rendition.
2. On the deployed V144 server, `preview_minamo_command` accepted a **metadata-only** classification update with `expectedRev:1`, `expectedScopeRev:0`, `expectedGeneration:"legacy@0"` and `spaces:[]`. `apply_minamo_command` committed `learningScopeRev:1` for the Note. It did not create a Note content revision.
3. A fresh installed MCP query found the exact Note in **All** and **Other**, absent from **Computing**, with complete bounded query results. Read-back still showed Note r1 and the identical previous rendition.
4. In Cloud Browser, changing subject via the top control to **Other** showed the Cherwell Note on Home. Opening it in the pre-deployment SPA session initially displayed a wrong-space warning because the old V143 JavaScript was still resident; a normal page reload fetched V144 and displayed the entire Note correctly in Other. This was a stale-client-session distinction, **not evidence of a deployed V144 route failure**. The final browser tab was left on the verified Note.

Browser/MCP acceptance confirms this particular subject-filter transition and metadata-only correction. It does not claim that every record-editor path or long-running browser session has been tested.

## Product interpretation and remaining limitations

This changes a fundamental interpretation: an independent Note may cite computing material without *becoming* a Computing Note. Users should control how their own work is organised, and citation links should remain evidence relationships rather than silently determining the subject of everything that cites them.

There is still an awkward mixed-domain decision when a Note has **no explicit scope** and cites sources across several subjects. The existing inherited-scope behaviour can produce multiple subject memberships, and the UI needs clear owner choices rather than guessing from prose. The MCP/tool catalogue descriptive text still illustrates only Computing and Languages even though the generic command schema accepts explicit Other after V144; refresh user-facing guidance in the next contract pass. The Beta/legacy import surface continues to offer only Computing and Languages. These are outstanding parity/consistency issues, not acceptance claims.

More significantly, independent Notes/Questions, Library and Project work need a **unified, understandable subject-selection and search experience** at scale, including exact source passages, unknown provenance, bounded relationship counts, permission revocation and owner-controlled MCP visibility. This slice is not a replacement for those needs.

## PR #99 standing and owner decision

V143 and V144 together deliver one useful vertical slice: independently author a nuanced scientific Note, pin two exact Project passages and a Library source, retrieve them through MCP and Project Connections, then intentionally organise the Note under Other without breaking citation integrity or rewriting the history. Japanese and creative citations still serve as cross-domain controls. No mandatory Work threads, progress dashboards, checkpoint concepts or artificial learner successes were added.

The owner authorises **substantial synthetic Lab content/activity as needed for realistic tests**, with truthful actor/provenance in persistence/MCP; prominent repetitive “TEST ONLY” UI warnings remain removed for UX assessment. Keep all existing code/Radio Island work. Complete the substantive Lab scope and get the owner's personal acceptance **before** public PR code-source reconciliation. V144's deployed private source is **not** mirrored byte-for-byte in the public PR branch; that is a later release gate, not a reason to defer further Lab implementation. PR #99 remains draft and unmerged; production V149 remains unchanged.

Next large Lab slice: complete the domain-neutral subject/relationship authoring surface across Project, Note, Question and Library; make bounded/discovery coverage intelligible, expose owner MCP collaboration controls that genuinely change tool/context availability, and test large mixed-domain histories and rights revocation before the owner's overall review.
