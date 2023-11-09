// imports go here.
import ProfilePic from "assets/profile_pic.png";
import react from "react";
import { View, Image, Text, StyleSheet, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { CustomTheme, useCustomTheme } from "utils/theme";

export const PROFILE_CONTAINER_HEIGHT = 260;
const PROFILE_PIC_HEIGHT = 155;

export const EventManagementList = () => {
  // JS code.
  const theme = useCustomTheme();
  const styles = makeStyles(theme);
  const insets = useSafeAreaInsets();
  // get number of events
  return (
    <View style={styles.eventContainer}>
      <View style={styles.eventArrow}></View>
      <View style={styles.MonthBox}>
        <Text>Dec</Text>
        <Text style={[{ fontSize: 40 }, { lineHeight: 43 }]}>30</Text>
      </View>
      <View style={styles.EventDetailBox}>
        <Text
          style={[styles.TextBase, { fontWeight: "normal" }, { fontSize: 13 }]}
        >
          8:00 PM
        </Text>
        <Text style={[styles.TextBase, { fontSize: 15 }]}>
          GDYO Season Opener
        </Text>
        <Text style={styles.TextBase}>Moody Performance Hall</Text>
      </View>
    </View>
  );
};

//helper functions(like styling or whatever).
const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    eventContainer: {
      flexDirection: "row",
      display: "flex",
      marginTop: "4%",
      height: PROFILE_CONTAINER_HEIGHT * 0.3,
      width: "100%",
      backgroundColor: theme.colors.primary,
    },
    MonthBox: {
      // flex: 1,
      height: "100%",
      width: "25%",
      alignItems: "center",
      justifyContent: "center",
    },
    EventDetailBox: {
      // flex: 2,
      paddingTop: 10,
      height: "100%",
      width: "100%",
    },
    eventArrow: {
      borderTopWidth: 38,
      borderTopColor: "transparent",
      borderLeftWidth: 40,
      borderLeftColor: "red",
      borderBottomWidth: 38,
      borderBottomColor: "transparent",
    },
    TextBase: {
      fontWeight: "bold",
      fontSize: 12,
    },
  });
