# Visual Lab V123–V124 — exact Python file identity in Project/Work continuity

10 November 2026 · PR #99 · **Lab only** · Production V149 unchanged · PR remains draft/unmerged.

## Why this slice

The retained Python package manifest has explicit file paths, roles and source identities, while `read_project_changes` and the Work UI still described revised Python by opaque Project part IDs. That made a deep code question unnecessarily hard to follow. More seriously, an unchanged Python part whose declared package path was renamed or withdrawn appeared only as an opaque arrangement change.

We elected **not** to link every file of the same Python package to every Work question, nor to invent summaries.

## Implementation

- `lib/project-service.ts`: derive before/after `sourceFilesBefore` and `sourceFilesAfter` from exact saved package manifests for changed canonical parts; each mapping has author-declared `packageId`, `path`, `role`, `sectionId`, `partId` and `sourceRevision`.
- Derive bounded `sourceMappingChanges` for path/role/association additions or removals even when the Python text did not change, with a truncation indicator. Paths are not guessed from titles or imports; file membership is not treated as semantic Work evidence.
- Retain existing current authored exact-part Work matching, saved Canvas report links, revision paging, owner scoping and source provenance. No automatic Work prose rewrites.
- `app/project-work-threads.tsx`: show source filenames beside current linked parts and in Recent linked changes, separate file mapping changes from code edits, and suppress duplicate mapping labels when the same new/removed canonical part is already described.
- `app/project-work-threads.css`: compact filename label consistent with the established charcoal/cyan UI.
- Tests: `tests/project-changes-read.test.mjs` now asserts linked-source edit, same-package unrelated test edit, mapping-only rename, withdrawal, owner isolation and MCP response parity.

## Deployments and checks

| Lab Site version | Source commit | Deployment | Scope |
| --- | --- | --- | --- |
| V123 | `1fe02193a64c5c19f1ac8dcb7e09b96fc17e4a9f` | `appgdep_6af3893a98c081918925b8e7110e8ec3` | File identity and mapping history; succeeded |
| V124 | `ed86e9d0cd596583e69a2bbea58ccf158155a8e6` | `appgdep_6af38a825ce881918de48e62bc4bb426` | UX deduplication; **succeeded** |

Focused checks: TypeScript typecheck, seven direct tests (all passed), application production build and `git diff --check` passed for both slices. Full historical regression was **not run**, per owner instruction.

## Actual installed-MCP acceptance

1. Retained synthetic Radio Island `TEST-ONLY-a61-radio-island-code-history`, revision 36: retrieved eight exact package file paths, with Work matching only to exact declared source part IDs (e.g. `radio_island/map.py` links to `current`, while unreferenced `radio_island/clues.py` does not).
2. Created a new explicitly synthetic **Pulse threshold — source continuity study** (`TEST-ONLY-v123-source-identity-20261110`) in the existing Visual Lab via **installed `apply_project_update`**. This is constructed evidence, not a learner session, previous work or claimed user achievement.
3. Saved revision 1 has `pulse_lab/classifier.py` and `tests/test_boundary.py` and an authored question on threshold equality. Independent local CPython **3.12.14** executed the exact source and its three boundary assertions using `runpy.run_path`. Assertion `classify_pulse(5,5) == "long"` failed at the strict `>` boundary.
4. Saved revision 2 through installed MCP replaces `>` with `>=`, retains a plain account of the local evidence and updates the authored Work question. Identical Python check then passed all three assertions.
5. Saved revision 3, also through MCP, explicitly links the existing test part as Work evidence and changes only its declared path to `tests/test_pulse_boundary.py`. MCP `read_project_changes` returns **zero canonical part changes** for revision 3 and exactly two file mapping events (one linked, one unlinked), both grounded in the authored Work part. The local test was renamed and the same assertions passed again.
6. Installed `get_project_composition` returns exact current two-file inventory with available status. Its SHA-256 values `2cf664a3e60e4e5d666795e8d4461e673fab5a6e7637338fffbe1d62465699db` and `1b4bf3c0613fb6a7263a3cfc2ee6e342dc47667770d1d788818dbd8d2ad36ba4` **match byte-for-byte local file hashes**.
7. The connected browser displayed the exact filename in the Work question and exposed Recent linked changes. Initial V123 UI repeated the creation as both new code and new file mapping; V124 deployed the correction. Cloud Browser after V124 displayed three revisions: r3 only `File mapping added/removed` for the rename, r2 `pulse_lab/classifier.py (revised)` and grounded prose, r1 each declared file (added) exactly once. The current Work question displayed both relevant source paths.

All synthetic revisions are actual saves dated 10 November, **not** backdated or fictional learner chronology. Local CPython execution is identified as local; the Minamo browser did not run the package for this check.

## Candid limitations

- This relates saved file identities to Work **structurally**, not by interpreting Python imports, inferred concepts, authored summaries or execution. It does not validate a package's import graph. A user could rename `classifier.py` without updating imports and produce a downloadable but broken package.
- Work question summaries are still manually authored and can become stale. They were deliberately corrected in this controlled example; no automatic semantic supersession is claimed.
- The source ZIP is an exact snapshot with hash/provenance; full in-browser multi-file Python execution and rich per-file editing remain separate engineering work.
- The UI still has a substantial package header and long-code presentation in complex Projects. V124 only removes a verified duplication; it is not a broader redesign.
- Owner isolation is covered by focused local tests, not independently proven by attempting another real owner's authenticated MCP connection.
- No MCP input-tool schemas were changed. **Plugin reinstallation is not required** for these new read-only response fields.

## Next vertical slice

Prioritise a source-aware multi-file editing and validation flow: show declared package files as navigable sources, save exact canonical part versions with CAS, allow local/import sanity checks where independently executable, and label the execution environment honestly. Keep the existing Work thread as a human question and derive only auditable relationships. Continue browser acceptance on Radio Island's long histories, alongside Settings behaviours and historical checkpoint compatibility cleanup.
