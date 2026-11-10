# Connected Workspaces — Visual Lab V108–V109 exact Project return (10 Nov 2026)

**Scope:** Independent owner-private Visual Lab only. Production V149 unchanged. PR #99 remains open and unmerged. Continues [V107 inbound Note pins and Project continuity](CONNECTED-WORKSPACES-LAB-V107-ACCEPTANCE-2026-11-10.md).

## Problem surfaced by V107

A connected Note already opened correctly from Project Connections, but **Back to Project** returned to Introduction rather than the Project section the user had been reading. For substantial, multi-session Projects this broke the user's place and made it harder to move between a piece of work and the material it relates to.

The underlying Note relationship is an exact owner-saved page pin to Project edition `r-68f105058d71e33721f38067d5d376dd4805faa7deb7dfa5527e464ba112c5ae`, section `s3`, code part `p4`. Navigation origin is *separate* from that source pin: the return destination should be the **Project tab the user actually left**, not an inferred location from the Note's pin.

## V108 implementation: carry a validated return location

- Added `lib/project-return-location.ts` with a route-only, validated Project return location: Project ID, current rendition, native section and leading part; optional stage. It serialises `returnJourney`, `returnRendition`, `returnSection`, `returnPart` and `returnStage` to connected Note/Work URLs.
- `app/project-reading.tsx` emits the section and leading part actually visible in a native topic tab. `app/project-sections.tsx` and `app/project-connections.tsx` carry that context into links; leaving the Project for Questions clears stale native-topic location.
- `lib/navigation-origin.ts` rejects malformed, duplicate, orphan-part and incomplete edition origins. `app/reader.tsx`, `app/workspace.tsx`, and `app/page.tsx` propagate validated origin through navigation and direct loads, and use it for **Back to Project**.
- These route parameters are ephemeral navigation state: **no Note, Project, Work or source ownership records are modified**.

### V108 deployment and an important failed acceptance

- Source SHA: `534ffdf0de15ef66e32194204fafa5e3d1b32f60`.
- Saved version: `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_020d2dbbefbc8191bf949ff80a737947`.
- Deployment: `appgdep_6af3231dc84081919b43092e9bdc597f`, succeeded.
- Cloud Browser: from DNS Project tab **03 A small controlled model**, opened Connections, followed the synthetic Note *Why the cache model cannot identify a resolver*, and clicked **Back to Project**. The exact section/edition returned in the URL, but the page rendered the **older generic all-sections Reader**, not the native six-tab Project reader. Therefore **V108 was not accepted**, even though its location routing worked.

## V109 correction: preserve native Project reading for a current-edition return

Added `lib/project-native-return.ts` and a bounded `app/workspace.tsx` reader-selection correction. If an incoming Project section/part belongs to its **current exact edition** and is a canonical section/part without capture/range/stage/segment selection, restore the native tabbed Project experience. Historical editions and specialised excerpts retain the exact generic Reader path, avoiding an accidental switch to mutable current content.

This corrects **presentation** of the safe current-edition return without weakening rendition or source checks.

### V109 provenance

- Site: https://minamo-visual-lab.jscymru.chatgpt.site/
- Lab source commit: `0206966f88c539cde94695d14d48b9ae1ee1a2d1`.
- Owner-private saved version: **V109**, `appgprj_6aeba0aa528c81918be19dd51427b2cb~appgver_1b9f1fb43f208191a5ecbc2d92230efb`.
- Private deployment: `appgdep_6af324ed56f48191a803f980284a95fc`, **succeeded**.
- Public PR #99 is the architecture and acceptance ledger. The independent private Sites code was not copied into production or merged.

## Verification

- Nine focused Node tests passed, including route round-trip/validation and native-eligibility positive and negative cases (historical edition, capture, invalid part). `pnpm typecheck` passed. `pnpm build` passed. The entire legacy regression suite was not run.
- **Actual installed Visual Lab MCP**, read-only `get_minamo_working_context`: from the DNS Project, the synthetic Note is discoverable as `authored-writing`; it retains the **exact page pin to edition/s3/p4** and was not relabelled as a learner achievement. Effective collaboration preferences on this read were `contextDepth:balanced`, `relatedMaterial:saved`, `initiative:requested`. Server/MCP tool definitions did **not** change in V108–V109, so no connector reinstall is required for this slice.
- **Cloud Browser V109:** independently loaded the deployed Project, selected tab **03 A small controlled model** (section `s3`), expanded Connections, opened the linked synthetic Note, then used **Back to Project**. The result rendered the **native six-tab reader** with tab 03 selected and its complete Python model (code part `p4`) visible; URL retained the exact edition and `section=s3&part=p3`. This `p3` is the leading part of the selected tab, not the Note's `p4` evidence pin. The return is to the tab the user had left, not a fabricated claim of direct code-part focus.
- Reloaded that returned Project URL in the same Cloud Browser tab. Tab 03 remained selected, the code was visible and the URL still held edition/section/part. That verifies direct-page restoration beyond in-memory navigation.

## Design boundaries and remaining work

1. The navigation origin is not a new durable Project/Work relationship. V107's source evidence pin remains the durable link; this slice adds a trustworthy way to **move along** that link.
2. A return from Questions currently uses a general Project origin rather than preserving a specific Question subview. For sections with no canonical content part, avoid inventing a part.
3. Historical edition and excerpt returns intentionally remain the generic Reader. A native historical composition view would require a deliberately edition-aware design and separate acceptance.
4. Project Connections still occupies substantial vertical space when expanded. A long-project and multi-artefact UX pass is still needed.
5. One synthetic DNS Project with a Note is not the requested six-month multi-artefact longitudinal test or a third truly fresh-chat MCP continuation demonstration. Cross-Project evidence and authoring-style preference enforcement remain higher-value subsequent slices.
6. Checkpoint-free authoring is carried forward from prior Lab releases, but this navigation-only slice did not alter authoring instructions or tool definitions.

No Activity/Attempt authoring, learner achievements, mandatory checkpoints, GPT handoffs, fabricated execution, production deployment or PR merge were introduced.
