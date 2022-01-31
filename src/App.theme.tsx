import {
  amber,
  blueGrey,
  blue,
  cyan,
  green,
  grey,
  red,
} from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/core/styles";
import createTheme from "@material-ui/core/styles/createTheme";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import * as React from "react";

export const AppTheme: React.FC = ({ children }) => {
  const primaryBrandColor = "#fd6a68";
  const secondaryBrandColor = blue[500];
  // https://material-ui.com/customization/themes/
  const theme = createTheme({
    typography: {
      fontSize: 12,
    },

    zIndex: {
      appBar: 0,
    },

    palette: {
      text: { primary: blueGrey[800] },
      background: { default: grey[200] },

      primary: { main: primaryBrandColor, contrastText: "#ffffff" },
      secondary: { main: secondaryBrandColor },

      danger: {
        light: red[300],
        main: red[500],
        dark: red[700],
      },
      success: {
        light: green[300],
        main: green[500],
        dark: green[700],
      },
      warning: {
        light: amber[300],
        main: amber[500],
        dark: amber[700],
      },
      info: {
        light: cyan[300],
        main: cyan[500],
        dark: cyan[700],
      },
    },

    props: {
      // @ts-ignore can't override while component in lab https://github.com/mui-org/material-ui/issues/12164
      MuiAutocomplete: {
        autoHighlight: true,
      },
      MuiIcon: {
        fontSize: "small",
      },
      MuiGrid: {
        spacing: 2,
      },
      MuiInputLabel: {
        shrink: true,
      },
      // https://github.com/mui-org/material-ui/issues/21142
      MuiUseMediaQuery: {
        noSsr: true,
      },
    },

    overrides: {
      // @ts-ignore can't override while component in lab https://github.com/mui-org/material-ui/issues/12164
      MuiAutocomplete: {
        // To prevent autocomplete chips from increasing field height
        tag: {
          margin: `0 2px 4px`,
          height: 24,
        },
      },
    },

    mixins: {
      ellipsis: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
      dropdown: {
        borderRadius: "3px",
        border: "0",
        boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.26)",
        top: "100%",
        zIndex: 1000,
        minWidth: "160px",
        padding: "5px 0",
        margin: "2px 0 0",
        fontSize: "14px",
        textAlign: "left",
        listStyle: "none",
        backgroundColor: "#fff",
        WebkitBackgroundClip: "padding-box",
        backgroundClip: "padding-box",
      },
      dropdownItem: {
        fontSize: "13px",
        padding: "10px 20px",
        margin: "0 5px",
        borderRadius: "2px",
        WebkitTransition: "all 150ms linear",
        MozTransition: "all 150ms linear",
        OTransition: "all 150ms linear",
        MsTransition: "all 150ms linear",
        transition: "all 150ms linear",
        display: "block",
        clear: "both",
        fontWeight: 400,
        minHeight: 40,
        lineHeight: "1.42857143",
        color: "#333",
        whiteSpace: "nowrap",
        height: "unset",
        "&:hover": {
          backgroundColor: "#fd6a68",
          color: "#FFFFFF",
          boxShadow:
            "0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)",
        },
      },
      toolbar: {
        display: "flex",
        overflow: "auto",
        flexWrap: "wrap",
        flexDirection: "row",
        padding: "12px 12px 8px 12px",
        justifyContent: "space-between",
      },
    },

    drawerWidth: 260,
    loadingDelay: "800ms",
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

// https://material-ui.com/guides/typescript/#customization-of-theme
declare module "@material-ui/core/styles/createTheme" {
  interface Theme {
    drawerWidth: number;
    loadingDelay: string;
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    drawerWidth: number;
    loadingDelay: string;
  }
}

// https://github.com/mui-org/material-ui/issues/11853#issuecomment-401425388
declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    danger: PaletteColor;
  }

  interface PaletteOptions {
    danger: PaletteColorOptions;
  }
}

declare module "@material-ui/core/styles/createMixins" {
  export interface Mixins {
    ellipsis: CSSProperties;
    popperResponsive: CSSProperties;
    dropdown: CSSProperties;
    dropdownItem: CSSProperties;
    toolbar: CSSProperties;
  }
}
