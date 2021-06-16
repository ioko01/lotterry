import { createMuiTheme } from "@material-ui/core";
import {
    common,
    deepPurple,
    indigo,
    lightGreen,
    red,
} from "@material-ui/core/colors";

export const themePrimary = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            "@global": {
                "*": {
                    fontFamily: "'Kanit', sans-serif !important",
                    outline: "none",
                },
                html: {
                    padding: 0,
                    margin: 0,
                },
                body: {
                    minWidth: 650,
                },
                "input[type=number]::-webkit-inner-spin-button": {
                    WebkitAppearance: "none",
                },
                "input[type=number]::inner-spin-button": {
                    appearance: "none",
                },
                "input[type=number]::-moz-inner-spin-button": {
                    MozAppearance: "none",
                },
            },
        },
        MuiLink: {
            root: {
                color: common["black"],
                "&.link-active": {
                    color: lightGreen[700],
                },
            },
        },
        MuiTypography: {
            h1: {
                fontSize: 26,
            },
            h2: {
                fontSize: 20,
            },
            h3: {
                fontSize: 18,
            },
        },
        MuiPaper: {
            elevation1: {
                "--boxShadowColor": lightGreen[700],
                boxShadow: "0 0 1px 0 var(--boxShadowColor)",
            },
        },
        MuiTableCell: {
            root: {
                padding: 10,
            },
        },
        MuiInputBase: {
            root: {
                "&$disabled": {
                    backgroundColor: "#ececec",
                },
            },
        },
    },
    palette: {
        primary: {
            main: lightGreen[700],
        },
        secondary: {
            main: lightGreen[50],
        },
    },
});

export const themeDanger = createMuiTheme({
    palette: {
        primary: {
            main: red[400],
        },
    },
});

export const themeSecond = createMuiTheme({
    palette: {
        primary: {
            main: deepPurple[400],
        },
    },
});

export const themeButtonNonStyled = createMuiTheme({
    palette: {
        primary: {
            main: indigo[600],
        },
        secondary: {
            main: red[400],
        },
    },
    overrides: {
        MuiTouchRipple: {
            root: {
                backgroundColor: "transparent",
            },
        },
    },
});

export const themeButtonText = createMuiTheme({
    palette: {
        primary: {
            main: indigo[600],
        },
        secondary: {
            main: red[400],
        },
    },
});

export const themeButtonClose = createMuiTheme({
    palette: {
        primary: {
            main: red[400],
        },
    },
    overrides: {
        MuiButton: {
            outlinedPrimary: {
                "&:hover": {
                    border: "none",
                },
                border: "none",
            },
        },
    },
});

export const themeListLink = createMuiTheme({
    overrides: {
        MuiLink: {
            root: {
                color: common["black"],
                "&.link-active ul": {
                    color: lightGreen[700],
                    backgroundColor: lightGreen[50],
                },
                "&:hover ul": {
                    backgroundColor: lightGreen[100],
                },
                "&:active ul": {
                    backgroundColor: lightGreen[200],
                },
            },
        },
        MuiButton: {
            root: {
                color: red[400],
                width: "100%",
                paddingLeft: 0,
                paddingRight: 0,
                "&:hover": {
                    backgroundColor: red[50],
                },
                "&:active": {
                    backgroundColor: red[100],
                },
            },
            text: {
                padding: 0,
            },
            label: {
                justifyContent: "start",
            },
        },
    },
});
