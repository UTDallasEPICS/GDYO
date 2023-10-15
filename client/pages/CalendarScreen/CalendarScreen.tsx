import { AntDesign } from "@expo/vector-icons";
import { CalendarEvent, fetchCalendarEvents } from "models/Event";
import moment from "moment";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { DateData, MarkedDates } from "react-native-calendars/src/types";
import { report } from "utils/error";
import { useCustomTheme } from "utils/theme";

import { generateTheme } from "./CalendarTheme";

export default function CalendarScreen() {
  const theme = useCustomTheme();

  // https://stackoverflow.com/questions/59598513/highlight-pressedselected-date-in-react-native-calendars
  const [chosenDate, setChosenDate] = useState<string>(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetchCalendarEvents()
      .then((calEvents) => {
        setEvents(calEvents);
      })
      .catch((err) => {
        report(err);
      });
  }, []);

  const onDayPress = (date: DateData) => {
    setChosenDate(date.dateString);
  };

  const getMarkedEvents = (): MarkedDates => {
    const colors = [
      "rgba(115, 91, 242, 1)",
      "rgba(255, 166, 158, 1)",
      "rgba(255, 255, 255, 0.3)",
    ];

    const marked: MarkedDates = {};

    events.forEach((event) => {
      const key = moment(event.startTime).format("YYYY-MM-DD");

      if (!(key in marked)) {
        marked[key] = { periods: [] };
      }

      if (!("periods" in marked[key])) {
        marked[key].periods = [];
      }

      if (marked[key].periods.length < 3) {
        marked[key].periods.push({
          startingDay: true,
          endingDay: true,
          color: colors[marked[key].periods.length % colors.length],
        });
      }
    });

    // Merge with one chosen date
    if (!(chosenDate in marked)) {
      marked[chosenDate] = {};
    }
    marked[chosenDate].selected = true;

    return marked;
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
        markingType="multi-period"
        markedDates={getMarkedEvents()}
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