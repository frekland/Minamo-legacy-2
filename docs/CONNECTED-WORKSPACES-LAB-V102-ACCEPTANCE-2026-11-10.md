# Minamo Lab V98–V102: first connected-workspaces slices (10 November 2026)

## Context and scope

This is an implementation and acceptance receipt for draft PR #99, **not a production merge or deployment**. The existing owner-private Minamo Visual Lab was reset from the consolidated production V149 application baseline (Lab V97) with separate Site identity, owner records, D1/R2 state and MCP endpoint. Public repository `main` contains the production-derived baseline through PR #100. Production remains V149 and was not changed by these lab builds.

The guiding product decision remains: connect real Projects, Notes, Work and sources across sessions without creating an Activity/Attempt system, forced checkpoints, achievements, fabricated learner intentions or GPT handoffs.

## Slice A — persisted GPT collaboration preferences (Lab V98)

Implemented owner-scoped preferences with global defaults and Project overrides, server-side effective-policy resolution, revision protection and stable working-context read semantics. Settings exposes the preferences under **GPT & context**. This changes how the context read is assembled, while preserving one stable MCP/server contract rather than adding/removing tool registrations per-user.

**Live acceptance:** in an authenticated owner browser, changed Related material from saved links to hidden. After the save, `get_minamo_working_context` through the installed Lab MCP reported `relatedMaterial: none`, no relations, and explicit `related-material-disabled-by-preference` coverage rather than claiming that no related material exists. Restored saved links in Settings, and the MCP read again returned `relatedMaterial: saved`. The two UI saves advanced the global preference revision to 3 and 4. The UI and MCP thus read the same persisted server state after page interaction, not a browser-only preference. The earlier V98 receipt documents 12 focused tests and its own build/smoke check.

**Tool discovery limitation:** the reinstalled installed Lab MCP supplies the existing workspace and working-context read tools; the newly named preference getter/setter tools are not exposed in the current ChatGPT tool registry. This was not treated as evidence of failed server persistence, but it means a genuinely fresh ChatGPT conversation must confirm the refreshed tool manifest and write affordances.

## Slice B — on-demand Project Connections (Lab V99–V102)

Added an optional **Connections** control to a Project. Only when opened, it requests the same authenticated, scope-bound working-context data used for GPT. It displays real saved writing/bookmarks and exact admitted source links, with navigable originals and explicit partial-coverage messages. It neither creates learner progress, nor records an “attempt,” nor infers a relationship from plausible prose. Read failures are visible; refresh is explicit. Existing records and MCP contracts were not migrated.

Source changes are in the Lab Site only:
- `app/project-connections.tsx` and `.css`
- Project integration in `app/project-sections.tsx`
- Optional collaboration response type in `app/working-context.tsx`
- `tests/project-connections.test.mjs`

**Verification:** six focused tests passed (two Project projection cases plus four working-context admission, source-rights, bounded fan-out and read-only cases), `tsc --noEmit` passed and the Site build succeeded. No full regression suite was run. On the real owner workspace, an existing Project with no saved links correctly showed one honest empty-state line. The first browser pass caught an over-wide two-column empty panel; V100 made it compact. Another live pass revealed legacy `.rn-subtle` rules overriding the control into an icon-above-label and the generic button blue background; V101 removed the conflicting class, V102 used a neutral transparent background. Browser-computed V102 styles confirmed a horizontal flex button (145px wide) and transparent default surface. Live V102 UI expanded and fetched the empty state successfully.

**Current Lab deployment:** V102, source commit `0e04339b9e2e1cf76c36fc34ec517a42e060f139`, saved version `appgver_4809ade691388191b4f4eaab01f5b467`, deployment `appgdep_6af2e5883524819198167c25b8356008` succeeded. https://minamo-visual-lab.jscymru.chatgpt.site/

## What this does not yet demonstrate

1. Realistic *populated* Project→Note/Work/Library relationship rendering and continuity over long histories. The sampled live Project had no admitted links; tests exercise synthetic exact-source relationships, but a separate owner-scoped linked fixture and fresh-chat MCP acceptance are still needed.
2. The new preference getter/setter MCP tools actually discoverable from a fresh installed conversation. A stable `get_minamo_working_context` read does work, including preference readback.
3. Deep Work-thread auto-maintenance, revision-specific provenance across all artifact types, conflict/recovery UX, or an integrated Project-level policy editor in Settings.
4. Removal of older WebMCP preview wording about Project Step “Checkpoint” fields; that legacy affordance is contrary to the current owner product direction and should be separately reconciled rather than promoted as new architecture.
5. Broad mobile/browser accessibility, packaged game, drawing and Python Canvas acceptance.

## Next bounded acceptance

Create a deliberate, isolated but realistic linked Project containing multiple Note and Work revisions, a Library source, and an actual change of understanding; read it in one chat, modify through the permitted MCP write path, then start a genuinely fresh chat and prove it can reconstruct the relationships, exact sources and current edition without inventing a handoff. Exercise the per-Project preferences on the same content. Critically review the visible Connections control for whether it genuinely helps rather than becoming another information panel. Only then choose the next architectural slice or any production promotion.

This receipt deliberately separates **observed** behaviour from **proposed** work.