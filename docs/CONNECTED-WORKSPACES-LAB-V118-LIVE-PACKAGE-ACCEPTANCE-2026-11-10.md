# Minamo PR #99 — V118 live package acceptance (10 November 2026)

**Visual Lab only; production V149 unchanged. PR #99 remains unmerged.**

## Installed MCP authoring

After the owner reinstalled the Visual Lab connector, its live schema advertised optional `composition.codePackages`. Read Project `TEST-ONLY-a61-radio-island-code-history` revision 35 via installed MCP, retaining seven canonical Python source parts, one test part, four Work questions and existing references.

Created `radio-island-python` as an exact eight-path mapping (`radio_island/{__init__,map,clues,state,engine,cli,replay}.py`, `tests/test_radio_island.py`) to existing section/part identities. The installed `preview_project_update` returned valid, proposed revision 36; installed `apply_project_update` committed revision **36** with operation ID `radio-island-source-package-v118-20261110-01`. Installed MCP readback returned one **downloadable package, eight available exact files, 44,868 UTF-8 bytes** and per-file SHA-256. Prior revision 35, canonical code parts, four Work questions and two references remained intact. No source was duplicated or inferred.

## Cloud Browser and independent execution

On the deployed owner-private Lab, the Project shows **Radio Island Python source and tests — 8 exact files · Project revision 36**, a collapsed file-path disclosure with eight correct paths, and **Download ZIP**. The compact row fits the charcoal UI without a new metadata dashboard.

Clicked Download ZIP in the actual Cloud Browser. The **48,553-byte exported archive** contained `MINAMO-SOURCE-MANIFEST.json` and all eight Python files. Manifest identifies exact Project revision **36** and rendition `r-787fda7adac926aa774062a8b560e37328ff491fde2ccb9dc3d6f64c94e0b3e0`; all eight entry byte lengths and SHA-256 values were independently verified against its contents. No undeclared files appeared.

Extracted the actual browser-downloaded archive into an isolated directory and ran:

```text
python3 -m unittest discover -s tests -q
Ran 59 tests in 0.007s
OK
```

`python3 -m radio_island.cli --help` returned the expected `--seed`/`--demo` flags; `python3 -m radio_island.cli --seed 17 --demo` produced the expected eight-turn deterministic demonstration (unfinished ending). This is **local Python execution of the exported sources**, not Minamo browser execution, nor human playtesting. The manifest honestly states that export itself does not execute or verify the source.

## Judgment and limitations

**V118 acceptance succeeded** for real refreshed-MCP authoring/readback, exact package integrity, Cloud Browser download and independent executable reuse. The original V118 report's pending live acceptance claims are now resolved.

- Historical ZIP export from a superseded live revision has local Worker coverage but was not repeated through this browser after another Project edit.
- No native multi-file editor or package-wide Python Canvas execution yet.
- Automatic Work change disclosure remains exact-source grounded, but summaries of new observations/decisions may still require deliberate authorship; do not invent semantic associations.
- Preference denied-save enforcement and cross-device persistence were not independently exercised in this slice.
- `unzip -l` displays an odd archive date `1980-00-00`; extraction and execution worked; minor polish issue.
- Fixture chronology and game narrative are synthetic; the checks do not establish game-play quality. Full historical regression suite not run.

V118 deployment remains `appgdep_6af3710090b08191bd340563ffbf34d8`, source commit `f1da52762174c078759289122c0d090d1432f9c9`, prior **13/13 focused tests**, typecheck and build passed. No new Site deployment was needed for this data-level acceptance. Next: exact per-file inspection/editing or more useful deterministic Work relationships, with no Activity/Attempt structure.
