import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { CustomTheme, useCustomTheme } from "utils/theme";

export const ProfilePic = () => {
  const theme = useCustomTheme();
  const styles = makeStyles(theme);

  return (
    <View style={{ flexDirection: "row", flex: 2, alignItems: "flex-start" }}>
      <View
        style={{
          padding: 35,
          paddingLeft: 30,
          borderColor: "white",
          borderStyle: "solid",
        }}
      >
        <Image
          source={require("./profile_pic.png")}
          style={{
            width: 155,
            height: 155,
            paddingTop: 30,
            borderColor: "white",
          }}
        />
        <Text style={[styles.text]}>{"Admin"}</Text>
      </View>
      <View style={{ padding: 15, paddingTop: "10%" }}>
        <Text style={[styles.text, styles.textAlign, styles.userName]}>
          {"Awesome\nSauce"}
        </Text>
        <View style={{ paddingTop: 10 }}>
          <Text style={[styles.text, styles.textAlign]}>
            {"awesome@gmail.com"}
          </Text>
          <View style={{ paddingTop: 5 }}></View>
          <Text style={[styles.text]}>{"(123) 456-7890"}</Text>
        </View>
      </View>
      {/* </LinearGradient> */}
    </View>
  );
};

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    userName: {
      textAlign: "center",
      color: theme.colors.primary,
      fontSize: 35,
      fontWeight: "bold",
      alignItems: "center",
    },
    container: {
      height: 700,
      flex: 1,
      backgroundColor: "white",
    },
    text: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
    textAlign: {
      textShadowOffset: { width: 1, height: 5 },
      textShadowColor: "rgba(0, 0, 0, 0.4)",
      textShadowRadius: 20,
    },
  });
