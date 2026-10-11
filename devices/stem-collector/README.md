# Session Stem Collector

**From scattered stem groups to one playable clip palette.**

A Max for Live utility that copies previously separated Session clips into four fresh tracks: **Drums / Bass / Vocals / Other**. Keep the originals and get a shared set of lanes for remixing, auditioning combinations and building a performance.

[Download 0.1.0](https://github.com/mnicholas7/max-for-live-devices/releases/tag/stem-collector-v0.1.0) · [Project page](https://spectrascope.net/max-for-live/#stems) · [GPL-3.0-only](../../LICENSE)


![Current device presentation](../../docs/images/stem-collector-0.1.0.png)

*Fresh Max presentation capture of this release, before connecting Live targets.*

## Why collect stems?

Separating several clips can produce several four-track groups. Finding a drum loop from one source and a bass line from another then means moving between groups. The collector puts the clips into four common tracks, keeping each source row aligned. You can browse each musical role in one lane and try combinations across sources.

It **organizes existing separated clips**. Use Live’s stem separation first; the device does not perform separation or trigger Live’s separation command.

## Workflow

1. Save a copy of your Set. Separate the source material in Live with all four stems enabled and without merging them.
2. Extract **Session-Stem-Collector-0.1.0.zip**. Keep `Session Stem Collector.amxd` beside `controller.js`, and load the device on a spare MIDI track.
3. Set **First track / Last track** and **First scene / Last scene**. Click **Scan** and inspect the preview. **Prev / Next** pages through the report in the compact device panel.
4. Click **Collect**. The device creates four fresh, muted `Collected …` audio tracks and duplicates the previewed clips into them.
5. Stop the original clips, then unmute and audition the new tracks. Originals remain in the Set, so launching an entire scene can also launch those originals.

| Input | Result |
| --- | --- |
| Matching four-stem groups inside your selected rectangle | One new four-track collection |
| An occupied source scene row | One consecutive destination row |
| Several groups in the same scene | Separate rows in left-to-right group order |
| A missing clip within a stem row | An empty cell; other stems keep their alignment |

Rows follow source scenes from top to bottom, then group order from left to right. Destinations start at scene 1. Existing scene names and other tracks stay unchanged; extra scenes are appended only when needed. Every Collect creates a new batch, rather than merging with earlier collections.

## How the range and matching work

Bounds are **inclusive and 1-based**. Track numbers count the complete left-to-right track list, including group headers and folded tracks, excluding returns and Main. Unfold groups to count them easily. Scene numbers mean row positions, not scene names.

All four stem tracks must fit inside the selected track range; their group header need not. A matching group contains exactly four direct audio tracks, each named with exactly one of **Drums, Bass, Vocals or Other**. Prefixes and suffixes are allowed. Only clips inside the scene range are included.

Partial, merged, frozen, ambiguously named and unrecognized groups are excluded. Names are a matching heuristic, not proof of native separation—check the Scan report. Changing a range bound invalidates the preview and requires another Scan.

## What stays with the clip—and what does not

The device uses Live’s `ClipSlot.duplicate_clip_to` API. Source clips, tracks, routing and playback are not changed or deleted. Destination slots are checked before copying, and occupied slots are refused.

**Track/group effects, mixer settings and track automation are not transferred.** The copied clips play through fresh audio tracks, so they may sound different from an effected source group. If copying fails, completed copies remain on muted tracks with an error report. Removing the device during collection cancels further copying and leaves existing copies in place.

This is a **Session View** utility. It does not gather Arrangement clips, inspect Live’s multi-clip selection or separate audio itself.

## Release & verification

Version **0.1.0** is the first GPL public release, packaged as an unfrozen portable folder. Development has used Live 12 Suite / Max 9. Automated tests use a mocked Live API and cover preview matching, row order/alignment, muted destinations, source preservation, stale previews, recording/occupied-slot guards, report paging and cancellation. Actual copying and the portable release still need broader host testing.

## Develop

From the repository root:

```sh
npm run build:stems
node tests/stem-collector.cjs
```

The build writes an editable `.maxpat`, the portable `.amxd`, and a `Local.amxd` variant with an absolute script path for the development machine. Public downloads use the portable version.

## License

Copyright © 2026 Michael Nicholas. **GNU GPL version 3 only (`GPL-3.0-only`)**; see [LICENSE](../../LICENSE). Source, editable patch, build script and tests are available in the repository and release source archives. Ableton Live and Max are not included or affiliated with this project.
