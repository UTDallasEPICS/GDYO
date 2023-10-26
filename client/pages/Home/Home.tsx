import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import React from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomTheme, useCustomTheme } from "utils/theme";

import { ProfilePic } from "./Profile";

enum Tab {
  ATTENDANCE = "attendance",
  EVENTS = "events",
}

const TAB_BAR_HEIGHT = 46;
const TOP_CONTAINER_HEIGHT = 200 + TAB_BAR_HEIGHT;

export default function Home() {
  const theme = useCustomTheme();
  const styles = makeStyles(theme);
  const insets = useSafeAreaInsets();

  const [tab, setTab] = useState<Tab>(Tab.ATTENDANCE);

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  // https://blog.logrocket.com/using-react-native-scrollview-create-sticky-header/
  const animatedHeaderHeight = scrollOffsetY.interpolate({
    inputRange: [0, TOP_CONTAINER_HEIGHT - TAB_BAR_HEIGHT],
    outputRange: [TOP_CONTAINER_HEIGHT, TAB_BAR_HEIGHT + insets.top],
    extrapolate: "clamp",
  });
  const animatedInfoOpacity = scrollOffsetY.interpolate({
    inputRange: [0, TOP_CONTAINER_HEIGHT - TAB_BAR_HEIGHT],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const onChangeTab = (newTab: Tab) => {
    Animated.timing(scrollOffsetY, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    setTab(newTab);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={[styles.topContainer, { height: "33%" }]}
        colors={[
          theme.colors.paperBackground,
          // theme.colors.paperBackgroundHighlight,
          theme.colors.paperBackgroundHighlight,
        ]}
        locations={[0.156, 0.9]}
      >
        <Animated.View style={[styles.info]}>
          <ProfilePic />
        </Animated.View>
        {/* </LinearGradient> */}
        <View style={styles.tabBar}>
          <Pressable
            style={
              tab === Tab.ATTENDANCE
                ? { ...styles.tabBarItem, ...styles.tabBarItemChosen }
                : styles.tabBarItem
            }
            onPress={() => {
              onChangeTab(Tab.ATTENDANCE);
            }}
          >
            <Text style={styles.text}>Attendance Tracker</Text>
          </Pressable>

          <Pressable
            style={
              tab === Tab.EVENTS
                ? { ...styles.tabBarItem, ...styles.tabBarItemChosen }
                : styles.tabBarItem
            }
            onPress={() => {
              onChangeTab(Tab.EVENTS);
            }}
          >
            <Text style={styles.text}>Managing Events</Text>
          </Pressable>
        </View>
      </LinearGradient>
      {/* </Animated.View> */}

      <React.Fragment>
        {tab === Tab.ATTENDANCE && (
          <ScrollView
            style={styles.bodyContent}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={300}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                height: 1000,
              }}
            >
              <Text style={styles.text}>Attendance</Text>
            </View>
          </ScrollView>
        )}

        {tab === Tab.EVENTS && (
          <ScrollView
            style={styles.bodyContent}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={300}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                height: 1000,
              }}
            >
              <Text style={styles.text}>Events</Text>
            </View>
          </ScrollView>
        )}
      </React.Fragment>
      {/* </LinearGradient> */}
    </View>
  );
}

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.text,
      fontSize: 16,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
    },

    topContainer: {
      backgroundColor: theme.colors.paperBackground,
      display: "flex",
    },

    info: {
      flex: 1,
      display: "flex",
    },

    tabBar: {
      height: TAB_BAR_HEIGHT,
      display: "flex",
      flexDirection: "row",
    },
    tabBarItem: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    tabBarItemChosen: {
      borderBottomColor: theme.colors.primary,
      borderBottomWidth: 4,
    },

    bodyContent: {
      backgroundColor: "purple",
    },
  });
