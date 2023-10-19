import { Entypo } from "@expo/vector-icons";
import { CalendarEvent } from "models/CalendarEvent";
import moment from "moment";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  barColor: string;
  event: CalendarEvent;
};

export default function EventItem(props: Props) {
  return (
    <View style={styles.section}>
      <Entypo name="beamed-note" size={50} color="white" />

      <View
        style={{ ...styles.verticalBar, backgroundColor: props.barColor }}
      />

      <View style={styles.eventContent}>
        <Text style={styles.eventName} numberOfLines={1}>
          {props.event.name}
        </Text>

        <Text style={styles.eventLocation} numberOfLines={1}>
          {props.event.location}
        </Text>

        <Text style={styles.eventTime} numberOfLines={1}>
          {moment(props.event.startTime).format("h:mm A")} -{" "}
          {moment(props.event.endTime).format("h:mm A")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 6,
  },

  verticalBar: {
    width: 7,
    height: "85%", // reduced the height to match the desired look
    marginTop: 3, // Move the bar down to create an more effect that the bar is lower than event name
    marginRight: 10,
  },

  eventContent: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  eventName: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  eventLocation: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 2,
  },
  eventTime: {
    color: "#C9C4C4",
    fontSize: 14,
    marginTop: 4,
  },
});
