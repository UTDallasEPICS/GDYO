import { AntDesign } from "@expo/vector-icons";
import { CalendarEvent, fetchCalendarEvents } from "models/CalendarEvent";
import moment from "moment";
import queryString from "query-string";
import { useEffect, useState } from "react";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import SafeAreaViewExtendedStyle from "styles/SafeAreaViewExtendedStyle";
import { report } from "utils/error";
import { CustomTheme, useCustomTheme } from "utils/theme";

import { generateTheme } from "./CalendarTheme";
import EventsBottomView from "./EventsBottomView/EventsBottomView";

const EventSequenceColorsOnCalendar = [
  "rgba(109, 41, 246, 1)",
  "rgba(255, 166, 158, 1)",
  "rgba(255, 255, 255, 0.3)", // Show this fading when there are 3 or more events
];

export default function CalendarScreen() {
  // --- Hooks

  const theme = useCustomTheme();
  const styles = makeStyles(theme);

  // --- States

  // https://stackoverflow.com/questions/59598513/highlight-pressedselected-date-in-react-native-calendars
  const [chosenDate, setChosenDate] = useState<string>(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const [eventsOnDate, setEventsOnDate] = useState<
    Record<string, CalendarEvent[]> // Date -> CalendarEvent[] on that date
  >({});

  const [calendarScreenViewHeight, setCalendarScreenViewHeight] = useState(0);

  // --- Effects

  useEffect(() => {
    const queryParams = queryString.parse("");
    queryParams.test = "Test Value";

    const start = new Date(chosenDate);
    start.setDate(0);

    const end = new Date(chosenDate);
    end.setMonth(end.getMonth() + 1);
    end.setDate(1);

    queryParams.startTime = start.toString();
    queryParams.endTime = end.toString();

    console.log("--- API url:", process.env.EXPO_PUBLIC_API_URL);
    console.log("--- Query params:", queryParams);

    fetch(
      `${
        process.env.EXPO_PUBLIC_API_URL
      }/event/fetch-events-within-time-range?${queryString.stringify(
        queryParams
      )}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        console.log(res.toString());
        const data = await res.json();
        console.log("--- Data:", data);
      })
      .catch((err) => {
        report("Error");
        report(err);
      });
  }, [chosenDate]);

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

  const getMarkedEvents = (): MarkedDates => {
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
          color:
            EventSequenceColorsOnCalendar[
              marked[key].periods.length % EventSequenceColorsOnCalendar.length
            ],
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
      <SafeAreaView
        style={{
          ...SafeAreaViewExtendedStyle.AndroidSafeArea,
          ...styles.calendarWrapper,
        }}
      >
        <Calendar
          initialDate={chosenDate} // https://github.com/wix/react-native-calendars/issues/1280
          theme={generateTheme(theme)}
          enableSwipeMonths={true}
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
          onMonthChange={(date) => {
            setChosenDate(date.dateString);
          }}
          onDayPress={(date) => {
            setChosenDate(date.dateString);
          }}
          markingType="multi-period"
          markedDates={getMarkedEvents()}
        />
      </SafeAreaView>

      <EventsBottomView
        calendarScreenViewHeight={calendarScreenViewHeight}
        eventsOnDate={eventsOnDate}
        chosenDate={chosenDate}
        setChosenDate={setChosenDate}
      />
    </View>
  );
}

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },

    calendarWrapper: {
      backgroundColor: theme.colors.paperBackgroundHighlight,
    },
  });
