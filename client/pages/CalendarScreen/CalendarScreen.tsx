import { AntDesign } from "@expo/vector-icons";
import { CalendarEvent, fetchCalendarEvents } from "models/Event";
import moment from "moment";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { DateData, MarkedDates } from "react-native-calendars/src/types";
import { report } from "utils/error";
import { useCustomTheme } from "utils/theme";

import { generateTheme } from "./CalendarTheme";
import EventsBottomView from "./EventsBottomView/EventsBottomView";

export default function CalendarScreen() {
  const theme = useCustomTheme();

  // https://stackoverflow.com/questions/59598513/highlight-pressedselected-date-in-react-native-calendars
  const [chosenDate, setChosenDate] = useState<string>(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const [eventsOnDate, setEventsOnDate] = useState<
    Record<string, CalendarEvent[]> // Date -> CalendarEvent[] on that date
  >({});

  const [calendarScreenViewHeight, setCalendarScreenViewHeight] = useState(0);

  useEffect(() => {
    fetchCalendarEvents()
      .then((calEvents) => {
        setEvents(calEvents);

        const eventsOnDateTmp: Record<string, CalendarEvent[]> = {};
        for (const event of calEvents) {
          const key = moment(event.startTime).format("YYYY-MM-DD");
          if (!(key in eventsOnDateTmp)) {
            eventsOnDateTmp[key] = [];
          }
          eventsOnDateTmp[key].push(event);
        }
        setEventsOnDate(eventsOnDateTmp);
      })
      .catch((err) => {
        report(err);
      });
  }, []);

  useEffect(() => {
    console.log("---", eventsOnDate[chosenDate]);
  }, [chosenDate, JSON.stringify(eventsOnDate)]);

  const onDayPress = (date: DateData) => {
    setChosenDate(date.dateString);
  };

  const getMarkedEvents = (): MarkedDates => {
    const colors = [
      "rgba(109, 41, 246, 1)",
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
    <View
      style={styles.container}
      onLayout={(event) => {
        setCalendarScreenViewHeight(event.nativeEvent.layout.height);
      }}
    >
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

      <EventsBottomView calendarScreenViewHeight={calendarScreenViewHeight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  scrollView: {
    flex: 1,
    width: "100%",
    display: "flex",
  },

  eventsDayView: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 20,
    padding: 20,
  },
});
