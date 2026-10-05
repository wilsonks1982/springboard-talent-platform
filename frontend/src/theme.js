import { extendTheme } from "@chakra-ui/react";

/*
 * ============================================================
 * SPRINGBOARD TALENT PARTNERS
 * Brand Identity
 *
 * Mulberry : #601230
 * Gold     : #C89732
 * Charcoal : #2E2A28
 * Taupe    : #8A7F76
 *
 * Positioning:
 *   Your Potential. Your Platform.
 *
 * Brand Promise:
 *   Find Your Gold Standard.
 *
 * Philosophy:
 *   Grow. Outgrow.
 * ============================================================
 */

const colors = {
  /*
   * ==========================================================
   * PRIMARY BRAND — MULBERRY
   * ==========================================================
   *
   * 500 is the canonical brand color.
   */

  brand: {
    50: "#F8F1F4",
    100: "#F1E3E8",
    200: "#E3C8D2",
    300: "#D1A5B5",
    400: "#B97891",
    500: "#601230",
    600: "#541029",
    700: "#480E23",
    800: "#3C0B1E",
    900: "#2E0817",
  },

  /*
   * ==========================================================
   * ACCENT — GOLD
   * ==========================================================
   *
   * Used for highlights, important actions, metadata,
   * brand accents and premium states.
   */

  accent: {
    50: "#FBF7EA",
    100: "#F6EED5",
    200: "#EBDDB1",
    300: "#DFC98A",
    400: "#D3B55D",
    500: "#C89732",
    600: "#B0832B",
    700: "#946E24",
    800: "#79591D",
    900: "#5F4617",
  },

  /*
   * ==========================================================
   * CHARCOAL
   * ==========================================================
   */

  charcoal: {
    50: "#F7F6F5",
    100: "#ECEAE8",
    200: "#D9D5D2",
    300: "#BDB7B3",
    400: "#9B938E",
    500: "#7A716C",
    600: "#5F5854",
    700: "#49433F",
    800: "#2E2A28",
    900: "#211E1C",
  },

  /*
   * ==========================================================
   * TAUPE
   * ==========================================================
   */

  taupe: {
    50: "#FAF9F8",
    100: "#F2F0EE",
    200: "#E4E0DD",
    300: "#D0CAC5",
    400: "#B3AAA3",
    500: "#8A7F76",
    600: "#756B63",
    700: "#625952",
    800: "#504943",
    900: "#403A35",
  },

  /*
   * ==========================================================
   * WARM NEUTRALS
   * ==========================================================
   */

  cream: {
    50: "#FEFDFC",
    100: "#FBF9F6",
    200: "#F7F3EE",
    300: "#F0EAE2",
    400: "#E6DDD2",
    500: "#D8CBBE",
    600: "#C5B6A7",
    700: "#A9998A",
    800: "#8A7A6C",
    900: "#6E6054",
  },

  /*
   * ==========================================================
   * SEMANTIC COLORS
   * ==========================================================
   */

  success: {
    50: "#F1F8F4",
    100: "#DCEFE4",
    200: "#B9DEC9",
    500: "#3D8060",
    600: "#326B4F",
    700: "#28563F",
    800: "#1E4231",
  },

  warning: {
    50: "#FBF7EA",
    100: "#F6EED5",
    200: "#EBDDB1",
    500: "#C89732",
    600: "#B0832B",
    700: "#946E24",
  },

  error: {
    50: "#FCF3F3",
    100: "#F6DDDD",
    200: "#EABABA",
    500: "#A63D40",
    600: "#8E3033",
    700: "#762629",
    800: "#5E1F21",
  },

  /*
   * Keep gray for compatibility with existing application code.
   *
   * This is intentionally warmer than the current blue-gray
   * palette so existing components gradually inherit the new
   * identity without requiring immediate refactoring.
   */

  gray: {
    50: "#FAF9F8",
    100: "#F3F1EF",
    200: "#E5E1DE",
    300: "#D2CCC8",
    400: "#B4ACA6",
    500: "#8F8781",
    600: "#6F6761",
    700: "#514B47",
    800: "#393431",
    900: "#2E2A28",
  },
};

/*
 * ============================================================
 * TYPOGRAPHY
 * ============================================================
 */

const fonts = {
  heading: "Georgia, 'Times New Roman', serif",

  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

  mono: "'SFMono-Regular', Consolas, 'Liberation Mono', monospace",
};

/*
 * ============================================================
 * TEXT STYLES
 * ============================================================
 */

