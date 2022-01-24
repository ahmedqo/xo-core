const $COLORS = {
    'norms': {
        '$100': '#ffffff',
        '$500': '#1D1D1D',
        '$900': '#000000',
    },
    'base': {
        '$100': '#F7F7F7',
        '$500': '#EEEEEE',
        '$900': '#777777',
    },
    'water': {
        '$100': '#9DC1FB',
        '$500': '#3B82F6',
        '$900': '#1E417B',
    },
    'earth': {
        '$100': '#FACF85',
        '$500': '#F59E0B',
        '$900': '#7B4F06',
    },
    'metal': {
        '$100': '#8B93BD',
        '$500': '#17267B',
        '$900': '#0C133E',
    },
    'flame': {
        '$100': '#F7A2A2',
        '$500': '#EF4444',
        '$900': '#782222',
    },
    'woods': {
        '$100': '#88DCC0',
        '$500': '#10B981',
        '$900': '#085D41',
    }
}

let test = {
    'base': {
        '$50': 'rgb(249, 250, 251)',
        '$100': 'rgb(243, 244, 246)',
        '$200': 'rgb(229, 231, 235)',
        '$300': 'rgb(209, 213, 219)',
        '$400': 'rgb(156, 163, 175)',
        '$500': 'rgb(107, 114, 128)',
        '$600': 'rgb(75, 85, 99)',
        '$700': 'rgb(55, 65, 81)',
        '$800': 'rgb(31, 41, 55)',
        '$900': 'rgb(17, 24, 39)',
    },
    'water': {
        '$50': 'rgb(239, 246, 255)',
        '$100': 'rgb(219, 234, 254)',
        '$200': 'rgb(191, 219, 254)',
        '$300': 'rgb(147, 197, 253)',
        '$400': 'rgb(96, 165, 250)',
        '$500': 'rgb(59, 130, 246)',
        '$600': 'rgb(37, 99, 235)',
        '$700': 'rgb(29, 78, 216)',
        '$800': 'rgb(30, 64, 175)',
        '$900': 'rgb(30, 58, 138)',
    },
    'earth': {
        '$50': 'rgb(255, 251, 235)',
        '$100': 'rgb(254, 243, 199)',
        '$200': 'rgb(253, 230, 138)',
        '$300': 'rgb(252, 211, 77)',
        '$400': 'rgb(251, 191, 36)',
        '$500': 'rgb(245, 158, 11)',
        '$600': 'rgb(217, 119, 6)',
        '$700': 'rgb(180, 83, 9)',
        '$800': 'rgb(146, 64, 14)',
        '$900': 'rgb(120, 53, 15)',
    },
    'metal': {
        '$50': 'rgb(245, 243, 255)',
        '$100': 'rgb(237, 233, 254)',
        '$200': 'rgb(221, 214, 254)',
        '$300': 'rgb(196, 181, 253)',
        '$400': 'rgb(167, 139, 250)',
        '$500': 'rgb(139, 92, 246)',
        '$600': 'rgb(124, 58, 237)',
        '$700': 'rgb(109, 40, 217)',
        '$800': 'rgb(91, 33, 182)',
        '$900': 'rgb(76, 29, 149)',
    },
    'flame': {
        '$50': 'rgb(254, 242, 242)',
        '$100': 'rgb(254, 226, 226)',
        '$200': 'rgb(254, 202, 202)',
        '$300': 'rgb(252, 165, 165)',
        '$400': 'rgb(248, 113, 113)',
        '$500': 'rgb(239, 68, 68)',
        '$600': 'rgb(220, 38, 38)',
        '$700': 'rgb(185, 28, 28)',
        '$800': 'rgb(153, 27, 27)',
        '$900': 'rgb(127, 29, 29)',
    },
    'woods': {
        '$50': 'rgb(236, 253, 245)',
        '$100': 'rgb(209, 250, 229)',
        '$200': 'rgb(167, 243, 208)',
        '$300': 'rgb(110, 231, 183)',
        '$400': 'rgb(52, 211, 153)',
        '$500': 'rgb(16, 185, 129)',
        '$600': 'rgb(5, 150, 105)',
        '$700': 'rgb(4, 120, 87)',
        '$800': 'rgb(6, 95, 70)',
        '$900': 'rgb(6, 78, 59)',
    }
}

const $FOCUSCOLOR = '#2196f3';

const $BASE = {
    "*": {
        "font-family": "Arial, sans-serif",
        "box-sizing": "border-box",
    }
}

const chartHost = {
        width: '300px',
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '10px',
    },
    charthHeader = {
        display: 'block',
        textAlign: 'center',
        fontSize: '24px',
        width: '100%',
        textTransform: 'capitalize',
    },
    chartContainer = {
        width: '100%',
        margin: 'auto',
        "svg": {
            borderRadius: '50%',
            transform: 'rotate(-90deg) scaleY(-1)',
            display: 'block',
        },
    },
    chartTip = {
        padding: '.25rem .5rem',
        borderRadius: '.5rem',
        backgroundColor: $COLORS.norms.$500,
        color: "#fff",
        position: 'fixed',
        display: 'none',
        transform: 'translate(calc(-100% - 6px), -50%)',
        width: 'max-content',
        fontSize: '1rem',
        zIndex: '10000',
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
            backgroundColor: $COLORS.norms.$500,
        },
        "&.right": {
            transform: 'translate(6px, -50%)',
        },
        "&.right::before": {
            left: '-3px',
            right: 'unset',
        },
    };

