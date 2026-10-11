{
  "patcher": {
    "fileversion": 1,
    "appversion": {
      "major": 9,
      "minor": 1,
      "revision": 5,
      "architecture": "x64",
      "modernui": 1
    },
    "classnamespace": "box",
    "rect": [
      80,
      80,
      1170,
      600
    ],
    "devicewidth": 1170,
    "openinpresentation": 1,
    "bgcolor": [
      0.055,
      0.075,
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
            250,
            280,
            22
          ],
          "text": "js spectra-cube-automation-controller-0.1.6.js",
          "varname": "controller",
          "numinlets": 1,
          "numoutlets": 3
        }
      },
      {
        "box": {
          "id": "cube",
          "maxclass": "jsui",
          "patching_rect": [
            0,
            0,
            450,
            169
          ],
          "filename": "spectra-cube-automation-ui-0.1.6.js",
          "jsarguments": [
            "spectra-cube-automation-ui-0.1.6.js"
          ],
          "numinlets": 1,
          "numoutlets": 1,
          "presentation": 1,
          "presentation_rect": [
            0,
            0,
            450,
            169
          ]
        }
      },
      {
        "box": {
          "id": "gesture",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            290,
            90,
            22
          ],
          "text": "route point custom"
        }
      },
      {
        "box": {
          "id": "gesture-axes",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            330,
            120,
            22
          ],
          "text": "unpack f f f"
        }
      },
      {
        "box": {
          "id": "custom-message",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            350,
            120,
            22
          ],
          "text": "prepend custom"
        }
      },
      {
        "box": {
          "id": "x",
          "maxclass": "live.dial",
          "patching_rect": [
            465,
            119,
            50,
            42
          ],
          "varname": "x",
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            465,
            119,
            50,
            42
          ],
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "X blend",
              "parameter_shortname": "X blend",
              "parameter_type": 0,
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_initial": [
                0.5
              ],
              "parameter_initial_enable": 1,
              "parameter_unitstyle": 1,
              "parameter_invisible": 0
            }
          }
        }
      },
      {
        "box": {
          "id": "x-message",
          "maxclass": "newobj",
          "patching_rect": [
            240,
            290,
            150,
            22
          ],
          "text": "prepend parameter x"
        }
      },
      {
        "box": {
          "id": "y",
          "maxclass": "live.dial",
          "patching_rect": [
            525,
            119,
            50,
            42
          ],
          "varname": "y",
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            525,
            119,
            50,
            42
          ],
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Y tilt",
              "parameter_shortname": "Y tilt",
              "parameter_type": 0,
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_initial": [
                0.5
              ],
              "parameter_initial_enable": 1,
              "parameter_unitstyle": 1,
              "parameter_invisible": 0
            }
          }
        }
      },
      {
        "box": {
          "id": "y-message",
          "maxclass": "newobj",
          "patching_rect": [
            400,
            290,
            150,
            22
          ],
          "text": "prepend parameter y"
        }
      },
      {
        "box": {
          "id": "z",
          "maxclass": "live.dial",
          "patching_rect": [
            585,
            119,
            50,
            42
          ],
          "varname": "z",
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            585,
            119,
            50,
            42
          ],
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Z mids",
              "parameter_shortname": "Z mids",
              "parameter_type": 0,
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_initial": [
                0.5
              ],
              "parameter_initial_enable": 1,
              "parameter_unitstyle": 1,
              "parameter_invisible": 0
            }
          }
        }
      },
      {
        "box": {
          "id": "z-message",
          "maxclass": "newobj",
          "patching_rect": [
            560,
            290,
            150,
            22
          ],
          "text": "prepend parameter z"
        }
      },
      {
        "box": {
          "id": "banks",
          "maxclass": "newobj",
          "patching_rect": [
            600,
            250,
            80,
            22
          ],
          "text": "live.banks"
        }
      },
      {
        "box": {
          "id": "bank-buttons",
          "maxclass": "message",
          "patching_rect": [
            600,
            280,
            530,
            22
          ],
          "text": "edit 0 - @buttons 1 \"Volume curve\" 2 \"Low / high curve\" 4 \"Mid curve\""
        }
      },
      {
        "box": {
          "id": "state",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            370,
            400,
            22
          ],
          "text": "pattr automation_bindings @bindto controller @parameter_enable 1",
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Track bindings",
              "parameter_shortname": "Bindings",
              "parameter_type": 3,
              "parameter_invisible": 1
            }
          }
        }
      },
      {
        "box": {
          "id": "volumeCurve",
          "maxclass": "live.menu",
          "patching_rect": [
            462,
            780,
            128,
            22
          ],
          "varname": "volumeCurve",
          "parameter_enable": 1,
          "presentation": 0,
          "appearance": 0,
          "fontsize": 11,
          "textcolor": [
            0.97,
            0.98,
            1,
            1
          ],
          "activebgcolor": [
            0.055,
            0.075,
            0.1,
            1
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Volume curve",
              "parameter_shortname": "X curve",
              "parameter_type": 2,
              "parameter_enum": [
                "O",
                "L",
                "E",
                "B",
                "K",
                "C"
              ],
              "parameter_button_mode": "Cycle",
              "parameter_mmin": 0,
              "parameter_mmax": 5,
              "parameter_initial": [
                2
              ],
              "parameter_initial_enable": 1
            }
          }
        }
      },
      {
        "box": {
          "id": "volumeCurve-gui",
          "maxclass": "umenu",
          "patching_rect": [
            462,
            20,
            128,
            22
          ],
          "items": [
            "Site original",
            ",",
            "Linear",
            ",",
            "Equal power",
            ",",
            "Soft blend",
            ",",
            "Sharp cut",
            ",",
            "Custom"
          ],
          "presentation": 1,
          "presentation_rect": [
            462,
            20,
            128,
            22
          ],
          "fontsize": 11
        }
      },
      {
        "box": {
          "id": "volumeCurve-gui-set",
          "maxclass": "newobj",
          "patching_rect": [
            462,
            810,
            100,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "volumeCurve-gui-init",
          "maxclass": "message",
          "patching_rect": [
            462,
            840,
            60,
            22
          ],
          "text": "bang"
        }
      },
      {
        "box": {
          "id": "volumeCurve-label",
          "maxclass": "comment",
          "patching_rect": [
            462,
            3,
            128,
            16
          ],
          "text": "Volume curve",
          "fontsize": 11,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            462,
            3,
            128,
            16
          ]
        }
      },
      {
        "box": {
          "id": "volumeCurve-message",
          "maxclass": "newobj",
          "patching_rect": [
            460,
            700,
            160,
            22
          ],
          "text": "prepend parameter volumeCurve"
        }
      },
      {
        "box": {
          "id": "volumeShape",
          "maxclass": "live.dial",
          "patching_rect": [
            462,
            63,
            50,
            42
          ],
          "varname": "volumeShape",
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            462,
            63,
            50,
            42
          ],
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Volume shape",
              "parameter_shortname": "Volume shape",
              "parameter_type": 0,
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_initial": [
                0
              ],
              "parameter_initial_enable": 1,
              "parameter_unitstyle": 1
            }
          }
        }
      },
      {
        "box": {
          "id": "volumeShape-message",
          "maxclass": "newobj",
          "patching_rect": [
            460,
            740,
            160,
            22
          ],
          "text": "prepend parameter volumeShape"
        }
      },
      {
        "box": {
          "id": "toneCurve",
          "maxclass": "live.menu",
          "patching_rect": [
            598,
            780,
            128,
            22
          ],
          "varname": "toneCurve",
          "parameter_enable": 1,
          "presentation": 0,
          "appearance": 0,
          "fontsize": 11,
          "textcolor": [
            0.97,
            0.98,
            1,
            1
          ],
          "activebgcolor": [
            0.055,
            0.075,
            0.1,
            1
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Low / high curve",
              "parameter_shortname": "Y curve",
              "parameter_type": 2,
              "parameter_enum": [
                "L",
                "I",
                "O",
                "S",
                "C",
                "G",
                "H",
                "F"
              ],
              "parameter_button_mode": "Cycle",
              "parameter_mmin": 0,
              "parameter_mmax": 7,
              "parameter_initial": [
                0
              ],
              "parameter_initial_enable": 1
            }
          }
        }
      },
      {
        "box": {
          "id": "toneCurve-gui",
          "maxclass": "umenu",
          "patching_rect": [
            598,
            20,
            128,
            22
          ],
          "items": [
            "Linear",
            ",",
            "Ease in",
            ",",
            "Ease out",
            ",",
            "S curve",
            ",",
            "Custom",
            ",",
            "Gentle sweep",
            ",",
            "Center hold",
            ",",
            "Fast center"
          ],
          "presentation": 1,
          "presentation_rect": [
            598,
            20,
            128,
            22
          ],
          "fontsize": 11
        }
      },
      {
        "box": {
          "id": "toneCurve-gui-set",
          "maxclass": "newobj",
          "patching_rect": [
            598,
            810,
            100,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "toneCurve-gui-init",
          "maxclass": "message",
          "patching_rect": [
            598,
            840,
            60,
            22
          ],
          "text": "bang"
        }
      },
      {
        "box": {
          "id": "toneCurve-label",
          "maxclass": "comment",
          "patching_rect": [
            598,
            3,
            128,
            16
          ],
          "text": "Low / high curve",
          "fontsize": 11,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            598,
            3,
            128,
            16
          ]
        }
      },
      {
        "box": {
          "id": "toneCurve-message",
          "maxclass": "newobj",
          "patching_rect": [
            630,
            700,
            160,
            22
          ],
          "text": "prepend parameter toneCurve"
        }
      },
      {
        "box": {
          "id": "toneShape",
          "maxclass": "live.dial",
          "patching_rect": [
            598,
            63,
            50,
            42
          ],
          "varname": "toneShape",
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            598,
            63,
            50,
            42
          ],
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Tone shape",
              "parameter_shortname": "Tone shape",
              "parameter_type": 0,
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_initial": [
                0.5
              ],
              "parameter_initial_enable": 1,
              "parameter_unitstyle": 1
            }
          }
        }
      },
      {
        "box": {
          "id": "toneShape-message",
          "maxclass": "newobj",
          "patching_rect": [
            630,
            740,
            160,
            22
          ],
          "text": "prepend parameter toneShape"
        }
      },
      {
        "box": {
          "id": "midCurve",
          "maxclass": "live.menu",
          "patching_rect": [
            734,
            780,
            128,
            22
          ],
          "varname": "midCurve",
          "parameter_enable": 1,
          "presentation": 0,
          "appearance": 0,
          "fontsize": 11,
          "textcolor": [
            0.97,
            0.98,
            1,
            1
          ],
          "activebgcolor": [
            0.055,
            0.075,
            0.1,
            1
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Mid curve",
              "parameter_shortname": "Z curve",
              "parameter_type": 2,
              "parameter_enum": [
                "L",
                "I",
                "O",
                "S",
                "C",
                "G",
                "H",
                "F"
              ],
              "parameter_button_mode": "Cycle",
              "parameter_mmin": 0,
              "parameter_mmax": 7,
              "parameter_initial": [
                0
              ],
              "parameter_initial_enable": 1
            }
          }
        }
      },
      {
        "box": {
          "id": "midCurve-gui",
          "maxclass": "umenu",
          "patching_rect": [
            734,
            20,
            128,
            22
          ],
          "items": [
            "Linear",
            ",",
            "Ease in",
            ",",
            "Ease out",
            ",",
            "S curve",
            ",",
            "Custom",
            ",",
            "Gentle sweep",
            ",",
            "Center hold",
            ",",
            "Fast center"
          ],
          "presentation": 1,
          "presentation_rect": [
            734,
            20,
            128,
            22
          ],
          "fontsize": 11
        }
      },
      {
        "box": {
          "id": "midCurve-gui-set",
          "maxclass": "newobj",
          "patching_rect": [
            734,
            810,
            100,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "midCurve-gui-init",
          "maxclass": "message",
          "patching_rect": [
            734,
            840,
            60,
            22
          ],
          "text": "bang"
        }
      },
      {
        "box": {
          "id": "midCurve-label",
          "maxclass": "comment",
          "patching_rect": [
            734,
            3,
            128,
            16
          ],
          "text": "Mid curve",
          "fontsize": 11,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            734,
            3,
            128,
            16
          ]
        }
      },
      {
        "box": {
          "id": "midCurve-message",
          "maxclass": "newobj",
          "patching_rect": [
            800,
            700,
            160,
            22
          ],
          "text": "prepend parameter midCurve"
        }
      },
      {
        "box": {
          "id": "midShape",
          "maxclass": "live.dial",
          "patching_rect": [
            734,
            63,
            50,
            42
          ],
          "varname": "midShape",
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            734,
            63,
            50,
            42
          ],
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Mid shape",
              "parameter_shortname": "Mid shape",
              "parameter_type": 0,
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_initial": [
                0.5
              ],
              "parameter_initial_enable": 1,
              "parameter_unitstyle": 1
            }
          }
        }
      },
      {
        "box": {
          "id": "midShape-message",
          "maxclass": "newobj",
          "patching_rect": [
            800,
            740,
            160,
            22
          ],
          "text": "prepend parameter midShape"
        }
      },
      {
        "box": {
          "id": "title",
          "maxclass": "comment",
          "patching_rect": [
            880,
            3,
            290,
            20
          ],
          "text": "SPECTRA CUBE · AUTOMATION 0.1.6",
          "fontsize": 11,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            880,
            3,
            290,
            20
          ]
        }
      },
      {
        "box": {
          "id": "help",
          "maxclass": "comment",
          "patching_rect": [
            880,
            147,
            290,
            20
          ],
          "text": "Push: curve buttons · shape / axis pairs",
          "fontsize": 11,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            880,
            147,
            290,
            20
          ]
        }
      },
      {
        "box": {
          "id": "status",
          "maxclass": "comment",
          "patching_rect": [
            214,
            148,
            660,
            20
          ],
          "text": "Choose tracks A and B",
          "fontsize": 11,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            214,
            148,
            660,
            20
          ]
        }
      },
      {
        "box": {
          "id": "track-0",
          "maxclass": "umenu",
          "patching_rect": [
            880,
            42,
            270,
            22
          ],
          "varname": "track-0",
          "items": [
            "Choose track…"
          ],
          "presentation": 1,
          "presentation_rect": [
            880,
            42,
            270,
            22
          ],
          "fontsize": 12,
          "textcolor": [
            0.97,
            0.98,
            1,
            1
          ],
          "bgcolor": [
            0.055,
            0.075,
            0.1,
            1
          ]
        }
      },
      {
        "box": {
          "id": "track-0-label",
          "maxclass": "comment",
          "patching_rect": [
            880,
            26,
            270,
            16
          ],
          "text": "Track A",
          "fontsize": 11,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            880,
            26,
            270,
            16
          ]
        }
      },
      {
        "box": {
          "id": "track-0-message",
          "maxclass": "newobj",
          "patching_rect": [
            500,
            330,
            120,
            22
          ],
          "text": "prepend track 0"
        }
      },
      {
        "box": {
          "id": "track-1",
          "maxclass": "umenu",
          "patching_rect": [
            880,
            86,
            270,
            22
          ],
          "varname": "track-1",
          "items": [
            "Choose track…"
          ],
          "presentation": 1,
          "presentation_rect": [
            880,
            86,
            270,
            22
          ],
          "fontsize": 12,
          "textcolor": [
            0.97,
            0.98,
            1,
            1
          ],
          "bgcolor": [
            0.055,
            0.075,
            0.1,
            1
          ]
        }
      },
      {
        "box": {
          "id": "track-1-label",
          "maxclass": "comment",
          "patching_rect": [
            880,
            70,
            270,
            16
          ],
          "text": "Track B",
          "fontsize": 11,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            880,
            70,
            270,
            16
          ]
        }
      },
      {
        "box": {
          "id": "track-1-message",
          "maxclass": "newobj",
          "patching_rect": [
            500,
            370,
            120,
            22
          ],
          "text": "prepend track 1"
        }
      },
      {
        "box": {
          "id": "refresh",
          "maxclass": "textbutton",
          "patching_rect": [
            880,
            113,
            90,
            18
          ],
          "text": "Refresh tracks",
          "fontsize": 10,
          "presentation": 1,
          "presentation_rect": [
            880,
            113,
            90,
            18
          ]
        }
      },
      {
        "box": {
          "id": "refresh-message",
          "maxclass": "message",
          "patching_rect": [
            650,
            330,
            90,
            22
          ],
          "text": "refreshtracks"
        }
      },
      {
        "box": {
          "id": "ready",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            410,
            100,
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
            130,
            410,
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
            200,
            410,
            45,
            22
          ],
          "text": "init"
        }
      },
      {
        "box": {
          "id": "ui-route",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            450,
            340,
            22
          ],
          "text": "route axes status trackmenu trackchoice apiready curveview curve"
        }
      },
      {
        "box": {
          "id": "axes-ui",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            490,
            100,
            22
          ],
          "text": "prepend axes"
        }
      },
      {
        "box": {
          "id": "status-ui",
          "maxclass": "newobj",
          "patching_rect": [
            130,
            490,
            100,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "curves-ui",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            510,
            130,
            22
          ],
          "text": "prepend curveview"
        }
      },
      {
        "box": {
          "id": "curve-select",
          "maxclass": "newobj",
          "patching_rect": [
            650,
            490,
            150,
            22
          ],
          "text": "route volume tone mid"
        }
      },
      {
        "box": {
          "id": "volume-set",
          "maxclass": "newobj",
          "patching_rect": [
            650,
            530,
            100,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "tone-set",
          "maxclass": "newobj",
          "patching_rect": [
            760,
            530,
            100,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "mid-set",
          "maxclass": "newobj",
          "patching_rect": [
            870,
            530,
            100,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "choice-route",
          "maxclass": "newobj",
          "patching_rect": [
            450,
            450,
            85,
            22
          ],
          "text": "route 0 1"
        }
      },
      {
        "box": {
          "id": "set-track-0",
          "maxclass": "newobj",
          "patching_rect": [
            450,
            490,
            100,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "set-track-1",
          "maxclass": "newobj",
          "patching_rect": [
            560,
            490,
            100,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "values",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            530,
            200,
            22
          ],
          "text": "route 0 1 2 3 4 5 6 7"
        }
      },
      {
        "box": {
          "id": "targets",
          "maxclass": "newobj",
          "patching_rect": [
            250,
            530,
            200,
            22
          ],
          "text": "route 0 1 2 3 4 5 6 7"
        }
      },
      {
        "box": {
          "id": "remote-0",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            610,
            140,
            22
          ],
          "text": "live.remote~ @normalized 0 @smoothing 15"
        }
      },
      {
        "box": {
          "id": "gate-0",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            570,
            70,
            22
          ],
          "text": "gate 1 0"
        }
      },
      {
        "box": {
          "id": "remote-1",
          "maxclass": "newobj",
          "patching_rect": [
            170,
            610,
            140,
            22
          ],
          "text": "live.remote~ @normalized 0 @smoothing 15"
        }
      },
      {
        "box": {
          "id": "gate-1",
          "maxclass": "newobj",
          "patching_rect": [
            170,
            570,
            70,
            22
          ],
          "text": "gate 1 0"
        }
      },
      {
        "box": {
          "id": "remote-2",
          "maxclass": "newobj",
          "patching_rect": [
            320,
            610,
            140,
            22
          ],
          "text": "live.remote~ @normalized 0 @smoothing 15"
        }
      },
      {
        "box": {
          "id": "gate-2",
          "maxclass": "newobj",
          "patching_rect": [
            320,
            570,
            70,
            22
          ],
          "text": "gate 1 0"
        }
      },
      {
        "box": {
          "id": "remote-3",
          "maxclass": "newobj",
          "patching_rect": [
            470,
            610,
            140,
            22
          ],
          "text": "live.remote~ @normalized 0 @smoothing 15"
        }
      },
      {
        "box": {
          "id": "gate-3",
          "maxclass": "newobj",
          "patching_rect": [
            470,
            570,
            70,
            22
          ],
          "text": "gate 1 0"
        }
      },
      {
        "box": {
          "id": "remote-4",
          "maxclass": "newobj",
          "patching_rect": [
            620,
            610,
            140,
            22
          ],
          "text": "live.remote~ @normalized 0 @smoothing 15"
        }
      },
      {
        "box": {
          "id": "gate-4",
          "maxclass": "newobj",
          "patching_rect": [
            620,
            570,
            70,
            22
          ],
          "text": "gate 1 0"
        }
      },
      {
        "box": {
          "id": "remote-5",
          "maxclass": "newobj",
          "patching_rect": [
            770,
            610,
            140,
            22
          ],
          "text": "live.remote~ @normalized 0 @smoothing 15"
        }
      },
      {
        "box": {
          "id": "gate-5",
          "maxclass": "newobj",
          "patching_rect": [
            770,
            570,
            70,
            22
          ],
          "text": "gate 1 0"
        }
      },
      {
        "box": {
          "id": "remote-6",
          "maxclass": "newobj",
          "patching_rect": [
            920,
            610,
            140,
            22
          ],
          "text": "live.remote~ @normalized 0 @smoothing 15"
        }
      },
      {
        "box": {
          "id": "gate-6",
          "maxclass": "newobj",
          "patching_rect": [
            920,
            570,
            70,
            22
          ],
          "text": "gate 1 0"
        }
      },
      {
        "box": {
          "id": "remote-7",
          "maxclass": "newobj",
          "patching_rect": [
            1070,
            610,
            140,
            22
          ],
          "text": "live.remote~ @normalized 0 @smoothing 15"
        }
      },
      {
        "box": {
          "id": "gate-7",
          "maxclass": "newobj",
          "patching_rect": [
            1070,
            570,
            70,
            22
          ],
          "text": "gate 1 0"
        }
      },
      {
        "box": {
          "id": "midiin",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            650,
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
            100,
            650,
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
            "cube",
            0
          ],
          "destination": [
            "gesture",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "gesture",
            0
          ],
          "destination": [
            "gesture-axes",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "gesture",
            1
          ],
          "destination": [
            "custom-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "custom-message",
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
            "x",
            0
          ],
          "destination": [
            "x-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "x-message",
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
            "gesture-axes",
            0
          ],
          "destination": [
            "x",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "y",
            0
          ],
          "destination": [
            "y-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "y-message",
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
            "gesture-axes",
            1
          ],
          "destination": [
            "y",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "z",
            0
          ],
          "destination": [
            "z-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "z-message",
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
            "gesture-axes",
            2
          ],
          "destination": [
            "z",
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
            "bank-buttons",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "bank-buttons",
            0
          ],
          "destination": [
            "banks",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "volumeCurve-gui",
            0
          ],
          "destination": [
            "volumeCurve",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "volumeCurve",
            0
          ],
          "destination": [
            "volumeCurve-gui-set",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "volumeCurve-gui-set",
            0
          ],
          "destination": [
            "volumeCurve-gui",
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
            "volumeCurve-gui-init",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "volumeCurve-gui-init",
            0
          ],
          "destination": [
            "volumeCurve",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "volumeCurve",
            0
          ],
          "destination": [
            "volumeCurve-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "volumeCurve-message",
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
            "volumeShape",
            0
          ],
          "destination": [
            "volumeShape-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "volumeShape-message",
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
            "toneCurve-gui",
            0
          ],
          "destination": [
            "toneCurve",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "toneCurve",
            0
          ],
          "destination": [
            "toneCurve-gui-set",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "toneCurve-gui-set",
            0
          ],
          "destination": [
            "toneCurve-gui",
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
            "toneCurve-gui-init",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "toneCurve-gui-init",
            0
          ],
          "destination": [
            "toneCurve",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "toneCurve",
            0
          ],
          "destination": [
            "toneCurve-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "toneCurve-message",
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
            "toneShape",
            0
          ],
          "destination": [
            "toneShape-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "toneShape-message",
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
            "midCurve-gui",
            0
          ],
          "destination": [
            "midCurve",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "midCurve",
            0
          ],
          "destination": [
            "midCurve-gui-set",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "midCurve-gui-set",
            0
          ],
          "destination": [
            "midCurve-gui",
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
            "midCurve-gui-init",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "midCurve-gui-init",
            0
          ],
          "destination": [
            "midCurve",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "midCurve",
            0
          ],
          "destination": [
            "midCurve-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "midCurve-message",
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
            "midShape",
            0
          ],
          "destination": [
            "midShape-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "midShape-message",
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
            "track-0",
            0
          ],
          "destination": [
            "track-0-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "track-0-message",
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
            "track-1",
            0
          ],
          "destination": [
            "track-1-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "track-1-message",
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
            "refresh",
            0
          ],
          "destination": [
            "refresh-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "refresh-message",
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
            "controller",
            2
          ],
          "destination": [
            "ui-route",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "ui-route",
            0
          ],
          "destination": [
            "axes-ui",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "axes-ui",
            0
          ],
          "destination": [
            "cube",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "ui-route",
            1
          ],
          "destination": [
            "status-ui",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "status-ui",
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
            "ui-route",
            5
          ],
          "destination": [
            "curves-ui",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "curves-ui",
            0
          ],
          "destination": [
            "cube",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "ui-route",
            6
          ],
          "destination": [
            "curve-select",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "curve-select",
            0
          ],
          "destination": [
            "volume-set",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "volume-set",
            0
          ],
          "destination": [
            "volumeCurve",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "volume-set",
            0
          ],
          "destination": [
            "volumeCurve-gui",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "curve-select",
            1
          ],
          "destination": [
            "tone-set",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "tone-set",
            0
          ],
          "destination": [
            "toneCurve",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "tone-set",
            0
          ],
          "destination": [
            "toneCurve-gui",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "curve-select",
            2
          ],
          "destination": [
            "mid-set",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "mid-set",
            0
          ],
          "destination": [
            "midCurve",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "mid-set",
            0
          ],
          "destination": [
            "midCurve-gui",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "ui-route",
            3
          ],
          "destination": [
            "choice-route",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "ui-route",
            2
          ],
          "destination": [
            "track-0",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "choice-route",
            0
          ],
          "destination": [
            "set-track-0",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "set-track-0",
            0
          ],
          "destination": [
            "track-0",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "ui-route",
            2
          ],
          "destination": [
            "track-1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "choice-route",
            1
          ],
          "destination": [
            "set-track-1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "set-track-1",
            0
          ],
          "destination": [
            "track-1",
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
            "values",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "controller",
            1
          ],
          "destination": [
            "targets",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "values",
            0
          ],
          "destination": [
            "remote-0",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "targets",
            0
          ],
          "destination": [
            "gate-0",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "ui-route",
            4
          ],
          "destination": [
            "gate-0",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "gate-0",
            0
          ],
          "destination": [
            "remote-0",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "values",
            1
          ],
          "destination": [
            "remote-1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "targets",
            1
          ],
          "destination": [
            "gate-1",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "ui-route",
            4
          ],
          "destination": [
            "gate-1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "gate-1",
            0
          ],
          "destination": [
            "remote-1",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "values",
            2
          ],
          "destination": [
            "remote-2",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "targets",
            2
          ],
          "destination": [
            "gate-2",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "ui-route",
            4
          ],
          "destination": [
            "gate-2",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "gate-2",
            0
          ],
          "destination": [
            "remote-2",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "values",
            3
          ],
          "destination": [
            "remote-3",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "targets",
            3
          ],
          "destination": [
            "gate-3",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "ui-route",
            4
          ],
          "destination": [
            "gate-3",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "gate-3",
            0
          ],
          "destination": [
            "remote-3",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "values",
            4
          ],
          "destination": [
            "remote-4",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "targets",
            4
          ],
          "destination": [
            "gate-4",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "ui-route",
            4
          ],
          "destination": [
            "gate-4",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "gate-4",
            0
          ],
          "destination": [
            "remote-4",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "values",
            5
          ],
          "destination": [
            "remote-5",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "targets",
            5
          ],
          "destination": [
            "gate-5",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "ui-route",
            4
          ],
          "destination": [
            "gate-5",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "gate-5",
            0
          ],
          "destination": [
            "remote-5",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "values",
            6
          ],
          "destination": [
            "remote-6",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "targets",
            6
          ],
          "destination": [
            "gate-6",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "ui-route",
            4
          ],
          "destination": [
            "gate-6",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "gate-6",
            0
          ],
          "destination": [
            "remote-6",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "values",
            7
          ],
          "destination": [
            "remote-7",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "targets",
            7
          ],
          "destination": [
            "gate-7",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "ui-route",
            4
          ],
          "destination": [
            "gate-7",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "gate-7",
            0
          ],
          "destination": [
            "remote-7",
            1
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
    "parameters": {
      "x": [
        "X blend",
        "X blend",
        0
      ],
      "y": [
        "Y tilt",
        "Y tilt",
        0
      ],
      "z": [
        "Z mids",
        "Z mids",
        0
      ],
      "parameterbanks": {
        "0": {
          "index": 0,
          "name": "Cube",
          "parameters": [
            "Volume shape",
            "X blend",
            "Tone shape",
            "Y tilt",
            "Mid shape",
            "Z mids",
            "Volume curve",
            "-"
          ]
        }
      },
      "state": [
        "Track bindings",
        "Bindings",
        0
      ],
      "volumeCurve": [
        "Volume curve",
        "X curve",
        0
      ],
      "volumeShape": [
        "Volume shape",
        "Volume shape",
        0
      ],
      "toneCurve": [
        "Low / high curve",
        "Y curve",
        0
      ],
      "toneShape": [
        "Tone shape",
        "Tone shape",
        0
      ],
      "midCurve": [
        "Mid curve",
        "Z curve",
        0
      ],
      "midShape": [
        "Mid shape",
        "Mid shape",
        0
      ]
    },
    "dependency_cache": [
      {
        "name": "spectra-cube-automation-controller-0.1.6.js",
        "bootpath": ".",
        "type": "TEXT",
        "implicit": 1
      },
      {
        "name": "spectra-cube-automation-ui-0.1.6.js",
        "bootpath": ".",
        "type": "TEXT",
        "implicit": 1
      }
    ],
    "autosave": 0
  }
}
