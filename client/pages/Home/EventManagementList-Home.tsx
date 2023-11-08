// imports go here.
import ProfilePic from "assets/profile_pic.png";
import react from "react";
import { View, Image, Text, StyleSheet, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomTheme, useCustomTheme } from "utils/theme";

export const PROFILE_CONTAINER_HEIGHT = 260;
const PROFILE_PIC_HEIGHT = 155;

export const EventManagementList = () => {
  // JS code.
  const theme = useCustomTheme();
  const styles = makeStyles(theme);
  const insets = useSafeAreaInsets();

  return (
    // <View>
    <View style={styles.eventContainer}>
      <View style={styles.eventColor}>
        <View style={styles.MonthBox}>
          <Text>Dec</Text>
          <Text style={[{ fontSize: 40 }, { lineHeight: 43 }]}>30</Text>
        </View>
        <View style={styles.EventDetailBox}>
          <Text
            style={[
              styles.TextBase,

              { fontWeight: "normal" },
              { fontSize: 13 },
            ]}
          >
            8:00 PM
          </Text>
          <Text style={[styles.TextBase, styles.TextContainer]}>
            GDYO Season Opener
          </Text>
          <Text style={styles.TextBase}>Moody Performance Hall</Text>
        </View>
      </View>
    </View>
  );
};

//helper functions(like styling or whatever).
const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    eventColor: {
      flexDirection: "row",
      display: "flex",
      marginLeft: "10%",
      height: "100%",
      backgroundColor: theme.colors.primary,
    },
    eventContainer: {
      marginTop: "4%",
      height: PROFILE_CONTAINER_HEIGHT * 0.3,
      width: "100%",
      backgroundColor: "red",
      // width: 0,
      // height: 0,
      // borderTop: 25px solid transparent,
      // borderLeft: 50px solid #555,
      // border-bottom: 25px solid transparent,
    },
    TextBase: {
      fontWeight: "bold",
      fontSize: 12,
    },
    TextContainer: {
      // paddingTop: 30,

      fontSize: 15,
    },
    MonthBox: {
      height: "100%",
      width: "25%",
      //paddingLeft: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    EventDetailBox: {
      paddingTop: 10,

      height: "100%",
      width: "100%",
    },
  });