const textStyles = {
  h1: {
    fontFamily: "heading",
    fontSize: "42px",
    lineHeight: "1.08",
    fontWeight: "500",
    letterSpacing: "-0.035em",
    color: "brand.500",
  },

  h2: {
    fontFamily: "heading",
    fontSize: "32px",
    lineHeight: "1.15",
    fontWeight: "500",
    letterSpacing: "-0.025em",
    color: "brand.500",
  },

  h3: {
    fontFamily: "heading",
    fontSize: "24px",
    lineHeight: "1.25",
    fontWeight: "500",
    color: "brand.500",
  },

  body: {
    fontSize: "14px",
    lineHeight: "1.7",
    color: "charcoal.700",
  },

  bodyLarge: {
    fontSize: "16px",
    lineHeight: "1.8",
    color: "taupe.600",
  },

  caption: {
    fontSize: "12px",
    lineHeight: "1.5",
    color: "taupe.500",
  },

  overline: {
    fontSize: "10px",
    lineHeight: "1.4",
    fontWeight: "800",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "taupe.500",
  },

  brandStatement: {
    fontFamily: "heading",
    fontSize: "40px",
    lineHeight: "1.1",
    fontWeight: "500",
    fontStyle: "italic",
    letterSpacing: "-0.035em",
    color: "brand.500",
  },
};

/*
 * ============================================================
 * COMPONENTS
 * ============================================================
 */

const components = {
  /*
   * ----------------------------------------------------------
   * BUTTON
   * ----------------------------------------------------------
   */

  Button: {
    baseStyle: {
      borderRadius: "4px",
      fontWeight: "700",
      fontSize: "14px",
      letterSpacing: "0.005em",
      transition: "all 0.18s ease",

      _focusVisible: {
        boxShadow: "0 0 0 3px rgba(200, 151, 50, 0.22)",
      },
    },

    variants: {
      solid: {
        bg: "brand.500",
        color: "white",

        _hover: {
          bg: "brand.600",
          transform: "translateY(-1px)",
          boxShadow: "0 7px 18px rgba(96, 18, 48, 0.18)",
        },

        _active: {
          bg: "brand.700",
          transform: "translateY(0)",
        },
      },

      gold: {
        bg: "accent.500",
        color: "white",

        _hover: {
          bg: "accent.600",
          transform: "translateY(-1px)",
          boxShadow: "0 7px 18px rgba(200, 151, 50, 0.22)",
        },

        _active: {
          bg: "accent.700",
        },
      },

      success: {
        bg: "success.500",
        color: "white",

        _hover: {
          bg: "success.600",
          transform: "translateY(-1px)",
        },
      },

      warning: {
        bg: "warning.500",
        color: "white",

        _hover: {
          bg: "warning.600",
          transform: "translateY(-1px)",
        },
      },

      danger: {
        bg: "error.500",
        color: "white",

        _hover: {
          bg: "error.600",
          transform: "translateY(-1px)",
        },
      },

      outline: {
        color: "brand.500",
        border: "1px solid",
        borderColor: "brand.300",
        bg: "transparent",

        _hover: {
          bg: "brand.50",
          borderColor: "brand.500",
        },
      },

      outlineGold: {
        color: "brand.500",
        border: "1px solid",
        borderColor: "accent.500",
        bg: "transparent",

        _hover: {
          bg: "accent.50",
          borderColor: "accent.600",
        },
      },

      outlineLight: {
        color: "white",
        border: "1px solid",
        borderColor: "whiteAlpha.600",
        bg: "transparent",

        _hover: {
          bg: "whiteAlpha.100",
          borderColor: "whiteAlpha.800",
        },
      },

      ghost: {
        color: "charcoal.600",

        _hover: {
          bg: "gray.100",
          color: "brand.500",
        },
      },

      ghostBrand: {
        color: "brand.500",

        _hover: {
          bg: "brand.50",
          color: "brand.600",
        },
      },
    },

    defaultProps: {
      variant: "solid",
    },
  },

  /*
   * ----------------------------------------------------------
   * INPUT
   * ----------------------------------------------------------
   */

  Input: {
    baseStyle: {
      field: {
        borderRadius: "5px",
        borderColor: "gray.200",
        bg: "white",
        color: "charcoal.800",
        transition: "all 0.18s ease",

        _hover: {
          borderColor: "gray.300",
        },

        _focus: {
          borderColor: "brand.500",
          boxShadow: "0 0 0 1px #601230",
        },

        _placeholder: {
          color: "taupe.400",
        },
      },
    },
  },

  /*
   * ----------------------------------------------------------
   * SELECT
   * ----------------------------------------------------------
   */

  Select: {
    baseStyle: {
      field: {
        borderRadius: "5px",
        borderColor: "gray.200",
        bg: "white",
        color: "charcoal.800",

        _hover: {
          borderColor: "gray.300",
        },

        _focus: {
          borderColor: "brand.500",
          boxShadow: "0 0 0 1px #601230",
        },
      },
    },
  },

  /*
   * ----------------------------------------------------------
   * TEXTAREA
   * ----------------------------------------------------------
   */

  Textarea: {
    baseStyle: {
      borderRadius: "5px",
      borderColor: "gray.200",
      bg: "white",
      color: "charcoal.800",

      _hover: {
        borderColor: "gray.300",
      },

      _focus: {
        borderColor: "brand.500",
        boxShadow: "0 0 0 1px #601230",
      },

      _placeholder: {
        color: "taupe.400",
      },
    },
  },

  /*
   * ----------------------------------------------------------
   * CARD
   * ----------------------------------------------------------
   */

  Card: {
    baseStyle: {
      borderRadius: "8px",
      border: "1px solid",
      borderColor: "gray.200",
      boxShadow: "0 4px 18px rgba(46, 42, 40, 0.05)",
      bg: "white",
    },
  },

  /*
   * ----------------------------------------------------------
   * TEXT
   * ----------------------------------------------------------
   */

  Text: {
    baseStyle: {
      fontSize: "14px",
      color: "charcoal.700",
    },
  },

  /*
   * ----------------------------------------------------------
   * HEADING
   * ----------------------------------------------------------
   */

  Heading: {
    baseStyle: {
      fontFamily: "heading",
      color: "brand.500",
      fontWeight: "500",
    },
  },

  /*
   * ----------------------------------------------------------
   * BADGE
   * ----------------------------------------------------------
   */

  Badge: {
    baseStyle: {
      borderRadius: "2px",
      fontWeight: "800",
      fontSize: "10px",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },

    variants: {
      brand: {
        bg: "brand.50",
        color: "brand.500",
        border: "1px solid",
        borderColor: "brand.100",
      },

      gold: {
        bg: "accent.50",
        color: "accent.700",
        border: "1px solid",
        borderColor: "accent.200",
      },

      neutral: {
        bg: "gray.100",
        color: "charcoal.600",
        border: "1px solid",
        borderColor: "gray.200",
      },
    },
  },

  /*
   * ----------------------------------------------------------
   * DIVIDER
   * ----------------------------------------------------------
   */

  Divider: {
    baseStyle: {
      borderColor: "gray.200",
    },
  },

  /*
   * ----------------------------------------------------------
   * FORM LABEL
   * ----------------------------------------------------------
   */

  FormLabel: {
    baseStyle: {
      fontSize: "13px",
      fontWeight: "700",
      color: "charcoal.700",
      marginBottom: "6px",
    },
  },

  /*
   * ----------------------------------------------------------
   * CHECKBOX
   * ----------------------------------------------------------
   */

  Checkbox: {
    baseStyle: {
      control: {
        borderRadius: "3px",
        borderColor: "gray.300",

        _checked: {
          bg: "brand.500",
          borderColor: "brand.500",

          _hover: {
            bg: "brand.600",
            borderColor: "brand.600",
          },
        },

        _focusVisible: {
          boxShadow: "0 0 0 3px rgba(200, 151, 50, 0.18)",
        },
      },
    },
  },

  /*
   * ----------------------------------------------------------
   * LINK
   * ----------------------------------------------------------
   */

  Link: {
    baseStyle: {
      color: "brand.500",
      fontWeight: "600",
      textUnderlineOffset: "3px",

      _hover: {
        color: "brand.600",
      },
    },
  },
};

