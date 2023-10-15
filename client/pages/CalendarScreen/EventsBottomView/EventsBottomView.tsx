import React, { Fragment, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { CustomTheme, useCustomTheme } from "utils/theme";

import EventsItem from "./EventsItem";

export default function EventsBottomView() {
  // min time between scroll events (in milliseconds)
  const minScrollEventThrottle = 100;

  // min up/down scroll distance to trigger animation
  const offsetThrottle = 10;

  const scrollViewAnim = React.useRef(new Animated.Value(0)).current; // We will set value 0 or 1 only
  let prevOffset = React.useRef(0).current;
  // used to throttle scroll events
  let lastScrollEventDateTime = React.useRef(Date.now()).current;
  // used to prevent any other animations during one animation
  let isAnimating = React.useRef(false).current;

  const theme = useCustomTheme();
  const styles = makeStyles(theme);

  const [bottomViewDefaultHeight, setBottomViewDefaultHeight] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // https://stackoverflow.com/questions/72601597/increase-height-of-a-view-on-swipe-up-in-react-native-expo
    // https://stackoverflow.com/questions/36747541/finding-out-scroll-direction-in-react-native-listview-scrollview

    const currentOffset = e.nativeEvent.contentOffset.y;
    const diff = currentOffset - prevOffset;

    if (
      Date.now() - lastScrollEventDateTime < minScrollEventThrottle || // Prevent too many events happening at once. Throttling by time between scroll activations.
      Math.abs(diff) < offsetThrottle || // Check offset difference
      isAnimating // Check is animating
    ) {
      // console.log('throttling!')
      prevOffset = currentOffset;
      return;
    }

    lastScrollEventDateTime = Date.now();
    prevOffset = currentOffset;

    if (diff < 0) {
      // Scrolling up
      shrinkScrollView();
    } else {
      // Scrolling down
      expandScrollView();
    }
  };

  const expandScrollView = () => {
    // console.log("--- Expand!");

    if (isAnimating) {
      return;
    }

    isAnimating = true;
    Animated.timing(scrollViewAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start((res) => {
      if (res.finished) {
        isAnimating = false;
      }
    });
  };

  const shrinkScrollView = () => {
    // console.log("--- Shrink!");

    if (isAnimating) {
      return;
    }

    isAnimating = true;
    Animated.timing(scrollViewAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start((res) => {
      if (res.finished) {
        isAnimating = false;
      }
    });
  };

  return (
    <Fragment>
      <View
        style={styles.extendedBackground}
        onLayout={({ nativeEvent }) => {
          setBottomViewDefaultHeight(nativeEvent.layout.height);
        }}
      />

      <Animated.View
        style={{
          ...styles.bottomSheet,

          height: scrollViewAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [
              bottomViewDefaultHeight,
              bottomViewDefaultHeight + 100,
            ],
          }),
        }}
      >
        <Text style={{ fontWeight: "700", color: "#C9C4C4" }}>
          Oct 15, 2023
        </Text>
        <ScrollView
          style={{
            flex: 1,
          }}
          onScroll={(event) => {
            onScroll(event);
          }}
        >
          <View style={styles.bottomSheetContent}>
            {/* {[
              "#735BF1",
              "#FC32F4",
              "#32FCC9",
              "#FC8F32",
              "#5432FC",
              "#4CFC32",
              "#FC3287",
              "#32C2FC",
              "#FCFC32",
              "#C132FC",
              "#32FC86",
              "#FC4B32",
              "#3255FC",
              "#90FC32",
              "#FC32CB",
              "#32FCF3",
              "#FCB832",
              "#7D32FC",
              "#32FC42",
              "#FC325D",
            ].map((color, i) => (
              <View
                key={i}
                style={{ backgroundColor: color, height: 60, width: "100%" }}
              >
                <Text>TestingText</Text>
              </View>
            ))} }*/}
            <EventsItem />
          </View>
        </ScrollView>
      </Animated.View>
    </Fragment>
  );
}

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    extendedBackground: {
      flex: 1,
      width: "100%",
      // backgroundColor: theme.colors.paperBackground,
      backgroundColor: "red",
    },
    bottomSheet: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,

      backgroundColor: theme.colors.paperBackgroundDark,

      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,

      paddingVertical: 24,
      paddingHorizontal: 26,
    },
    bottomSheetContent: {
      display: "flex",
      alignItems: "center",
      gap: 20,
    },
  });
