import { View, StyleSheet, Text } from "react-native";
import { CustomTheme, useCustomTheme } from "utils/theme";

export default function AttendanceDetails() {
  const theme = useCustomTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.root}>
      <Text style={styles.textTitle}>Attendance List</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.text}>Part 1</Text>
      </View>
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

    infoContainer: {
      height: 500,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  });
