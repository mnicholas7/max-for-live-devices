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
      1070,
      600
    ],
    "openinpresentation": 1,
    "devicewidth": 1070,
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
            700,
            130,
            22
          ],
          "text": "js controller.js",
          "varname": "controller"
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
          "filename": "cube-ui.js",
          "jsarguments": [
            "cube-ui.js"
          ],
          "varname": "cube",
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
          "id": "state",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            740,
            345,
            22
          ],
          "text": "pattr cube_state @bindto controller @parameter_enable 1",
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Cube state",
              "parameter_shortname": "State",
              "parameter_type": 3,
              "parameter_invisible": 1
            }
          }
        }
      },
      {
        "box": {
          "id": "ready",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            780,
            105,
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
            145,
            780,
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
            235,
            780,
            45,
            22
          ],
          "text": "init"
        }
      },
      {
        "box": {
          "id": "midiin",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            820,
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
            820,
            60,
            22
          ],
          "text": "midiout"
        }
      },
      {
        "box": {
          "id": "volumeCurve",
          "maxclass": "live.menu",
          "patching_rect": [
            462,
            20,
            128,
            22
          ],
          "varname": "volumeCurve",
          "textcolor": [
            0.97,
            0.98,
            1,
            1
          ],
          "appearance": 0,
          "fontname": "Arial",
          "fontsize": 12,
          "fontface": 1,
          "activebgcolor": [
            0.055,
            0.075,
            0.1,
            1
          ],
          "tricolor": [
            0.97,
            0.98,
            1,
            1
          ],
          "bordercolor": [
            0.4,
            0.55,
            0.6,
            1
          ],
          "focusbordercolor": [
            0.4,
            0.95,
            0.9,
            1
          ],
          "hltcolor": [
            0.08,
            0.23,
            0.25,
            1
          ],
          "hlttextcolor": [
            1,
            1,
            1,
            1
          ],
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            650,
            42,
            128,
            22
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Volume curve",
              "parameter_shortname": "Volume curve",
              "parameter_type": 2,
              "parameter_mmin": 0,
              "parameter_mmax": 5,
              "parameter_initial": [
                0
              ],
              "parameter_initial_enable": 1,
              "parameter_unitstyle": 0,
              "parameter_enum": [
                "Site original",
                "Linear",
                "Equal power",
                "Soft blend",
                "Sharp cut",
                "Custom"
              ]
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "volumeCurve-message",
          "maxclass": "newobj",
          "patching_rect": [
            462,
            260,
            150,
            22
          ],
          "text": "prepend parameter volumeCurve"
        }
      },
      {
        "box": {
          "id": "volumeCurve-label",
          "maxclass": "comment",
          "patching_rect": [
            462,
            4,
            148,
            16
          ],
          "text": "Volume curve",
          "fontsize": 10,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            650,
            26,
            148,
            16
          ],
          "varname": "volumeCurve-label",
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "toneCurve",
          "maxclass": "live.menu",
          "patching_rect": [
            598,
            20,
            128,
            22
          ],
          "varname": "toneCurve",
          "textcolor": [
            0.97,
            0.98,
            1,
            1
          ],
          "appearance": 0,
          "fontname": "Arial",
          "fontsize": 12,
          "fontface": 1,
          "activebgcolor": [
            0.055,
            0.075,
            0.1,
            1
          ],
          "tricolor": [
            0.97,
            0.98,
            1,
            1
          ],
          "bordercolor": [
            0.4,
            0.55,
            0.6,
            1
          ],
          "focusbordercolor": [
            0.4,
            0.95,
            0.9,
            1
          ],
          "hltcolor": [
            0.08,
            0.23,
            0.25,
            1
          ],
          "hlttextcolor": [
            1,
            1,
            1,
            1
          ],
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            786,
            42,
            128,
            22
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Low / high curve",
              "parameter_shortname": "Low / high curve",
              "parameter_type": 2,
              "parameter_mmin": 0,
              "parameter_mmax": 4,
              "parameter_initial": [
                0
              ],
              "parameter_initial_enable": 1,
              "parameter_unitstyle": 0,
              "parameter_enum": [
                "Linear",
                "Ease in",
                "Ease out",
                "S curve",
                "Custom"
              ]
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "toneCurve-message",
          "maxclass": "newobj",
          "patching_rect": [
            598,
            260,
            150,
            22
          ],
          "text": "prepend parameter toneCurve"
        }
      },
      {
        "box": {
          "id": "toneCurve-label",
          "maxclass": "comment",
          "patching_rect": [
            598,
            4,
            148,
            16
          ],
          "text": "Low / high curve",
          "fontsize": 10,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            786,
            26,
            148,
            16
          ],
          "varname": "toneCurve-label",
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "midCurve",
          "maxclass": "live.menu",
          "patching_rect": [
            734,
            20,
            128,
            22
          ],
          "varname": "midCurve",
          "textcolor": [
            0.97,
            0.98,
            1,
            1
          ],
          "appearance": 0,
          "fontname": "Arial",
          "fontsize": 12,
          "fontface": 1,
          "activebgcolor": [
            0.055,
            0.075,
            0.1,
            1
          ],
          "tricolor": [
            0.97,
            0.98,
            1,
            1
          ],
          "bordercolor": [
            0.4,
            0.55,
            0.6,
            1
          ],
          "focusbordercolor": [
            0.4,
            0.95,
            0.9,
            1
          ],
          "hltcolor": [
            0.08,
            0.23,
            0.25,
            1
          ],
          "hlttextcolor": [
            1,
            1,
            1,
            1
          ],
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            922,
            42,
            128,
            22
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Mid curve",
              "parameter_shortname": "Mid curve",
              "parameter_type": 2,
              "parameter_mmin": 0,
              "parameter_mmax": 4,
              "parameter_initial": [
                0
              ],
              "parameter_initial_enable": 1,
              "parameter_unitstyle": 0,
              "parameter_enum": [
                "Linear",
                "Ease in",
                "Ease out",
                "S curve",
                "Custom"
              ]
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "midCurve-message",
          "maxclass": "newobj",
          "patching_rect": [
            734,
            260,
            150,
            22
          ],
          "text": "prepend parameter midCurve"
        }
      },
      {
        "box": {
          "id": "midCurve-label",
          "maxclass": "comment",
          "patching_rect": [
            734,
            4,
            148,
            16
          ],
          "text": "Mid curve",
          "fontsize": 10,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            922,
            26,
            136,
            16
          ],
          "varname": "midCurve-label",
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "volumeShape",
          "maxclass": "live.dial",
          "patching_rect": [
            468,
            61,
            50,
            42
          ],
          "varname": "volumeShape",
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            656,
            84,
            50,
            42
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
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "volumeShape-message",
          "maxclass": "newobj",
          "patching_rect": [
            468,
            301,
            150,
            22
          ],
          "text": "prepend parameter volumeShape"
        }
      },
      {
        "box": {
          "id": "volumeShape-label",
          "maxclass": "comment",
          "patching_rect": [
            468,
            45,
            70,
            16
          ],
          "text": "Volume shape",
          "fontsize": 10,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            656,
            68,
            70,
            16
          ],
          "varname": "volumeShape-label",
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "toneShape",
          "maxclass": "live.dial",
          "patching_rect": [
            602,
            61,
            50,
            42
          ],
          "varname": "toneShape",
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            790,
            84,
            50,
            42
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
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "toneShape-message",
          "maxclass": "newobj",
          "patching_rect": [
            602,
            301,
            150,
            22
          ],
          "text": "prepend parameter toneShape"
        }
      },
      {
        "box": {
          "id": "toneShape-label",
          "maxclass": "comment",
          "patching_rect": [
            602,
            45,
            70,
            16
          ],
          "text": "Tone shape",
          "fontsize": 10,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            790,
            68,
            70,
            16
          ],
          "varname": "toneShape-label",
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "midShape",
          "maxclass": "live.dial",
          "patching_rect": [
            738,
            61,
            50,
            42
          ],
          "varname": "midShape",
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            926,
            84,
            50,
            42
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
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "midShape-message",
          "maxclass": "newobj",
          "patching_rect": [
            738,
            301,
            150,
            22
          ],
          "text": "prepend parameter midShape"
        }
      },
      {
        "box": {
          "id": "midShape-label",
          "maxclass": "comment",
          "patching_rect": [
            738,
            45,
            70,
            16
          ],
          "text": "Mid shape",
          "fontsize": 10,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            926,
            68,
            70,
            16
          ],
          "varname": "midShape-label",
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "toneDepth",
          "maxclass": "live.dial",
          "patching_rect": [
            666,
            61,
            50,
            42
          ],
          "varname": "toneDepth",
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            854,
            84,
            50,
            42
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Tone sweep",
              "parameter_shortname": "Tone sweep",
              "parameter_type": 0,
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_initial": [
                1
              ],
              "parameter_initial_enable": 1,
              "parameter_unitstyle": 1
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "toneDepth-message",
          "maxclass": "newobj",
          "patching_rect": [
            666,
            301,
            150,
            22
          ],
          "text": "prepend parameter toneDepth"
        }
      },
      {
        "box": {
          "id": "toneDepth-label",
          "maxclass": "comment",
          "patching_rect": [
            666,
            45,
            70,
            16
          ],
          "text": "Tone sweep",
          "fontsize": 10,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            854,
            68,
            70,
            16
          ],
          "varname": "toneDepth-label",
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "midDepth",
          "maxclass": "live.dial",
          "patching_rect": [
            802,
            61,
            50,
            42
          ],
          "varname": "midDepth",
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            990,
            84,
            50,
            42
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Mid sweep",
              "parameter_shortname": "Mid sweep",
              "parameter_type": 0,
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_initial": [
                1
              ],
              "parameter_initial_enable": 1,
              "parameter_unitstyle": 1
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "midDepth-message",
          "maxclass": "newobj",
          "patching_rect": [
            802,
            301,
            150,
            22
          ],
          "text": "prepend parameter midDepth"
        }
      },
      {
        "box": {
          "id": "midDepth-label",
          "maxclass": "comment",
          "patching_rect": [
            802,
            45,
            70,
            16
          ],
          "text": "Mid sweep",
          "fontsize": 10,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            990,
            68,
            68,
            16
          ],
          "varname": "midDepth-label",
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "x",
          "maxclass": "live.dial",
          "patching_rect": [
            465,
            125,
            50,
            42
          ],
          "varname": "x",
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            653,
            62,
            50,
            42
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
              "parameter_unitstyle": 1
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "x-message",
          "maxclass": "newobj",
          "patching_rect": [
            465,
            365,
            150,
            22
          ],
          "text": "prepend parameter x"
        }
      },
      {
        "box": {
          "id": "x-label",
          "maxclass": "comment",
          "patching_rect": [
            465,
            109,
            70,
            16
          ],
          "text": "X blend",
          "fontsize": 10,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            653,
            46,
            70,
            16
          ],
          "varname": "x-label",
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "y",
          "maxclass": "live.dial",
          "patching_rect": [
            523,
            125,
            50,
            42
          ],
          "varname": "y",
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            711,
            62,
            50,
            42
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
              "parameter_unitstyle": 1
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "y-message",
          "maxclass": "newobj",
          "patching_rect": [
            523,
            365,
            150,
            22
          ],
          "text": "prepend parameter y"
        }
      },
      {
        "box": {
          "id": "y-label",
          "maxclass": "comment",
          "patching_rect": [
            523,
            109,
            70,
            16
          ],
          "text": "Y tilt",
          "fontsize": 10,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            711,
            46,
            70,
            16
          ],
          "varname": "y-label",
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "z",
          "maxclass": "live.dial",
          "patching_rect": [
            581,
            125,
            50,
            42
          ],
          "varname": "z",
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            769,
            62,
            50,
            42
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
              "parameter_unitstyle": 1
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "z-message",
          "maxclass": "newobj",
          "patching_rect": [
            581,
            365,
            150,
            22
          ],
          "text": "prepend parameter z"
        }
      },
      {
        "box": {
          "id": "z-label",
          "maxclass": "comment",
          "patching_rect": [
            581,
            109,
            70,
            16
          ],
          "text": "Z mids",
          "fontsize": 10,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            769,
            46,
            70,
            16
          ],
          "varname": "z-label",
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "stretch",
          "maxclass": "live.dial",
          "patching_rect": [
            654,
            125,
            60,
            42
          ],
          "varname": "stretch",
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            842,
            62,
            60,
            42
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Loop stretch",
              "parameter_shortname": "Loop stretch",
              "parameter_type": 0,
              "parameter_mmin": -2,
              "parameter_mmax": 2,
              "parameter_initial": [
                0
              ],
              "parameter_initial_enable": 1,
              "parameter_unitstyle": 1
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "stretch-message",
          "maxclass": "newobj",
          "patching_rect": [
            654,
            365,
            150,
            22
          ],
          "text": "prepend parameter stretch"
        }
      },
      {
        "box": {
          "id": "stretch-label",
          "maxclass": "comment",
          "patching_rect": [
            654,
            109,
            80,
            16
          ],
          "text": "Loop stretch",
          "fontsize": 10,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            842,
            46,
            80,
            16
          ],
          "varname": "stretch-label",
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "sync",
          "maxclass": "live.menu",
          "patching_rect": [
            731,
            132,
            130,
            22
          ],
          "varname": "sync",
          "textcolor": [
            0.97,
            0.98,
            1,
            1
          ],
          "appearance": 0,
          "fontname": "Arial",
          "fontsize": 12,
          "fontface": 1,
          "activebgcolor": [
            0.055,
            0.075,
            0.1,
            1
          ],
          "tricolor": [
            0.97,
            0.98,
            1,
            1
          ],
          "bordercolor": [
            0.4,
            0.55,
            0.6,
            1
          ],
          "focusbordercolor": [
            0.4,
            0.95,
            0.9,
            1
          ],
          "hltcolor": [
            0.08,
            0.23,
            0.25,
            1
          ],
          "hlttextcolor": [
            1,
            1,
            1,
            1
          ],
          "parameter_enable": 1,
          "presentation": 1,
          "presentation_rect": [
            650,
            135,
            300,
            22
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Stretch sync",
              "parameter_shortname": "Stretch sync",
              "parameter_type": 2,
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_initial": [
                1
              ],
              "parameter_initial_enable": 1,
              "parameter_unitstyle": 0,
              "parameter_enum": [
                "Free",
                "Sync powers of 2"
              ]
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "sync-message",
          "maxclass": "newobj",
          "patching_rect": [
            731,
            372,
            150,
            22
          ],
          "text": "prepend parameter sync"
        }
      },
      {
        "box": {
          "id": "sync-label",
          "maxclass": "comment",
          "patching_rect": [
            731,
            116,
            150,
            16
          ],
          "text": "Stretch sync",
          "fontsize": 10,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            650,
            119,
            150,
            16
          ],
          "varname": "sync-label",
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "record",
          "maxclass": "live.text",
          "patching_rect": [
            875,
            8,
            55,
            22
          ],
          "varname": "record",
          "text": "REC",
          "texton": "REC",
          "mode": 1,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            462,
            122,
            55,
            20
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "REC",
              "parameter_shortname": "REC",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          }
        }
      },
      {
        "box": {
          "id": "record-command",
          "maxclass": "newobj",
          "patching_rect": [
            875,
            538,
            120,
            22
          ],
          "text": "prepend record"
        }
      },
      {
        "box": {
          "id": "loop",
          "maxclass": "live.text",
          "patching_rect": [
            936,
            8,
            55,
            22
          ],
          "varname": "loop",
          "text": "LOOP",
          "texton": "LOOP",
          "mode": 1,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            523,
            122,
            55,
            20
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "LOOP",
              "parameter_shortname": "LOOP",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          }
        }
      },
      {
        "box": {
          "id": "loop-command",
          "maxclass": "newobj",
          "patching_rect": [
            936,
            538,
            120,
            22
          ],
          "text": "prepend playback"
        }
      },
      {
        "box": {
          "id": "undo",
          "maxclass": "live.text",
          "patching_rect": [
            997,
            8,
            55,
            22
          ],
          "varname": "undo",
          "text": "UNDO",
          "texton": "UNDO",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            584,
            122,
            55,
            20
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "UNDO",
              "parameter_shortname": "UNDO",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          }
        }
      },
      {
        "box": {
          "id": "undo-command",
          "maxclass": "message",
          "patching_rect": [
            997,
            538,
            120,
            22
          ],
          "text": "undo"
        }
      },
      {
        "box": {
          "id": "center",
          "maxclass": "live.text",
          "patching_rect": [
            875,
            37,
            75,
            22
          ],
          "varname": "center",
          "text": "CENTER",
          "texton": "CENTER",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            462,
            147,
            54,
            20
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "CENTER",
              "parameter_shortname": "CENTER",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          },
          "fontsize": 9
        }
      },
      {
        "box": {
          "id": "center-command",
          "maxclass": "message",
          "patching_rect": [
            875,
            567,
            120,
            22
          ],
          "text": "center"
        }
      },
      {
        "box": {
          "id": "capture",
          "maxclass": "live.text",
          "patching_rect": [
            956,
            37,
            96,
            22
          ],
          "varname": "capture",
          "text": "CAPTURE",
          "texton": "CAPTURE",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            520,
            147,
            58,
            20
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "CAPTURE",
              "parameter_shortname": "CAPTURE",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          },
          "fontsize": 9
        }
      },
      {
        "box": {
          "id": "capture-command",
          "maxclass": "message",
          "patching_rect": [
            956,
            567,
            120,
            22
          ],
          "text": "capture"
        }
      },
      {
        "box": {
          "id": "map0",
          "maxclass": "live.text",
          "patching_rect": [
            1075,
            60,
            85,
            18
          ],
          "varname": "map0",
          "text": "Map A VOL",
          "texton": "Map A VOL",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            650,
            38,
            200,
            22
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Map A VOL",
              "parameter_shortname": "Map A VOL",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "map0-command",
          "maxclass": "message",
          "patching_rect": [
            1075,
            590,
            120,
            22
          ],
          "text": "map 0"
        }
      },
      {
        "box": {
          "id": "map1",
          "maxclass": "live.text",
          "patching_rect": [
            1165,
            60,
            85,
            18
          ],
          "varname": "map1",
          "text": "Map A LOW",
          "texton": "Map A LOW",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            858,
            38,
            200,
            22
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Map A LOW",
              "parameter_shortname": "Map A LOW",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "map1-command",
          "maxclass": "message",
          "patching_rect": [
            1165,
            590,
            120,
            22
          ],
          "text": "map 1"
        }
      },
      {
        "box": {
          "id": "map2",
          "maxclass": "live.text",
          "patching_rect": [
            1075,
            80,
            85,
            18
          ],
          "varname": "map2",
          "text": "Map A MID",
          "texton": "Map A MID",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            650,
            63,
            200,
            22
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Map A MID",
              "parameter_shortname": "Map A MID",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "map2-command",
          "maxclass": "message",
          "patching_rect": [
            1075,
            610,
            120,
            22
          ],
          "text": "map 2"
        }
      },
      {
        "box": {
          "id": "map3",
          "maxclass": "live.text",
          "patching_rect": [
            1165,
            80,
            85,
            18
          ],
          "varname": "map3",
          "text": "Map A HIGH",
          "texton": "Map A HIGH",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            858,
            63,
            200,
            22
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Map A HIGH",
              "parameter_shortname": "Map A HIGH",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "map3-command",
          "maxclass": "message",
          "patching_rect": [
            1165,
            610,
            120,
            22
          ],
          "text": "map 3"
        }
      },
      {
        "box": {
          "id": "map4",
          "maxclass": "live.text",
          "patching_rect": [
            1075,
            100,
            85,
            18
          ],
          "varname": "map4",
          "text": "Map B VOL",
          "texton": "Map B VOL",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            650,
            88,
            200,
            22
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Map B VOL",
              "parameter_shortname": "Map B VOL",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "map4-command",
          "maxclass": "message",
          "patching_rect": [
            1075,
            630,
            120,
            22
          ],
          "text": "map 4"
        }
      },
      {
        "box": {
          "id": "map5",
          "maxclass": "live.text",
          "patching_rect": [
            1165,
            100,
            85,
            18
          ],
          "varname": "map5",
          "text": "Map B LOW",
          "texton": "Map B LOW",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            858,
            88,
            200,
            22
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Map B LOW",
              "parameter_shortname": "Map B LOW",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "map5-command",
          "maxclass": "message",
          "patching_rect": [
            1165,
            630,
            120,
            22
          ],
          "text": "map 5"
        }
      },
      {
        "box": {
          "id": "map6",
          "maxclass": "live.text",
          "patching_rect": [
            1075,
            120,
            85,
            18
          ],
          "varname": "map6",
          "text": "Map B MID",
          "texton": "Map B MID",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            650,
            113,
            200,
            22
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Map B MID",
              "parameter_shortname": "Map B MID",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "map6-command",
          "maxclass": "message",
          "patching_rect": [
            1075,
            650,
            120,
            22
          ],
          "text": "map 6"
        }
      },
      {
        "box": {
          "id": "map7",
          "maxclass": "live.text",
          "patching_rect": [
            1165,
            120,
            85,
            18
          ],
          "varname": "map7",
          "text": "Map B HIGH",
          "texton": "Map B HIGH",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            858,
            113,
            200,
            22
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "Map B HIGH",
              "parameter_shortname": "Map B HIGH",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "map7-command",
          "maxclass": "message",
          "patching_rect": [
            1165,
            650,
            120,
            22
          ],
          "text": "map 7"
        }
      },
      {
        "box": {
          "id": "release",
          "maxclass": "live.text",
          "patching_rect": [
            875,
            145,
            177,
            22
          ],
          "varname": "release",
          "text": "RELEASE",
          "texton": "RELEASE",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            582,
            147,
            57,
            20
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "RELEASE ALL",
              "parameter_shortname": "RELEASE ALL",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          },
          "fontsize": 9
        }
      },
      {
        "box": {
          "id": "release-command",
          "maxclass": "message",
          "patching_rect": [
            875,
            675,
            120,
            22
          ],
          "text": "release"
        }
      },
      {
        "box": {
          "id": "track-0",
          "maxclass": "umenu",
          "patching_rect": [
            875,
            78,
            177,
            22
          ],
          "varname": "track-0",
          "items": [
            "Choose track…"
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
          ],
          "presentation": 1,
          "presentation_rect": [
            462,
            24,
            177,
            22
          ]
        }
      },
      {
        "box": {
          "id": "track-0-label",
          "maxclass": "comment",
          "patching_rect": [
            875,
            62,
            177,
            16
          ],
          "text": "Track A / auto-map",
          "fontsize": 10,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            462,
            8,
            177,
            16
          ],
          "varname": "track-0-label"
        }
      },
      {
        "box": {
          "id": "track-0-command",
          "maxclass": "newobj",
          "patching_rect": [
            875,
            1100,
            140,
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
            875,
            122,
            177,
            22
          ],
          "varname": "track-1",
          "items": [
            "Choose track…"
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
          ],
          "presentation": 1,
          "presentation_rect": [
            462,
            67,
            177,
            22
          ]
        }
      },
      {
        "box": {
          "id": "track-1-label",
          "maxclass": "comment",
          "patching_rect": [
            875,
            106,
            177,
            16
          ],
          "text": "Track B / auto-map",
          "fontsize": 10,
          "textcolor": [
            0.85,
            0.9,
            0.95,
            1
          ],
          "presentation": 1,
          "presentation_rect": [
            462,
            51,
            177,
            16
          ],
          "varname": "track-1-label"
        }
      },
      {
        "box": {
          "id": "track-1-command",
          "maxclass": "newobj",
          "patching_rect": [
            875,
            1100,
            140,
            22
          ],
          "text": "prepend track 1"
        }
      },
      {
        "box": {
          "id": "refreshtracks",
          "maxclass": "live.text",
          "patching_rect": [
            1075,
            145,
            177,
            22
          ],
          "varname": "refreshtracks",
          "text": "REFRESH TRACKS",
          "texton": "REFRESH TRACKS",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            858,
            143,
            200,
            22
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "REFRESH TRACKS",
              "parameter_shortname": "REFRESH TRACKS",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "refreshtracks-command",
          "maxclass": "message",
          "patching_rect": [
            1075,
            675,
            120,
            22
          ],
          "text": "refreshtracks"
        }
      },
      {
        "box": {
          "id": "resetunity",
          "maxclass": "live.text",
          "patching_rect": [
            650,
            143,
            200,
            22
          ],
          "varname": "resetunity",
          "text": "RESET UNITY",
          "texton": "RESET UNITY",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            650,
            143,
            200,
            22
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "RESET UNITY",
              "parameter_shortname": "RESET UNITY",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          },
          "hidden": 1
        }
      },
      {
        "box": {
          "id": "resetunity-command",
          "maxclass": "message",
          "patching_rect": [
            650,
            673,
            120,
            22
          ],
          "text": "resetunity"
        }
      },
      {
        "box": {
          "id": "manual",
          "maxclass": "live.text",
          "patching_rect": [
            1075,
            8,
            177,
            22
          ],
          "varname": "manual",
          "text": "MANUAL / ORIGINALS",
          "texton": "MANUAL / ORIGINALS",
          "mode": 1,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            462,
            94,
            177,
            22
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "MANUAL / ORIGINALS",
              "parameter_shortname": "MANUAL / ORIGINALS",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          }
        }
      },
      {
        "box": {
          "id": "manual-command",
          "maxclass": "newobj",
          "patching_rect": [
            1075,
            538,
            120,
            22
          ],
          "text": "prepend manual"
        }
      },
      {
        "box": {
          "id": "eq-mirror",
          "maxclass": "jsui",
          "patching_rect": [
            1270,
            0,
            408,
            169
          ],
          "filename": "eq-ui.js",
          "jsarguments": [
            "eq-ui.js"
          ],
          "varname": "eq-mirror",
          "numinlets": 1,
          "numoutlets": 1,
          "presentation": 1,
          "presentation_rect": [
            650,
            24,
            408,
            144
          ],
          "hidden": 0
        }
      },
      {
        "box": {
          "id": "values",
          "maxclass": "newobj",
          "patching_rect": [
            360,
            740,
            190,
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
            360,
            780,
            190,
            22
          ],
          "text": "route 0 1 2 3 4 5 6 7"
        }
      },
      {
        "box": {
          "id": "remote0",
          "maxclass": "newobj",
          "patching_rect": [
            350,
            870,
            135,
            22
          ],
          "text": "live.remote~ @normalized 0 @smoothing 15",
          "saved_object_attributes": {
            "_persistence": 1
          }
        }
      },
      {
        "box": {
          "id": "remote1",
          "maxclass": "newobj",
          "patching_rect": [
            490,
            870,
            135,
            22
          ],
          "text": "live.remote~ @normalized 0 @smoothing 15",
          "saved_object_attributes": {
            "_persistence": 1
          }
        }
      },
      {
        "box": {
          "id": "remote2",
          "maxclass": "newobj",
          "patching_rect": [
            630,
            870,
            135,
            22
          ],
          "text": "live.remote~ @normalized 0 @smoothing 15",
          "saved_object_attributes": {
            "_persistence": 1
          }
        }
      },
      {
        "box": {
          "id": "remote3",
          "maxclass": "newobj",
          "patching_rect": [
            770,
            870,
            135,
            22
          ],
          "text": "live.remote~ @normalized 0 @smoothing 15",
          "saved_object_attributes": {
            "_persistence": 1
          }
        }
      },
      {
        "box": {
          "id": "remote4",
          "maxclass": "newobj",
          "patching_rect": [
            910,
            870,
            135,
            22
          ],
          "text": "live.remote~ @normalized 0 @smoothing 15",
          "saved_object_attributes": {
            "_persistence": 1
          }
        }
      },
      {
        "box": {
          "id": "remote5",
          "maxclass": "newobj",
          "patching_rect": [
            1050,
            870,
            135,
            22
          ],
          "text": "live.remote~ @normalized 0 @smoothing 15",
          "saved_object_attributes": {
            "_persistence": 1
          }
        }
      },
      {
        "box": {
          "id": "remote6",
          "maxclass": "newobj",
          "patching_rect": [
            1190,
            870,
            135,
            22
          ],
          "text": "live.remote~ @normalized 0 @smoothing 15",
          "saved_object_attributes": {
            "_persistence": 1
          }
        }
      },
      {
        "box": {
          "id": "remote7",
          "maxclass": "newobj",
          "patching_rect": [
            1330,
            870,
            135,
            22
          ],
          "text": "live.remote~ @normalized 0 @smoothing 15",
          "saved_object_attributes": {
            "_persistence": 1
          }
        }
      },
      {
        "box": {
          "id": "ui-route",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            910,
            475,
            22
          ],
          "text": "route axes manualaxes curve buttons trackmenu trackchoice eqview manualstate depths"
        }
      },
      {
        "box": {
          "id": "depth-state",
          "maxclass": "newobj",
          "patching_rect": [
            1000,
            1180,
            85,
            22
          ],
          "text": "unpack f f"
        }
      },
      {
        "box": {
          "id": "set-toneDepth",
          "maxclass": "newobj",
          "patching_rect": [
            1000,
            1220,
            85,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "set-midDepth",
          "maxclass": "newobj",
          "patching_rect": [
            1090,
            1220,
            85,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "eq-view",
          "maxclass": "newobj",
          "patching_rect": [
            1000,
            1140,
            110,
            22
          ],
          "text": "prepend eqview"
        }
      },
      {
        "box": {
          "id": "set-manual",
          "maxclass": "newobj",
          "patching_rect": [
            1120,
            1140,
            85,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "track-choice",
          "maxclass": "newobj",
          "patching_rect": [
            720,
            1100,
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
            820,
            1100,
            85,
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
            910,
            1100,
            85,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "axes0",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            950,
            120,
            22
          ],
          "text": "unpack f f f"
        }
      },
      {
        "box": {
          "id": "set-x",
          "maxclass": "newobj",
          "patching_rect": [
            20,
            990,
            75,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "set-y",
          "maxclass": "newobj",
          "patching_rect": [
            100,
            990,
            75,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "set-z",
          "maxclass": "newobj",
          "patching_rect": [
            180,
            990,
            75,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "axes1",
          "maxclass": "newobj",
          "patching_rect": [
            200,
            950,
            120,
            22
          ],
          "text": "unpack f f f"
        }
      },
      {
        "box": {
          "id": "curve-route",
          "maxclass": "newobj",
          "patching_rect": [
            410,
            950,
            150,
            22
          ],
          "text": "route volume tone mid"
        }
      },
      {
        "box": {
          "id": "set-volumeCurve",
          "maxclass": "newobj",
          "patching_rect": [
            420,
            990,
            75,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "set-toneCurve",
          "maxclass": "newobj",
          "patching_rect": [
            510,
            990,
            75,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "set-midCurve",
          "maxclass": "newobj",
          "patching_rect": [
            600,
            990,
            75,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "button-state",
          "maxclass": "newobj",
          "patching_rect": [
            720,
            950,
            85,
            22
          ],
          "text": "unpack i i"
        }
      },
      {
        "box": {
          "id": "set-record",
          "maxclass": "newobj",
          "patching_rect": [
            720,
            990,
            75,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "set-loop",
          "maxclass": "newobj",
          "patching_rect": [
            810,
            990,
            75,
            22
          ],
          "text": "prepend set"
        }
      },
      {
        "box": {
          "id": "section-0",
          "maxclass": "live.text",
          "patching_rect": [
            650,
            0,
            100,
            20
          ],
          "varname": "section-0",
          "text": "− EQ",
          "texton": "− EQ",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            650,
            0,
            100,
            20
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "− EQ",
              "parameter_shortname": "− EQ",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          }
        }
      },
      {
        "box": {
          "id": "section-0-command",
          "maxclass": "message",
          "patching_rect": [
            650,
            530,
            120,
            22
          ],
          "text": "section 0"
        }
      },
      {
        "box": {
          "id": "section-1",
          "maxclass": "live.text",
          "patching_rect": [
            754,
            0,
            100,
            20
          ],
          "varname": "section-1",
          "text": "+ Curves",
          "texton": "+ Curves",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            754,
            0,
            100,
            20
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "+ Curves",
              "parameter_shortname": "+ Curves",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          }
        }
      },
      {
        "box": {
          "id": "section-1-command",
          "maxclass": "message",
          "patching_rect": [
            754,
            530,
            120,
            22
          ],
          "text": "section 1"
        }
      },
      {
        "box": {
          "id": "section-2",
          "maxclass": "live.text",
          "patching_rect": [
            858,
            0,
            100,
            20
          ],
          "varname": "section-2",
          "text": "+ Mapping",
          "texton": "+ Mapping",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            858,
            0,
            100,
            20
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "+ Mapping",
              "parameter_shortname": "+ Mapping",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          }
        }
      },
      {
        "box": {
          "id": "section-2-command",
          "maxclass": "message",
          "patching_rect": [
            858,
            530,
            120,
            22
          ],
          "text": "section 2"
        }
      },
      {
        "box": {
          "id": "section-3",
          "maxclass": "live.text",
          "patching_rect": [
            962,
            0,
            100,
            20
          ],
          "varname": "section-3",
          "text": "+ Loop",
          "texton": "+ Loop",
          "mode": 0,
          "parameter_enable": 1,
          "parameter_mappable": 0,
          "presentation": 1,
          "presentation_rect": [
            962,
            0,
            100,
            20
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "+ Loop",
              "parameter_shortname": "+ Loop",
              "parameter_type": 2,
              "parameter_enum": [
                "Off",
                "On"
              ],
              "parameter_mmin": 0,
              "parameter_mmax": 1,
              "parameter_invisible": 0
            }
          }
        }
      },
      {
        "box": {
          "id": "section-3-command",
          "maxclass": "message",
          "patching_rect": [
            962,
            530,
            120,
            22
          ],
          "text": "section 3"
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
            "midiin",
            0
          ],
          "destination": [
            "midiout",
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
            "toneDepth",
            0
          ],
          "destination": [
            "toneDepth-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "toneDepth-message",
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
            "midDepth",
            0
          ],
          "destination": [
            "midDepth-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "midDepth-message",
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
            "stretch",
            0
          ],
          "destination": [
            "stretch-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "stretch-message",
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
            "sync",
            0
          ],
          "destination": [
            "sync-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "sync-message",
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
            "record",
            0
          ],
          "destination": [
            "record-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "record-command",
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
            "loop",
            0
          ],
          "destination": [
            "loop-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "loop-command",
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
            "undo",
            0
          ],
          "destination": [
            "undo-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "undo-command",
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
            "center",
            0
          ],
          "destination": [
            "center-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "center-command",
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
            "capture",
            0
          ],
          "destination": [
            "capture-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "capture-command",
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
            "map0",
            0
          ],
          "destination": [
            "map0-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "map0-command",
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
            "map1",
            0
          ],
          "destination": [
            "map1-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "map1-command",
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
            "map2",
            0
          ],
          "destination": [
            "map2-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "map2-command",
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
            "map3",
            0
          ],
          "destination": [
            "map3-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "map3-command",
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
            "map4",
            0
          ],
          "destination": [
            "map4-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "map4-command",
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
            "map5",
            0
          ],
          "destination": [
            "map5-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "map5-command",
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
            "map6",
            0
          ],
          "destination": [
            "map6-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "map6-command",
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
            "map7",
            0
          ],
          "destination": [
            "map7-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "map7-command",
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
            "release",
            0
          ],
          "destination": [
            "release-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "release-command",
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
            "track-0-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "track-0-command",
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
            "track-1-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "track-1-command",
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
            "refreshtracks",
            0
          ],
          "destination": [
            "refreshtracks-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "refreshtracks-command",
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
            "resetunity",
            0
          ],
          "destination": [
            "resetunity-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "resetunity-command",
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
            "manual",
            0
          ],
          "destination": [
            "manual-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "manual-command",
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
            "eq-mirror",
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
            "remote0",
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
            "remote0",
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
            "remote1",
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
            "remote1",
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
            "remote2",
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
            "remote2",
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
            "remote3",
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
            "remote3",
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
            "remote4",
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
            "remote4",
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
            "remote5",
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
            "remote5",
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
            "remote6",
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
            "remote6",
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
            "remote7",
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
            "remote7",
            1
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
            9
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
            8
          ],
          "destination": [
            "depth-state",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "depth-state",
            0
          ],
          "destination": [
            "set-toneDepth",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "set-toneDepth",
            0
          ],
          "destination": [
            "toneDepth",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "depth-state",
            1
          ],
          "destination": [
            "set-midDepth",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "set-midDepth",
            0
          ],
          "destination": [
            "midDepth",
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
            "eq-view",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "eq-view",
            0
          ],
          "destination": [
            "eq-mirror",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "ui-route",
            7
          ],
          "destination": [
            "set-manual",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "set-manual",
            0
          ],
          "destination": [
            "manual",
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
            "track-choice",
            0
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
            "track-0",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "track-choice",
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
            4
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
            "track-choice",
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
            "ui-route",
            0
          ],
          "destination": [
            "axes0",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "axes0",
            0
          ],
          "destination": [
            "set-x",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "set-x",
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
            "axes0",
            1
          ],
          "destination": [
            "set-y",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "set-y",
            0
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
            "axes0",
            2
          ],
          "destination": [
            "set-z",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "set-z",
            0
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
            "ui-route",
            1
          ],
          "destination": [
            "axes1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "axes1",
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
            "axes1",
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
            "axes1",
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
            "ui-route",
            2
          ],
          "destination": [
            "curve-route",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "curve-route",
            0
          ],
          "destination": [
            "set-volumeCurve",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "set-volumeCurve",
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
            "curve-route",
            1
          ],
          "destination": [
            "set-toneCurve",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "set-toneCurve",
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
            "curve-route",
            2
          ],
          "destination": [
            "set-midCurve",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "set-midCurve",
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
            "ui-route",
            3
          ],
          "destination": [
            "button-state",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "button-state",
            0
          ],
          "destination": [
            "set-record",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "set-record",
            0
          ],
          "destination": [
            "record",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "button-state",
            1
          ],
          "destination": [
            "set-loop",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "set-loop",
            0
          ],
          "destination": [
            "loop",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "section-0",
            0
          ],
          "destination": [
            "section-0-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "section-0-command",
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
            "section-1",
            0
          ],
          "destination": [
            "section-1-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "section-1-command",
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
            "section-2",
            0
          ],
          "destination": [
            "section-2-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "section-2-command",
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
            "section-3",
            0
          ],
          "destination": [
            "section-3-command",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "section-3-command",
            0
          ],
          "destination": [
            "controller",
            0
          ]
        }
      }
    ],
    "parameters": {
      "state": [
        "Cube state",
        "State",
        0
      ],
      "volumeCurve": [
        "Volume curve",
        "Volume curve",
        0
      ],
      "toneCurve": [
        "Low / high curve",
        "Low / high curve",
        0
      ],
      "midCurve": [
        "Mid curve",
        "Mid curve",
        0
      ],
      "volumeShape": [
        "Volume shape",
        "Volume shape",
        0
      ],
      "toneShape": [
        "Tone shape",
        "Tone shape",
        0
      ],
      "midShape": [
        "Mid shape",
        "Mid shape",
        0
      ],
      "toneDepth": [
        "Tone sweep",
        "Tone sweep",
        0
      ],
      "midDepth": [
        "Mid sweep",
        "Mid sweep",
        0
      ],
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
      "stretch": [
        "Loop stretch",
        "Loop stretch",
        0
      ],
      "sync": [
        "Stretch sync",
        "Stretch sync",
        0
      ],
      "record": [
        "REC",
        "REC",
        0
      ],
      "loop": [
        "LOOP",
        "LOOP",
        0
      ],
      "undo": [
        "UNDO",
        "UNDO",
        0
      ],
      "center": [
        "CENTER",
        "CENTER",
        0
      ],
      "capture": [
        "CAPTURE",
        "CAPTURE",
        0
      ],
      "map0": [
        "Map A VOL",
        "Map A VOL",
        0
      ],
      "map1": [
        "Map A LOW",
        "Map A LOW",
        0
      ],
      "map2": [
        "Map A MID",
        "Map A MID",
        0
      ],
      "map3": [
        "Map A HIGH",
        "Map A HIGH",
        0
      ],
      "map4": [
        "Map B VOL",
        "Map B VOL",
        0
      ],
      "map5": [
        "Map B LOW",
        "Map B LOW",
        0
      ],
      "map6": [
        "Map B MID",
        "Map B MID",
        0
      ],
      "map7": [
        "Map B HIGH",
        "Map B HIGH",
        0
      ],
      "release": [
        "RELEASE ALL",
        "RELEASE ALL",
        0
      ],
      "refreshtracks": [
        "REFRESH TRACKS",
        "REFRESH TRACKS",
        0
      ],
      "resetunity": [
        "RESET UNITY",
        "RESET UNITY",
        0
      ],
      "manual": [
        "MANUAL / ORIGINALS",
        "MANUAL / ORIGINALS",
        0
      ],
      "section-0": [
        "− EQ",
        "− EQ",
        0
      ],
      "section-1": [
        "+ Curves",
        "+ Curves",
        0
      ],
      "section-2": [
        "+ Mapping",
        "+ Mapping",
        0
      ],
      "section-3": [
        "+ Loop",
        "+ Loop",
        0
      ]
    },
    "dependency_cache": [
      {
        "name": "core.js",
        "bootpath": ".",
        "type": "TEXT",
        "implicit": 1
      },
      {
        "name": "controller.js",
        "bootpath": ".",
        "type": "TEXT",
        "implicit": 1
      },
      {
        "name": "cube-ui.js",
        "bootpath": ".",
        "type": "TEXT",
        "implicit": 1
      },
      {
        "name": "eq-ui.js",
        "bootpath": ".",
        "type": "TEXT",
        "implicit": 1
      },
      {
        "name": "layout.js",
        "bootpath": ".",
        "type": "TEXT",
        "implicit": 1
      }
    ],
    "autosave": 0
  }
}
