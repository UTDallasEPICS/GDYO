import { Entypo } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

export default function EventsItem() {
  return (
    <View style={styles.container}>
      {/* First Event */}
      <View style={styles.section}>
        <Entypo name="beamed-note" size={50} color="white" />
        <View style={styles.verticalBar}></View>
        <View style={styles.eventContent}>
          <Text style={styles.eventName}>GDYO Holiday Magic</Text>
          <Text style={styles.eventLocation}>Pearson Symphony Center</Text>
          <Text style={styles.contentText}>2:30 PM</Text>
        </View>
      </View>

      {/* Second Event */}
      <View style={styles.section}>
        <Entypo name="beamed-note" size={50} color="white" />
        <View style={styles.verticalBarTwo}></View>
        <View style={styles.eventContent}>
          <Text style={styles.eventName}>Viola is the Greatest</Text>
          <Text style={styles.eventLocation}>Moody Performance Hall</Text>
          <Text style={styles.contentText}>5:30 PM</Text>
        </View>
      </View>

      {/* Third Event */}
      <View style={styles.section}>
        <Entypo name="beamed-note" size={50} color="white" />
        <View style={styles.verticalBarThree}></View>
        <View style={styles.eventContent}>
          <Text style={styles.eventName}>Super Star Day</Text>
          <Text style={styles.eventLocation}>Meyerson Symphony Center</Text>
          <Text style={styles.contentText}>10:30 PM</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 0,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
  },
  section: {
    flexDirection: "row",
    alignItems: "center", // aligns items to the top
    marginBottom: 20,
    // backgroundColor: "rgb(5, 25, 30)",
    padding: 10,
    borderRadius: 5,
    display: "flex",
    width: "100%",
    gap: 6,
  },
  verticalBar: {
    width: 7,
    height: "100%", // reduced the height to match the desired look
    backgroundColor: "rgba(109, 41, 246, 1)", // color
    marginRight: 10,
    marginTop: 5, // added top margin for vertical alignment
  },
  verticalBarTwo: {
    width: 7,
    height: "100%", // reduced the height to match the desired look
    backgroundColor: "#FFA69E", // color
    marginRight: 10,
    marginTop: 5, // added top margin for vertical alignment
  },
  verticalBarThree: {
    width: 7,
    height: "100%", // reduced the height to match the desired look
    backgroundColor: "#F4D35E", // color
    marginRight: 10,
    marginTop: 5, // added top margin for vertical alignment
  },
  eventContent: {
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
  },
  contentText: {
    color: "#C9C4C4",
    fontSize: 14,
  },
});
