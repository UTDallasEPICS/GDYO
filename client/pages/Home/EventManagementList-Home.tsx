// imports go here.
import ProfilePic from "assets/profile_pic.png";
import react from "react";
import { View, Image, Text, StyleSheet } from "react-native";
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
    <View>
      <View style={styles.textBase}>
        <Text>hbdfuhsb</Text>
      </View>
    </View>
  );
};

//helper functions(like styling or whatever).
const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    rootContainer: {
      height: PROFILE_CONTAINER_HEIGHT,
      alignItems: "center",
      flexDirection: "row",

      paddingLeft: 10,
      paddingRight: 10,
    },
    textBase: {
      width: 45,
      color: "green",
      backgroundColor: "yellow",
      fontSize: 20,
      //paddingLeft: 19,
    },
    imageContainer: {
      width: 45,
      height: 30,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  });