const host = {
        "&([outlined]) #xo-container": {
            border: '2px solid #1d1d1d',
            backgroundColor: 'transparent',
        },
        "&([rounded]) #xo-container": {
            borderRadius: '100px',
        },
        "&([flatted]) #xo-container": {
            borderRadius: '0',
        },
        "&([disabled])": {
            "#xo-container": {
                backgroundColor: $COLORS.base.$500,
            },
            "#xo-btn": {
                "&:hover": {
                    cursor: 'default',
                },
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
        padding: '0 .5rem',
        borderWidth: '1px',
        borderRadius: '.5rem',
        position: 'relative',
        minHeight: '42px',
        backgroundColor: $COLORS.base.$100,
        section: {
            width: '0px',
            flex: '1',
            height: '100%',
            display: 'flex',
            position: 'relative',
            overflow: 'hidden',
            alignItems: 'center',
        },
        "&.focus": {
            outlineStyle: 'solid',
            outlineColor: $FOCUSCOLOR,
            outlineWidth: '2px',
            outlineOffset: '-1px',
        }
    },
    text = {
        all: 'unset',
        width: '100%',
        height: '100%',
        minHeight: '42px',
        paddingTop: '14px',
        fontSize: '18px',
        boxSizing: 'border-box',
        color: $COLORS.norms.$500,
        fontFamily: 'Arial Helvetica, sans-serif',
    },
    label = {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        fontSize: '18px',
        fontWeight: '500',
        textTransform: 'capitalize',
        color: $COLORS.norms.$500,
        whiteSpace: 'pre',
        fontFamily: 'Arial Helvetica, sans-serif',
        transition: 'height 200ms ease-in-out, color 200ms ease-in-out, font-size 200ms ease-in-out, top 200ms ease-in-out',
        animation: 'height 200ms forwards reverse',
        "&.valid": {
            fontSize: '12px',
            fontWeight: '800',
            color: $COLORS.norms.$500 + '50',
            height: '20px',
        },
    },
    btn = {
        width: '20px',
        height: '20px',
        background: 'unset',
        border: 'unset',
        padding: 'unset',
        display: 'flex',
        transition: 'transform 200ms ease-in-out',
        "&:hover": {
            filter: 'none',
            cursor: 'pointer',
        },
        "&:focus": {
            borderRadius: '.25rem',
            outlineStyle: 'solid',
            outlineColor: $FOCUSCOLOR,
            outlineWidth: '2px',
            outlineOffset: '-1px',
        },
        "&[active]": {
            transform: 'rotate(360deg)',
        },
        svg: {
            width: '100%',
            height: '100%',
            fill: $COLORS.norms.$500,
        },
    },
    items = {
        def: "",
        med: "",
        static: {
            position: 'fixed',
            maxHeight: '340px',
            width: '100%',
            bottom: '-100%',
            zIndex: '9999',
            filter: `drop-shadow(0 -2px 2px ${$COLORS.norms.$500 + '80'})`,
            transition: 'top 200ms ease-in-out, bottom 200ms ease-in-out, opacity 200ms ease-in-out',
            backgroundColor: '#FFFFFF',
            "&[expand]": {
                bottom: 0,
            },
            main: {
                width: "calc(100% - 10px)",
                gridTemplateColumns: "repeat(7, 1fr)",
            }
        },
        change: {
            bottom: 'unset !important',
            position: 'absolute',
            top: '200%',
            opacity: '0',
            left: '50%',
            width: 'max-content',
            borderRadius: '.25rem',
            overflowY: 'auto',
            pointerEvents: 'none',
            filter: `drop-shadow(2px 2px 4px ${$COLORS.norms.$500 + '80'})`,
            transform: 'translateX(-50%)',
            "&[expand]": {
                "--slide": '100%',
                top: "var(--slide)",
                opacity: '1',
                pointerEvents: 'all',
            },
        }
    },
    info = {
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '5px',
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
    };

const $ICONS = {
    $IconComponent: {
        ...$BASE,
        ":host": {
            boxSizing: 'content-box',
            display: 'inline-flex',
        },
        "#xo-container": {
            display: 'flex',
            width: '34px',
            height: '34px',
            justifyContent: 'center',
            alignItems: 'center',
        },
        "#xo-icon": {
            fill: '#242424',
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
            zIndex: '1',
            ".ripple": {
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#1d1d1d70',
                transform: 'scale(0)',
                position: 'absolute',
                opacity: '1',
                top: '0',
                left: '0',
                zIndex: '-1',
                "&.rippleEffect": {
                    animation: 'rippleDrop 500ms ease-in-out',
                },
            },
        },
        keyFrames: [{
            name: "rippleDrop",
            "100%": {
                transform: 'scale(1.5)',
                opacity: '0',
            },
        }],
    },
}

const $CHARTS = {
    $PieChart: {
        ...$BASE,
        ":host": {
            ...chartHost,
            "&([hollow]) #xo-slices": {
                strokeWidth: '60',
            },
        },
        "#xo-header": {...charthHeader },
        "#xo-container": {...chartContainer, borderRadius: '50%', overflow: 'hidden' },
        "#xo-slices": {
            fill: 'none',
            strokeWidth: '200',
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
            "&([theme=\"water\"])": {
                "#xo-dots": {
                    fill: $COLORS.water.$900,
                },
                "#xo-area": {
                    fill: $COLORS.water.$500 + '50',
                    stroke: $COLORS.water.$900,
                },
            },
            "&([theme=\"flame\"])": {
                "#xo-dots": {
                    fill: $COLORS.flame.$900,
                },
                "#xo-area": {
                    fill: $COLORS.flame.$500 + '50',
                    stroke: $COLORS.flame.$900,
                },
            },
            "&([theme=\"earth\"])": {
                "#xo-dots": {
                    fill: $COLORS.earth.$900,
                },
                "#xo-area": {
                    fill: $COLORS.earth.$500 + '50',
                    stroke: $COLORS.earth.$900,
                },
            },
            "&([theme=\"woods\"])": {
                "#xo-dots": {
                    fill: $COLORS.woods.$900,
                },
                "#xo-area": {
                    fill: $COLORS.woods.$500 + '50',
                    stroke: $COLORS.woods.$900,
                },
            },
            "&([theme=\"metal\"])": {
                "#xo-dots": {
                    fill: $COLORS.metal.$900,
                },
                "#xo-area": {
                    fill: $COLORS.metal.$500 + '50',
                    stroke: $COLORS.metal.$900,
                },
            },
        },
        "#xo-header": {...charthHeader },
        "#xo-container": {...chartContainer, height: 'unset', "svg": { transform: 'unset', } },
        "#xo-grid": {
            stroke: $COLORS.norms.$500,
            strokeWidth: '.5',
            strokeLinecap: "round",
            fill: "#fff",
        },
        "#xo-dots": {
            r: '8',
            cursor: 'pointer',
            fill: $COLORS.base.$900,
        },
        "#xo-area": {
            display: 'none',
            strokeWidth: '2',
            strokeLinecap: "round",
            fill: $COLORS.base.$500 + '50',
            stroke: $COLORS.base.$900,
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
            "&([theme=\"water\"])": {
                "#xo-dots": {
                    fill: $COLORS.water.$900,
                },
                "#xo-bars": {
                    stroke: $COLORS.water.$900,
                },
                " #xo-line": {
                    stroke: $COLORS.water.$900,
                },
                "#xo-area": {
                    fill: $COLORS.water.$900 + '50',
                },
            },
            "&([theme=\"flame\"])": {
                "#xo-dots": {
                    fill: $COLORS.flame.$900,
                },
                "#xo-bars": {
                    stroke: $COLORS.flame.$900,
                },
                " #xo-line": {
                    stroke: $COLORS.flame.$900,
                },
                "#xo-area": {
                    fill: $COLORS.flame.$900 + '50',
                },
            },
            "&([theme=\"earth\"])": {
                "#xo-dots": {
                    fill: $COLORS.earth.$900,
                },
                "#xo-bars": {
                    stroke: $COLORS.earth.$900,
                },
                " #xo-line": {
                    stroke: $COLORS.earth.$900,
                },
                "#xo-area": {
                    fill: $COLORS.earth.$900 + '50',
                },
            },
            "&([theme=\"woods\"])": {
                "#xo-dots": {
                    fill: $COLORS.woods.$900,
                },
                "#xo-bars": {
                    stroke: $COLORS.woods.$900,
                },
                " #xo-line": {
                    stroke: $COLORS.woods.$900,
                },
                "#xo-area": {
                    fill: $COLORS.woods.$900 + '50',
                },
            },
            "&([theme=\"metal\"])": {
                "#xo-dots": {
                    fill: $COLORS.metal.$900,
                },
                "#xo-bars": {
                    stroke: $COLORS.metal.$900,
                },
                " #xo-line": {
                    stroke: $COLORS.metal.$900,
                },
                "#xo-area": {
                    fill: $COLORS.metal.$900 + '50',
                },
            },
        },
        "#xo-header": {...charthHeader },
        "#xo-container": {
            width: '100%',
            height: '100%',
        },
        "#xo-axis": {
            stroke: $COLORS.norms.$500,
            strokeWidth: '2px',
            strokeLinecap: "round",
        },
        "#xo-grid": {
            stroke: $COLORS.base.$100,
            strokeWidth: '1',
            strokeLinecap: "round",
            strokeDasharray: '2'
        },
        "#xo-legendVert": {
            stroke: $COLORS.norms.$500,
            fontSize: '16px',
            textAnchor: 'middle',
            alignmentBaseline: 'central',
        },
        "#xo-legendHors": {
            stroke: $COLORS.norms.$500,
            fontSize: '18px',
            fontWeight: 'bolder',
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 10px',
        },
        "#xo-hover": {
            opacity: '0',
            stroke: "#fff",
        },
        "#xo-dots": {
            display: 'none',
            cursor: 'pointer',
            r: '8',
            fill: $COLORS.base.$900,
        },
        "#xo-bars": {
            display: 'none',
            strokeWidth: '40',
            cursor: 'pointer',
            stroke: $COLORS.base.$900,
        },
        " #xo-line": {
            display: 'none',
            stroke: $COLORS.base.$900,
            fill: "transparent",
            strokeWidth: '5',
            strokeLinecap: "round",
        },
        "#xo-area": {
            display: 'none',
            fill: $COLORS.base.$900 + '50',
            strokeLinecap: "round",
        },
        "#xo-tooltip": {...chartTip },
    },
}

const $COMPONENTS = {
    $AccordionComponent: {
        ...$BASE,
        ":host": {
            display: 'block',
            boxSizing: 'content-box',
            borderRadius: '.5rem',
            overflow: 'hidden',
            "&([expand]), &([expand='true'])": {
                "#xo-icon": {
                    animation: 'rotate 200ms forwards',
                },
                "#xo-content": {
                    animation: 'slide 200ms forwards',
                }
            },
            "&([expand='false'])": {
                "#xo-icon": {
                    animation: 'rotate 200ms forwards reverse',
                },
                "#xo-content": {
                    animation: 'slide 200ms forwards reverse',
                }
            },
            "&([theme=\"water\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.water.$100,
                },
                "#xo-header": {
                    backgroundColor: $COLORS.water.$500,
                },
            },
            "&([theme=\"flame\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.flame.$100,
                },
                "#xo-header": {
                    backgroundColor: $COLORS.flame.$500,
                },
            },
            "&([theme=\"woods\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.woods.$100,
                },
                "#xo-header": {
                    backgroundColor: $COLORS.woods.$500,
                },
            },
            "&([theme=\"earth\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.earth.$100,
                },
                "#xo-header": {
                    backgroundColor: $COLORS.earth.$500,
                },
            },
            "&([theme=\"metal\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.metal.$100,
                },
                "#xo-header": {
                    backgroundColor: $COLORS.metal.$500,
                },
            },
            "&([theme=\"water\"]), &([theme=\"flame\"]), &([theme=\"woods\"]), &([theme=\"metal\"])": {
                "#xo-header": {
                    color: $COLORS.norms.$100,
                },
                "#xo-icon svg": {
                    fill: $COLORS.norms.$100,
                },
            },
        },
        "#xo-container": {
            backgroundColor: $COLORS.base.$100,
        },
        "#xo-header": {
            textDecoration: 'unset',
            width: '100%',
            display: 'flex',
            color: $COLORS.norms.$500,
            overflow: 'hidden',
            padding: '.6rem 1rem',
            fontSize: '22px',
            position: 'relative',
            alignItems: 'center',
            boxSizing: 'border-box',
            gap: '.5rem',
            backgroundColor: $COLORS.base.$500,
        },
        "#xo-icon": {
            padding: '0',
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
                outlineColor: $FOCUSCOLOR,
                outlineWidth: '2px',
                outlineOffset: '-1px',
            },
            svg: {
                display: 'flex',
                fill: $COLORS.norms.$500,
                pointerEvents: 'none',
            },
        },
        "#xo-content": {
            height: '0',
            overflow: 'hidden',
            p: {
                fontSize: '18px',
                padding: '1rem',
                margin: '0px',
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
                height: '0',
            },
            "100%": {
                height: 'var(--height)',
            },
        }],
    },
    $AlertComponent: {
        ...$BASE,
        ":host": {
            display: 'block',
            boxSizing: 'content-box',
            width: '100%',
            "&([pill]) #xo-container": {
                borderRadius: '100px',
            },
            "&([theme=\"water\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.water.$100,
                    borderColor: $COLORS.water.$900,
                    color: $COLORS.water.$900,
                },
                "#xo-icon svg": {
                    fill: $COLORS.water.$900,
                },
            },
            "&([theme=\"flame\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.flame.$100,
                    borderColor: $COLORS.flame.$900,
                    color: $COLORS.flame.$900,
                },
                "#xo-icon svg": {
                    fill: $COLORS.flame.$900,
                },
            },
            "&([theme=\"earth\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.earth.$100,
                    borderColor: $COLORS.earth.$900,
                    color: $COLORS.earth.$900,
                },
                "#xo-icon svg": {
                    fill: $COLORS.earth.$900,
                },
            },
            "&([theme=\"woods\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.woods.$100,
                    borderColor: $COLORS.woods.$900,
                    color: $COLORS.woods.$900,
                },
                "#xo-icon svg": {
                    fill: $COLORS.woods.$900,
                },
            },
            "&([theme=\"metal\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.metal.$100,
                    borderColor: $COLORS.metal.$900,
                    color: $COLORS.metal.$900,
                },
                "#xo-icon svg": {
                    fill: $COLORS.metal.$900,
                },
            },
        },
        "#xo-container": {
            minWidth: '100%',
            position: 'relative',
            boxSizing: 'border-box',
            textTransform: 'capitalize',
            padding: '.6rem .6rem .6rem 1rem',
            overflow: 'hidden',
            fontSize: '18px',
            borderRadius: '.5rem',
            borderWidth: '1px',
            borderStyle: 'solid',
            display: 'flex',
            gap: '.5rem',
            flexWrap: 'wrap',
            backgroundColor: $COLORS.base.$100,
            borderColor: $COLORS.base.$900,
            color: $COLORS.base.$900,
            justifyContent: 'space-between',
            div: {
                flex: '1',
                display: 'flex',
            },
        },
        "#xo-icon": {
            order: '2',
            padding: '0',
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
                outlineColor: $FOCUSCOLOR,
                outlineWidth: '2px',
                outlineOffset: '-1px',
            },
            svg: {
                width: '100%',
                height: '100%',
                fill: $COLORS.base.$900,
                display: 'flex',
            },
        },
    },
    $ContainerComponent: {
        ":host": {
            boxSizing: 'content-box',
            display: 'block',
            width: '100%',
            padding: '1rem',
            margin: 'auto',
            maxWidth: '1200px',
        }
    },
    $AudioComponent: {
        ...$BASE,
        ":host": {
            "--back": $COLORS.norms.$100,
            "--pros": $COLORS.water.$500,
            display: 'inline-flex',
            width: '260px',
            height: '42px',
        },
        "#xo-container": {
            padding: '0 10px',
            borderRadius: '5px',
            width: '100%',
            gap: '5px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            backgroundColor: $COLORS.norms.$500 + '50',
        },
        "#xo-btn": {
            width: '24px',
            height: '24px',
            background: 'unset',
            border: 'unset',
            display: 'flex',
            padding: '0',
            "&:hover": {
                cursor: 'pointer',
                filter: 'none',
            },
            "&:focus": {
                outlineWidth: '2px',
                outlineStyle: 'solid',
                outlineColor: $COLORS.norms.$500,
            },
            svg: {
                width: '100%',
                height: '100%',
                fill: "var(--back)",
            },
        },
        "#xo-time": {
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
            fontWeight: '500',
            color: "var(--back)",
            fontFamily: 'Segoe UI, sans-serif',
        },
        "#xo-range": {
            backgroundColor: "var(--back)",
            appearance: 'none',
            height: '5px',
            width: '100%',
            borderRadius: '5px',
            cursor: 'pointer',
            background: 'linear-gradient(90deg, var(--pros) 0%, var(--back) 0%)',
            "&::-webkit-slider-thumb": {
                appearance: 'none',
            },
            "&:focus": {
                outlineWidth: '2px',
                outlineStyle: 'solid',
                outlineColor: $COLORS.norms.$500,
                "&::-webkit-slider-thumb": {
                    appearance: 'none',
                    width: '10px',
                    height: '10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    backgroundColor: "var(--back)",
                },
            },
            "&:hover::-webkit-slider-thumb": {
                appearance: 'none',
                width: '10px',
                height: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                backgroundColor: "var(--back)",
            },
        },
        "section": {
            "&:nth-child(3)": {
                flex: '1',
                display: 'flex',
                alignItems: 'center',
            },
            "&:last-child": {
                position: 'absolute',
                top: '50%',
                padding: '10px',
                backgroundColor: $COLORS.norms.$500 + '50',
                display: 'flex',
                transformOrigin: 'right',
                transition: 'transform 200ms ease-in-out',
                transform: 'translateY(-50%) scaleX(0)',
                right: '36px',
                borderRadius: '20px',
                width: '20%',
                "&:hover, &:focus": {
                    transform: 'translateY(-50%) scaleX(1)',
                },
            },
            "&:nth-child(4)": {
                "&:hover~section, &:focus~section": {
                    transform: 'translateY(-50%) scaleX(1)',
                },
            }
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
                    animationFillMode: "forwards",
                    animationDuration: "var(--delay)",
                    animationIterationCount: "infinite",
                    animationTimingFunction: "linear",
                    animationName: "placeholderAnimate",
                    background: `linear-gradient(to right, ${$COLORS.base.$500} 2%, ${$COLORS.base.$100} 20%, ${$COLORS.base.$500} 40%)`,
                    transform: 'skewX(20deg)',
                },
                "&:hover": {
                    filter: 'none',
                },
            },
            "&([loading][theme=\"water\"]) #xo-container::before": {
                background: `linear-gradient(to right, ${$COLORS.water.$500} 2%, ${$COLORS.water.$100} 20%, ${$COLORS.water.$500} 40%)`,
            },
            "&([loading][theme=\"flame\"]) #xo-container::before": {
                background: `linear-gradient(to right, ${$COLORS.flame.$500} 2%, ${$COLORS.flame.$100} 20%, ${$COLORS.flame.$500} 40%)`,
            },
            "&([loading][theme=\"earth\"]) #xo-container::before": {
                background: `linear-gradient(to right, ${$COLORS.earth.$500} 2%, ${$COLORS.earth.$100} 20%, ${$COLORS.earth.$500} 40%)`,
            },
            "&([loading][theme=\"woods\"]) #xo-container::before": {
                background: `linear-gradient(to right, ${$COLORS.woods.$500} 2%, ${$COLORS.woods.$100} 20%, ${$COLORS.woods.$500} 40%)`,
            },
            "&([loading][theme=\"metal\"]) #xo-container::before": {
                background: `linear-gradient(to right, ${$COLORS.metal.$500} 2%, ${$COLORS.metal.$100} 20%, ${$COLORS.metal.$500} 40%)`,
            },
            "&([theme=\"water\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.water.$500,
                },
                "#xo-label": {
                    color: $COLORS.norms.$100,
                },
            },
            "&([theme=\"flame\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.flame.$500,
                },
                "#xo-label": {
                    color: $COLORS.norms.$100,
                },
            },
            "&([theme=\"earth\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.earth.$500,
                },
                "#xo-label": {
                    color: $COLORS.norms.$500,
                },
            },
            "&([theme=\"woods\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.woods.$500,
                },
                "#xo-label": {
                    color: $COLORS.norms.$100,
                },
            },
            "&([theme=\"metal\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.metal.$500,
                },
                "#xo-label": {
                    color: $COLORS.norms.$100,
                },
            },
        },
        "#xo-container": {
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
            padding: '.6rem 1rem',
            overflow: 'hidden',
            flexWrap: 'wrap',
            borderRadius: '.5rem',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: $COLORS.base.$500,
            transition: 'transform 200ms ease-in-out, box-shadow 200ms ease-in-out',
            position: 'relative',
            gap: '.5rem',
            "&:hover": {
                filter: `drop-shadow(0 0 3px ${$COLORS.norms.$500 + '80'})`,
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
            color: $COLORS.norms.$100,
        },
        "#xo-label": {
            flex: '1',
            display: 'block',
            fontSize: '24px',
            fontWeight: '600',
            textAlign: 'center',
            width: '0',
            minWidth: 'max-content',
            textTransform: 'capitalize',
        },
        keyFrames: [{
            name: "placeholderAnimate",
            "0%": {
                backgroundPosition: '-650px 0',
            },
            "100%": {
                backgroundPosition: '650px 0',
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
                    paddingRight: '10px',
                },
                "#xo-icon": {
                    display: 'none',
                },
            },
            "&([theme=\"earth\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.earth.$500,
                    color: $COLORS.norms.$500,
                },
                "#xo-header": {
                    borderColor: $COLORS.norms.$500,
                },
                "#xo-icon svg": {
                    fill: $COLORS.norms.$500,
                },
            },
            "&([theme=\"water\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.water.$500,
                    color: $COLORS.norms.$100,
                },
                "#xo-header": {
                    borderColor: $COLORS.norms.$100,
                },
                "#xo-icon svg": {
                    fill: $COLORS.norms.$100,
                },
            },
            "&([theme=\"flame\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.flame.$500,
                    color: $COLORS.norms.$100,
                },
                "#xo-header": {
                    borderColor: $COLORS.norms.$100,
                },
                "#xo-icon svg": {
                    fill: $COLORS.norms.$100,
                },
            },
            "&([theme=\"woods\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.woods.$500,
                    color: $COLORS.norms.$100,
                },
                "#xo-header": {
                    borderColor: $COLORS.norms.$100,
                },
                "#xo-icon svg": {
                    fill: $COLORS.norms.$100,
                },
            },
            "&([theme=\"metal\"])": {
                "#xo-container": {
                    backgroundColor: $COLORS.metal.$500,
                    color: $COLORS.norms.$100,
                },
                "#xo-header": {
                    borderColor: $COLORS.norms.$100,
                },
                "#xo-icon svg": {
                    fill: $COLORS.norms.$100,
                },
            },
        },
        "#xo-container": {
            backgroundColor: $COLORS.base.$500,
            borderRadius: '.5rem',
            overflow: 'hidden',
            minWidth: '100%',
            color: $COLORS.norms.$500,
        },
        "#xo-header": {
            borderBottomWidth: '2px',
            borderBottomStyle: 'solid',
            borderColor: $COLORS.norms.$500,
            position: 'relative',
            fontSize: '20px',
            fontWeight: '700',
            padding: '.6rem .6rem .6rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '.5rem',
        },
        "#xo-icon": {
            border: 'unset',
            backgroundColor: 'unset',
            padding: '0',
            width: '16px',
            height: '16px',
            cursor: 'pointer',
            borderRadius: '.2rem',
            "&:focus": {
                borderRadius: '.25rem',
                outlineStyle: 'solid',
                outlineColor: $FOCUSCOLOR,
                outlineWidth: '2px',
                outlineOffset: '-1px',
            },
            svg: {
                width: '100%',
                height: '100%',
                fill: $COLORS.norms.$500,
                display: 'flex',
            },
        },
        "#xo-content": {
            padding: '1rem',
            fontSize: '18px',
        },
    },
    $LoaderComponent: {
        ...$BASE,
        ":host": {
            display: 'inline-block',
            "&([full])": {
                position: 'fixed',
                inset: '0',
                zIndex: '100',
                "#xo-container": {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: $COLORS.norms.$500 + 'bb',
                    zIndex: '10000000',
                },
            },
            "&([theme=\"water\"]) #xo-circle": {
                "&:first-child": {
                    stroke: $COLORS.water.$100,
                },
                "&:last-child": {
                    stroke: $COLORS.water.$500,
                },
            },
            "&([theme=\"flame\"]) #xo-circle": {
                "&:first-child": {
                    stroke: $COLORS.flame.$100,
                },
                "&:last-child": {
                    stroke: $COLORS.flame.$500,
                },
            },
            "&([theme=\"earth\"]) #xo-circle": {
                "&:first-child": {
                    stroke: $COLORS.earth.$100,
                },
                "&:last-child": {
                    stroke: $COLORS.earth.$500,
                },
            },
            "&([theme=\"woods\"]) #xo-circle": {
                "&:first-child": {
                    stroke: $COLORS.woods.$100,
                },
                "&:last-child": {
                    stroke: $COLORS.woods.$500,
                },
            },
            "&([theme=\"metal\"]) #xo-circle": {
                "&:first-child": {
                    stroke: $COLORS.metal.$100,
                },
                "&:last-child": {
                    stroke: $COLORS.metal.$500,
                },
            },
        },
        "#xo-svg": {
            width: '60px',
            height: '60px',
            transform: 'scaleY(-1)',
            display: 'block',
        },
        "#xo-circle": {
            r: '8',
            cx: '10',
            cy: '10',
            strokeWidth: '2',
            fill: "transparent",
            strokeLinecap: "round",
            strokeDasharray: "calc(100 * 50.2 / 100) 50.2",
            "&:first-child": {
                stroke: $COLORS.base.$100,
            },
            "&:last-child": {
                stroke: $COLORS.base.$900,
            },
        },
    },
    $ModalComponent: {
        ...$BASE,
        ":host": {
            width: '0',
            height: '0',
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
            top: '0',
            left: '0',
            width: '100%',
            height: '100vh',
            opacity: '1',
            backgroundColor: $COLORS.norms.$500 + 'bb',
            pointerEvents: 'all',
            zIndex: '10000',
            animation: 'opacity 200ms forwards',
            "&[shrink]": {
                animation: 'opacity 200ms forwards reverse',
                pointerEvents: 'none',
            },
        },
        "#xo-icon": {
            background: 'unset',
            padding: 'unset',
            padding: 'unset',
            border: 'unset',
            display: 'flex',
            cursor: 'pointer',
            position: 'absolute',
            top: '10px',
            right: '10px',
            "&:focus": {
                outlineWidth: '2px',
                outlineStyle: 'solid',
                outlineColor: $COLORS.norms.$500,
                color: $COLORS.norms.$500,
            },
            svg: {
                display: 'flex',
                width: '30px',
                height: '30px',
                fill: $COLORS.norms.$100,
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
                opacity: '0',
            },
            "100%": {
                opacity: '1',
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
            backgroundColor: $COLORS.base.$500,
            "&([expand='true'])": {
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
            "&([expand='false'])": {
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
            "#xo-items": {
                backgroundColor: $COLORS.base.$500,
            },
            "&([theme='water'])": {
                backgroundColor: $COLORS.water.$500,
                "#xo-items": {
                    backgroundColor: $COLORS.water.$500,
                },
            },
            "&([theme='flame'])": {
                backgroundColor: $COLORS.flame.$500,
                "#xo-items": {
                    backgroundColor: $COLORS.flame.$500,
                },
            },
            "&([theme='earth'])": {
                backgroundColor: $COLORS.earth.$500,
                "#xo-items": {
                    backgroundColor: $COLORS.earth.$500,
                },
            },
            "&([theme='woods'])": {
                backgroundColor: $COLORS.woods.$500,
                "#xo-items": {
                    backgroundColor: $COLORS.woods.$500,
                },
            },
            "&([theme='metal'])": {
                backgroundColor: $COLORS.metal.$500,
                "#xo-items": {
                    backgroundColor: $COLORS.metal.$500,
                },
            },
            "&([theme='water']), &([theme='flame']), &([theme='woods']), &([theme='metal'])": {
                "::slotted(xo-navbar-item)": {
                    color: $COLORS.norms.$100,
                },
                "#xo-icon svg": {
                    fill: $COLORS.norms.$100,
                },
            },
        },
        "#xo-container": {
            width: "100%",
            maxWidth: "1200px",
            display: "flex",
            padding: '.6rem 1rem',
            flexWrap: 'wrap',
            margin: 'auto',
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
                outlineColor: $FOCUSCOLOR,
                outlineWidth: '2px',
                outlineOffset: '-1px',
            },
            svg: {
                width: '100%',
                height: '100%',
                fill: $COLORS.norms.$500,
            }
        },
        "#xo-back": {
            position: 'fixed',
            opacity: '0',
            pointerEvents: 'none',
            inset: '0',
            backgroundColor: $COLORS.norms.$500 + "80",
            zIndex: '9999',
        },
        "#xo-items": {
            width: '200px',
            display: 'flex',
            pointerEvents: 'none',
            flexDirection: 'column',
            position: 'fixed',
            top: '0',
            left: '-100%',
            bottom: '0',
            overflow: 'auto',
            zIndex: '9999',
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
                "#xo-items": {
                    backgroundColor: 'transparent',
                },
            },
            "#brand": {
                width: 'max-content',
            },
            "#xo-icon": {
                display: 'none',
            },
            "#xo-back": {
                opacity: '0',
                pointerEvents: 'none',
                zIndex: '1',
            },
            "#xo-items": {
                pointerEvents: 'all',
                position: 'unset',
                marginLeft: 'auto',
                flexDirection: 'row',
                alignItems: 'center',
                minWidth: 'max-content',
                flex: 'auto',
                overflow: 'unset',
                padding: '0',
                gap: '1rem',
                justifyContent: 'flex-end',
                zIndex: '1',
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
                    opacity: '0',
                },
                "100%": {
                    opacity: '1',
                },
            },
            {
                name: "slide",
                "0%": {
                    left: '-200px',
                },
                "100%": {
                    left: '0',
                },
            }
        ],
    },
    $NavBarItemComponent: {
        ...$BASE,
        ":host": {
            "&([space=\"full\"])": {
                margin: 'auto',
            },
            "&([space=\"up\"])": {
                marginTop: 'auto',
            },
            "&([space=\"down\"])": {
                marginBottom: 'auto',
            },
            "&([space=\"left\"])": {
                marginLeft: 'auto',
            },
            "&([space=\"right\"])": {
                marginRight: 'auto',
            },
            "&([space=\"hors\"])": {
                marginLeft: 'auto',
                marginRight: 'auto',
            },
            "&([space=\"vert\"])": {
                marginTop: 'auto',
                marginBottom: 'auto',
            },
            "&([space=\"up-left\"])": {
                marginTop: 'auto',
                marginLeft: 'auto',
            },
            "&([space=\"up-right\"])": {
                marginTop: 'auto',
                marginRight: 'auto',
            },
            "&([space=\"down-left\"])": {
                marginBottom: 'auto',
                marginLeft: 'auto',
            },
            "&([space=\"down-right\"])": {
                marginBottom: 'auto',
                marginRight: 'auto',
            },
            display: "block",
            width: "100%",
            "#xo-container": {
                padding: '.6rem 1rem',
            },
            "&([active])": {
                "#xo-container": {
                    backgroundColor: $COLORS.norms.$500 + "60",
                },
            },
            "&([to])": {
                "#xo-container": {
                    cursor: 'pointer',
                },
            },
            "&([slot='brand'])": {
                width: 'max-content',
                "#xo-container": {
                    padding: '0',
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
                        outlineColor: $FOCUSCOLOR,
                        outlineWidth: '2px',
                        outlineOffset: '-1px',
                    },
                },
                "#xo-label": {
                    fontSize: '1.8rem',
                    fontWeight: '800',
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
            gap: '5px',
            "&:hover": {
                backgroundColor: $COLORS.norms.$500 + "60",
            },
            "&:focus": {
                borderRadius: '.25rem',
                outlineStyle: 'solid',
                outlineColor: $FOCUSCOLOR,
                outlineWidth: '2px',
                outlineOffset: '-1px',
            },
        },
        "#xo-label": {
            display: 'flex',
            alignItems: 'center',
            lineHeight: '1',
            fontSize: '1.4rem',
            pointerEvents: 'none',
        },
        mediaQueries: [{
            condition: "min-width: 768px",
            ":host": {
                "&([space=\"full\"])": {
                    marginTop: 'unset',
                    marginBottom: 'unset',
                },
                "&([space=\"vert\"])": {
                    marginTop: 'unset',
                    marginBottom: 'unset',
                },
                "&([space=\"up-left\"])": {
                    marginTop: 'unset',
                },
                "&([space=\"up-right\"])": {
                    marginTop: 'unset',
                },
                "&([space=\"down-left\"])": {
                    marginBottom: 'unset',
                },
                "&([space=\"down-right\"])": {
                    marginBottom: 'unset',
                },
                width: 'max-content',
                "#xo-container": {
                    transition: 'padding 200ms ease-in-out',
                    padding: '0',
                },
                "&([active])": {
                    "#xo-container": {
                        backgroundColor: $COLORS.norms.$500 + "60",
                        padding: '.25rem 1rem',
                        borderRadius: '9999px',
                    },
                },
                "&([slot='brand'])": {
                    "#xo-container": {
                        padding: '0',
                        backgroundColor: 'unset',
                        "&:focus": {
                            borderRadius: '.25rem',
                            outlineStyle: 'solid',
                            outlineColor: $FOCUSCOLOR,
                            outlineWidth: '2px',
                            outlineOffset: '-1px',
                        },
                    },
                },
            },
            "#xo-container": {
                "&:hover, &:focus": {
                    backgroundColor: $COLORS.norms.$500 + "60",
                    padding: '.25rem 1rem',
                    borderRadius: '9999px',
                },
                "&:focus": {
                    backgroundColor: 'unset',
                },
            }
        }]
    },
    $SliderComponent: {
        ...$BASE,
        ":host": {
            display: 'block',
            overflow: 'hidden',
            boxSizing: 'content-box',
            width: '100%',
            minHeight: '500px',
            "&([trigger=\"hidden\"]) #xo-trigger": {
                display: 'none',
            },
            "&([pill]) #xo-trigger": {
                borderRadius: '100px',
            },
        },
        "#xo-container": {
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            height: '100%',
            borderRadius: '.5rem',
            display: 'block',
        },
        "#xo-content": {
            width: '100%',
            display: 'flex',
            transition: 'all 200ms ease-in-out',
            height: '100%',
        },
        "#xo-trigger": {
            width: 'max-content',
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: $COLORS.norms.$500 + "80",
            padding: '5px 3px',
            borderRadius: '5px',
            maxWidth: "calc(100% - 20px)",
            gap: '.5rem',
            alignItems: 'center',
            div: {
                flex: '1',
                display: 'flex',
                gap: '5px',
                justifyContent: 'center',
            }
        },
        ".arrows": {
            boxSizing: 'border-box',
            width: '20px',
            height: '30px',
            display: 'block',
            position: 'relative',
            outline: 'none',
            "&::before": {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '5px',
                backgroundColor: $COLORS.norms.$100,
                borderRadius: '5px',
            },
            "&::after": {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '5px',
                backgroundColor: $COLORS.norms.$100,
                borderRadius: '5px',
            },
            "&:hover": {
                cursor: 'pointer',
                "&::after": {
                    backgroundColor: $COLORS.norms.$500 + '50',
                },
                "&::before": {
                    backgroundColor: $COLORS.norms.$500 + '50',
                },
            },
            "&:focus": {
                cursor: 'pointer',
                "&::after": {
                    backgroundColor: $COLORS.norms.$500 + '50',
                },
                "&::before": {
                    backgroundColor: $COLORS.norms.$500 + '50',
                },
            },
        },
        ".arrows#xo-arrowLeft": {
            "&::after": {
                bottom: '0',
                left: '50%',
                transformOrigin: 'right',
                transform: 'translateX(-50%) rotate(45deg)',
            },
            "&::before": {
                top: '0',
                left: '50%',
                transformOrigin: 'right',
                transform: 'translateX(-50%) rotate(-45deg)',
            },
        },
        ".arrows#xo-arrowRight": {
            "&::after": {
                bottom: '0',
                left: '50%',
                transformOrigin: 'left',
                transform: 'translateX(-50%) rotate(-45deg)',
            },
            "&::before": {
                top: '0',
                left: '50%',
                transformOrigin: 'left',
                transform: 'translateX(-50%) rotate(45deg)',
            },
        },
        "#xo-dot": {
            minWidth: '5px',
            width: '12px',
            height: '5px',
            backgroundColor: $COLORS.norms.$100,
            display: 'block',
            borderRadius: '5px',
            outline: 'none',
            transition: 'width 200ms ease-in-out, background-color 200ms ease-in-out',
            "&:hover": {
                width: '24px',
                cursor: 'pointer',
                backgroundColor: $COLORS.norms.$500 + '50',
            },
            "&:focus": {
                width: '24px',
                backgroundColor: $COLORS.norms.$500 + '50',
            },
            "&[active]": {
                width: '24px',
                backgroundColor: $COLORS.norms.$500,
            },
        },
    },
    $SliderItemComponent: {
        ...$BASE,
        ":host": {
            display: 'block',
            boxSizing: 'content-box',
            flexShrink: '0',
            width: '100%',
            "&([active])  #xo-container, &([active='true'])  #xo-container": {
                pointerEvents: 'all',
            },
            "&([active='false'])  #xo-container": {
                pointerEvents: 'none',
            },
        },
        "#xo-container": {
            flexShrink: '0',
            width: '100%',
            height: '100%',
            backgroundPosition: 'center',
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundColor: '#1d1d1d',
            pointerEvents: 'none',
        },
    },
}

