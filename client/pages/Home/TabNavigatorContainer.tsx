import React, { useRef } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { CustomTheme, useCustomTheme } from "utils/theme";

export const TAB_BAR_HEIGHT = 46;

export enum Tab {
  ATTENDANCE = "attendance",
  EVENTS = "events",
}

type Props = {
  tab: Tab;
  onChangeTab: (newTab: Tab) => void;
};

export default function TabNavigatorContainer(props: Props) {
  const theme = useCustomTheme();
  const styles = makeStyles(theme);
  const dimensions = useWindowDimensions();

  const scrollViewRef = useRef<ScrollView>();

  return (
    <View style={styles.tabBar}>
      <ScrollView ref={scrollViewRef} style={{ minWidth: "100%" }} horizontal>
        <Pressable
          style={[
            props.tab === Tab.ATTENDANCE
              ? { ...styles.tabBarItem, ...styles.tabBarItemChosen }
              : styles.tabBarItem,

            { width: dimensions.width / 2 },
          ]}
          onPress={() => {
            scrollViewRef.current?.scrollTo({ x: 0 });
            props.onChangeTab(Tab.ATTENDANCE);
          }}
        >
          <Text style={styles.textBase}>Attendance Tracker</Text>
        </Pressable>

        <Pressable
          style={[
            props.tab === Tab.EVENTS
              ? { ...styles.tabBarItem, ...styles.tabBarItemChosen }
              : styles.tabBarItem,

            { width: dimensions.width / 2 },
          ]}
          onPress={() => {
            scrollViewRef.current?.scrollTo({ x: dimensions.width / 2 });
            props.onChangeTab(Tab.EVENTS);
          }}
        >
          <Text style={styles.textBase}>Managing Events</Text>
        </Pressable>

        {/* <Pressable
          style={[
            props.tab === Tab.EVENTS
              ? { ...styles.tabBarItem, ...styles.tabBarItemChosen }
              : styles.tabBarItem,

            { width: dimensions.width / 2 },
          ]}
          onPress={() => {
            scrollViewRef.current?.scrollTo({ x: dimensions.width });
            props.onChangeTab(Tab.EVENTS);
          }}
        >
          <Text style={styles.textBase}>Managing Events</Text>
        </Pressable> */}
      </ScrollView>
    </View>
  );
}

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    tabBar: {
      height: TAB_BAR_HEIGHT,
      flexDirection: "row",
    },
    tabBarItem: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderBottomWidth: 4,
      borderBottomColor: "transparent",
    },
    tabBarItemChosen: {
      borderBottomColor: theme.colors.primary,
    },

    textBase: {
      color: theme.colors.normalText,
      fontSize: 18,
      fontWeight: "700",
    },
  });
