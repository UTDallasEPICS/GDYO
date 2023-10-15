import { DarkTheme, useTheme } from "@react-navigation/native";

export type CustomTheme = typeof Theme;

export const Theme = {
  ...DarkTheme,

  colors: {
    ...DarkTheme.colors,

    primary: "rgb(244, 211, 94)",
    highlightText: "rgb(249, 154, 14)",
    secondaryText: "rgb(124, 124, 125)",

    paperBackground: "rgb(12, 63, 76)",
    paperBackgroundHighlight: "rgb(37, 103, 127)",
    paperSecondaryText: "rgb(214, 212, 212)",
  },

  navbarHeight: 60,
};

export const useCustomTheme = () => {
  const theme = useTheme() as CustomTheme;
  return theme;
};