const $FIELDS = {
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
                borderRadius: '0',
            },
            "&([disabled])": {
                pointerEvents: 'none',
                "#xo-container": {
                    opacity: '.5',
                    "&:hover": {
                        cursor: 'no-drop',
                    },
                },
                "#xo-label": {
                    "&:hover": {
                        cursor: 'no-drop',
                    },
                },
            },
            "&([outlined]) #xo-container": {
                backgroundColor: "transparent",
                color: $COLORS.norms.$500,
                "&:hover": {
                    boxShadow: `0 0 5px ${$COLORS.norms.$500 + '80'}`,
                    backgroundColor: $COLORS.base.$500,
                    color: $COLORS.norms.$500,
                },
                "&:active": {
                    boxShadow: `inset 0 0 5px ${$COLORS.norms.$500 + '80'}`,
                    cursor: 'context-menu',
                },
            },
            "&([theme=\"water\"]) #xo-container": {
                backgroundColor: $COLORS.water.$500,
                borderColor: $COLORS.water.$500,
                color: '#fff',
            },
            "&([theme=\"water\"][outlined]) #xo-container": {
                backgroundColor: "transparent",
                color: $COLORS.water.$500,
                "&:hover": {
                    backgroundColor: $COLORS.water.$500,
                    color: '#fff',
                },
                "&:focus": {
                    backgroundColor: $COLORS.water.$500,
                    color: '#fff',
                },
            },
            "&([theme=\"woods\"]) #xo-container": {
                backgroundColor: $COLORS.woods.$500,
                borderColor: $COLORS.woods.$500,
                color: '#fff',
            },
            "&([theme=\"woods\"][outlined]) #xo-container": {
                backgroundColor: "transparent",
                color: $COLORS.woods.$500,
                "&:hover": {
                    backgroundColor: $COLORS.woods.$500,
                    color: '#fff',
                },
                "&:focus": {
                    backgroundColor: $COLORS.woods.$500,
                    color: '#fff',
                },
            },
            "&([theme=\"flame\"]) #xo-container": {
                backgroundColor: $COLORS.flame.$500,
                borderColor: $COLORS.flame.$500,
                color: '#fff',
            },
            "&([theme=\"flame\"][outlined]) #xo-container": {
                backgroundColor: "transparent",
                color: $COLORS.flame.$500,
                "&:hover": {
                    backgroundColor: $COLORS.flame.$500,
                    color: '#fff',
                },
                "&:focus": {
                    backgroundColor: $COLORS.flame.$500,
                    color: '#fff',
                },
            },
            "&([theme=\"earth\"]) #xo-container": {
                backgroundColor: $COLORS.earth.$500,
                borderColor: $COLORS.earth.$500,
                color: $COLORS.norms.$500,
            },
            "&([theme=\"earth\"][outlined]) #xo-container": {
                backgroundColor: "transparent",
                color: $COLORS.earth.$500,
                "&:hover": {
                    backgroundColor: $COLORS.earth.$500,
                    color: $COLORS.norms.$500,
                },
                "&:focus": {
                    backgroundColor: $COLORS.earth.$500,
                    color: $COLORS.norms.$500,
                },
            },
            "&([theme=\"metal\"]) #xo-container": {
                backgroundColor: $COLORS.metal.$500,
                borderColor: $COLORS.metal.$500,
                color: '#fff',
            },
            "&([theme=\"metal\"][outlined]) #xo-container": {
                backgroundColor: "transparent",
                color: $COLORS.metal.$500,
                "&:hover": {
                    backgroundColor: $COLORS.metal.$500,
                    color: '#fff',
                },
                "&:focus": {
                    backgroundColor: $COLORS.metal.$500,
                    color: '#fff',
                },
            },
        },
        "#xo-container": {
            all: 'unset',
            width: '100%',
            height: '100%',
            display: 'flex',
            color: $COLORS.norms.$500,
            fontSize: '20px',
            overflow: 'hidden',
            padding: '5px 20px',
            position: 'relative',
            borderRadius: '5px',
            alignItems: 'center',
            boxSizing: 'border-box',
            justifyContent: 'center',
            backgroundColor: $COLORS.base.$500,
            transition: 'background-color 200ms ease-in-out, color 200ms ease-in-out, box-shadow 200ms ease-in-out',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: $COLORS.base.$500,
            gap: '5px',
            outline: 'none',
            "&:hover": {
                boxShadow: `0 0 5px ${$COLORS.norms.$500 + '80'}`,
                cursor: 'context-menu',
            },
            "&:focus": {
                borderRadius: '.25rem',
                outlineStyle: 'solid',
                outlineColor: $FOCUSCOLOR,
                outlineWidth: '2px',
                outlineOffset: '-1px',
            },
            "&:active": {
                boxShadow: `inset 0 0 5px ${$COLORS.norms.$500 + '80'}`,
                cursor: 'context-menu',
            },
        },
        "#xo-label": {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: '0px',
            gap: '5px',
        },
    },
    $DateField: {
        ...$BASE,
        ":host": {
            display: 'inline-block',
            width: '260px',
            ...host,
            "&([theme=\"water\"]) #xo-items": {
                "header": {
                    backgroundColor: $COLORS.water.$500,
                    color: '#fff',
                },
                "#xo-controll svg": {
                    fill: '#fff',
                },
                "#xo-day": {
                    "&[active]": {
                        backgroundColor: $COLORS.water.$500,
                        color: '#fff',
                    },
                    "&:hover": {
                        backgroundColor: $COLORS.water.$100,
                    },
                    "&:focus": {
                        backgroundColor: $COLORS.water.$100,
                    },
                },
            },
            "&([theme=\"woods\"]) #xo-items": {
                "header": {
                    backgroundColor: $COLORS.woods.$500,
                    color: '#fff',
                },
                "#xo-controll svg": {
                    fill: '#fff',
                },
                "#xo-day": {
                    "&[active]": {
                        backgroundColor: $COLORS.woods.$500,
                        color: '#fff',
                    },
                    "&:hover": {
                        backgroundColor: $COLORS.woods.$100,
                    },
                    "&:focus": {
                        backgroundColor: $COLORS.woods.$100,
                    },
                },
            },
            "&([theme=\"flame\"]) #xo-items": {
                "header": {
                    backgroundColor: $COLORS.flame.$500,
                    color: '#fff',
                },
                "#xo-controll svg": {
                    fill: '#fff',
                },
                "#xo-day": {
                    "&[active]": {
                        backgroundColor: $COLORS.flame.$500,
                        color: '#fff',
                    },
                    "&:hover": {
                        backgroundColor: $COLORS.flame.$100,
                    },
                    "&:focus": {
                        backgroundColor: $COLORS.flame.$100,
                    },
                },
            },
            "&([theme=\"earth\"]) #xo-items": {
                "header": {
                    backgroundColor: $COLORS.earth.$500,
                    color: $COLORS.norms.$500,
                },
                "#xo-controll svg": {
                    fill: $COLORS.norms.$500,
                },
                "#xo-day": {
                    "&[active]": {
                        backgroundColor: $COLORS.earth.$500,
                        color: '#fff',
                    },
                    "&:hover": {
                        backgroundColor: $COLORS.earth.$100,
                    },
                    "&:focus": {
                        backgroundColor: $COLORS.earth.$100,
                    },
                },
            },
            "&([theme=\"metal\"]) #xo-items": {
                "header": {
                    backgroundColor: $COLORS.metal.$500,
                    color: '#fff',
                },
                "#xo-controll svg": {
                    fill: '#fff',
                },
                "#xo-day": {
                    "&[active]": {
                        backgroundColor: $COLORS.metal.$500,
                        color: '#fff',
                    },
                    "&:hover": {
                        backgroundColor: $COLORS.metal.$100,
                    },
                    "&:focus": {
                        backgroundColor: $COLORS.metal.$100,
                    },
                },
            },
        },
        "#xo-container": {...container },
        "#xo-text": {...text },
        "#xo-label": {...label },
        "#xo-btn": {...btn },
        "#xo-items": {
            ...items.def,
            maxHeight: 'unset',
            header: {
                display: 'flex',
                alignItems: 'center',
                backgroundColor: $COLORS.base.$500,
                gap: '10px',
                padding: '16px',
            },
            main: {
                display: 'grid',
                gridTemplateColumns: "repeat(7, 3.287em)",
                margin: '0 5px 5px 5px',
            },
        },
        "#xo-title": {
            margin: '0',
            fontSize: '20px',
            flexGrow: '1',
            textAlign: 'center',
        },
        "#xo-controll": {
            padding: '0',
            border: 'unset',
            background: 'unset',
            display: 'flex',
            width: '16px',
            height: '16px',
            "&:first-child": {
                marginLeft: 'auto',
            },
            "&:hover": {
                filter: 'none',
                cursor: 'pointer',
            },
            svg: {
                width: '100%',
                height: '100%',
                fill: $COLORS.norms.$500,
            },
        },
        "#weeks": {
            display: 'grid',
            gridTemplateColumns: "repeat(7, 3.287em)",
            gridColumn: "1/8",
            margin: '5px 0',
        },
        "#xo-weekDay": {
            gridColumn: "span 1",
            textAlign: 'center',
            margin: '0',
            fontSize: '16px',
            fontWeight: "bolder",
        },
        "#xo-day": {
            gridColumn: "span 1",
            textAlign: 'center',
            border: 'unset',
            padding: '5px 0',
            background: 'unset',
            fontWeight: '700',
            fontSize: '14px',
            outline: 'none',
            "&:hover": {
                filter: 'none',
                cursor: 'pointer',
                backgroundColor: $COLORS.base.$100,
            },
            "&:focus": {
                backgroundColor: $COLORS.base.$100,
            },
            "&[off]": {
                opacity: '0',
                pointerEvents: 'none',
            },
            "&[on]": {
                color: 'blue',
                fontSize: '16px',
            },
            "&[active]": {
                backgroundColor: $COLORS.base.$500,
            },
        },
        "#xo-info": {...info },
        mediaQueries: [{
            condition: "max-width: 599px",
            "#xo-items": {...items.med },
            "#weeks": {
                width: "calc(100% - 10px)",
                gridTemplateColumns: "repeat(7, 1fr)",
                width: '100%',
            }
        }]
    },
    $ColorField: {
        ...$BASE,
        ":host": {
            display: 'inline-block',
            width: '260px',
            ...host
        },
        "#xo-container": {...container },
        "#xo-text": {...text },
        "#xo-label": {...label },
        "#xo-btn": {...btn },
        "#xo-items": {
            ...items.def,
            padding: '5px',
            maxHeight: 'unset',
            display: 'grid',
            gridTemplateColumns: "repeat(8, 36px)",
            gap: '2px',
        },
        "#xo-item": {
            gridColumn: "span 1",
            border: 'unset',
            padding: 'unset',
            background: 'unset',
            height: '30px',
            borderRadius: '2px',
            boxSizing: 'border-box',
            alignSelf: 'center',
            "&:hover": {
                cursor: 'pointer',
                filter: 'none',
                opacity: '.8',
            },
            "&:focus": {
                outlineWidth: '2px',
                outlineStyle: 'solid',
                outlineColor: $COLORS.norms.$500,
            },
            "&:nth-child(9)": {
                margin: '3px 0',
            }
        },
        "#xo-info": {...info },
        mediaQueries: [{
            condition: "max-width: 599px",
            "#xo-items": {
                ...items.med,
                gridTemplateColumns: "repeat(8, 1fr)",
            },
        }]
    },
    $FileField: {
        ...$BASE,
        ":host": {
            display: 'inline-block',
            width: '260px',
            ...host,
            "&([theme=\"water\"]) #xo-item": {
                backgroundColor: $COLORS.water.$100,
            },
            "&([theme=\"flame\"]) #xo-item": {
                backgroundColor: $COLORS.flame.$100,
            },
            "&([theme=\"earth\"]) #xo-item": {
                backgroundColor: $COLORS.earth.$100,
            },
            "&([theme=\"woods\"]) #xo-item": {
                backgroundColor: $COLORS.woods.$100,
            },
            "&([theme=\"metal\"]) #xo-item": {
                backgroundColor: $COLORS.metal.$100,
            },
        },
        "#xo-container": {...container },
        "#xo-text": {...text },
        "#xo-label": {...label },
        "#xo-btn": {...btn },
        "#xo-items": {
            display: 'flex',
            flexDirection: 'column',
        },
        "#xo-item": {
            display: 'flex',
            backgroundColor: $COLORS.base.$100,
            color: $COLORS.norms.$500,
            gap: '10px',
            padding: '10px',
            borderRadius: '5px',
            marginTop: '10px',
            alignItems: 'center',
            justifyContent: 'space-between',
            div: {
                display: 'flex',
                gap: '10px',
                flex: '1',
                alignItems: 'center',
                span: {
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    flex: '1',
                    width: '0',
                    fontSize: '18px',
                    fontWeight: '500',
                },
            },
            button: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '16px',
                height: '16px',
                textDecoration: 'unset',
                backgroundColor: 'unset',
                border: 'unset',
                padding: '0',
                position: 'relative',
                cursor: 'pointer',
                "&::before": {
                    content: "''",
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                    width: '100%',
                    height: '4px',
                    backgroundColor: $COLORS.norms.$500,
                    transform: 'translateY(-50%) rotate(45deg)',
                },
                "&::after": {
                    content: "''",
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                    width: '100%',
                    height: '4px',
                    backgroundColor: $COLORS.norms.$500,
                    transform: 'translateY(-50%) rotate(-45deg)',
                },
            },
        },
        "#xo-info": {...info },
    },
    $FormComponent: {...$BASE },
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
                    cursor: 'none',
                }
            },
            "&([disabled])": {
                "#xo-icon": {
                    cursor: 'none',
                    opacity: '.5',
                }
            },
            "&([theme=\"water\"]) #xo-icon.active svg": {
                fill: $COLORS.water.$500,
            },
            "&([theme=\"flame\"]) #xo-icon.active svg": {
                fill: $COLORS.flame.$500,
            },
            "&([theme=\"earth\"]) #xo-icon.active svg": {
                fill: $COLORS.earth.$500,
            },
            "&([theme=\"woods\"]) #xo-icon.active svg": {
                fill: $COLORS.woods.$500,
            },
            "&([theme=\"metal\"]) #xo-icon.active svg": {
                fill: $COLORS.metal.$500,
            },
        },
        "#xo-icon": {
            display: 'flex',
            cursor: 'pointer',
            width: '42px',
            height: '42px',
            background: 'unset',
            padding: 'unset',
            border: 'unset',
            "svg": {
                display: 'flex',
                width: '100%',
                height: '100%',
                fill: $COLORS.base.$100,

            },
            "&.active svg": {
                fill: $COLORS.base.$900,
            },
            "&:focus": {
                borderRadius: '.25rem',
                outlineStyle: 'solid',
                outlineColor: $FOCUSCOLOR,
                outlineWidth: '2px',
                outlineOffset: '-1px',
            },
        },
        "#xo-container": {
            ...container,
            border: 'unset',
            padding: 'unset',
            backgroundColor: 'unset',
            gap: '5px',
        },
        "#xo-info": {...info },
    },
    $RichField: {
        ...$BASE,
        ":host": {
            display: 'block',
            boxSizing: 'content-box',
            width: '100%',
            "&([theme=\"water\"])": {
                "#xo-tools": {
                    backgroundColor: $COLORS.water.$500,
                },
                "#xo-content": {
                    borderColor: $COLORS.water.$500,
                },
            },
            "&([theme=\"flame\"])": {
                "#xo-tools": {
                    backgroundColor: $COLORS.flame.$500,
                },
                "#xo-content": {
                    borderColor: $COLORS.flame.$500,
                },
            },
            "&([theme=\"earth\"])": {
                "#xo-tools": {
                    backgroundColor: $COLORS.earth.$500,
                },
                "#xo-content": {
                    borderColor: $COLORS.earth.$500,
                },
            },
            "&([theme=\"metal\"])": {
                "#xo-tools": {
                    backgroundColor: $COLORS.metal.$500,
                },
                "#xo-content": {
                    borderColor: $COLORS.metal.$500,
                },
            },
            "&([theme=\"woods\"])": {
                "#xo-tools": {
                    backgroundColor: $COLORS.woods.$500,
                },
                "#xo-content": {
                    borderColor: $COLORS.woods.$500,
                },
            },
            "&([disabled])": {
                "#xo-icon": {
                    outline: 'none',
                    "&:hover": {
                        pointerEvents: 'none',
                    },
                },
                "#xo-content": {
                    backgroundColor: $COLORS.base.$900,
                },
            },
            "&([readonly])": {
                "#xo-icon": {
                    outline: 'none',
                    "&:hover": {
                        pointerEvents: 'none',
                    },
                },
            },
        },
        ".row": {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
        },
        "#xo-container": {
            width: '100%',
            height: '100%',
            borderRadius: '5px',
            position: 'relative',
            overflow: 'hidden',
        },
        "#xo-tools": {
            display: 'flex',
            flexWrap: 'wrap',
            backgroundColor: $COLORS.base.$100,
            padding: '10px',
            gap: '5px',
            justifyContent: 'space-between',
        },
        "#xo-toolGroup": {
            display: 'flex',
            width: 'max-content',
            borderRadius: '5px',
            "#xo-icon": {
                border: 'unset',
                borderRadius: 'unset',
                "&:first-child": {
                    borderTopLeftRadius: '5px',
                    borderBottomLeftRadius: '5px',
                },
                "&:last-child": {
                    borderTopRightRadius: '5px',
                    borderBottomRightRadius: '5px',
                },
            },
        },
        "#xo-icon": {
            all: 'unset',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '30px',
            height: '30px',
            padding: '7px',
            borderRadius: '5px',
            boxSizing: 'border-box',
            background: $COLORS.norms.$100 + '80',
            "&:focus": {
                outlineWidth: '2px',
                outlineStyle: 'solid',
                outlineColor: $COLORS.norms.$500,
            },
            "&:hover": {
                cursor: 'pointer',
            },
            "&[data-code]": {
                fontWeight: '900',
                fontSize: '18px',
                lineHeight: '0',
            },
            svg: {
                width: '100%',
                height: '100%',
            },
        },
        "[autoleft]": {
            marginLeft: 'auto',
        },
        "#wrap": {
            position: 'relative',
        },
        "#xo-items": {
            justifyContent: 'flex-end',
            backgroundColor: '#fff',
            position: 'absolute',
            borderRadius: '5px',
            flexWrap: 'wrap',
            padding: '10px',
            display: 'flex',
            width: '350px',
            zIndex: '2',
            gap: '10px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: `drop-shadow(0 0 5px ${$COLORS.norms.$500})`,
            "&[shrink]": {
                display: 'none',
            },
            div: {
                display: 'flex',
                flexWrap: 'wrap',
                width: '160px',
                gap: '1px',
            },
            p: {
                width: '100%',
                margin: '0 0 5px 0',
            },
            h3: {
                width: '100%',
                fontSize: '14px',
                margin: '0 0 10px 0',
            },
            input: {
                width: '100%',
                padding: '5px 10px',
                fontSize: '18px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: $COLORS.norms.$500,
                borderRadius: '5px',
                color: $COLORS.norms.$500,
            },
        },
        "#xo-item": {
            all: 'unset',
            cursor: 'pointer',
            width: '19px',
            height: '19px',
            "&:hover": {
                opacity: '.5',
            },
            "&:focus": {
                outlineWidth: '2px',
                outlineStyle: 'solid',
                outlineColor: $COLORS.norms.$500,
            },
        },
        "#xo-ok": {
            all: 'unset',
            display: 'flex',
            fontSize: '30px',
            color: '#fff',
            backgroundColor: $COLORS.woods.$500,
            padding: '0 10px',
            borderRadius: '5px',
            "&:focus": {
                outlineWidth: '2px',
                outlineStyle: 'solid',
                outlineColor: $COLORS.norms.$500,
            },
            svg: {
                display: 'flex',
                width: '30px',
                height: '30px',
                fill: '#fff',
            },
        },
        "#xo-content": {
            boxSizing: 'border-box',
            padding: '10px 15px',
            resize: 'vertical',
            minHeight: '300px',
            height: '100%',
            overflow: 'auto',
            outline: 'unset',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: $COLORS.base.$100,
            borderTop: 'unset',
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
            backgroundColor: '#fff',
            "*": {
                maxWidth: '100%',
            },
            "&[code]": {
                backgroundColor: "transparent",
                color: '#fff',
                fontSize: '20px',
                position: 'relative',
                "-webkitTextFillColor": 'transparent',
            },
        },
        ".full": { position: 'relative' },
        "&[code]": {
            backgroundColor: "transparent",
            color: '#fff',
            fontSize: '20px',
            position: 'relative',
            "-webkitTextFillColor": 'transparent',
        },
        ".edit": {
            background: $COLORS.norms.$500,
            position: "absolute",
            inset: "0",
            userSelect: "none",
            padding: "10px 15px",
            color: "#eeeeee",
            fontSize: "20px",
            display: "none",
        },
        ".html_angl": {
            color: "hsl(0deg 0% 56%)",
        },
        ".html_tags": {
            color: "hsl(0, 75%, 70%)",
        },
        ".html_attr": {
            color: "hsl(200, 74%, 70%)",
        },
        ".html_val": {
            color: "hsl(41deg 94% 73%)",
        },
        "#xo-info": {...info },
    },
    $SelectField: {
        ...$BASE,
        ":host": {
            display: 'inline-block',
            width: '260px',
            ...host,
            "&([search=\"hidden\"])": {
                "#xo-search": {
                    display: 'none',
                },
            },
            "&([theme=\"water\"]) #xo-items::-webkit-scrollbar-thumb": {
                backgroundColor: $COLORS.water.$500,
            },
            "&([theme=\"woods\"]) #xo-items::-webkit-scrollbar-thumb": {
                backgroundColor: $COLORS.woods.$500,
            },
            "&([theme=\"flame\"]) #xo-items::-webkit-scrollbar-thumb": {
                backgroundColor: $COLORS.flame.$500,
            },
            "&([theme=\"earth\"]) #xo-items::-webkit-scrollbar-thumb": {
                backgroundColor: $COLORS.earth.$500,
            },
            "&([theme=\"metal\"]) #xo-items::-webkit-scrollbar-thumb": {
                backgroundColor: $COLORS.metal.$500,
            },
        },
        "#xo-container": {...container },
        "#xo-text": {...text },
        "#xo-label": {...label },
        "#xo-btn": {
            ...btn,
            "&[active]": {
                transform: 'rotate(180deg)',
            },
        },
        "#xo-items": {
            ...items.static,
            minWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            "&::-webkit-scrollbar": {
                width: '4px',
            },
            "&::-webkit-scrollbar-thumb": {
                width: '4px',
                backgroundColor: $COLORS.base.$500,
            },
        },
        "#xo-search": {
            width: "calc(100% - 10px)",
            padding: '9px 10px',
            fontSize: '18px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#969696',
            marginTop: '5px',
            marginBottom: '6px',
            borderRadius: '5px',
        },
        "#xo-info": {...info },
        mediaQueries: [{
            condition: "min-width: 768px",
            "#xo-items": {...items.change },
        }],
    },
    $SelectItemField: {
        ...$BASE,
        ":host": {
            display: 'block',
            width: '100%',
            boxSizing: 'content-box',
            "&([selected]) #xo-container": {
                backgroundColor: $COLORS.base.$500,
            },
            "&([theme=\"water\"][selected]) #xo-container": {
                backgroundColor: $COLORS.water.$500,
                color: '#fff',
                "&:hover": {
                    backgroundColor: $COLORS.water.$500,
                    color: '#fff',
                },
            },
            "&([theme=\"water\"]) #xo-container": {
                "&:hover": {
                    backgroundColor: $COLORS.water.$100,
                },
                "&:focus": {
                    backgroundColor: $COLORS.water.$100,
                },
            },
            "&([theme=\"flame\"][selected]) #xo-container": {
                backgroundColor: $COLORS.flame.$500,
                color: '#fff',
                "&:hover": {
                    backgroundColor: $COLORS.flame.$500,
                    color: '#fff',
                },
            },
            "&([theme=\"flame\"]) #xo-container": {
                "&:hover": {
                    backgroundColor: $COLORS.flame.$100,
                },
                "&:focus": {
                    backgroundColor: $COLORS.flame.$100,
                },
            },
            "&([theme=\"earth\"][selected]) #xo-container": {
                backgroundColor: $COLORS.earth.$500,
                color: $COLORS.norms.$500,
                "&:hover": {
                    backgroundColor: $COLORS.earth.$500,
                    color: $COLORS.norms.$500,
                },
            },
            "&([theme=\"earth\"]) #xo-container": {
                "&:hover": {
                    backgroundColor: $COLORS.earth.$100,
                },
                "&:focus": {
                    backgroundColor: $COLORS.earth.$100,
                },
            },
            "&([theme=\"woods\"][selected]) #xo-container": {
                backgroundColor: $COLORS.woods.$500,
                color: '#fff',
                "&:hover": {
                    backgroundColor: $COLORS.woods.$500,
                    color: '#fff',
                },
            },
            "&([theme=\"woods\"]) #xo-container": {
                "&:hover": {
                    backgroundColor: $COLORS.woods.$100,
                },
                "&:focus": {
                    backgroundColor: $COLORS.woods.$100,
                },
            },
            "&([theme=\"metal\"][selected]) #xo-container": {
                backgroundColor: $COLORS.metal.$500,
                color: '#fff',
                "&:hover": {
                    backgroundColor: $COLORS.metal.$500,
                    color: '#fff',
                },
            },
            "&([theme=\"metal\"]) #xo-container": {
                "&:hover": {
                    backgroundColor: $COLORS.metal.$100,
                },
                "&:focus": {
                    backgroundColor: $COLORS.metal.$100,
                },
            },

        },
        "#xo-container": {
            display: 'flex',
            textDecoration: 'unset',
            padding: '4px 12px',
            fontSize: '26px',
            color: $COLORS.norms.$500,
            width: '100%',
            outline: 'none',
            "&:hover": {
                backgroundColor: $COLORS.base.$100,
                cursor: 'pointer',
            },
            "&:focus": {
                backgroundColor: $COLORS.base.$100,
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
            "&([disabled]) #xo-trigger": {
                opacity: '.5',
                cursor: 'default',
                "&::before": { cursor: 'default', },
            },
            "&([checked])": {
                opacity: '1',
                "#xo-trigger": {
                    backgroundColor: $COLORS.base.$900,
                    "&::before": {
                        animation: 'check 250ms forwards'
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
                    borderRadius: '0px',
                    "&::before": {
                        borderRadius: '0px',
                    },
                },
            },
            "&([theme=\"water\"][checked]) #xo-trigger": {
                backgroundColor: $COLORS.water.$500,
            },
            "&([theme=\"water\"]) #xo-trigger": {
                backgroundColor: $COLORS.water.$100,
            },
            "&([theme=\"flame\"][checked]) #xo-trigger": {
                backgroundColor: $COLORS.flame.$500,
            },
            "&([theme=\"flame\"]) #xo-trigger": {
                backgroundColor: $COLORS.flame.$100,
            },
            "&([theme=\"earth\"][checked]) #xo-trigger": {
                backgroundColor: $COLORS.earth.$500,
            },
            "&([theme=\"earth\"]) #xo-trigger": {
                backgroundColor: $COLORS.earth.$100,
            },
            "&([theme=\"woods\"][checked]) #xo-trigger": {
                backgroundColor: $COLORS.woods.$500,
            },
            "&([theme=\"woods\"]) #xo-trigger": {
                backgroundColor: $COLORS.woods.$100,
            },
            "&([theme=\"metal\"][checked]) #xo-trigger": {
                backgroundColor: $COLORS.metal.$500,
            },
            "&([theme=\"metal\"]) #xo-trigger": {
                backgroundColor: $COLORS.metal.$100,
            },
        },
        "#xo-container": {
            textDecoration: 'unset',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            boxSizing: 'border-box',
            height: '100%',
            color: $COLORS.norms.$500,
            fontSize: '20px',

        },
        "#xo-trigger": {
            width: '74px',
            height: '100%',
            position: 'relative',
            backgroundColor: $COLORS.base.$100,
            borderRadius: '5px',
            transition: 'background 200ms ease-in-out',
            cursor: 'pointer',
            "&::before": {
                width: "calc((100% /2) - 5px)",
                height: "calc(100% - 10px)",
                position: 'absolute',
                top: '5px',
                left: '5px',
                content: "''",
                backgroundColor: '#fff',
                borderRadius: '5px',
                animation: 'check 250ms forwards reverse',
                cursor: 'pointer',
            },
            "&:focus": {
                borderRadius: '.25rem',
                outlineStyle: 'solid',
                outlineColor: $FOCUSCOLOR,
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
        },
        "#xo-container": {
            width: '100%',
            borderRadius: '5px',
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
        "#xo-text": {...text, paddingTop: '17px', lineHeight: '1.2', height: '36px' },
        "#xo-text::-webkit-scrollbar": { display: 'none', },
        "#xo-label": {...label },
        "#xo-info": {...info },
    },
    $TimeField: {
        ...$BASE,
        ":host": {
            ...host,
            display: 'inline-block',
            width: '260px',
            "&([theme=\"water\"])": {
                "#xo-time": {
                    backgroundColor: $COLORS.water.$100,
                },
                "#xo-period[active]": {
                    backgroundColor: $COLORS.water.$500,
                    color: '#fff',
                },
            },
            "&([theme=\"flame\"])": {
                "#xo-time": {
                    backgroundColor: $COLORS.flame.$100,
                },
                "#xo-period[active]": {
                    backgroundColor: $COLORS.flame.$500,
                    color: '#fff',
                },
            },
            "&([theme=\"woods\"])": {
                "#xo-time": {
                    backgroundColor: $COLORS.woods.$100,
                },
                "#xo-period[active]": {
                    backgroundColor: $COLORS.woods.$500,
                    color: '#fff',
                },
            },
            "&([theme=\"metal\"])": {
                "#xo-time": {
                    backgroundColor: $COLORS.metal.$100,
                },
                "#xo-period[active]": {
                    backgroundColor: $COLORS.metal.$500,
                    color: '#fff',
                },
            },
            "&([theme=\"earth\"])": {
                "#xo-time": {
                    backgroundColor: $COLORS.earth.$100,
                },
                "#xo-period[active]": {
                    backgroundColor: $COLORS.earth.$500,
                    color: $COLORS.norms.$500,
                },
            },
        },
        "#xo-container": {...container },
        "#xo-text": {...text },
        "#xo-label": {...label },
        "#xo-btn": {...btn },
        "#xo-items": {
            ...items.def,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '5px',
            div: {
                display: 'flex',
                width: '100%',
            },
        },
        "#wrap": {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            margin: '10px 0',
        },
        "#xo-controll": {
            display: 'flex',
            padding: 'unset',
            border: 'unset',
            background: 'unset',
            width: '16px',
            height: '16px',
            cursor: 'pointer',
            "&:focus": {
                outlineWidth: '2px',
                outlineStyle: 'solid',
                outlineColor: $COLORS.norms.$500,
            },
            svg: {
                display: 'flex',
                width: '100%',
                height: '100%',
                fill: $COLORS.norms.$500,
            }
        },
        "#xo-time": {
            display: 'flex',
            fontSize: '22px',
            fontWeight: '700',
            backgroundColor: $COLORS.base.$100,
            padding: '6px 14px',
            borderRadius: '5px',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
        },
        "#xo-period": {
            display: 'flex',
            padding: 'unset',
            border: 'unset',
            background: 'unset',
            cursor: 'pointer',
            fontSize: '16px',
            padding: '5px 10px',
            borderRadius: '5px',
            fontWeight: 'bolder',
            "&[active]": {
                backgroundColor: $COLORS.base.$500,
            },
        },
        "#xo-info": {...info },
        mediaQueries: [{
            condition: "max-width: 599px",
            "#xo-items": {...items.med },
        }]
    },
}

const $UI = {
    $AppBarUi: {
        ...$BASE,
        ":host": {
            width: '100%',
            display: 'block',
            boxShadow: '0 0.3rem 0.3rem -0.1rem #1D1D1D30',
            backgroundColor: $COLORS.base.$500,
            "&([theme=": {
                "&\"water\"])": {
                    backgroundColor: $COLORS.water.$500,
                },
                "&\"flame\"])": {
                    backgroundColor: $COLORS.flame.$500,
                },
                "&\"woods\"])": {
                    backgroundColor: $COLORS.woods.$500,
                },
                "&\"earth\"])": {
                    backgroundColor: $COLORS.earth.$500,
                },
                "&\"metal\"])": {
                    backgroundColor: $COLORS.metal.$500,
                },
                "&\"water\"]": {
                    "&[shade=": {
                        "&\"0\"])": {
                            backgroundColor: $COLORS.water.$100,
                        },
                        "&\"1\"])": {
                            backgroundColor: $COLORS.water.$900,
                        },
                    },
                },
                "&\"flame\"]": {
                    "&[shade=": {
                        "&\"0\"])": {
                            backgroundColor: $COLORS.flame.$100,
                        },
                        "&\"1\"])": {
                            backgroundColor: $COLORS.flame.$900,
                        },
                    },
                },
                "&\"woods\"]": {
                    "&[shade=": {
                        "&\"0\"])": {
                            backgroundColor: $COLORS.woods.$100,
                        },
                        "&\"1\"])": {
                            backgroundColor: $COLORS.woods.$900,
                        },
                    },
                },
                "&\"earth\"]": {
                    "&[shade=": {
                        "&\"0\"])": {
                            backgroundColor: $COLORS.earth.$100,
                        },
                        "&\"1\"])": {
                            backgroundColor: $COLORS.earth.$900,
                        },
                    },
                },
                "&\"metal\"]": {
                    "&[shade=": {
                        "&\"0\"])": {
                            backgroundColor: $COLORS.metal.$100,
                        },
                        "&\"1\"])": {
                            backgroundColor: $COLORS.metal.$900,
                        },
                    },
                },
            },
            "&([shade=\"1\"]), &([theme=\"water\"]), &([theme=\"flame\"]), &([theme=\"woods\"]), &([theme=\"metal\"])": {
                "*": {
                    color: '#FFFFFF',
                },
            },
            "&([shade=": {
                "\"0\"])": {
                    backgroundColor: $COLORS.base.$100,
                    "*": {
                        color: 'unset',
                    }
                },
                "\"1\"])": {
                    backgroundColor: $COLORS.base.$900,
                },
            },
            "&([justify=\"center\"])": {
                "#xo-container": {
                    justifyContent: 'center',
                }
            },
            "&([justify=\"around\"])": {
                "#xo-container": {
                    justifyContent: 'space-around',
                }
            },
            "&([justify=\"evenly\"])": {
                "#xo-container": {
                    justifyContent: 'space-evenly',
                }
            },
            "&([justify=\"between\"])": {
                "#xo-container": {
                    justifyContent: 'space-between',
                }
            },
            "&([justify=\"end\"])": {
                "#xo-container": {
                    justifyContent: 'flex-end',
                }
            },
        },
        "#xo-container": {
            padding: '.5rem 1rem',
            display: 'flex',
            maxWidth: '1200px',
            minHeight: '1rem',
            width: '100%',
            flexWrap: 'wrap',
            alignItems: 'center',
        },
    }
}

module.exports = {
    ...$ICONS,
    ...$CHARTS,
    ...$COMPONENTS,
    ...$FIELDS,
    ...$UI
}