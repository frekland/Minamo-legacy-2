# Production V149 source reconciliation — 10 November 2026

## Provenance

- Production Site: `minamo` (`appgprj_6ad8a4e85eb48191accd6e78976b47e3`).
- Source snapshot: `665d70b3ad64bc0e1a0df1e030ac9b47a69ead0a` (production V149).
- Public source branch: `feature/connected-workspaces-foundation-20261110` / draft PR #99.
- Production was not deployed, reset, or otherwise modified during this reconciliation.
- The Visual Lab has separate data, deployment history, owner access and MCP endpoint.

## Reconciled source

Runtime source directories, shared application components, migrations, tests, frontend assets, platform workers, and dependency lockfile were reconciled from the V149 Site checkout. GitHub-specific documentation, public contributor configuration and the repository's AGPL-3.0-only licence were retained. The public package remains `minamo` and retains its published licence declaration; deployed Site package metadata is not blindly copied.

The public branch is an integration candidate rather than evidence of a completed source-to-live byte-for-byte equivalence. **Do not treat this PR as permission to publish private Site records, environment variables, secrets or Site-scoped authentication state.**

## Deployed binary exception

Four generated/runtime speech assets used by the deployed V149 UI are deliberately **not included in the GitHub source reconciliation commit**:

- `public/piper-plus-runtime/ort/ort-wasm-simd-threaded.wasm` (14,239,897 bytes)
- `public/piper-runtime/ort/ort-wasm-simd-threaded.wasm` (14,848,852 bytes)
- `public/piper-runtime/phonemize/piper_phonemize.data` (18,077,249 bytes)
- `public/piper-runtime/phonemize/piper_phonemize.wasm` (635,212 bytes)

These were present in the production Site source and copied to the **lab deployment**. The GitHub branch retains the related runtime JavaScript and code references. A clean public checkout **does not yet reproduce the full TTS runtime**. Before declaring a fully reproducible public source release, document the assets' upstream origins and redistributability, then provide a deterministic, version-pinned asset preparation script or a suitable tracked-artifact strategy. Do not silently move unknown third-party binaries into GitHub.

The remaining non-binary source and screenshot baselines were reconciled, including the production dependency lockfile.

## Verification and constraints

- The lab's production-derived application build completed successfully.
- Focused Notes isolation/load-retry and MCP contract tests were run. Seven tests passed and an older Activity/Attempt MCP expectation failed; separate older interface test expectations also failed. These are **not** claimed fixed by a source reset.
- The lab's first V96 deployment exposed an owner-identity mismatch: Sites management account IDs and authenticated Site-scoped user IDs are different. A **lab-only** allowlist for a verified owner email was added and rebuilt; production authentication was not altered.
- Lab `drizzle/` migration journals were deliberately retained to match the lab's existing database history, while application source and schema use the production-derived implementation.
- The Lab deployment and authenticated MCP readback must be separately confirmed; source parity alone does not establish end-to-end parity.

## Next decisions

1. Verify the production-derived lab with authenticated browser/MCP operations, including persistent Notes, Project layouts, drawing, images and executable artefacts.
2. Resolve the documented TTS binary reproducibility gap.
3. Review and merge the public source reconciliation only when the branch is accepted as the new source baseline.
4. Implement the connected-workspaces / continuity / personalisation proposals from the PR blueprint **in the lab first**. Promote individual features to production only after feasibility, functionality and experience acceptance.
