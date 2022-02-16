("use strict");

var $COLORS = {
    'shade': '#1D1D1D50',
    'backon': '#F7F7F7',
    'backoff': '#C6C3B5',
    'white': '#FFFFFF',
    'black': '#1D1D1D',
    'focus': '#2196f3',
    'norms': {
        '$100': '#FFFFFF',
        '$500': '#1D1D1D',
        '$900': '#000000',
    },
    "base": {
        "$50": "#F9FAFB",
        "$100": "#F3F4F6",
        "$200": "#E5E7EB",
        "$300": "#D1D5DB",
        "$400": "#9CA3AF",
        "$500": "#6B7280",
        "$600": "#4B5563",
        "$700": "#374151",
        "$800": "#1F2937",
        "$900": "#111827"
    },
    "water": {
        "$50": "#EFF6FF",
        "$100": "#DBEAFE",
        "$200": "#BFDBFE",
        "$300": "#93C5FD",
        "$400": "#60A5FA",
        "$500": "#3B82F6",
        "$600": "#2563EB",
        "$700": "#1D4ED8",
        "$800": "#1E40AF",
        "$900": "#1E3A8A"
    },
    "earth": {
        "$50": "#FFFBEB",
        "$100": "#FEF3C7",
        "$200": "#FDE68A",
        "$300": "#FCD34D",
        "$400": "#FBBF24",
        "$500": "#F59E0B",
        "$600": "#D97706",
        "$700": "#B45309",
        "$800": "#92400E",
        "$900": "#78350F"
    },
    "metal": {
        "$50": "#F5F3FF",
        "$100": "#EDE9FE",
        "$200": "#DDD6FE",
        "$300": "#C4B5FD",
        "$400": "#A78BFA",
        "$500": "#8B5CF6",
        "$600": "#7C3AED",
        "$700": "#6D28D9",
        "$800": "#5B21B6",
        "$900": "#4C1D95"
    },
    "flame": {
        "$50": "#FEF2F2",
        "$100": "#FEE2E2",
        "$200": "#FECACA",
        "$300": "#FCA5A5",
        "$400": "#F87171",
        "$500": "#EF4444",
        "$600": "#DC2626",
        "$700": "#B91C1C",
        "$800": "#991B1B",
        "$900": "#7F1D1D"
    },
    "woods": {
        "$50": "#ECFDF5",
        "$100": "#D1FAE5",
        "$200": "#A7F3D0",
        "$300": "#6EE7B7",
        "$400": "#34D399",
        "$500": "#10B981",
        "$600": "#059669",
        "$700": "#047857",
        "$800": "#065F46",
        "$900": "#064E3B"
    }
}

var $HELPERS = {
    data: {
        50: ["base", "$50"],
        100: ["base", "$100"],
        200: ["base", "$200"],
        300: ["base", "$300"],
        400: ["base", "$400"],
        500: ["base", "$500"],
        600: ["base", "$600"],
        700: ["base", "$700"],
        800: ["base", "$800"],
        900: ["base", "$900"],
        "water.50": ["water", "$50"],
        "water.100": ["water", "$100"],
        "water.200": ["water", "$200"],
        "water.300": ["water", "$300"],
        "water.400": ["water", "$400"],
        "water.500": ["water", "$500"],
        "water.600": ["water", "$600"],
        "water.700": ["water", "$700"],
        "water.800": ["water", "$800"],
        "water.900": ["water", "$900"],
        "flame.50": ["flame", "$50"],
        "flame.100": ["flame", "$100"],
        "flame.200": ["flame", "$200"],
        "flame.300": ["flame", "$300"],
        "flame.400": ["flame", "$400"],
        "flame.500": ["flame", "$500"],
        "flame.600": ["flame", "$600"],
        "flame.700": ["flame", "$700"],
        "flame.800": ["flame", "$800"],
        "flame.900": ["flame", "$900"],
        "woods.50": ["woods", "$50"],
        "woods.100": ["woods", "$100"],
        "woods.200": ["woods", "$200"],
        "woods.300": ["woods", "$300"],
        "woods.400": ["woods", "$400"],
        "woods.500": ["woods", "$500"],
        "woods.600": ["woods", "$600"],
        "woods.700": ["woods", "$700"],
        "woods.800": ["woods", "$800"],
        "woods.900": ["woods", "$900"],
        "metal.50": ["metal", "$50"],
        "metal.100": ["metal", "$100"],
        "metal.200": ["metal", "$200"],
        "metal.300": ["metal", "$300"],
        "metal.400": ["metal", "$400"],
        "metal.500": ["metal", "$500"],
        "metal.600": ["metal", "$600"],
        "metal.700": ["metal", "$700"],
        "metal.800": ["metal", "$800"],
        "metal.900": ["metal", "$900"],
        "earth.50": ["earth", "$50"],
        "earth.100": ["earth", "$100"],
        "earth.200": ["earth", "$200"],
        "earth.300": ["earth", "$300"],
        "earth.400": ["earth", "$400"],
        "earth.500": ["earth", "$500"],
        "earth.600": ["earth", "$600"],
        "earth.700": ["earth", "$700"],
        "earth.800": ["earth", "$800"],
        "earth.900": ["earth", "$900"],
    },
    loop: function(call) {
        var data = this.data,
            all = {};
        Object.keys(data).forEach(function(key) {
            var [theme, variant] = data[key],
                res = { result: {} };
            call.bind(res)(key, theme, variant);
            all = Object.assign(all, res.result);
        });
        return all;
    },
}

var $BASE = {
    "*": {
        "font-family": "Arial, sans-serif",
        "box-sizing": "border-box",
    }
}

