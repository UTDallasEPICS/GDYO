import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useLinkProps } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

export default function Shop() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.rect}>
          <Text style={styles.gdyoShop}> GDYO Shop</Text>
        </View>
        <TouchableOpacity>
          <Icon name="shopping-cart" style={styles.icon}></Icon>
          <View style={styles.productsRow}>
            <Text style={styles.products}>Products</Text>
            <Text style={styles.loremIpsum}>3</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.buttonRow}>
          <Image
            source={require("../assets/gdyoshirt.jpeg")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
          <Image
            source={require("../assets/gdyogreenshirt.jpeg")}
            resizeMode="contain"
            style={styles.image2}
          ></Image>
        </View>
        <View style={styles.loremIpsum2Row}>
          <Text style={styles.loremIpsum2}>GDYO Maroon Hoodie{"\n"}$30</Text>
          <Text style={styles.loremIpsum3}>GDYO Green T-Shirt{"\n"}$30</Text>
        </View>
        <Image
          source={require("../assets/concertticket.png")}
          resizeMode="contain"
          style={styles.image3}
        ></Image>
        <Text style={styles.loremIpsum4}>GDYO Concert Ticket{"\n"}$30</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  rect: {
    width: 390,
    height: 119,
    backgroundColor: "#5194D4",
    marginTop: 119,
  },
  gdyoShop: {
    // fontFamily: 'Inter',
    color: "white",
    fontSize: 55,
    textAlign: "left",
    marginTop: 28,
    marginLeft: 7,
    fontWeight: "bold",
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 29,
    opacity: 0.41,
    marginTop: -169,
    marginLeft: 328,
  },
  products: {
    // fontFamily: 'roboto-700',
    color: "#121212",
    fontSize: 20,
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: "#121212",
    opacity: 0.52,
    fontSize: 16,
    marginLeft: 18,
  },
  productsRow: {
    height: 24,
    flexDirection: "row",
    marginTop: 204,
    marginLeft: 7,
    marginRight: 260,
  },
  button: {
    width: 180,
    height: 106,
    backgroundColor: "#E6E6E6",
  },
  image: {
    width: 133,
    height: 99,
    marginTop: 7,
    marginLeft: 24,
  },
  button2: {
    width: 180,
    height: 106,
    backgroundColor: "#E6E6E6",
    marginLeft: 8,
  },
  image2: {
    width: 133,
    height: 99,
    marginTop: 7,
    marginLeft: 23,
  },
  buttonRow: {
    height: 106,
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 7,
  },
  loremIpsum2: {
    // fontFamily: 'roboto-700',
    color: "#121212",
  },
  loremIpsum3: {
    // fontFamily: 'roboto-700',
    color: "#121212",
    marginLeft: 50,
  },
  loremIpsum2Row: {
    height: 34,
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 8,
    marginRight: 57,
  },
  button3: {
    width: 180,
    height: 106,
    backgroundColor: "#E6E6E6",
    marginTop: 33,
    marginLeft: 7,
  },
  image3: {
    width: 133,
    height: 99,
    marginTop: 7,
    marginLeft: 24,
  },
  loremIpsum4: {
    // fontFamily: 'roboto-700',
    color: "#121212",
    marginLeft: 7,
  },
});
