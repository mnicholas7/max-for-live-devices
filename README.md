# Spectra Max for Live devices

**Make the mix a gesture.** Open-source controllers for Ableton Live, starting with **Spectra Cube 0.1.9**: a three-dimensional mixer for two tracks’ volume and EQ Three gains.

[Download v0.1.9](https://github.com/mnicholas7/max-for-live-devices/releases/tag/v0.1.9) · [Project page](https://spectrascope.net/max-for-live/) · [Issues & ideas](https://github.com/mnicholas7/max-for-live-devices/issues)

![Spectra Cube: cube, response graphs, track selection and EQ strips](docs/images/eq-preview.png)

*Real Max presentation screenshot, before mapping. Dimmed EQ strips are unavailable until tracks are selected. Target environment: Live 12.4.6 Suite / Max 9.1.5.*

## One point. Two tracks. Three dimensions.

| Axis | What moves |
| --- | --- |
| **X** | Track A / B volumes |
| **Y** | Opposing low/high EQ tilt on A / B |
| **Z** | Opposing mid EQ gains — depth handle or **Alt/Option-drag** |

At center, the default Site curve keeps both volumes at unity and EQ neutral. Move toward either track to blend the volumes; tilt the cube to trade spectral space.

- **Full DJ sweep:** complete cut to each target’s maximum boost, following its native gain-control scale.
- **Automatic mapping:** choose two tracks with one EQ Three directly on each. Volume plus three gains map together.
- **Actual readbacks:** mirrored strips display original volume, gains, crossover frequencies, bands, slope and EQ power.
- **Independent gesture loops:** record movements, snap to the nearest beat and loop across clip/scene changes.
- **Collapsible panels:** EQ, Curves, Mapping and Loop share one compact detail area.
- **Local and transparent:** no telemetry, cloud service, network calls or audio processing.

## Install in five steps

1. **Download and extract the ZIP.** Keep the `.amxd` and all five JS files together: `core.js`, `controller.js`, `cube-ui.js`, `eq-ui.js`, `layout.js`. This development release is not frozen into a standalone file.
2. **Prepare two tracks.** Add one EQ Three directly to each. Turn down your monitoring level before mapping.
3. **Load the Cube.** Drag `Spectra Cube 0.1.9.amxd` onto a dedicated **MIDI track**. It is a MIDI-effect controller that operates other tracks’ parameters, not an audio effect. MIDI passes through unchanged.
4. **Choose Track A and Track B.** Each successful selection resets **all currently mapped** volumes and EQ gains to **0 dB unity**, enables the three EQ bands, centers the cube and pauses gesture playback. Power, crossovers and slope stay unchanged.
5. **Move the point.** Drag normally for X/Y; hold **Alt/Option** for Z. Double-click centers without replacing baselines. **Mapping → Reset Unity** restores the known neutral setup later.

> **Unity is not maximum boost.** Mapping can restore an attenuated or muted track to an audible level. Two tracks at unity plus boosted EQ can clip. Monitor conservatively.

## Shape the response

![Independent volume, tone and mid response controls](docs/images/curves-preview.png)

*Real Max preview: the graphs and curve controls, with no Live targets connected.*

| Volume curves | EQ curves |
| --- | --- |
| Site original, Linear, Equal power, Soft blend, Sharp cut, Custom | Linear, Ease in, Ease out, S curve, Custom |

Volume, low/high and mid curves are independent. Shape adjusts their response; **Tone/Mid sweep** (0–1) controls travel, with 1 reaching the full native range. Draw the five-point graphs to select Custom automatically. The custom volume graph edits A normally, or B with Shift.

## Record the movement

![X, Y, Z and independent loop-stretch controls](docs/images/loop-preview.png)

1. Enable **REC** and move the cube.
2. Disable REC: duration snaps to the nearest beat, minimum one beat. The whole gesture stretches to fit rather than being trimmed.
3. **LOOP** follows Live’s transport. Recording while stopped uses Live’s current tempo.
4. **UNDO** restores the previous gesture.

| Stretch | Result |
| --- | --- |
| −2 / −1 | Quarter / half the original length |
| **0** | **Original length, 1:1** |
| +1 / +2 | Double / quadruple |

Free stretch is continuous; Sync rounds to powers of two. Stretch changes preserve phase. Loop length does not reset at clip, scene or arrangement-loop boundaries. Stop recording before selecting tracks or resetting unity.

## Mapping and original controls

**Manual mapping:** click a Map button **first**, then click the target volume fader or EQ **gain** knob in Live. Do not enable Live’s MIDI Map mode. Click the same Map button to cancel. Continuous dB parameters only; duplicate targets and the Cube’s own controls are rejected. Manual mapping captures existing baselines; Reset Unity afterward for a neutral start.

**Automatic mapping:** A and B must be different tracks. Missing or multiple EQ Threes are rejected. Rack-contained EQs require manual mapping; Refresh Tracks updates the list after track changes.

**MANUAL / ORIGINALS:** releases remote ownership without forgetting targets. Original gain controls and their automation become editable again. Switching it off captures current underlying gains as new baselines and reapplies the cube position; center first for an unchanged level with the default Site curve.

**RELEASE:** forgets targets and returns control to Live. Do not run multiple mapped cubes against the same parameters.

EQ-strip edits to cube-owned gains adjust their baselines. Move away from a fully muted volume or full-sweep EQ endpoint before trimming it. Crossovers, band enables, slope and power edit the originals directly; cube movement affects only volume and gains.

## Under the hood

```mermaid
flowchart LR
    Point["Cube X / Y / Z"] --> Curves["Independent curves"]
    Gesture["Recorded gesture + stretch"] --> Point
    Curves --> Calibration["Native gain calibration"]
    Calibration --> Remote["8 live.remote~ controls"]
    Remote --> A["Track A: volume + EQ gains"]
    Remote --> B["Track B: volume + EQ gains"]
    A --> Readback["Read actual source values"]
    B --> Readback
    Readback --> Strips["Mirrored EQ strips"]
```

Native values are not linear audio amplitudes. The controller samples each target’s formatted dB scale at 65 points. Volume attenuates relative to its captured baseline; DJ EQ sweeps interpolate native gain positions from that baseline to the endpoints. Calibration is approximate because formatted strings are rounded. Source readbacks are polled approximately ten times per second and never write themselves back.

## Build and test

Node.js is required for development; there are no npm dependencies.

```sh
git clone https://github.com/mnicholas7/max-for-live-devices.git
cd max-for-live-devices
npm run build
npm test
```

The generator writes an editable `.maxpat`, MIDI `.amxd` containers and `layout.js`. Older numbered filenames are **current-patch compatibility aliases**, not historical builds. Use release tags for historical sources. Reload the device after building to update whole-patch wiring; save your settings first.

## Verification and limitations

The user reports successful two-track control with 0.1.9. Automated mocked tests cover mixer math, all six EQ endpoints, unity mapping, baseline edits, mapping guards, readbacks, gestures, state and patch wiring. They do **not** prove complete host integration or audio performance.

- **Acceptance testing remains:** saved-Set reopening, original automation restoration and sustained control under load.
- `live.remote~` owns mapped parameters, disabling their original automation while connected. Use MANUAL or RELEASE to hand control back.
- Moved/deleted targets require remapping; stored bindings are checked by ID and path.
- Gesture playback resumes paused after loading; storage is capped at 36,000 samples.
- A 33 ms tempo-integrated scheduler is used, not sample-accurate transport position. Stalls can affect timing; mismatched endpoints can jump on wrap.
- The 1,070 logical-pixel device may require horizontal scrolling on small screens or at high Live UI zoom.
- Saved pre-0.1.9 states retain their legacy EQ response until Reset Unity or a track selection enables the full sweep.
- Browser/Ableton Link synchronization is **not** part of this device.

Before performance use, check all eight targets, confirm center/cut/boost directions, test record/stretch/undo, save/reopen a disposable Set, and verify Release restores original automation. Inspect Max’s console for ownership conflicts.

## Where it could go next

Frozen standalone releases · nested Rack discovery · larger/pop-out views · smoother loop seams · more curve handles · transport-accurate timing · additional linked cubes. These are proposals, not shipped features.

## License

**GNU GPL version 3 only** (`GPL-3.0-only`); see [LICENSE](LICENSE). Use, study, modify and redistribute under that license. Ableton Live and Max are separate proprietary products and are not included. Independent project, not affiliated with Ableton or Cycling ’74.

References: [remote parameter control](https://docs.cycling74.com/reference/live.remote~), [Live parameter API](https://docs.cycling74.com/apiref/lom/deviceparameter/).
