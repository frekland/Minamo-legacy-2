# Visual Lab V134–V135 — readable cross-domain saved citations (11 November 2026)

## Why this slice

Project/Note/Library relationships were present in canonical owner-scoped MCP reads, but difficult to interpret in the UI. Python and Radio Island were valuable stress cases; this slice instead exercised Japanese conversation and creative composition without changing their material.

The owner previously reported missing Projects on Home. V133 fixed discovery and the dedicated Projects catalogue. V134–V135 continue from that baseline; the work is not a replacement for the existing long-running coding package.

## Implemented (Lab source only)

1. **One readable source identity, multiple exact citations.** Project Connections now labels each admitted linked source with its actual server-returned title and separate retained revision numbers. Reciprocal outgoing and incoming citations remain distinct under the source rather than being flattened into an ambiguous link; multi-edition groups are not sliced midway merely to respect a six-link display cap. Six *source groups* is the visible cap.
2. **An earlier Project edition is visibly earlier.** A Note that cites Japanese Project r10 while current is r11 is shown once in Notes and work with “Cites Project r10”. It is suppressed from the secondary link group only when that *same source revision* is actually displayed in the bounded writing list; absent or different-revision citations remain discoverable. An unpinned reference is labelled as such, not treated as a saved historical edition.
3. **General Working Context parity.** Its related-source list uses title, exact source revision and relationship category rather than opaque IDs; an available newer edition has a separate link.
4. **Exact inbound source navigation.** Browser acceptance of V134 revealed that an incoming Article r2 link carried a current-record URL, not a retained-rendition URL. V135 changes the canonical server read to build a destination pinned to the admitted Article/Note rendition. This is a server-side integrity correction, not an inferred relationship.

No new evidence, user activity, learning achievement, checkpoints, attempts or work episodes were fabricated. The read remains bounded and rights-checked. All current source authoring protections and MCP tool signatures were preserved.

## Verification

| Check | Result |
| --- | --- |
| V134 source SHA | `bd99b64fdcbd9a5c640202497988c8001a005857` |
| V134 private deployment | `appgdep_6af409849e008191876a67e89b2ab031`, succeeded |
| V135 source SHA | `20fb0c1d5c5a456ef9ab586c1eb056a4a5226fb6` |
| V135 private deployment | `appgdep_6af40a62fac48191bfb0e15bc20eb8f8`, succeeded, MCP present |
| Focused tests | 14/14 `project-connections` + `working-context-read` passed; includes incoming Library/Note, edition preservation, rights, fanout, no lexical guesses |
| Typecheck/build | Both pass; production unchanged |
| Japanese browser | Existing Project r11 shows a single synthetic Note r1 with “Cites Project r10” and an exact Library Article r2 |
| Creative browser V134 | Project r4 shows distinct Article r1 older outgoing / r2 incoming with accurate title; this revealed the unpinned inbound destination fixed in V135 |
| Creative browser V135 | Succeeded: link to r2 includes exact `rendition=r-5e554f8ccaf626da17a86bd63f31e752e153740041f5019356c9f19c0094bdce`; browser opened the retained Article and its saved Project backlink, then returned to Project r4 |

One broader legacy `contextual-source-first` UI test expects pre-redesign wording (“Previously checked sources”) and fails independently of this slice. It was not used as the targeted acceptance gate and should be reconciled with the actual product wording separately rather than automatically reinstating the old interface.

## Open questions

- The underlying working-context read remains intentionally partial for large relationship sets; do not imply a complete source graph when limits are reached.
- A fresh independent GPT conversation should inspect a creative/science Project's changing source citations and give uncertainty-aware reasoning, without inventing observations.
- No automatic semantics or progress inference; new cross-domain subject labels and flexible learner-chosen organisation remain separate product design questions.
- Public PR #99 contains architecture, reports and selected code but is not yet a byte-identical mirror of the private Lab Site source. Reconcile before production migration.
- Production remains V149 and PR #99 stays draft/unmerged. No MCP reinstall required for this read-side change.

Lab: https://minamo-visual-lab.jscymru.chatgpt.site/
