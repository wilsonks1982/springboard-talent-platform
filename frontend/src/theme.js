import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    50: "#F5F3FF",
    100: "#EDE9FE",
    200: "#DDD6FE",
    300: "#C4B5FD",
    400: "#A78BFA",
    500: "#7C3AED",
    600: "#6D28D9",
    700: "#5B21B6",
    800: "#4C1D95",
    900: "#2E1065",
  },

  success: {
    50: "#ECFDF5",
    100: "#D1FAE5",
    500: "#10B981",
    600: "#059669",
    700: "#047857",
  },

  warning: {
    50: "#FFF7ED",
    100: "#FFEDD5",
    500: "#F97316",
    600: "#EA580C",
    700: "#C2410C",
  },

  error: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
  },

  gray: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  },
};

const fonts = {
  heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const textStyles = {
  h1: {
    fontSize: "28px",
    lineHeight: "1.2",
    fontWeight: "700",
    letterSpacing: "-0.025em",
    color: "gray.900",
  },

  h2: {
    fontSize: "22px",
    lineHeight: "1.3",
    fontWeight: "700",
    letterSpacing: "-0.02em",
    color: "gray.900",
  },

  h3: {
    fontSize: "18px",
    lineHeight: "1.4",
    fontWeight: "600",
    color: "gray.900",
  },

  body: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "gray.700",
  },

  caption: {
    fontSize: "12px",
    lineHeight: "1.5",
    color: "gray.500",
  },
};

const components = {
  Button: {
    baseStyle: {
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
      transition: "all 0.18s ease",
      _focusVisible: {
        boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.18)",
      },
    },

    variants: {
      solid: {
        bg: "brand.500",
        color: "white",

        _hover: {
          bg: "brand.600",
          transform: "translateY(-1px)",
          boxShadow: "0 6px 14px rgba(124, 58, 237, 0.22)",
        },

        _active: {
          bg: "brand.700",
          transform: "translateY(0)",
        },
      },

      success: {
        bg: "success.500",
        color: "white",

        _hover: {
          bg: "success.600",
          transform: "translateY(-1px)",
          boxShadow: "0 6px 14px rgba(16, 185, 129, 0.2)",
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

      outlineLight: {
        color: "white",
        border: "1px solid",
        borderColor: "whiteAlpha.700",

        _hover: {
          bg: "whiteAlpha.200",
        },
      },

      ghost: {
        color: "gray.600",

        _hover: {
          bg: "gray.100",
          color: "brand.600",
        },
      },

      outline: {
        color: "brand.600",
        borderColor: "brand.200",

        _hover: {
          bg: "brand.50",
          borderColor: "brand.300",
        },
      },
    },
  },

  Input: {
    baseStyle: {
      field: {
        borderRadius: "10px",
        borderColor: "gray.200",
        bg: "white",
        transition: "all 0.18s ease",

        _hover: {
          borderColor: "gray.300",
        },

        _focus: {
          borderColor: "brand.500",
          boxShadow: "0 0 0 1px #7C3AED",
        },

        _placeholder: {
          color: "gray.400",
        },
      },
    },
  },

  Select: {
    baseStyle: {
      field: {
        borderRadius: "10px",
        borderColor: "gray.200",
        bg: "white",

        _hover: {
          borderColor: "gray.300",
        },

        _focus: {
          borderColor: "brand.500",
          boxShadow: "0 0 0 1px #7C3AED",
        },
      },
    },
  },

  Textarea: {
    baseStyle: {
      borderRadius: "10px",
      borderColor: "gray.200",
      bg: "white",

      _hover: {
        borderColor: "gray.300",
      },

      _focus: {
        borderColor: "brand.500",
        boxShadow: "0 0 0 1px #7C3AED",
      },
    },
  },

  Card: {
    baseStyle: {
      borderRadius: "16px",
      border: "1px solid",
      borderColor: "gray.100",
      boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
      bg: "white",
    },
  },

  Text: {
    baseStyle: {
      fontSize: "14px",
      color: "gray.700",
    },
  },

  Heading: {
    baseStyle: {
      color: "gray.900",
      fontWeight: "700",
    },
  },

  Badge: {
    baseStyle: {
      borderRadius: "999px",
      fontWeight: "600",
      fontSize: "11px",
      letterSpacing: "0.01em",
    },
  },

  Divider: {
    baseStyle: {
      borderColor: "gray.100",
    },
  },
};

const styles = {
  global: {
    html: {
      scrollBehavior: "smooth",
    },

    body: {
      bg: "gray.50",
      color: "gray.800",
      fontFamily: "body",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },

    "::selection": {
      background: "#DDD6FE",
      color: "#4C1D95",
    },

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
        borderColor: "#E2E8F0 !important",
        background: "#ffffff !important",
      },

      ".chakra-button": {
        display: "none !important",
      },

      ".chakra-badge": {
        border: "1px solid #CBD5E0 !important",
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

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors,
  fonts,
  textStyles,
  components,
  styles,
  config,
});

export default theme;
