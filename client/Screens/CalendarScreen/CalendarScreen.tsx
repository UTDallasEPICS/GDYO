import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { DateData, MarkedDates } from "react-native-calendars/src/types";
import { useCustomTheme } from "utils/theme";

import { generateTheme } from "./CalendarTheme";

export default function CalendarScreen() {
  const theme = useCustomTheme();

  // https://stackoverflow.com/questions/59598513/highlight-pressedselected-date-in-react-native-calendars
  const [chosenDate, setChosenDate] = useState<MarkedDates>({
    [moment(new Date()).format("YYYY-MM-DD")]: { selected: true },
  });

  const onDayPress = (date: DateData) => {
    const newChosenDate = {};
    newChosenDate[date.dateString] = { selected: true };
    setChosenDate(newChosenDate);
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={{
          paddingTop: 50,
        }}
        theme={generateTheme(theme)}
        firstDay={1} // Start from Monday
        renderArrow={(direction) => (
          <AntDesign
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 22,
              overflow: "hidden",
              padding: 8,
            }}
            name={direction === "left" ? "arrowleft" : "arrowright"}
            color="white"
            size={28}
          />
        )}
        onDayPress={onDayPress}
        markedDates={chosenDate}
      />

      <View style={styles.subView}>
        <Text style={{ color: theme.colors.text }}>Screen 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  subView: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
