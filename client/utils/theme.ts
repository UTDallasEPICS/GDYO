import { DarkTheme, useTheme } from "@react-navigation/native";

export type CustomTheme = typeof Theme;

export const Theme = {
  ...DarkTheme,

  colors: {
    ...DarkTheme.colors,

    primary: "rgb(244, 211, 94)",

    normalText: "rgb(231, 231, 231)",
    highlightText: "rgb(249, 154, 14)",
    secondaryText: "rgb(124, 124, 125)",
    disabledText: "rgb(172, 170, 170)",

    paperBackground: "rgb(12, 63, 76)",
    paperBackgroundDark: "rgb(5, 25, 30)",
    paperBackgroundHighlight: "rgb(37, 103, 127)",
    paperBackgroundHighlightBright: "rgb(2, 134, 222)",

    textFieldBackground: "rgba(50, 78, 88, 1)",
    textFieldPlaceholderText: "rgba(132, 132, 132, 1)",

    iconGrey: "rgba(146, 146, 146, 1)",

    modalBackground: "rgb(9, 26, 32)",
  },

  navbarHeight: 60,
};

export const useCustomTheme = () => {
  const theme = useTheme() as CustomTheme;
  return theme;
};
