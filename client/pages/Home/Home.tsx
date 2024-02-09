import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import React from "react";
import { Animated, Easing, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomTheme, useCustomTheme } from "@/utils/theme";

import Attendance from "./Attendance/Attendance";
import { EventList } from "./EventList";
import { PROFILE_CONTAINER_HEIGHT, ProfileContainer } from "./ProfileContainer";
import TabNavigatorContainer, {
  TAB_BAR_HEIGHT,
  Tab,
} from "./TabNavigatorContainer";

const TOP_CONTAINER_HEIGHT = PROFILE_CONTAINER_HEIGHT + TAB_BAR_HEIGHT;

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
    <View style={styles.rootContainer}>
      <Animated.View
        style={[styles.topContainer, { height: animatedHeaderHeight }]}
      >
        <LinearGradient
          style={{ flex: 1 }}
          colors={[
            theme.colors.paperBackground,
            theme.colors.paperBackgroundHighlight,
          ]}
          locations={[0.156, 0.9]}
        >
          <Animated.View
            style={[
              styles.profileContainerWrapper,
              { opacity: animatedInfoOpacity },
            ]}
          >
            <ProfileContainer />
          </Animated.View>

          <TabNavigatorContainer tab={tab} onChangeTab={onChangeTab} />
        </LinearGradient>
      </Animated.View>

      <React.Fragment>
        {tab === Tab.ATTENDANCE && (
          <Attendance
            setScrollOffsetY={(y) => {
              scrollOffsetY.setValue(y);
            }}
          />
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
              <EventList></EventList>
              {/* <Text style={styles.textBase}>Events</Text> */}
            </View>
          </ScrollView>
        )}
      </React.Fragment>
    </View>
  );
}

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    rootContainer: {
      flexDirection: "column",
      flex: 1,
    },

    topContainer: {
      backgroundColor: theme.colors.paperBackground,
    },

    profileContainerWrapper: {
      flex: 1,
      paddingBottom: 20,
    },

    bodyContent: {
      backgroundColor: "black",
    },
    textBase: {
      color: theme.colors.normalText,
      fontSize: 18,
      fontWeight: "700",
    },
  });
