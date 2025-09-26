import { StyleSheet } from "react-native";

export const theme = {
  colors: {
    // Light-only base
    background: "#FFFFFF",
    surface: "#F7F8FA",
    surfaceAlt: "#F2F4F7",
    text: "rgba(0,0,0,0.87)",
    textMuted: "rgba(0,0,0,0.55)",
    border: "rgba(0,0,0,0.12)",
    shadow: "rgba(0,0,0,0.08)",

    // Brand gradient (blue → red)
    brandStart: "#0A84FF",   // iOS blue
    brandMid:   "#6C4DFB",   // optional smoothing
    brandEnd:   "#FF375F",   // iOS pink-red
    brandSolid: "#0A84FF",   // use when gradient is not practical

    // Utility
    success: "#34C759",
    warning: "#FF9F0A",
    error:   "#FF3B30",
  },
  radii: { sm: 8, md: 12, lg: 16, xl: 20, "2xl": 28, round: 999 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, "2xl": 24, "3xl": 32 },
  shadows: {
    card: {
      // iOS shadow; Android use elevation: 3–4
      shadowColor: "rgba(0,0,0,0.08)",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 1,
      shadowRadius: 12,
      elevation: 4,
    },
  },
  typography: {
    display:   { fontSize: 30, lineHeight: 36, fontWeight: "600" as const, letterSpacing: -0.3 },
    title:     { fontSize: 24, lineHeight: 30, fontWeight: "600" as const, letterSpacing: -0.2 },
    headline:  { fontSize: 15, lineHeight: 20, fontWeight: "600" as const },
    body:      { fontSize: 15, lineHeight: 22, fontWeight: "400" as const },
    subhead:   { fontSize: 14, lineHeight: 19, fontWeight: "400" as const },
    caption:   { fontSize: 12, lineHeight: 16, fontWeight: "400" as const },
    // family is platform default (San Francisco on iOS)
  },
  hairline: StyleSheet.hairlineWidth,
};

export type AppTheme = typeof theme;