import { View, StyleSheet, Text } from "react-native";
import { CustomTheme, useCustomTheme } from "utils/theme";

export default function AttendanceDetails() {
  const theme = useCustomTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.root}>
      <Text style={styles.textTitle}>Attendance List</Text>
      <Text style={styles.textTime}>Time</Text>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.textDate}>Fri, Dec 22, 2023</Text>
        <Text style={styles.textClockTime}>2:00 PM - 3:30 PM</Text>
      </View>

      <Text style={styles.textLocation}>Location</Text>
      <Text style={styles.textAddress}>
        3630 Harry Hines Blvd, Dallas, TX 75219
      </Text>

      <Text style={styles.textInstructor}>Instructor</Text>
      <Text style={styles.textName}>Awesome Sauce</Text>
    </View>
  );
}

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    root: {
      alignItems: "center",
    },

    text: {
      color: theme.colors.normalText,
    },
    textBold: {
      color: theme.colors.normalText,
      fontSize: 18,
      fontWeight: "700",
    },
    textTitle: {
      color: "white",
      fontSize: 24,
      fontWeight: "700",
      marginVertical: 10,
    },

    textTime: {
      color: "white",
      fontSize: 18,
      fontWeight: "700",
      alignSelf: "flex-start",
      marginVertical: 5,
      marginLeft: 20,
    },
    dateTimeContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: 10,
    },
    textDate: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "700",
      alignSelf: "flex-start",
      marginVertical: 2,
      marginLeft: -45,
      marginRight: 50, // Add space between the date and time
    },
    textClockTime: {
      color: theme.colors.text,
      fontWeight: "700",
      fontSize: 16,
      // No marginLeft needed here since marginRight on textDate will handle spacing
    },
    textLocation: {
      color: "white",
      fontSize: 18,
      fontWeight: "700",
      alignSelf: "flex-start",
      marginVertical: 5,
      marginLeft: 20,
      paddingBottom: 5,
    },
    textAddress: {
      color: "#AFAFAF",
      fontSize: 16,
      fontWeight: "700",
      alignSelf: "flex-start",
      marginVertical: 2,
      marginLeft: 20,
      paddingBottom: 5,
    },
    textInstructor: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: "700",
      alignSelf: "flex-start",
      marginVertical: 5,
      marginLeft: 20,
      paddingBottom: 5,
    },
    textName: {
      color: "#AFAFAF",
      fontSize: 16,
      fontWeight: "700",
      alignSelf: "flex-start",
      marginVertical: 2,
      marginLeft: 20,
      paddingBottom: 5,
    },
  });
