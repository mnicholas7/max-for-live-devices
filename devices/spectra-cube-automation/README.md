# Spectra Cube Automation

**One point. Two tracks. Three dimensions.**

An XYZ performance mixer for Ableton Live. Blend a pair of tracks, trade their low/high energy and make room in the mids—then record the whole gesture with Live’s normal automation.

[Download 0.1.6](https://github.com/mnicholas7/max-for-live-devices/releases/tag/cube-automation-v0.1.6) · [Project page](https://spectrascope.net/max-for-live/#cube) · [GPL-3.0-only](../../LICENSE)


![Current device presentation](../../docs/images/cube-automation-0.1.6.png)

*Fresh Max presentation capture of this release, before connecting Live targets.*

## What it’s useful for

Turn a transition between two loops into one coordinated gesture. Fade a new part in while carving space in the old one, trade foreground and background between two stems, or automate a repeating balance across a section. The three native automation lanes are easy to edit and replay in Live.

| Axis | Controls | Default curve |
| --- | --- | --- |
| **X · Blend** | Track A/B volumes | Equal power |
| **Y · Tilt** | Opposing low/high EQ gains | Linear |
| **Z · Mids** | Opposing mid EQ gains | Linear |

## Get started

1. Extract **Spectra-Cube-Automation-0.1.6.zip**. Keep `Spectra Cube Automation.amxd` beside its two `spectra-cube-automation-…-0.1.6.js` scripts. Load it on a dedicated **MIDI track**.
2. Choose **Track A** and **Track B**. For EQ control, place one EQ Three directly on each target track. Volume-only tracks work too; nested Rack EQs and EQ Eight are not mapped by this release.
3. Drag the Cube for X/Y. Hold **Alt/Option** while dragging to change Z, use the depth handle, or move the native X/Y/Z controls. Double-click centers the point.
4. Enable Live’s **Automation Arm** and **Arrangement Record**, then perform a movement. Stop recording and replay that section. The envelopes belong to the Cube’s track.
5. If manual changes override playback, press Live’s **Re-Enable Automation**. Leave the Cube loaded and active to drive the target gains.

Both volume endpoints use **0 dB**, including restored bindings. At the Equal power midpoint, both volumes are **−3.01 dB**. This aligns the fader ranges; it does not normalize the loudness of different recordings. EQ mappings retain their captured gain baselines; Y/Z center returns to those baselines. EQ power and band switches are unchanged. Mapping does not reset XYZ or curve selections.

## Shape the movement

| Volume choices | EQ choices |
| --- | --- |
| Site original · Linear · Equal power · Soft blend · Sharp cut · Custom | Linear · Ease in · Ease out · S curve · Custom · Gentle sweep · Center hold · Fast center |

Each axis has its own **Shape** knob. Gentle sweep narrows the EQ travel; Center hold gives the midpoint a neutral zone; Fast center makes small movements around center more pronounced. Their shape knobs adjust the strength. Linear remains the default for both EQ axes.

Drag a graph to create a five-point custom curve. On the volume graph, **Shift-drag** edits track B’s response. Custom graphs and target identities are stored separately from Live’s native parameter automation.

## Push 3 · one front bank

| Encoder | Control |
| --- | --- |
| 1 / 2 | Volume shape / X blend |
| 3 / 4 | Tone shape / Y tilt |
| 5 / 6 | Mid shape / Z mids |
| 7 | Volume curve |
| 8 | Unused |

Display buttons **2, 3 and 5** cycle X, Y and Z curves. Button 1 opens Push’s expanded device row. Track selection stays in Live.

Push’s expanded row displays every enum choice, so this release uses compact one-letter choices with the selected option highlighted. Live’s visible menus keep the full names.

| Axis | Push codes, in cycle order |
| --- | --- |
| X | **O** original · **L** linear · **E** equal power · **B** soft blend · **K** sharp cut · **C** custom |
| Y / Z | **L** linear · **I** ease in · **O** ease out · **S** S curve · **C** custom · **G** gentle sweep · **H** center hold · **F** fast center |

## What changed in 0.1.6

Both track volume ranges now share a 0 dB endpoint instead of preserving different starting fader levels. Saved volume bindings adopt the same endpoint. Push curve lists use one-letter codes to address overlapping text in the expanded row, while Live retains full-name menus. Numeric curve identities are unchanged.

## Design & verification

Native X/Y/Z parameters feed calibrated `live.remote~` controls. Axis updates affect only their dependent gains, unchanged values are skipped, and remote smoothing is 15 ms. Drawing is limited to 20 fps and graph samples are cached. Playback does not poll Live’s API or notify saved-state clients.

The user reports that the simplified device plays automation and runs more smoothly than the older Cube. Automated mocked tests cover axis playback, shared volume endpoints, saved-binding migration, custom curves, duplicate targets, volume-only tracks, display scheduling and Push wiring. The latest one-letter Push display and portable download still need host verification. Tests do not establish compatibility with every Live/Max version or sustained performance under load.

`live.remote~` owns the connected gains, so record the Cube’s axes rather than the target faders. To detach a target, choose **Choose track…** in its menu. Do not map two Cubes to the same gains. The old Cube’s internal-loop envelopes are not migrated automatically.

## Develop

From the repository root:

```sh
npm run build:automation
node tests/automation.cjs
```

The generator also creates `Spectra Cube Automation Local.amxd` with absolute script paths for the development machine. Public downloads use the ordinary device with relative dependencies. The editable sources live in `devices/spectra-cube/automation-controller.js`, `automation-ui.js` and `core.js`.

## License

Copyright © 2026 Michael Nicholas. **GNU GPL version 3 only (`GPL-3.0-only`)**; see [LICENSE](../../LICENSE). Editable source is included in the repository and linked from each release. Ableton Live and Max are not included or affiliated with this project.
