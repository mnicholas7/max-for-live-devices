{
  "patcher": {
    "fileversion": 1,
    "appversion": {
      "major": 9,
      "minor": 1,
      "revision": 5,
      "architecture": "x64"
    },
    "classnamespace": "box",
    "rect": [
      80,
      80,
      650,
      560
    ],
    "openinpresentation": 1,
    "devicewidth": 650,
    "bgcolor": [
      0.05,
      0.06,
      0.1,
      1
    ],
    "boxes": [
      {
        "box": {
          "id": "controller",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            380,
            500,
            22
          ],
          "text": "js controller.js",
          "numinlets": 1,
          "numoutlets": 1
        }
      },
      {
        "box": {
          "id": "ready",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            420,
            110,
            22
          ],
          "text": "live.thisdevice"
        }
      },
      {
        "box": {
          "id": "defer",
          "maxclass": "newobj",
          "patching_rect": [
            150,
            420,
            65,
            22
          ],
          "text": "deferlow"
        }
      },
      {
        "box": {
          "id": "init",
          "maxclass": "message",
          "patching_rect": [
            240,
            420,
            45,
            22
          ],
          "text": "init"
        }
      },
      {
        "box": {
          "id": "title",
          "maxclass": "comment",
          "patching_rect": [
            15,
            4,
            620,
            24
          ],
          "text": "SPECTRA / SESSION STEM COLLECTOR",
          "fontsize": 16,
          "textcolor": [
            0.8,
            0.9,
            1,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            15,
            4,
            620,
            24
          ]
        }
      },
      {
        "box": {
          "id": "firsttrack-label",
          "maxclass": "comment",
          "patching_rect": [
            15,
            28,
            145,
            16
          ],
          "text": "First track",
          "textcolor": [
            0.8,
            0.9,
            1,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            15,
            28,
            145,
            16
          ]
        }
      },
      {
        "box": {
          "id": "firsttrack",
          "maxclass": "number",
          "patching_rect": [
            15,
            46,
            140,
            22
          ],
          "minimum": 1,
          "varname": "firsttrack",
          "presentation": 1,
          "presentation_rect": [
            15,
            46,
            140,
            22
          ]
        }
      },
      {
        "box": {
          "id": "firsttrack-initial",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            540,
            100,
            22
          ],
          "text": "loadmess 1"
        }
      },
      {
        "box": {
          "id": "firsttrack-message",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            580,
            145,
            22
          ],
          "text": "prepend rangeparameter firsttrack"
        }
      },
      {
        "box": {
          "id": "firsttrack-defer",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            620,
            65,
            22
          ],
          "text": "deferlow"
        }
      },
      {
        "box": {
          "id": "lasttrack-label",
          "maxclass": "comment",
          "patching_rect": [
            170,
            28,
            145,
            16
          ],
          "text": "Last track",
          "textcolor": [
            0.8,
            0.9,
            1,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            170,
            28,
            145,
            16
          ]
        }
      },
      {
        "box": {
          "id": "lasttrack",
          "maxclass": "number",
          "patching_rect": [
            170,
            46,
            140,
            22
          ],
          "minimum": 1,
          "varname": "lasttrack",
          "presentation": 1,
          "presentation_rect": [
            170,
            46,
            140,
            22
          ]
        }
      },
      {
        "box": {
          "id": "lasttrack-initial",
          "maxclass": "newobj",
          "patching_rect": [
            170,
            540,
            100,
            22
          ],
          "text": "loadmess 8"
        }
      },
      {
        "box": {
          "id": "lasttrack-message",
          "maxclass": "newobj",
          "patching_rect": [
            170,
            580,
            145,
            22
          ],
          "text": "prepend rangeparameter lasttrack"
        }
      },
      {
        "box": {
          "id": "lasttrack-defer",
          "maxclass": "newobj",
          "patching_rect": [
            170,
            620,
            65,
            22
          ],
          "text": "deferlow"
        }
      },
      {
        "box": {
          "id": "firstscene-label",
          "maxclass": "comment",
          "patching_rect": [
            325,
            28,
            145,
            16
          ],
          "text": "First scene",
          "textcolor": [
            0.8,
            0.9,
            1,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            325,
            28,
            145,
            16
          ]
        }
      },
      {
        "box": {
          "id": "firstscene",
          "maxclass": "number",
          "patching_rect": [
            325,
            46,
            140,
            22
          ],
          "minimum": 1,
          "varname": "firstscene",
          "presentation": 1,
          "presentation_rect": [
            325,
            46,
            140,
            22
          ]
        }
      },
      {
        "box": {
          "id": "firstscene-initial",
          "maxclass": "newobj",
          "patching_rect": [
            320,
            540,
            100,
            22
          ],
          "text": "loadmess 1"
        }
      },
      {
        "box": {
          "id": "firstscene-message",
          "maxclass": "newobj",
          "patching_rect": [
            320,
            580,
            145,
            22
          ],
          "text": "prepend rangeparameter firstscene"
        }
      },
      {
        "box": {
          "id": "firstscene-defer",
          "maxclass": "newobj",
          "patching_rect": [
            320,
            620,
            65,
            22
          ],
          "text": "deferlow"
        }
      },
      {
        "box": {
          "id": "lastscene-label",
          "maxclass": "comment",
          "patching_rect": [
            480,
            28,
            145,
            16
          ],
          "text": "Last scene",
          "textcolor": [
            0.8,
            0.9,
            1,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            480,
            28,
            145,
            16
          ]
        }
      },
      {
        "box": {
          "id": "lastscene",
          "maxclass": "number",
          "patching_rect": [
            480,
            46,
            140,
            22
          ],
          "minimum": 1,
          "varname": "lastscene",
          "presentation": 1,
          "presentation_rect": [
            480,
            46,
            140,
            22
          ]
        }
      },
      {
        "box": {
          "id": "lastscene-initial",
          "maxclass": "newobj",
          "patching_rect": [
            470,
            540,
            100,
            22
          ],
          "text": "loadmess 1"
        }
      },
      {
        "box": {
          "id": "lastscene-message",
          "maxclass": "newobj",
          "patching_rect": [
            470,
            580,
            145,
            22
          ],
          "text": "prepend rangeparameter lastscene"
        }
      },
      {
        "box": {
          "id": "lastscene-defer",
          "maxclass": "newobj",
          "patching_rect": [
            470,
            620,
            65,
            22
          ],
          "text": "deferlow"
        }
      },
      {
        "box": {
          "id": "scan",
          "maxclass": "message",
          "patching_rect": [
            15,
            72,
            180,
            22
          ],
          "text": "scan",
          "presentation": 1,
          "presentation_rect": [
            15,
            72,
            180,
            22
          ],
          "fontsize": 12
        }
      },
      {
        "box": {
          "id": "scan-command",
          "maxclass": "message",
          "patching_rect": [
            20,
            490,
            130,
            22
          ],
          "text": "scan"
        }
      },
      {
        "box": {
          "id": "scan-defer",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            460,
            65,
            22
          ],
          "text": "deferlow"
        }
      },
      {
        "box": {
          "id": "collect",
          "maxclass": "message",
          "patching_rect": [
            205,
            72,
            180,
            22
          ],
          "text": "collect",
          "presentation": 1,
          "presentation_rect": [
            205,
            72,
            180,
            22
          ],
          "fontsize": 12
        }
      },
      {
        "box": {
          "id": "collect-command",
          "maxclass": "message",
          "patching_rect": [
            160,
            490,
            130,
            22
          ],
          "text": "collect"
        }
      },
      {
        "box": {
          "id": "collect-defer",
          "maxclass": "newobj",
          "patching_rect": [
            120,
            460,
            65,
            22
          ],
          "text": "deferlow"
        }
      },
      {
        "box": {
          "id": "previousreport",
          "maxclass": "message",
          "patching_rect": [
            405,
            72,
            105,
            22
          ],
          "text": "Prev",
          "presentation": 1,
          "presentation_rect": [
            405,
            72,
            105,
            22
          ],
          "fontsize": 12
        }
      },
      {
        "box": {
          "id": "previousreport-command",
          "maxclass": "message",
          "patching_rect": [
            300,
            490,
            130,
            22
          ],
          "text": "previousreport"
        }
      },
      {
        "box": {
          "id": "previousreport-defer",
          "maxclass": "newobj",
          "patching_rect": [
            220,
            460,
            65,
            22
          ],
          "text": "deferlow"
        }
      },
      {
        "box": {
          "id": "nextreport",
          "maxclass": "message",
          "patching_rect": [
            520,
            72,
            105,
            22
          ],
          "text": "Next",
          "presentation": 1,
          "presentation_rect": [
            520,
            72,
            105,
            22
          ],
          "fontsize": 12
        }
      },
      {
        "box": {
          "id": "nextreport-command",
          "maxclass": "message",
          "patching_rect": [
            440,
            490,
            130,
            22
          ],
          "text": "nextreport"
        }
      },
      {
        "box": {
          "id": "nextreport-defer",
          "maxclass": "newobj",
          "patching_rect": [
            320,
            460,
            65,
            22
          ],
          "text": "deferlow"
        }
      },
      {
        "box": {
          "id": "status",
          "maxclass": "textedit",
          "patching_rect": [
            15,
            98,
            620,
            67
          ],
          "text": "Set a track/scene rectangle, then Scan.",
          "readonly": 1,
          "nosymquotes": 1,
          "fontname": "Menlo",
          "fontsize": 10,
          "presentation": 1,
          "presentation_rect": [
            15,
            98,
            620,
            67
          ]
        }
      },
      {
        "box": {
          "id": "midiin",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            500,
            60,
            22
          ],
          "text": "midiin"
        }
      },
      {
        "box": {
          "id": "midiout",
          "maxclass": "newobj",
          "patching_rect": [
            110,
            500,
            60,
            22
          ],
          "text": "midiout"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [
            "ready",
            0
          ],
          "destination": [
            "defer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "defer",
            0
          ],
          "destination": [
            "init",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "init",
            0
          ],
          "destination": [
            "controller",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "firsttrack-initial",
            0
          ],
          "destination": [
            "firsttrack",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "firsttrack",
            0
          ],
          "destination": [
            "firsttrack-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "firsttrack-message",
            0
          ],
          "destination": [
            "firsttrack-defer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "firsttrack-defer",
            0
          ],
          "destination": [
            "controller",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "lasttrack-initial",
            0
          ],
          "destination": [
            "lasttrack",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "lasttrack",
            0
          ],
          "destination": [
            "lasttrack-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "lasttrack-message",
            0
          ],
          "destination": [
            "lasttrack-defer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "lasttrack-defer",
            0
          ],
          "destination": [
            "controller",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "firstscene-initial",
            0
          ],
          "destination": [
            "firstscene",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "firstscene",
            0
          ],
          "destination": [
            "firstscene-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "firstscene-message",
            0
          ],
          "destination": [
            "firstscene-defer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "firstscene-defer",
            0
          ],
          "destination": [
            "controller",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "lastscene-initial",
            0
          ],
          "destination": [
            "lastscene",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "lastscene",
            0
          ],
          "destination": [
            "lastscene-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "lastscene-message",
            0
          ],
          "destination": [
            "lastscene-defer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "lastscene-defer",
            0
          ],
          "destination": [
            "controller",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "scan",
            0
          ],
          "destination": [
            "scan-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "scan-command",
            0
          ],
          "destination": [
            "scan-defer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "scan-defer",
            0
          ],
          "destination": [
            "controller",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "collect",
            0
          ],
          "destination": [
            "collect-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "collect-command",
            0
          ],
          "destination": [
            "collect-defer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "collect-defer",
            0
          ],
          "destination": [
            "controller",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "previousreport",
            0
          ],
          "destination": [
            "previousreport-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "previousreport-command",
            0
          ],
          "destination": [
            "previousreport-defer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "previousreport-defer",
            0
          ],
          "destination": [
            "controller",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "nextreport",
            0
          ],
          "destination": [
            "nextreport-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "nextreport-command",
            0
          ],
          "destination": [
            "nextreport-defer",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "nextreport-defer",
            0
          ],
          "destination": [
            "controller",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "controller",
            0
          ],
          "destination": [
            "status",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "midiin",
            0
          ],
          "destination": [
            "midiout",
            0
          ]
        }
      }
    ],
    "dependency_cache": [
      {
        "name": "controller.js",
        "bootpath": ".",
        "type": "TEXT",
        "implicit": 1
      }
    ]
  }
}