var chartHost = {
        width: '300px',
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    charthHeader = {
        display: 'block',
        textAlign: 'center',
        fontSize: '2.6rem',
        width: '100%',
        textTransform: 'capitalize',
    },
    chartContainer = {
        width: '100%',
        margin: ['auto', 'auto'],
        "svg": {
            borderRadius: '50%',
            transform: 'rotate(-90deg) scaleY(-1)',
            display: 'block',
        },
    },
    chartTip = {
        padding: [.25, .5, .25, .5, 'rem'],
        borderRadius: '.5rem',
        backgroundColor: $COLORS.black,
        color: $COLORS.white,
        position: 'fixed',
        display: 'none',
        transform: 'translate(calc(-100% - 6px), -50%)',
        width: 'max-content',
        fontSize: '1rem',
        zIndex: 9999,
        textAlign: 'center',
        flexDirection: 'column',
        gap: '.25rem',
        "&::before": {
            content: "''",
            position: 'absolute',
            top: '50%',
            right: '-3px',
            width: '6px',
            height: '6px',
            transform: 'translateY(-50%) rotate(45deg)',
            backgroundColor: $COLORS.black,
        },
        "&.right": {
            transform: 'translate(6px, -50%)',
        },
        "&.right::before": {
            left: '-3px',
            right: 'unset',
        },
    };

var host = {
        "&([outlined]) #xo-container": {
            border: '2px solid ' + $COLORS.black,
            backgroundColor: 'transparent',
        },
        "&([rounded]) #xo-container": {
            borderRadius: '100px',
        },
        "&([flatted])": {
            "#xo-container": {
                borderRadius: 0,
            },
            "#xo-items": {
                borderRadius: 0,
            },
        },
        "&([disabled])": {
            pointerEvents: 'none',
            "#xo-container": {
                backgroundColor: $COLORS.backoff,
            },
        },
        "&([readonly])": {
            "#xo-btn": {
                "&:hover": {
                    cursor: 'default',
                },
            },
        },
        "&([trigger=\"hidden\"])": {
            "#xo-btn": {
                display: 'none',
            },
            "#wrap": {
                display: 'none',
            },
        },
    },
    container = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '.5rem',
        padding: [0, .5, 'rem'],
        borderWidth: '1px',
        borderRadius: '.5rem',
        position: 'relative',
        minHeight: '42px',
        backgroundColor: $COLORS.backon,
        section: {
            width: 0,
            flex: 1,
            height: '100%',
            display: 'flex',
            position: 'relative',
            overflow: 'hidden',
            alignItems: 'center',
        },
        "&.focus": {
            outlineStyle: 'solid',
            outlineColor: $COLORS.focus,
            outlineWidth: '2px',
            outlineOffset: '-1px',
        }
    },
    text = {
        all: 'unset',
        width: '100%',
        height: '100%',
        minHeight: '42px',
        padding: [14, null, null, null],
        fontSize: '18px',
        boxSizing: 'border-box',
        color: $COLORS.black,
        fontFamily: 'Arial Helvetica, sans-serif',
    },
    label = {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        fontSize: '18px',
        fontWeight: 500,
        textTransform: 'capitalize',
        color: $COLORS.black,
        whiteSpace: 'pre',
        fontFamily: 'Arial Helvetica, sans-serif',
        transition: 'height 200ms ease-in-out, color 200ms ease-in-out, font-size 200ms ease-in-out, top 200ms ease-in-out',
        animation: 'height 200ms forwards reverse',
        "&.valid": {
            fontSize: '12px',
            fontWeight: 800,
            color: $COLORS.shade,
            height: '20px',
        },
    },
    btn = {
        width: '20px',
        height: '20px',
        background: 'unset',
        border: 'unset',
        padding: [null, null],
        display: 'flex',
        animation: 'rotate 200ms forwards reverse',
        "&:hover": {
            filter: 'none',
            cursor: 'pointer',
        },
        "&:focus": {
            borderRadius: '.25rem',
            outlineStyle: 'solid',
            outlineColor: $COLORS.focus,
            outlineWidth: '2px',
            outlineOffset: '-1px',
        },
        "&[active]": {
            animation: 'rotate 200ms forwards',
        },
        svg: {
            width: '100%',
            height: '100%',
            fill: $COLORS.black,
        },
    },
    items = {
        static: {
            position: 'fixed',
            maxHeight: '260px',
            width: '100%',
            zIndex: 100,
            overflow: 'auto',
            borderRadius: '.5rem',
            boxShadow: '0 -6px 3px -3px ' + $COLORS.shade,
            animation: 'slidebottom 200ms forwards reverse',
            backgroundColor: $COLORS.white,
            "&[expand]": {
                animation: 'slidebottom 200ms forwards',
                pointerEvents: 'all',
            },
            main: {
                width: "calc(100% - 10px)",
                gridTemplateColumns: "repeat(7, 1fr)",
            }
        },
        change: {
            bottom: 'unset !important',
            position: 'absolute',
            width: 'max-content',
            overflowY: 'auto',
            pointerEvents: 'none',
            animation: 'slidetop 200ms forwards reverse',
            boxShadow: '0 6px 3px -3px ' + $COLORS.shade + ', 0 0 2px ' + $COLORS.shade,
            "--slide": '100%',
            "&[expand]": {
                animation: 'slidetop 200ms forwards',
            },
        }
    },
    info = {
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: [5, null, null, null],
        textTransform: 'capitalize',
        span: {
            display: 'block',
            minHeight: '14px',
            fontWeight: "bolder",
        },
        svg: {
            width: '16px',
            height: '16px',
        },
        "&[success]": {
            color: $COLORS.woods.$500,
            svg: {
                fill: $COLORS.woods.$500,
            }
        },
        "&[error]": {
            color: $COLORS.flame.$500,
            svg: {
                fill: $COLORS.flame.$500,
            }
        },
    },
    keyFrames = [{
        name: 'rotate',
        "0%": {
            transform: 'rotate(0deg)',
        },
        "100%": {
            transform: 'rotate(360deg)',
        },
    }, {
        name: 'rotate180',
        "0%": {
            transform: 'rotate(0deg)',
        },
        "100%": {
            transform: 'rotate(180deg)',
        },
    }, {
        name: 'slidebottom',
        "0%": {
            bottom: '-100%',
            opacity: 0,
            height: 0,
        },
        "100%": {
            bottom: '-0%',
            opacity: 1,
        },
    }, {
        name: 'slidetop',
        "0%": {
            top: '200%',
            opacity: 0,
            height: 0,
        },
        "100%": {
            top: 'var(--slide)',
            opacity: 1,
        },
    }];

var $ICONS = {
    $IconComponent: {
        ...$BASE,
        ":host": {
            boxSizing: 'content-box',
            display: 'inline-flex',
            ...$HELPERS.loop(function(n, t, v) {
                this.result["&([theme=\"" + n + "\"])"] = {
                    "#xo-icon": {
                        fill: $COLORS[t][v],
                    },
                }
            }),
        },
        "#xo-container": {
            display: 'flex',
            width: '34px',
            height: '34px',
            justifyContent: 'center',
            alignItems: 'center',
        },
        "#xo-icon": {
            width: '100%',
            height: '100%',
        }
    },
    $WrapperComponent: {
        ...$BASE,
        ":host": {
            display: 'inline-flex',
            boxSizing: 'content-box',
        },
        "#xo-container": {
            display: 'flex',
            position: 'relative',
            borderRadius: '50%',
            cursor: 'pointer',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            ".ripple": {
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: $COLORS.norms.$500 + 70,
                transform: 'scale(0)',
                position: 'absolute',
                opacity: 1,
                top: 0,
                left: 0,
                zIndex: -1,
                "&.rippleEffect": {
                    animation: 'rippleDrop 500ms ease-in-out',
                },
            },
        },
        keyFrames: [{
            name: "rippleDrop",
            "100%": {
                transform: 'scale(1.5)',
                opacity: 0,
            },
        }],
    },
}

var $CHARTS = {
    $PieChart: {
        ...$BASE,
        ":host": {
            ...chartHost,
            "&([hollow]) #xo-slices": {
                strokeWidth: 60,
            },
        },
        "#xo-header": {...charthHeader },
        "#xo-container": {...chartContainer, borderRadius: '50%', overflow: 'hidden' },
        "#xo-slices": {
            fill: 'none',
            strokeWidth: 200,
            cursor: 'pointer',
        },
        "#xo-tooltip": {...chartTip },
    },
    $RadarChart: {
        ...$BASE,
        ":host": {
            ...chartHost,
            "&([area]) #xo-area": {
                display: 'initial',
            },
            ...$HELPERS.loop(function(n, t, v) {
                this.result["&([theme=\"" + n + "\"])"] = {
                    "#xo-dots": {
                        fill: $COLORS[t][v],
                    },
                    "#xo-area": {
                        stroke: $COLORS[t][v],
                        fill: $COLORS[t][v] + 70,
                    },
                }
            }),
        },
        "#xo-header": {...charthHeader },
        "#xo-container": {...chartContainer, height: 'unset', "svg": { transform: 'unset', } },
        "#xo-grid": {
            stroke: $COLORS.black,
            strokeWidth: .5,
            strokeLinecap: "round",
            fill: $COLORS.white,
        },
        "#xo-dots": {
            r: 8,
            cursor: 'pointer',
        },
        "#xo-area": {
            display: 'none',
            strokeWidth: 2,
            strokeLinecap: "round",
        },
        "#xo-tooltip": {...chartTip },
    },
    $GridChart: {
        ...$BASE,
        ":host": {
            ...chartHost,
            width: '500px',
            "&([dots]) #xo-dots": {
                display: 'initial',
            },
            "&([bars]) #xo-bars": {
                display: 'initial',
            },
            "&([line]) #xo-line": {
                display: 'initial',
            },
            "&([area]) #xo-area": {
                display: 'initial',
            },
            ...$HELPERS.loop(function(n, t, v) {
                this.result["&([theme=\"" + n + "\"])"] = {
                    "#xo-dots": {
                        fill: $COLORS[t][v],
                    },
                    "#xo-bars": {
                        stroke: $COLORS[t][v],
                    },
                    "#xo-line": {
                        stroke: $COLORS[t][v],
                    },
                    "#xo-area": {
                        fill: $COLORS[t][v] + 70,
                    },
                    "#xo-xheader": {
                        color: $COLORS[t][v],
                    },
                    "#xo-yheader": {
                        color: $COLORS[t][v],
                    },
                }
            }),
        },
        "#xo-header": {...charthHeader },
        "#xo-container": {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            svg: {
                width: 0,
                flex: 1,
            }
        },
        "#xo-axis": {
            stroke: $COLORS.black,
            strokeWidth: '2px',
            strokeLinecap: "round",
        },
        "#xo-yheader": {
            ...charthHeader,
            writingMode: 'vertical-lr',
            transform: 'rotate(180deg)',
            fontStyle: 'italic',
            fontSize: '1.6rem',
            width: 'unset',
        },
        "#xo-xheader": {
            ...charthHeader,
            fontStyle: 'italic',
            fontSize: '1.6rem',
        },
        "#xo-grid": {
            stroke: $COLORS.base.$100,
            strokeWidth: 1,
            strokeLinecap: "round",
            strokeDasharray: 10,
        },
        "#xo-legendVert": {
            stroke: $COLORS.black,
            fontSize: '16px',
            textAnchor: 'middle',
            alignmentBaseline: 'central',
        },
        "#xo-legendHors": {
            stroke: $COLORS.black,
            fontSize: '18px',
            fontWeight: 'bolder',
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: [0, 10],
        },
        "#xo-hover": {
            opacity: 0,
            stroke: $COLORS.focus,
        },
        "#xo-ref": {
            stroke: $COLORS.black,
            strokeDasharray: 10,
            strokeLinecap: 'round',
            strokeWidth: 1,
            opacity: 0,
        },
        "#xo-dots": {
            display: 'none',
            cursor: 'pointer',
            r: 8,
        },
        "#xo-bars": {
            display: 'none',
            strokeWidth: 40,
            cursor: 'pointer',
        },
        "#xo-line": {
            display: 'none',
            fill: "transparent",
            strokeWidth: 5,
            strokeLinecap: "round",
        },
        "#xo-area": {
            display: 'none',
            strokeLinecap: "round",
        },
        "#xo-tooltip": {...chartTip },
    },
}

