import { AntDesign } from "@expo/vector-icons";
import { CalendarEvent } from "models/CalendarEvent";
import moment from "moment";
import queryString from "query-string";
import React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  Modal,
  Text,
  TextInput,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import SafeAreaViewExtendedStyle from "styles/SafeAreaViewExtendedStyle";
import { report } from "utils/error";
import { CustomTheme, useCustomTheme } from "utils/theme";
import { getMonthDateRange } from "utils/time/getMonthDateRange";

import { generateTheme } from "./CalendarTheme";
import EventsBottomView from "./EventsBottomView/EventsBottomView";

const EventSequenceColorsOnCalendar = [
  "rgba(109, 41, 246, 1)",
  "rgba(255, 166, 158, 1)",
  "rgba(255, 255, 255, 0.3)", // Show this fading when there are 3 or more events
];

type DateKey = string;
type MonthKey = string;
type EventsInMonth = Record<DateKey, CalendarEvent[]>;
export type EventsRecord = Record<MonthKey, EventsInMonth>; // (Month, Year) -> Date -> CalendarEvent[]

export type ChosenMonth = {
  month: number; // Month 0 - 11
  year: number;
};

export default function CalendarScreen() {
  // --- Hooks

  const theme = useCustomTheme();
  const styles = makeStyles(theme);
  const today = moment(new Date());

  // --- States

  // https://stackoverflow.com/questions/59598513/highlight-pressedselected-date-in-react-native-calendars
  const [chosenDate, setChosenDate] = useState<string>(
    today.format("YYYY-MM-DD")
  );
  const [chosenMonth, setChosenMonth] = useState<ChosenMonth>({
    month: today.month(), // Month in 0 - 11
    year: today.year(),
  });
  const [modalVisible, setModalVisible] = useState(false);

  const [eventsRecord, setEventsRecord] = useState<EventsRecord>({}); // (Month, Year) -> Date -> CalendarEvent[]

  const [calendarScreenViewHeight, setCalendarScreenViewHeight] = useState(0);

  const [eventName, onChangeEventName] = React.useState("Event name: ");
  const [eventDate, onChangeEventDate] = React.useState(
    "Enter the date: YYYY-MM-DD"
  );
  const [eventStartTime, onChangeEventStartTime] = React.useState(
    "Enter the start time (hh:mm)"
  );
  const [eventEndTime, onChangeEventEndTime] = React.useState(
    "Enter the end time: (hh:mm)"
  );
  const [eventLocation, onChangeEventLocation] = React.useState("Location");
  const [eventDescription, onChangeEventDescription] =
    React.useState("Event Description");

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAddEvent = () => {
    const eventData = {
      name: eventName,
      startTime: eventDate + "T" + eventStartTime + ":00Z",
      endTime: eventDate + "T" + eventEndTime + ":00Z",
      location: eventLocation,
      description: eventDescription,
    };

    console.log("--- event data:", eventData);

    fetch("http://localhost:4000/event/add-single-event/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        closeModal();
        retrieveEvents();
      })
      .catch((error) => {
        console.error("Error:", error);
        closeModal();
      });
  };

  const retrieveEvents = () => {
    const queryParams = queryString.parse("");
    const monthDateRange = getMonthDateRange(
      chosenMonth.year,
      chosenMonth.month
    );

    queryParams.startTime = monthDateRange.start.toString();
    queryParams.endTime = monthDateRange.end.toString();

    console.log();
    console.log("--- API url:", process.env.EXPO_PUBLIC_API_URL);
    console.log("--- Query params:", queryParams);
    console.log(process.env.EXPO_PUBLIC_API_URL, "--test");
    fetch(
      `http://localhost:4000/event/fetch-events-within-time-range/?${queryString.stringify(
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
        let eventsData: { events: CalendarEvent[] } = { events: [] };

        try {
          eventsData = await res.json();
          console.log("--- Data:", eventsData);
        } catch (err) {
          const text = await res.text();
          console.log("--- Text:", JSON.parse(text));
          eventsData = JSON.parse(text);
        }

        const events = eventsData.events;
        const eventsOnDates: Record<string, CalendarEvent[]> = {}; // Date -> CalendarEvent[]

        // Compile all events into the right date key
        for (const event of events) {
          const key = moment(event.startTime).format("YYYY-MM-DD");
          if (!(key in eventsOnDates)) {
            eventsOnDates[key] = [];
          }
          eventsOnDates[key].push(event);
        }

        // Put eventsOnDates into the eventsRecord map
        const eventsRecordTmp = { ...eventsRecord };
        eventsRecordTmp[JSON.stringify(chosenMonth)] = eventsOnDates;
        setEventsRecord(eventsRecordTmp);
      })
      .catch((err) => {
        report(err);
      });
  };

  // --- Effects

  useEffect(() => {
    // Use to fetch new data for a new chosen month
    // If chosen month is already fetched previously, then no need to fetch again.
    // Simple cache strategy
    /*
    if (JSON.stringify(chosenMonth) in eventsRecord) {
      return;
    }
    */
    retrieveEvents();
  }, [JSON.stringify(chosenMonth)]);

  const getMarkedEvents = (): MarkedDates => {
    const marked: MarkedDates = {};
    const eventsInMonth = eventsRecord[JSON.stringify(chosenMonth)];

    // Mark (Underline) all events in the chosen month

    if (eventsInMonth) {
      Object.keys(eventsInMonth).forEach((key) => {
        // Initialize marked

        if (!(key in marked)) {
          marked[key] = { periods: [] };
        }

        if (!("periods" in marked[key])) {
          marked[key].periods = [];
        }

        // Add to marked

        for (const _ of eventsInMonth[key]) {
          if (marked[key].periods.length < 3) {
            marked[key].periods.push({
              startingDay: true,
              endingDay: true,
              color:
                EventSequenceColorsOnCalendar[
                  marked[key].periods.length %
                    EventSequenceColorsOnCalendar.length
                ],
            });
          } else {
            break;
          }
        }
      });
    }

    // Mark the chosen date as selected

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
          addMonth={(num) => {
            console.log(num);
          }}
          initialDate={moment([chosenMonth.year, chosenMonth.month]).format(
            "YYYY-MM-DD"
          )} // https://github.com/wix/react-native-calendars/issues/1280
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
          disableMonthChange
          onMonthChange={(date) => {
            // Since month in moment is 0-based, we need to subtract 1 from onMonthChange date obj
            setChosenMonth({ month: date.month - 1, year: date.year });
          }}
          onDayPress={(date) => {
            setChosenDate(date.dateString);
          }}
          markingType="multi-period"
          markedDates={getMarkedEvents()}
        />
      </SafeAreaView>
      <Button title="Add Event" onPress={openModal} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Create an Event: </Text>
            <TextInput
              style={styles.modalText}
              onChangeText={onChangeEventName}
              value={eventName}
            />
            <TextInput
              style={styles.modalText}
              onChangeText={onChangeEventDate}
              value={eventDate}
            />
            <TextInput
              style={styles.modalText}
              onChangeText={onChangeEventStartTime}
              value={eventStartTime}
            />
            <TextInput
              style={styles.modalText}
              onChangeText={onChangeEventEndTime}
              value={eventEndTime}
            />
            <TextInput
              style={styles.modalText}
              onChangeText={onChangeEventLocation}
              value={eventLocation}
            />
            <TextInput
              style={styles.modalText}
              onChangeText={onChangeEventDescription}
              value={eventDescription}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
              <Text style={styles.closeButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <EventsBottomView
        calendarScreenViewHeight={calendarScreenViewHeight}
        eventsRecord={eventsRecord}
        chosenMonth={chosenMonth}
        setChosenMonth={setChosenMonth}
        chosenDate={chosenDate}
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
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 8,
      width: "80%",
    },
    modalText: {
      fontSize: 16,
      marginBottom: 10,
    },
    closeButton: {
      marginTop: 10,
      alignSelf: "flex-end",
    },
    closeButtonText: {
      color: "#007BFF",
      fontWeight: "bold",
    },
    addButton: {
      marginTop: 20,
      alignSelf: "flex-start",
    },
  });
