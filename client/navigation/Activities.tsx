import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  View,
  Image,
  SafeAreaView,
  Animated,
  PanResponder,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

export default function Activites() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}> See what's upcoming, userName</Text>

      <View style={styles.account}>
        <Image
          source={{
            width: 30,
            height: 30,

            uri: "https://www.freeiconspng.com/thumbs/account-icon/account-icon-7.png",
          }}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.schedule1}> Master Class Schedule </Text>
        <Text style={styles.schedule2}>Practice Schedule </Text>
        <Text style={styles.schedule3}>Concert Schedule </Text>

        <View style={styles.mc}>
          <Text style={styles.schedule1textlight}> 5:30PM March 2</Text>
          <Text style={styles.schedule1textEvent}> Lesson w/ Instructor</Text>
          <Text style={styles.schedule1text}> GDYO </Text>
        </View>
        <View style={styles.pc}>
          <Text style={styles.schedule2textlight}>3:30 PM Feb 22 </Text>
          <Text style={styles.schedule2textEvent}>Practice w/ Instructor </Text>
          <Text style={styles.schedule2text}>GDYO </Text>

          <View style={styles.cc}>
            <Text style={styles.schedule3textlight}>7:30PM Apr 17 </Text>
            <Text style={styles.schedule3textEvent}>
              {" "}
              Philharmonic and Wind
            </Text>
            <Text style={styles.schedule3text}>Moody Performance Hall</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        // style={styles.buttonContainer1}
      >
        <View style={styles.fixToText}>
          <View style={styles.button1}>
            <Button
              color="#FFFFFF"
              title="Attendance"
              onPress={() => Alert.alert("Navigate to Attendance page")}
            />
          </View>

          <View style={styles.button2}>
            <Button
              color="#FFFFFF"
              title="Volunteering"
              onPress={() => Alert.alert("Navigate to Volunteer page")}
            />
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10579B",
    alignItems: "center",
    justifyContent: "center",
  },
  account: {
    paddingTop: 67,
    left: 145,
    bottom: 667,
  },
  box: {
    flex: 1,
    backgroundColor: "#5194D4",
    alignItems: "center",
    position: "absolute",
    width: 326,
    height: 510,
    borderColor: "white",
    borderWidth: 2,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
  },
  schedule1: {
    top: 0,
    textAlign: "center",
    position: "absolute",
    paddingTop: 12,
    paddingRight: 173,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 11,
    flexDirection: "row",
  },
  schedule1textlight: {
    top: 0,
    textAlign: "center",
    paddingTop: 12,
    paddingRight: 6,
    fontWeight: "normal",
    color: "#FFFFFF",
    fontSize: 11,
    flexDirection: "row",
    right: 6,
  },
  schedule1textEvent: {
    top: 0,
    textAlign: "center",
    paddingRight: 20,
    fontWeight: "normal",
    fontStyle: "italic",
    color: "#FFFFFF",
    fontSize: 11,
    flexDirection: "row",
    paddingTop: 10,
    left: 9,
  },
  schedule1text: {
    top: 0,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 11,
    right: 36,
  },
  mc: {
    backgroundColor: "#68B3FB",
    position: "absolute",
    paddingTop: 12,
    paddingRight: 173,
    alignItems: "center",
    width: 303,
    height: 95,
    top: 31,
    left: 8,

    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
  },

  schedule2: {
    textAlign: "center",
    position: "absolute",
    paddingBottom: 195,
    paddingTop: 195,
    paddingRight: 195,
    lineHeight: 19,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 11,
    flexDirection: "row",
  },
  schedule2textlight: {
    top: 0,
    textAlign: "left",
    paddingTop: 12,
    fontWeight: "normal",
    color: "#FFFFFF",
    fontSize: 11,
    flexDirection: "row",
    right: 12,
  },
  schedule2textEvent: {
    top: 0,
    textAlign: "left",
    paddingRight: 12,
    fontWeight: "normal",
    fontStyle: "italic",
    color: "#FFFFFF",
    fontSize: 11,
    flexDirection: "row",
    paddingTop: 10,
    left: 9,
  },
  schedule2text: {
    top: 0,
    textAlign: "left",
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 11,
    flexDirection: "row",
    paddingLeft: 11,
    right: 43,
  },
  mci: {
    paddingTop: 67,
    left: 145,
    bottom: 667,
  },
  pc: {
    backgroundColor: "#68B3FB",
    position: "absolute",
    paddingTop: 12,
    paddingRight: 173,
    alignItems: "center",
    width: 303,
    height: 95,
    top: 215,
    left: 8,

    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
  },
  schedule3: {
    textAlign: "center",
    position: "absolute",
    paddingBottom: 315,
    paddingTop: 386,
    paddingRight: 195,
    lineHeight: 19,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 11,
    flexDirection: "row",
  },
  schedule3textlight: {
    top: 0,
    textAlign: "left",
    paddingTop: 12,
    fontWeight: "normal",
    color: "#FFFFFF",
    fontSize: 11,
    flexDirection: "row",
    right: 9,
  },
  schedule3textEvent: {
    top: 0,
    textAlign: "left",
    fontWeight: "normal",
    fontStyle: "italic",
    color: "#FFFFFF",
    fontSize: 11,
    flexDirection: "row",
    paddingTop: 10,
    left: 8,
  },
  schedule3text: {
    top: 0,
    textAlign: "left",
    paddingLeft: 11,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 11,
    flexDirection: "row",
    right: 8,
    left: 2,
  },

  cc: {
    backgroundColor: "#68B3FB",
    position: "absolute",
    paddingTop: 10,
    paddingRight: 173,
    alignItems: "center",
    width: 303,
    height: 95,
    top: 194,
    left: 0,

    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
  },
  header: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 32,
    lineHeight: 39,
    marginBottom: 20,
    textAlign: "left",
    paddingRight: 5,
    flex: 1,
    flexDirection: "row",
  },

  fixToText: {
    textAlign: "left",
    flexDirection: "row",
    justifyContent: "center",
  },

  button1: {
    bottom: 38,
    right: 15,
    backgroundColor: "#68B3FB",
    borderColor: "white",
    borderWidth: 5,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
  },
  button2: {
    bottom: 38,
    backgroundColor: "#68B3FB",
    borderColor: "white",
    borderWidth: 5,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    left: 14,
  },
});