/*
 * ============================================================
 * GLOBAL STYLES
 * ============================================================
 */

const styles = {
  global: {
    html: {
      scrollBehavior: "smooth",
      background: "#FBF9F6",
    },

    body: {
      bg: "cream.100",
      color: "charcoal.800",
      fontFamily: "body",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },

    "::selection": {
      background: "#E3C8D2",
      color: "#601230",
    },

    /*
     * Scrollbar
     */

    "::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },

    "::-webkit-scrollbar-track": {
      background: "#F3F1EF",
    },

    "::-webkit-scrollbar-thumb": {
      background: "#BDB7B3",
      borderRadius: "4px",
    },

    "::-webkit-scrollbar-thumb:hover": {
      background: "#8A7F76",
    },

    /*
     * Print
     */

    "@page": {
      size: "A4",
      margin: "12mm",
    },

    "@media print": {
      html: {
        background: "#ffffff !important",
      },

      body: {
        background: "#ffffff !important",
        color: "#000000 !important",
        fontSize: "12px !important",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      },

      ".no-print": {
        display: "none !important",
      },

      ".print-container": {
        width: "100% !important",
        maxWidth: "100% !important",
        margin: "0 !important",
        padding: "0 !important",
      },

      ".chakra-card": {
        boxShadow: "none !important",
        borderColor: "#D9D5D2 !important",
        background: "#ffffff !important",
      },

      ".chakra-button": {
        display: "none !important",
      },

      ".chakra-badge": {
        border: "1px solid #BDB7B3 !important",
      },

      "nav, aside, header, footer": {
        display: "none !important",
      },

      main: {
        width: "100% !important",
        maxWidth: "100% !important",
        margin: "0 !important",
        padding: "0 !important",
      },

      table: {
        pageBreakInside: "auto",
      },

      thead: {
        display: "table-header-group",
      },

      tr: {
        pageBreakInside: "avoid",
        breakInside: "avoid",
      },

      "h1, h2, h3, h4, h5, h6": {
        pageBreakAfter: "avoid",
      },
    },
  },
};

/*
 * ============================================================
 * CHAKRA CONFIG
 * ============================================================
 */

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

/*
 * ============================================================
 * FINAL THEME
 * ============================================================
 */

const theme = extendTheme({
  colors,
  fonts,
  textStyles,
  components,
  styles,
  config,
});

export default theme;
