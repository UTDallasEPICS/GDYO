import ProfilePic from "assets/profile_pic.png";
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomTheme, useCustomTheme } from "@/utils/theme";

export const PROFILE_CONTAINER_HEIGHT = 260;
const PROFILE_PIC_HEIGHT = 155;

export const ProfileContainer = () => {
  const theme = useCustomTheme();
  const styles = makeStyles(theme);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.rootContainer, { paddingTop: insets.top + 10 }]}>
      <View style={styles.imageContainer}>
        <Image
          source={ProfilePic}
          style={{
            marginTop: 10,
            width: PROFILE_PIC_HEIGHT,
            height: PROFILE_PIC_HEIGHT,
          }}
        />
        <Text style={[styles.textBase]}>Admin</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text
          style={[styles.textBase, styles.textShadow, styles.userNameText]}
          numberOfLines={2}
        >
          Awesome Sauce
        </Text>

        <Text style={[styles.textBase, styles.textShadow]} numberOfLines={2}>
          awesome@gmail.com
        </Text>

        <Text style={[styles.textBase]} numberOfLines={1}>
          (123) 456-7890
        </Text>
      </View>
    </View>
  );
};

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    rootContainer: {
      height: PROFILE_CONTAINER_HEIGHT,
      alignItems: "center",
      flexDirection: "row",

      paddingLeft: 10,
      paddingRight: 10,
    },

    imageContainer: {
      width: "45%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },

    infoContainer: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
    },

    textBase: {
      flexWrap: "wrap",
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
    textShadow: {
      textShadowOffset: { width: 1, height: 5 },
      textShadowColor: "rgba(0, 0, 0, 0.4)",
      textShadowRadius: 24,
    },

    userNameText: {
      color: theme.colors.primary,
      fontSize: 36,
      fontWeight: "700",
      alignItems: "center",
    },
  });
