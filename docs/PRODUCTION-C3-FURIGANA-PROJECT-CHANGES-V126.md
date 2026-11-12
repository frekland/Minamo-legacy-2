# Production C3 — global Japanese furigana and exact Project changes (9 November 2026)

This is a **native Sites implementation handoff**. The public repository contains this report, not the protected Minamo application source.

## Deployed identity

- Site: https://minamo.jscymru.chatgpt.site/
- Existing Sites project: `appgprj_6ad8a4e85eb48191accd6e78976b47e3`; invitation audience and D1/R2 bindings unchanged.
- Release: **V126**.
- Exact native source commit: `de233e06e823dee58108e131717d9501690b5bf1`.
- Saved version: `appgprj_6ad8a4e85eb48191accd6e78976b47e3~appgver_25b50282c91881919473a180e8d814ee`.
- Deployment: `appgdep_6af1b13a773481918028aeffa76c6ee2`.
- C3 intermediate saves: V123 global switch + change reader, V124 reading coverage/source-rights adaptation, V125 HTTP route registration, V126 duplicate language source polish.

## Scope and implementation

1. **One Japanese reading preference:** `FuriganaProvider` persists `minamo-reading-furigana-v1`; the existing native top header hosts an accessible `漢` / `漢(かん)` toggle only in Japanese context. Existing left navigation, Notes, speech engine and six Project layouts remain.
2. **Reading renderers:** semantic Japanese ruby uses this global preference, preserves UTF-16 source ranges and keeps kana below the base line. Dialogue, pattern, reveal, flashcard and regular authored text use a small reviewed Japanese annotation lexicon. Unknown readings are not invented. No duplicate engine or new on-page model.
3. **Content focus:** where a language-reveal interactive exactly repeats the authored paragraph, the original is now in a collapsed, user-accessible `Original authored text` disclosure. Its canonical passage data remains available. Unrelated authored explanations remain visible.
4. **Revision changes:** additive `read_project_changes({projectId,beforeRevision?,limit?})` MCP tool and `GET /api/projects/changes`. Revisions come from saved `v2_revisions` records after owner/read-rights adaptation, bounded to 1–20; return actual save timestamps/actors, section/part IDs, change types, arrangement/title/description changes, an exact-read pointer, paging and provenance. No inferred learning sessions, source execution, scoring or Activity/Attempt dependency.
5. **Routing:** added the GET route to the native domain route allowlist. This was found through live browser acceptance after V124 produced a real 404, and fixed in V125.

## Verification

- `pnpm typecheck`: passed.
- Relevant `node --test` selections: passed (Project revision diff/paging/ownership; production route allowlist; Japanese exact-text ruby; B1 contribution regression). Five focused tests passed before last UI polish; three relevant tests passed afterward.
- `pnpm build`: passed on final source.
- Cloud Browser: visual comparison with A5 Lab; Japanese production header toggle visible, accessible and persistent on reload; actual `rt` readings show/hide, including first reading sentence after lexicon expansion. Left navigation and Notes remained. Computing TEST Project did not show the Japanese control.
- Live authenticated HTTP GET after V125: returned saved Project revision metadata and exact-read target; owner-scoped fixture tests verified denied cross-owner reads and invalid revisions.
- Browser audio: existing Play/Slow controls remained; this release did not independently verify audible device output.
- Full legacy suite and extended mobile campaign intentionally not run under fast-release policy.

## Open items and next step

- Owner must **refresh/reinstall installed Minamo MCP plugin** before `read_project_changes` appears as a callable ChatGPT tool. The server-side endpoint is live; an installed-plugin call is not yet verified.
- The curated fallback lexicon is deliberately partial; prefer authored ruby metadata for ambiguous words and broader Japanese coverage. Parenthesised reading text within authored prose is not automatically controlled.
- Keep a focused browser eye on section-header hierarchy, spacing on narrow viewports, and the newly collapsed canonical fallback.
- Activity/Attempt retirement was delivered separately in C1/V120. Do not restore it for contributions. B1 contributions continue to use their own revision/review contract.
- Recommended next small integration: test fresh installed MCP tool on existing multi-revision Projects and review exact temporal presentation; then iterate Japanese reading polish or Library/Your Work navigation only if the owner requests it. A6 rails/B2 work-thread UI remain out of scope.
