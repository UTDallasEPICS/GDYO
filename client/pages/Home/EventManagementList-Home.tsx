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
      <View style={styles.eventColor}></View>
    </View>
  );
};

//helper functions(like styling or whatever).
const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    eventColor: {
      marginRight: "90%",
      height: "100%",
      backgroundColor: "red",
    },
    eventContainer: {
      marginTop: "4%",
      height: PROFILE_CONTAINER_HEIGHT * 0.3,
      width: "100%",
      backgroundColor: theme.colors.primary,
    },
  });
