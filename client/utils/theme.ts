import { DarkTheme, useTheme } from "@react-navigation/native";

export const Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "rgb(244, 211, 94)",
    secondaryText: "rgb(124, 124, 125)",
  },
};

export const useCustomTheme = () => {
  const theme = useTheme() as typeof Theme;
  return theme;
};