var $COMPONENTS = {
    $AccordionComponent: {
        ...$BASE,
        ":host": {
            display: 'block',
            boxSizing: 'content-box',
            borderRadius: '.5rem',
            overflow: 'hidden',
            "&([expand]), &([expand=\"true\"])": {
                "#xo-icon": {
                    animation: 'rotate 200ms forwards',
                },
                "#xo-content": {
                    animation: 'slide 200ms forwards',
                }
            },
            "&([expand=\"false\"])": {
                "#xo-icon": {
                    animation: 'rotate 200ms forwards reverse',
                },
                "#xo-content": {
                    animation: 'slide 200ms forwards reverse',
                }
            },
            ...$HELPERS.loop(function(n, t, v) {
                this.result["&([theme=\"" + n + "\"])"] = {
                    "#xo-header": {
                        backgroundColor: $COLORS[t][v],
                    },
                }
            }),
            "&([theme=\"500\"]), &([theme=\"600\"]), &([theme=\"700\"]), &([theme=\"800\"]), &([theme=\"900\"]), &([theme=\"water.500\"]), &([theme=\"water.600\"]), &([theme=\"water.700\"]), &([theme=\"water.800\"]), &([theme=\"water.900\"]), &([theme=\"flame.500\"]), &([theme=\"flame.600\"]), &([theme=\"flame.700\"]), &([theme=\"flame.800\"]), &([theme=\"flame.900\"]), &([theme=\"woods.500\"]), &([theme=\"woods.600\"]), &([theme=\"woods.700\"]), &([theme=\"woods.800\"]), &([theme=\"woods.900\"]), &([theme=\"metal.500\"]), &([theme=\"metal.600\"]), &([theme=\"metal.700\"]), &([theme=\"metal.800\"]), &([theme=\"metal.900\"]), &([theme=\"earth.500\"]), &([theme=\"earth.600\"]), &([theme=\"earth.700\"]), &([theme=\"earth.800\"]), &([theme=\"earth.900\"]),": {
                "#xo-header": {
                    color: $COLORS.white,
                },
                "#xo-icon svg": {
                    fill: $COLORS.white,
                },
            },
            "#xo-header": {
                color: $COLORS.black,
            },
            "#xo-icon svg": {
                fill: $COLORS.black,
            },
        },
        "#xo-header": {
            textDecoration: 'unset',
            width: '100%',
            display: 'flex',
            overflow: 'hidden',
            padding: [.6, 1, 'rem'],
            fontSize: '22px',
            position: 'relative',
            alignItems: 'center',
            boxSizing: 'border-box',
            gap: '.5rem',
        },
        "#xo-icon": {
            padding: [0, 0],
            border: 'unset',
            background: 'unset',
            width: '20px',
            height: '20px',
            display: 'flex',
            animation: 'rotate 200ms forwards reverse',
            cursor: 'pointer',
            borderRadius: '.2rem',
            "&:focus": {
                borderRadius: '.25rem',
                outlineStyle: 'solid',
                outlineColor: $COLORS.focus,
                outlineWidth: '2px',
                outlineOffset: '-1px',
            },
            svg: {
                display: 'flex',
                pointerEvents: 'none',
            },
        },
        "#xo-content": {
            height: 0,
            overflow: 'hidden',
            p: {
                fontSize: '18px',
                padding: [1, 1, 'rem'],
                margin: [0, 0],
            },
        },
        keyFrames: [{
            name: "rotate",
            "0%": {
                transform: 'rotate(-90deg)',
            },
            "100%": {
                transform: 'rotate(0deg)',
            },
        }, {
            name: "slide",
            "0%": {
                height: 0,
            },
            "100%": {
                height: 'var(--height)',
            },
        }],
    },
    $AccordionGroupComponent: {
        ...$BASE,
        ":host": {
            display: 'block',
            boxSizing: 'content-box',
            borderRadius: '.5rem',
            overflow: 'hidden',
        },
        "#xo-container": {
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
        },
    },
    $ToastComponent: {
        ...$BASE,
        ":host": {
            display: 'block',
            boxSizing: 'content-box',
            width: '100%',
            "&([pill]) #xo-container": {
                borderRadius: '100px',
            },
            "&([animation=\"left-right\"])": {
                animation: 'left_to_right 600ms forwards',
            },
            "&([animation=\"right-left\"])": {
                animation: 'right_to_left 600ms forwards',
            },
            ...$HELPERS.loop(function(n, t, v) {
                this.result["&([theme=\"" + n + "\"])"] = {
                    "#xo-container": {
                        backgroundColor: $COLORS[t][v],
                    },
                }
            }),
            "&([theme=\"500\"]), &([theme=\"600\"]), &([theme=\"700\"]), &([theme=\"800\"]), &([theme=\"900\"]), &([theme=\"water.500\"]), &([theme=\"water.600\"]), &([theme=\"water.700\"]), &([theme=\"water.800\"]), &([theme=\"water.900\"]), &([theme=\"flame.500\"]), &([theme=\"flame.600\"]), &([theme=\"flame.700\"]), &([theme=\"flame.800\"]), &([theme=\"flame.900\"]), &([theme=\"woods.500\"]), &([theme=\"woods.600\"]), &([theme=\"woods.700\"]), &([theme=\"woods.800\"]), &([theme=\"woods.900\"]), &([theme=\"metal.500\"]), &([theme=\"metal.600\"]), &([theme=\"metal.700\"]), &([theme=\"metal.800\"]), &([theme=\"metal.900\"]), &([theme=\"earth.500\"]), &([theme=\"earth.600\"]), &([theme=\"earth.700\"]), &([theme=\"earth.800\"]), &([theme=\"earth.900\"]),": {
                "#xo-container": {
                    color: $COLORS.white,
                },
                "#xo-icon svg": {
                    fill: $COLORS.white,
                },
            },
            "#xo-container": {
                color: $COLORS.black,
            },
            "#xo-icon svg": {
                fill: $COLORS.black,
            },
        },
        "#xo-container": {
            minWidth: '100%',
            position: 'relative',
            boxSizing: 'border-box',
            textTransform: 'capitalize',
            padding: [.6, .6, .6, 1, 'rem'],
            overflow: 'hidden',
            fontSize: '18px',
            borderRadius: '.5rem',
            display: 'flex',
            gap: '.5rem',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            div: {
                flex: 1,
                display: 'flex',
            },
        },
        "#xo-icon": {
            order: 2,
            padding: [0, 0],
            border: 'unset',
            background: 'unset',
            width: '16px',
            height: '16px',
            display: 'flex',
            cursor: 'pointer',
            borderRadius: '.2rem',
            "&:focus": {
                borderRadius: '.25rem',
                outlineStyle: 'solid',
                outlineColor: $COLORS.focus,
                outlineWidth: '2px',
                outlineOffset: '-1px',
            },
            svg: {
                width: '100%',
                height: '100%',
                display: 'flex',
            },
        },
        keyFrames: [{
            name: 'left_to_right',
            "0%": {
                transform: 'translateX(-200%)',
            },
            "100%": {
                transform: 'translateX(0%)',
            },
        }, {
            name: 'right_to_left',
            "0%": {
                transform: 'translateX(200%)',
            },
            "100%": {
                transform: 'translateX(0%)',
            },
        }],
    },
    $ToastGroupComponent: {
        ...$BASE,
        ":host": {
            display: 'block',
            zIndex: 100,
        },
        "#xo-container": {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            gap: '.5rem',
        },
    },
    $BadgeComponent: {
        ...$BASE,
        ":host": {
            display: 'inline-block',
            "&([loading]) #xo-container": {
                "&::before": {
                    content: "''",
                    position: 'absolute',
                    width: '150%',
                    height: '150%',
                    left: '-25%',
                    top: '-25%',
                },
                "&::after": {
                    content: "''",
                    position: 'absolute',
                    width: '100%',
                    height: '150%',
                    left: '-25%',
                    top: '-25%',
                    background: 'linear-gradient(to right, transparent 40%, ' + $COLORS.white + 99 + ' 50%, transparent 60%)',
                    animation: 'placeholderAnimate var(--delay) infinite',
                },
                "&:hover": {
                    boxShadow: 'unset',
                },
            },
            ...$HELPERS.loop(function(n, t, v) {
                this.result["&([theme=\"" + n + "\"][loading])"] = {
                    "#xo-container::before": {
                        background: $COLORS[t][v],
                    },
                }
                this.result["&([theme=\"" + n + "\"])"] = {
                    "#xo-container": {
                        backgroundColor: $COLORS[t][v],
                    },
                }
            }),
            "&([theme=\"500\"]), &([theme=\"600\"]), &([theme=\"700\"]), &([theme=\"800\"]), &([theme=\"900\"]), &([theme=\"water.500\"]), &([theme=\"water.600\"]), &([theme=\"water.700\"]), &([theme=\"water.800\"]), &([theme=\"water.900\"]), &([theme=\"flame.500\"]), &([theme=\"flame.600\"]), &([theme=\"flame.700\"]), &([theme=\"flame.800\"]), &([theme=\"flame.900\"]), &([theme=\"woods.500\"]), &([theme=\"woods.600\"]), &([theme=\"woods.700\"]), &([theme=\"woods.800\"]), &([theme=\"woods.900\"]), &([theme=\"metal.500\"]), &([theme=\"metal.600\"]), &([theme=\"metal.700\"]), &([theme=\"metal.800\"]), &([theme=\"metal.900\"]), &([theme=\"earth.500\"]), &([theme=\"earth.600\"]), &([theme=\"earth.700\"]), &([theme=\"earth.800\"]), &([theme=\"earth.900\"]),": {
                "#xo-label": {
                    color: $COLORS.white,
                },
            },
            "#xo-label": {
                color: $COLORS.black,
            },
        },
        "#xo-container": {
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
            padding: [.6, 1, 'rem'],
            overflow: 'hidden',
            flexWrap: 'wrap',
            borderRadius: '.5rem',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            transition: 'transform 200ms ease-in-out, box-shadow 200ms ease-in-out',
            position: 'relative',
            gap: '.5rem',
            "&:hover": {
                boxShadow: '0 6px 3px -3px ' + $COLORS.shade,
            },
        },
        "#xo-icon": {
            display: 'flex',
            width: '60px',
            height: '60px',
            overflow: 'hidden',
            borderRadius: '50%',
            fontSize: '40px',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        },
        "#xo-label": {
            flex: 1,
            display: 'block',
            fontSize: '24px',
            fontWeight: 600,
            textAlign: 'center',
            width: 0,
            minWidth: 'max-content',
            textTransform: 'capitalize',
        },
        keyFrames: [{
            name: "placeholderAnimate",
            "0%": {
                transform: 'skewX(10deg) translateX(-50%)',
            },
            "100%": {
                transform: 'skewX(10deg) translateX(150%)',
            },
        }],
    },
    $BoxComponent: {
        ...$BASE,
        ":host": {
            display: 'block',
            boxSizing: 'content-box',
            width: '100%',
            "&([trigger=\"hidden\"])": {
                "#xo-header": {
                    padding: [null, 10, null, null],
                },
            },
            ...$HELPERS.loop(function(n, t, v) {
                this.result["&([theme=\"" + n + "\"])"] = {
                    "#xo-container": {
                        backgroundColor: $COLORS[t][v],
                    },
                }
            }),
            "&([theme=\"500\"]), &([theme=\"600\"]), &([theme=\"700\"]), &([theme=\"800\"]), &([theme=\"900\"]), &([theme=\"water.500\"]), &([theme=\"water.600\"]), &([theme=\"water.700\"]), &([theme=\"water.800\"]), &([theme=\"water.900\"]), &([theme=\"flame.500\"]), &([theme=\"flame.600\"]), &([theme=\"flame.700\"]), &([theme=\"flame.800\"]), &([theme=\"flame.900\"]), &([theme=\"woods.500\"]), &([theme=\"woods.600\"]), &([theme=\"woods.700\"]), &([theme=\"woods.800\"]), &([theme=\"woods.900\"]), &([theme=\"metal.500\"]), &([theme=\"metal.600\"]), &([theme=\"metal.700\"]), &([theme=\"metal.800\"]), &([theme=\"metal.900\"]), &([theme=\"earth.500\"]), &([theme=\"earth.600\"]), &([theme=\"earth.700\"]), &([theme=\"earth.800\"]), &([theme=\"earth.900\"]),": {
                "#xo-container": {
                    color: $COLORS.white,
                },
                "#xo-header": {
                    borderColor: $COLORS.white,
                },
                "#xo-icon svg": {
                    fill: $COLORS.white,
                },
            },
            "#xo-container": {
                color: $COLORS.black,
            },
            "#xo-header": {
                borderColor: $COLORS.black,
            },
            "#xo-icon svg": {
                fill: $COLORS.black,
            },
        },
        "#xo-container": {
            borderRadius: '.5rem',
            overflow: 'hidden',
            minWidth: '100%',
        },
        "#xo-header": {
            borderBottomWidth: '2px',
            borderBottomStyle: 'solid',
            position: 'relative',
            fontSize: '20px',
            fontWeight: 700,
            padding: [.6, .6, .6, 1, 'rem'],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '.5rem',
        },
        "#xo-icon": {
            border: 'unset',
            backgroundColor: 'unset',
            padding: [0, 0],
            width: '16px',
            height: '16px',
            cursor: 'pointer',
            borderRadius: '.2rem',
            "&:focus": {
                borderRadius: '.25rem',
                outlineStyle: 'solid',
                outlineColor: $COLORS.focus,
                outlineWidth: '2px',
                outlineOffset: '-1px',
            },
            svg: {
                width: '100%',
                height: '100%',
                display: 'flex',
            },
        },
        "#xo-content": {
            padding: [1, 1, 'rem'],
            fontSize: '18px',
        },
    },
    $LoaderComponent: {
        ...$BASE,
        ":host": {
            display: 'inline-block',
            "&([full])": {
                position: 'fixed',
                inset: 0,
                zIndex: 100,
                "#xo-container": {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: $COLORS.shade,
                    zIndex: 9999,
                },
            },
            ...$HELPERS.loop(function(n, t, v) {
                this.result["&([theme=\"" + n + "\"])"] = {
                    "#xo-circle:last-child": {
                        stroke: $COLORS[t][v],
                    },
                }
            }),
        },
        "#xo-svg": {
            width: '60px',
            height: '60px',
            display: 'block',
        },
        "#xo-circle": {
            r: 8,
            cx: 10,
            cy: 10,
            strokeWidth: 2,
            fill: "transparent",
            strokeLinecap: "round",
            strokeDasharray: "calc(100 * 50.2 / 100) 50.2",
            "&:first-child": {
                stroke: $COLORS.shade,
            },
        },
    },
    $ModalComponent: {
        ...$BASE,
        ":host": {
            width: 0,
            height: 0,
            "&([theme=\"top\"]) #xo-content": {
                animation: 'top 200ms forwards',
            },
            "&([theme=\"top\"]) #xo-content[shrink]": {
                animation: 'top 200ms forwards reverse',
            },
            "&([theme=\"bottom\"]) #xo-content": {
                animation: 'bottom 200ms forwards',
            },
            "&([theme=\"bottom\"]) #xo-content[shrink]": {
                animation: 'bottom 200ms forwards reverse',
            },
            "&([theme=\"left\"]) #xo-content": {
                animation: 'left 200ms forwards',
            },
            "&([theme=\"left\"]) #xo-content[shrink]": {
                animation: 'left 200ms forwards reverse',
            },
            "&([theme=\"right\"]) #xo-content": {
                animation: 'right 200ms forwards',
            },
            "&([theme=\"right\"]) #xo-content[shrink]": {
                animation: 'right 200ms forwards reverse',
            },
        },
        "#xo-container": {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            opacity: 1,
            backgroundColor: $COLORS.shade,
            pointerEvents: 'all',
            zIndex: 100,
            animation: 'opacity 200ms forwards',
            "&[shrink]": {
                animation: 'opacity 200ms forwards reverse',
                pointerEvents: 'none',
            },
        },
        "#xo-icon": {
            background: 'unset',
            padding: [null, null],
            border: 'unset',
            display: 'flex',
            cursor: 'pointer',
            position: 'absolute',
            top: '10px',
            right: '10px',
            "&:focus": {
                outlineWidth: '2px',
                outlineStyle: 'solid',
                outlineColor: $COLORS.black,
                color: $COLORS.black,
            },
            svg: {
                display: 'flex',
                width: '30px',
                height: '30px',
                fill: $COLORS.white,
            },
        },
        "#xo-content": {
            pointerEvents: 'all',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            animation: 'center 200ms forwards',
            "&[shrink]": {
                animation: 'center 200ms forwards reverse',
                pointerEvents: 'none',
            },
        },
        keyFrames: [{
            name: "opacity",
            "0%": {
                opacity: 0,
            },
            "100%": {
                opacity: 1,
            },
        }, {
            name: "center",
            "0%": {
                transform: 'translate(-50%, -50%) scale(0)',
            },
            "100%": {
                transform: 'translate(-50%, -50%) scale(1)',
            },
        }, {
            name: "top",
            "0%": {
                transform: 'translate(-50%, -100vh)',
            },
            "100%": {
                transform: 'translate(-50%, -50%)',
            },
        }, {
            name: "bottom",
            "0%": {
                transform: 'translate(-50%, 100vh)',
            },
            "100%": {
                transform: 'translate(-50%, -50%)',
            },
        }, {
            name: "left",
            "0%": {
                transform: 'translate(-100vw, -50%)',
            },
            "100%": {
                transform: 'translate(-50%, -50%)',
            },
        }, {
            name: "right",
            "0%": {
                transform: 'translate(100vw, -50%)',
            },
            "100%": {
                transform: 'translate(-50%, -50%)',
            },
        }]
    },
    $NavBarComponent: {
        ...$BASE,
        ":host": {
            display: "block",
            width: "100%",
            "&([expand=\"true\"])": {
                "#xo-icon": {
                    animation: 'scale 200ms forwards',
                },
                "#xo-back": {
                    animation: 'opacity 200ms forwards',
                    pointerEvents: 'all',
                },
                "#xo-items": {
                    animation: 'slide 200ms forwards',
                    pointerEvents: 'all',
                },
            },
            "&([expand=\"false\"])": {
                "#xo-icon": {
                    animation: 'scale 200ms forwards reverse',
                },
                "#xo-back": {
                    animation: 'opacity 200ms forwards reverse',
                    pointerEvents: 'none',
                },
                "#xo-items": {
                    animation: 'slide 200ms forwards reverse',
                    pointerEvents: 'none',
                },
            },
            ...$HELPERS.loop(function(n, t, v) {
                this.result["&([theme=\"" + n + "\"])"] = {
                    backgroundColor: $COLORS[t][v],
                    "#xo-items": {
                        backgroundColor: $COLORS[t][v],
                    },
                }
            }),
            "&([theme=\"500\"]), &([theme=\"600\"]), &([theme=\"700\"]), &([theme=\"800\"]), &([theme=\"900\"]), &([theme=\"water.500\"]), &([theme=\"water.600\"]), &([theme=\"water.700\"]), &([theme=\"water.800\"]), &([theme=\"water.900\"]), &([theme=\"flame.500\"]), &([theme=\"flame.600\"]), &([theme=\"flame.700\"]), &([theme=\"flame.800\"]), &([theme=\"flame.900\"]), &([theme=\"woods.500\"]), &([theme=\"woods.600\"]), &([theme=\"woods.700\"]), &([theme=\"woods.800\"]), &([theme=\"woods.900\"]), &([theme=\"metal.500\"]), &([theme=\"metal.600\"]), &([theme=\"metal.700\"]), &([theme=\"metal.800\"]), &([theme=\"metal.900\"]), &([theme=\"earth.500\"]), &([theme=\"earth.600\"]), &([theme=\"earth.700\"]), &([theme=\"earth.800\"]), &([theme=\"earth.900\"]),": {
                "::slotted(xo-navbar-item)": {
                    color: $COLORS.white,
                },
                "#xo-icon svg": {
                    fill: $COLORS.white,
                },
            },
            "::slotted(xo-navbar-item)": {
                color: $COLORS.black,
            },
            "#xo-icon svg": {
                fill: $COLORS.black,
            },
        },
        "#xo-container": {
            width: "100%",
            maxWidth: "1200px",
            display: "flex",
            padding: [.6, 1, 'rem'],
            flexWrap: 'wrap',
            margin: ['auto', 'auto'],
            minHeight: '56px',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
        },
        "#brand": {
            width: "100%",
            display: "flex",
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        "#xo-icon": {
            all: 'unset',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            "&:hover": {
                cursor: 'pointer',
            },
            "&:focus": {
                borderRadius: '.25rem',
                outlineStyle: 'solid',
                outlineColor: $COLORS.focus,
                outlineWidth: '2px',
                outlineOffset: '-1px',
            },
            svg: {
                width: '100%',
                height: '100%',
                fill: $COLORS.black,
            }
        },
        "#xo-back": {
            position: 'fixed',
            opacity: 0,
            pointerEvents: 'none',
            inset: 0,
            backgroundColor: $COLORS.shade,
            zIndex: 9999,
        },
        "#xo-items": {
            width: '200px',
            display: 'flex',
            pointerEvents: 'none',
            flexDirection: 'column',
            position: 'fixed',
            top: 0,
            left: '-100%',
            bottom: 0,
            overflow: 'auto',
            zIndex: 9999,
        },
        mediaQueries: [{
            condition: "min-width: 768px",
            ":host": {
                "&::slotted(xo-navbar-item)": {
                    width: 'max-content',
                },
                "&([expand=\"false\"])": {
                    "#xo-items": {
                        pointerEvents: 'all',
                    }
                },
            },
            "#brand": {
                width: 'max-content',
            },
            "#xo-icon": {
                display: 'none',
            },
            "#xo-back": {
                opacity: 0,
                pointerEvents: 'none',
                zIndex: 'unset',
            },
            "#xo-items": {
                position: 'unset',
                margin: [null, null, null, 'auto'],
                flexDirection: 'row',
                alignItems: 'center',
                minWidth: 'max-content',
                flex: 'auto',
                overflow: 'unset',
                padding: [0, 0],
                gap: '1rem',
                justifyContent: 'flex-end',
                backgroundColor: 'transparent !important',
                zIndex: 'unset',
            },
        }],
        keyFrames: [{
                name: "scale",
                "0%": {
                    transform: 'scaleX(1)',
                },
                "100%": {
                    transform: 'scaleX(-1)',
                },
            }, {
                name: "opacity",
                "0%": {
                    opacity: 0,
                },
                "100%": {
                    opacity: 1,
                },
            },
            {
                name: "slide",
                "0%": {
                    left: '-200px',
                },
                "100%": {
                    left: 0,
                },
            }
        ],
    },
    $NavBarItemComponent: {
        ...$BASE,
        ":host": {
            display: "block",
            width: "100%",
            "&([space=\"full\"])": {
                margin: ['auto', 'auto'],
            },
            "&([space=\"both\"])": {
                margin: ['auto', null, 'auto', null],
            },
            "&([space=\"up\"])": {
                margin: ['auto', null, null, null],
            },
            "&([space=\"down\"])": {
                margin: [null, null, 'auto', null],
            },
            "&([space=\"left\"])": {
                margin: [null, null, null, 'auto'],
            },
            "&([space=\"right\"])": {
                margin: [null, 'auto', null, null],
            },
            "&([space=\"up-left\"]), &([space=\"up-right\"])": {
                margin: ['auto', null, null, null],
            },
            "&([space=\"down-left\"]), &([space=\"down-right\"])": {
                margin: [null, null, 'auto', null],
            },
            "&([space=\"left-up\"]), &([space=\"left-down\"])": {
                margin: [null, 'auto', null, null],
            },
            "&([space=\"right-up\"]), &([space=\"right-down\"])": {
                margin: [null, null, null, 'auto'],
            },
            "&([active])": {
                "#xo-container": {
                    backgroundColor: $COLORS.shade,
                },
            },
            "&([to])": {
                "#xo-container": {
                    cursor: 'pointer',
                },
            },
            "&([slot=\"brand\"])": {
                width: 'max-content',
                "#xo-container": {
                    padding: [0, 0],
                    width: 'max-content',
                    backgroundColor: 'unset',
                    textDecoration: 'unset',
                    "&:hover, &:focus": {
                        backgroundColor: 'unset',
                        textDecoration: 'unset',
                    },
                    "&:focus": {
                        borderRadius: '.25rem',
                        outlineStyle: 'solid',
                        outlineColor: $COLORS.focus,
                        outlineWidth: '2px',
                        outlineOffset: '-1px',
                    },
                },
                "#xo-label": {
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    fontFamily: 'arial, sans-serif',
                },
            },
        },
        "#xo-container": {
            all: 'unset',
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            boxSizing: 'border-box',
            padding: [.6, 1, 'rem'],
            gap: '5px',
            "&:hover": {
                backgroundColor: $COLORS.shade,
            },
            "&:focus": {
                borderRadius: '.25rem',
                outlineStyle: 'solid',
                outlineColor: $COLORS.focus,
                outlineWidth: '2px',
                outlineOffset: '-1px',
            },
        },
        "#xo-label": {
            display: 'flex',
            alignItems: 'center',
            lineHeight: 1,
            fontSize: '1.4rem',
            pointerEvents: 'none',
        },
        mediaQueries: [{
            condition: "min-width: 768px",
            ":host": {
                width: 'max-content',
                "&([space=\"both\"])": {
                    margin: [null, 'auto', null, 'auto'],
                },
                "&([space=\"up-left\"]), &([space=\"down-left\"])": {
                    margin: [null, null, null, 'auto'],
                },
                "&([space=\"up-right\"]), &([space=\"down-right\"])": {
                    margin: [null, 'auto', null, null],
                },
                "&([space=\"left-up\"]), &([space=\"right-up\"])": {
                    margin: ['auto', null, null, null],
                },
                "&([space=\"left-down\"]), &([space=\"right-down\"])": {
                    margin: [null, null, 'auto', null],
                },
                "#xo-container": {
                    transition: 'padding 200ms ease-in-out',
                    padding: [0, 0],
                },
                "&([active])": {
                    "#xo-container": {
                        backgroundColor: $COLORS.shade,
                        padding: [.25, 1, 'rem'],
                        borderRadius: '9999px',
                    },
                },
                "&([slot=\"brand\"])": {
                    "#xo-container": {
                        padding: [0, 0],
                        backgroundColor: 'unset',
                        "&:focus": {
                            borderRadius: '.25rem',
                            outlineStyle: 'solid',
                            outlineColor: $COLORS.focus,
                            outlineWidth: '2px',
                            outlineOffset: '-1px',
                        },
                    },
                },
            },
            "#xo-container": {
                "&:hover": {
                    backgroundColor: $COLORS.shade,
                    padding: [.25, 1, 'rem'],
                    borderRadius: '9999px',
                },
                "&:focus": {
                    borderRadius: '.25rem',
                    outlineStyle: 'solid',
                    outlineColor: $COLORS.focus,
                    outlineWidth: '2px',
                    outlineOffset: '-1px',
                },
            }
        }]
    },
    $AwaitComponent: {
        ":host": {
            display: 'block',
            width: '100%',
        }
    },
    $ButtonComponent: {
        ...$BASE,
        ":host": {
            display: 'inline-block',
            boxSizing: 'content-box',
            height: '42px',
            width: 'max-content',
            "&([rounded]) #xo-container": {
                borderRadius: '100px',
            },
            "&([flatted]) #xo-container": {
                borderRadius: 0,
            },
            "&([disabled])": {
                pointerEvents: 'none',
                "#xo-container": {
                    opacity: .5,
                },
            },
            ...$HELPERS.loop(function(n, t, v) {
                this.result["&([theme=\"" + n + "\"][outlined])"] = {
                    "#xo-container": {
                        color: $COLORS[t][v],
                        "&:hover, &:focus": {
                            backgroundColor: $COLORS[t][v],
                        },
                    },
                }
                this.result["&([theme=\"" + n + "\"])"] = {
                    "#xo-container": {
                        backgroundColor: $COLORS[t][v],
                        borderColor: $COLORS[t][v],
                    },
                }
            }),
            "&([theme=\"500\"]), &([theme=\"600\"]), &([theme=\"700\"]), &([theme=\"800\"]), &([theme=\"900\"]), &([theme=\"water.500\"]), &([theme=\"water.600\"]), &([theme=\"water.700\"]), &([theme=\"water.800\"]), &([theme=\"water.900\"]), &([theme=\"flame.500\"]), &([theme=\"flame.600\"]), &([theme=\"flame.700\"]), &([theme=\"flame.800\"]), &([theme=\"flame.900\"]), &([theme=\"woods.500\"]), &([theme=\"woods.600\"]), &([theme=\"woods.700\"]), &([theme=\"woods.800\"]), &([theme=\"woods.900\"]), &([theme=\"metal.500\"]), &([theme=\"metal.600\"]), &([theme=\"metal.700\"]), &([theme=\"metal.800\"]), &([theme=\"metal.900\"]), &([theme=\"earth.500\"]), &([theme=\"earth.600\"]), &([theme=\"earth.700\"]), &([theme=\"earth.800\"]), &([theme=\"earth.900\"])": {
                "#xo-container": {
                    color: $COLORS.white,
                },
            },
            "&([theme=\"50\"]), &([theme=\"100\"]), &([theme=\"200\"]), &([theme=\"300\"]), &([theme=\"400\"]), &([theme=\"water.50\"]), &([theme=\"water.100\"]), &([theme=\"water.200\"]), &([theme=\"water.300\"]), &([theme=\"water.400\"]), &([theme=\"flame.50\"]), &([theme=\"flame.100\"]), &([theme=\"flame.200\"]), &([theme=\"flame.300\"]), &([theme=\"flame.400\"]), &([theme=\"woods.50\"]), &([theme=\"woods.100\"]), &([theme=\"woods.200\"]), &([theme=\"woods.300\"]), &([theme=\"woods.400\"]), &([theme=\"metal.50\"]), &([theme=\"metal.100\"]), &([theme=\"metal.200\"]), &([theme=\"metal.300\"]), &([theme=\"metal.400\"]), &([theme=\"earth.50\"]), &([theme=\"earth.100\"]), &([theme=\"earth.200\"]), &([theme=\"earth.300\"]), &([theme=\"earth.400\"])": {
                "#xo-container": {
                    "&:hover, &:focus": {
                        color: $COLORS.black,
                    },
                },
            },
            "&([theme=\"500\"][outlined]), &([theme=\"600\"][outlined]), &([theme=\"700\"][outlined]), &([theme=\"800\"][outlined]), &([theme=\"900\"][outlined]), &([theme=\"water.500\"][outlined]), &([theme=\"water.600\"][outlined]), &([theme=\"water.700\"][outlined]), &([theme=\"water.800\"][outlined]), &([theme=\"water.900\"][outlined]), &([theme=\"flame.500\"][outlined]), &([theme=\"flame.600\"][outlined]), &([theme=\"flame.700\"][outlined]), &([theme=\"flame.800\"][outlined]), &([theme=\"flame.900\"][outlined]), &([theme=\"woods.500\"][outlined]), &([theme=\"woods.600\"][outlined]), &([theme=\"woods.700\"][outlined]), &([theme=\"woods.800\"][outlined]), &([theme=\"woods.900\"][outlined]), &([theme=\"metal.500\"][outlined]), &([theme=\"metal.600\"][outlined]), &([theme=\"metal.700\"][outlined]), &([theme=\"metal.800\"][outlined]), &([theme=\"metal.900\"][outlined]), &([theme=\"earth.500\"][outlined]), &([theme=\"earth.600\"][outlined]), &([theme=\"earth.700\"][outlined]), &([theme=\"earth.800\"][outlined]), &([theme=\"earth.900\"][outlined]),": {
                "#xo-container": {
                    backgroundColor: "transparent",
                    "&:hover, &:focus": {
                        color: $COLORS.white,
                    },
                },
            },
            "&([outlined])": {
                "#xo-container": {
                    backgroundColor: "transparent",
                    "&:hover, &:focus": {
                        color: $COLORS.black,
                    },
                },
            },
        },
        "#xo-container": {
            all: 'unset',
            width: '100%',
            height: '100%',
            display: 'flex',
            fontSize: '20px',
            overflow: 'hidden',
            padding: [5, 20],
            position: 'relative',
            borderRadius: '.5rem',
            alignItems: 'center',
            boxSizing: 'border-box',
            justifyContent: 'center',
            transition: 'background-color 200ms ease-in-out, color 200ms ease-in-out, box-shadow 200ms ease-in-out',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'transparent',
            gap: '5px',
            outline: 'none',
            "&:hover": {
                boxShadow: '0 0 6px ' + $COLORS.shade,
                cursor: 'context-menu',
            },
            "&:focus": {
                borderRadius: '.25rem',
                outlineStyle: 'solid',
                outlineColor: $COLORS.focus,
                outlineWidth: '2px',
                outlineOffset: '-1px',
            },
            "&:active": {
                boxShadow: 'inset 0 0 6px ' + $COLORS.shade,
                cursor: 'context-menu',
            },
        },
        "#xo-label": {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 0,
            gap: '5px',
        },
    },
}

var $FIELDS = {
    $DateField: {
        ...$BASE,
        ":host": {
            display: 'inline-block',
            width: '260px',
            ...host,
            ...$HELPERS.loop(function(n, t, v) {
                this.result["&([theme=\"" + n + "\"])"] = {
                    "#xo-items": {
                        "header": {
                            backgroundColor: $COLORS[t][v],
                        },
                        "#xo-day": {
                            "&[active]": {
                                backgroundColor: $COLORS[t][v],
                            },
                            "&[on]": {
                                color: $COLORS[t][v],
                            },
                            "&:hover, &:focus": {
                                backgroundColor: $COLORS[t][v] + 50,
                            },
                        },
                    },
                }
            }),
            "&([theme=\"500\"]), &([theme=\"600\"]), &([theme=\"700\"]), &([theme=\"800\"]), &([theme=\"900\"]), &([theme=\"water.500\"]), &([theme=\"water.600\"]), &([theme=\"water.700\"]), &([theme=\"water.800\"]), &([theme=\"water.900\"]), &([theme=\"flame.500\"]), &([theme=\"flame.600\"]), &([theme=\"flame.700\"]), &([theme=\"flame.800\"]), &([theme=\"flame.900\"]), &([theme=\"woods.500\"]), &([theme=\"woods.600\"]), &([theme=\"woods.700\"]), &([theme=\"woods.800\"]), &([theme=\"woods.900\"]), &([theme=\"metal.500\"]), &([theme=\"metal.600\"]), &([theme=\"metal.700\"]), &([theme=\"metal.800\"]), &([theme=\"metal.900\"]), &([theme=\"earth.500\"]), &([theme=\"earth.600\"]), &([theme=\"earth.700\"]), &([theme=\"earth.800\"]), &([theme=\"earth.900\"]),": {
                "#xo-items": {
                    "header": {
                        color: $COLORS.white,
                    },
                    "#xo-controll svg": {
                        fill: $COLORS.white,
                    },
                    "#xo-day": {
                        "&[active]": {
                            color: $COLORS.white,
                        },
                    },
                },
            },
            "#xo-items": {
                "header": {
                    color: $COLORS.black,
                },
                "#xo-controll svg": {
                    fill: $COLORS.black,
                },
                "#xo-day": {
                    "&[active]": {
                        color: $COLORS.black,
                    },
                },
            },
        },
        "#xo-container": {...container },
        "#xo-text": {...text },
        "#xo-label": {...label },
        "#xo-btn": {...btn },
        "#xo-items": {
            ...items.static,
            header: {
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: [16, 16],
            },
            main: {
                display: 'grid',
                gridTemplateColumns: "repeat(7, 1fr)",
                padding: [.5, .5, 'rem'],
            },
        },
        "#xo-title": {
            margin: [0, 0],
            fontSize: '20px',
            flexGrow: 1,
            textAlign: 'center',
        },
        "#xo-controll": {
            padding: [0, 0],
            border: 'unset',
            background: 'unset',
            display: 'flex',
            width: '20px',
            height: '20px',
            "&:first-child": {
                margin: [null, null, null, 'auto'],
            },
            "&:hover": {
                filter: 'none',
                cursor: 'pointer',
            },
            "&:focus": {
                borderRadius: '.25rem',
                outlineStyle: 'solid',
                outlineColor: $COLORS.focus,
                outlineWidth: '2px',
                outlineOffset: '-1px',
            },
            svg: {
                width: '100%',
                height: '100%',
                fill: $COLORS.black,
            },
        },
        "#weeks": {
            display: 'grid',
            gridTemplateColumns: "repeat(7, 1fr)",
            gridColumn: "1/8",
            width: '100%',
        },
        "#xo-weekDay": {
            gridColumn: "span 1",
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: "bolder",
            margin: [null, null, .5, null, 'rem'],
        },
        "#xo-day": {
            gridColumn: "span 1",
            textAlign: 'center',
            border: 'unset',
            background: 'unset',
            fontWeight: 700,
            fontSize: '14px',
            padding: [.25, .25, 'rem'],
            borderRadius: '.25rem',
            "&:hover": {
                filter: 'none',
                cursor: 'pointer',
            },
            "&:focus": {
                outlineStyle: 'solid',
                outlineColor: $COLORS.focus,
                outlineWidth: '2px',
                outlineOffset: '-1px',
            },
            "&[off]": {
                opacity: 0,
                pointerEvents: 'none',
            },
            "&[on]": {
                fontSize: '16px',
            },
        },
        "#xo-info": {...info },
        mediaQueries: [{
            condition: "min-width: 768px",
            "#xo-items": {...items.change, minWidth: '320px' },
            "#weeks": {
                width: "calc(100% - 10px)",
                gridTemplateColumns: "repeat(7, 1fr)",
                width: '100%',
            }
        }],
        keyFrames,
    },
    $NumberField: {
        ...$BASE,
        ":host": {
            display: 'inline-block',
            width: '260px',
            ...host
        },
        "#xo-container": {
            ...container,
            div: {
                display: 'flex',
                flexDirection: 'column',
            },
        },
        "#xo-text": {...text },
        "#xo-label": {...label },
        "#xo-btn": {
            ...btn,
            width: '15px',
            height: '12px',
        },
        "#xo-info": {...info },
    },
    $PasswordField: {
        ...$BASE,
        ":host": {
            display: 'inline-block',
            width: '260px',
            ...host
        },
        "#xo-container": {...container },
        "#xo-text": {...text },
        "#xo-label": {...label },
        "#xo-info": {...info },
        "#xo-btn": {...btn },
    },
    $RateField: {
        ...$BASE,
        ":host": {
            display: 'inline-block',
            width: 'max-content',
            ...host,
            "&([readonly])": {
                "#xo-icon": {
                    cursor: 'default',
                }
            },
            "&([disabled])": {
                pointerEvents: 'none',
                "#xo-icon": {
                    "svg": {
                        fill: $COLORS.backoff,
                    }
                }
            },
            ...$HELPERS.loop(function(n, t, v) {
                this.result["&([theme=\"" + n + "\"])"] = {
                    "#xo-icon.active svg": {
                        fill: $COLORS[t][v],
                    },
                }
            }),
        },
        "#xo-icon": {
            display: 'flex',
            cursor: 'pointer',
            width: '42px',
            height: '42px',
            background: 'unset',
            padding: [null, null],
            border: 'unset',
            "svg": {
                display: 'flex',
                width: '100%',
                height: '100%',
                fill: $COLORS.backon,

            },
            "&:focus": {
                borderRadius: '.25rem',
                outlineStyle: 'solid',
                outlineColor: $COLORS.focus,
                outlineWidth: '2px',
                outlineOffset: '-1px',
            },
        },
        "#xo-container": {
            ...container,
            border: 'unset',
            padding: [null, null],
            backgroundColor: 'unset',
            gap: '5px',
        },
        "#xo-info": {...info },
    },
    $SelectField: {
        ...$BASE,
        ":host": {
            display: 'inline-block',
            width: '260px',
            ...host,
            ...$HELPERS.loop(function(n, t, v) {
                this.result["&([theme=\"" + n + "\"])"] = {
                    "#xo-items::-webkit-scrollbar-thumb": {
                        backgroundColor: $COLORS[t][v],
                    },
                }
            }),
        },
        "#xo-container": {...container },
        "#xo-text": {...text },
        "#xo-label": {...label },
        "#xo-btn": {
            ...btn,
            animation: 'rotate180 200ms forwards reverse',
            "&[active]": {
                animation: 'rotate180 200ms forwards',
            },
        },
        "#xo-items": {
            ...items.static,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            "&::-webkit-scrollbar": {
                width: '4px',
            },
            "&::-webkit-scrollbar-thumb": {
                width: '4px',
            },
        },
        "#xo-row": {
            width: '100%',
            padding: [5, 5],
            position: 'sticky',
            backgroundColor: $COLORS.white,
            boxShadow: '0 0 .2rem ' + $COLORS.shade,
            top: 0,
        },
        "#xo-search": {
            display: 'block',
            padding: [9, 10],
            fontSize: '18px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#969696',
            borderRadius: '.5rem',
            width: '100%',
        },
        "#xo-info": {...info },
        mediaQueries: [{
            condition: "min-width: 768px",
            "#xo-items": {...items.change },
        }],
        keyFrames,
    },
    $SelectItemField: {
        ...$BASE,
        ":host": {
            display: 'block',
            width: '100%',
            boxSizing: 'content-box',
            "&([disabled])": {
                pointerEvents: 'none',
                "#xo-container, #xo-container:hover, #xo-container:focus": {
                    backgroundColor: $COLORS.backoff + '!important',
                },
            },
            ...$HELPERS.loop(function(n, t, v) {
                this.result["&([theme=\"" + n + "\"][selected])"] = {
                    "#xo-container": {
                        backgroundColor: $COLORS[t][v],
                    },
                }
                this.result["&([theme=\"" + n + "\"])"] = {
                    "#xo-container": {
                        "&:hover, &:focus": {
                            backgroundColor: $COLORS[t][v] + 50,
                        },
                    },
                }
            }),
            "&([theme=\"500\"][selected]), &([theme=\"600\"][selected]), &([theme=\"700\"][selected]), &([theme=\"800\"][selected]), &([theme=\"900\"][selected]), &([theme=\"water.500\"][selected]), &([theme=\"water.600\"][selected]), &([theme=\"water.700\"][selected]), &([theme=\"water.800\"][selected]), &([theme=\"water.900\"][selected]), &([theme=\"flame.500\"][selected]), &([theme=\"flame.600\"][selected]), &([theme=\"flame.700\"][selected]), &([theme=\"flame.800\"][selected]), &([theme=\"flame.900\"][selected]), &([theme=\"woods.500\"][selected]), &([theme=\"woods.600\"][selected]), &([theme=\"woods.700\"][selected]), &([theme=\"woods.800\"][selected]), &([theme=\"woods.900\"][selected]), &([theme=\"metal.500\"][selected]), &([theme=\"metal.600\"][selected]), &([theme=\"metal.700\"][selected]), &([theme=\"metal.800\"][selected]), &([theme=\"metal.900\"][selected]), &([theme=\"earth.500\"][selected]), &([theme=\"earth.600\"][selected]), &([theme=\"earth.700\"][selected]), &([theme=\"earth.800\"][selected]), &([theme=\"earth.900\"][selected]),": {
                "#xo-container": {
                    color: $COLORS.white,
                },
            },
            "#xo-container": {
                color: $COLORS.black,
            },
        },
        "#xo-container": {
            border: 'unset',
            backgroundColor: 'unset',
            display: 'flex',
            textDecoration: 'unset',
            padding: [4, 12],
            fontSize: '26px',
            width: '100%',
            outline: 'none',
            "&:hover": {
                cursor: 'pointer',
            },
        },
    },
    $SwitchField: {
        ...$BASE,
        ":host": {
            boxSizing: 'content-box',
            display: 'inline-block',
            minWidth: '74px',
            width: 'max-content',
            height: '42px',
            "&([disabled])": {
                pointerEvents: 'none',
                "#xo-trigger": {
                    backgroundColor: $COLORS.backoff,
                },
            },
            "&([checked])": {
                "#xo-trigger": {
                    "&::before": {
                        animation: 'check 200ms forwards'
                    },
                },
            },
            "&([rounded])": {
                "#xo-trigger": {
                    borderRadius: '100px',
                    "&::before": {
                        borderRadius: '100px',
                    },
                },
            },
            "&([flatted])": {
                "#xo-trigger": {
                    borderRadius: 0,
                    "&::before": {
                        borderRadius: 0,
                    },
                },
            },
            ...$HELPERS.loop(function(n, t, v) {
                this.result["&([theme=\"" + n + "\"][checked])"] = {
                    "#xo-trigger": {
                        backgroundColor: $COLORS[t][v],
                    },
                }
            }),
        },
        "#xo-container": {
            textDecoration: 'unset',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            boxSizing: 'border-box',
            height: '100%',
            fontSize: '20px',
            gap: '.5rem',
        },
        "#xo-trigger": {
            width: '74px',
            height: '100%',
            position: 'relative',
            backgroundColor: $COLORS.backon,
            borderRadius: '.5rem',
            cursor: 'pointer',
            "&::before": {
                width: "calc((100% /2) - 5px)",
                height: "calc(100% - 10px)",
                position: 'absolute',
                top: '5px',
                left: '5px',
                content: "''",
                backgroundColor: $COLORS.white,
                borderRadius: '.5rem',
                animation: 'check 200ms forwards reverse',
                cursor: 'pointer',
            },
            "&:focus": {
                borderRadius: '.25rem',
                outlineStyle: 'solid',
                outlineColor: $COLORS.focus,
                outlineWidth: '2px',
                outlineOffset: '-1px',
            },
        },
        "#xo-info": {...info },
        keyFrames: [{
            name: 'check',
            "0%": {
                transform: 'translateX(0%)',
            },
            "100%": {
                transform: 'translateX(100%)',
            }
        }]
    },
    $SwitchGroupField: {
        ...$BASE,
        ":host": {
            display: 'block',
            "&([disabled])": {
                pointerEvents: 'none',
            },
        },
        "#xo-container": {
            width: '100%',
            borderRadius: '.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
        },
        "#xo-info": {...info },
    },
    $TextField: {
        ...$BASE,
        ":host": {
            display: 'inline-block',
            width: '260px',
            ...host
        },
        "#xo-container": {...container },
        "#xo-text": {...text },
        "#xo-label": {...label },
        "#xo-info": {...info },
    },
    $AreaField: {
        ...$BASE,
        ":host": {
            display: 'inline-block',
            width: '260px',
            ...host
        },
        "#xo-container": {...container },
        "#xo-text": {...text, padding: [17, null, null, null], lineHeight: 1.2, height: '36px' },
        "#xo-text::-webkit-scrollbar": { display: 'none', },
        "#xo-label": {...label },
        "#xo-info": {...info },
    },
}

var $UI = {
    $AppBarUi: {
        ...$BASE,
        ":host": {
            width: '100%',
            display: 'flex',
            minHeight: '1rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            padding: [.6, 1, 'rem'],
            boxShadow: '0 6px 3px -3px ' + $COLORS.shade,
            ...$HELPERS.loop(function(n, t, v) {
                this.result["&([theme=\"" + n + "\"])"] = {
                    backgroundColor: $COLORS[t][v],
                }
            }),
            "&([theme=\"500\"]), &([theme=\"600\"]), &([theme=\"700\"]), &([theme=\"800\"]), &([theme=\"900\"]), &([theme=\"water.500\"]), &([theme=\"water.600\"]), &([theme=\"water.700\"]), &([theme=\"water.800\"]), &([theme=\"water.900\"]), &([theme=\"flame.500\"]), &([theme=\"flame.600\"]), &([theme=\"flame.700\"]), &([theme=\"flame.800\"]), &([theme=\"flame.900\"]), &([theme=\"woods.500\"]), &([theme=\"woods.600\"]), &([theme=\"woods.700\"]), &([theme=\"woods.800\"]), &([theme=\"woods.900\"]), &([theme=\"metal.500\"]), &([theme=\"metal.600\"]), &([theme=\"metal.700\"]), &([theme=\"metal.800\"]), &([theme=\"metal.900\"]), &([theme=\"earth.500\"]), &([theme=\"earth.600\"]), &([theme=\"earth.700\"]), &([theme=\"earth.800\"]), &([theme=\"earth.900\"]),": {
                "*": {
                    color: $COLORS.white,
                },
            },
            "*": {
                color: $COLORS.black,
            },
        },
    },
    $ContainerUi: {
        ":host": {
            boxSizing: 'content-box',
            display: 'block',
            width: '100%',
            padding: [1, 1, 'rem'],
            margin: ['auto', 'auto'],
            maxWidth: '1200px',
        }
    },
    $GridUi: {
        ":host": {
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        }
    }
}

module.exports = {
    ...$ICONS,
    ...$CHARTS,
    ...$COMPONENTS,
    ...$FIELDS,
    ...$UI
}