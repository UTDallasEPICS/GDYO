import { ViewStyle } from "react-native";
import { Theme as CalendarTheme } from "react-native-calendars/src/types";
import { Theme } from "utils/theme";

// Issue with Typescript: https://github.com/wix/react-native-calendars/issues/1864
// Style id: https://github.com/wix/react-native-calendars/blob/master/src/calendar/header/style.ts

type ExtendedTheme = CalendarTheme & {
  "stylesheet.calendar.main"?: {
    container?: ViewStyle;
  };

  "stylesheet.calendar.header"?: {
    header?: ViewStyle;
    week?: ViewStyle;
    dayHeader?: ViewStyle;
  };
};

export const generateTheme = (appTheme: typeof Theme): ExtendedTheme => {
  return {
    calendarBackground: appTheme.colors.paperBackground,
    selectedDayBackgroundColor: appTheme.colors.paperBackgroundHighlight,

    dayTextColor: "white", // Text color for all days in the chosen month
    textSectionTitleColor: "white", // Text color for Mon, Tue, ...
    monthTextColor: "white", // Text color for month header
    textDisabledColor: appTheme.colors.paperSecondaryText, // Text color for days in non-chosen month

    todayTextColor: appTheme.colors.primary,

    textMonthFontSize: 25,
    textMonthFontWeight: "700",

    textDayHeaderFontWeight: "700",
    textDayFontWeight: "700",

    "stylesheet.calendar.main": {
      container: {
        padding: 0,
        backgroundColor: appTheme.colors.paperBackgroundHighlight,
      },
    },

    "stylesheet.calendar.header": {
      header: {
        // Original
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10,
        // marginTop: 6,
        alignItems: "center",

        // Extended
        marginTop: 0,
        backgroundColor: appTheme.colors.paperBackgroundHighlight,
      },

      week: {
        // Original
        // marginTop: 7,
        flexDirection: "row",
        justifyContent: "space-around",

        // Extended
        marginTop: 0,
        paddingTop: 10,
        paddingBottom: 4,
        borderTopColor: "black",
        borderTopWidth: 8,
        backgroundColor: appTheme.colors.paperBackground,
      },
    },
  };
};
