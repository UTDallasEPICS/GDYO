import { AntDesign } from "@expo/vector-icons";
import React, { Fragment, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from "react-native";
import { CustomTheme, useCustomTheme } from "utils/theme";

type Props = {
  calendarScreenViewHeight: number;
};

export default function EventsBottomView(props: Props) {
  // min up/down scroll distance to trigger animation
  const offsetThrottle = 10;

  const scrollViewAnim = React.useRef(new Animated.Value(0)).current; // We will set value 0 or 1 only
  let prevOffset = React.useRef(0).current;
  // used to prevent any other animations during one animation
  let isAnimating = React.useRef(false).current;

  const theme = useCustomTheme();
  const styles = makeStyles(theme);

  const [bottomViewDefaultHeight, setBottomViewDefaultHeight] = useState(0);
  const [bottomViewInnerContentHeight, setBottomViewInnerContentHeight] =
    useState(0);
  const [isBottomViewExpanded, setIsBottomViewExpanded] = useState(false);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // https://stackoverflow.com/questions/72601597/increase-height-of-a-view-on-swipe-up-in-react-native-expo
    // https://stackoverflow.com/questions/36747541/finding-out-scroll-direction-in-react-native-listview-scrollview

    const currentOffset = e.nativeEvent.contentOffset.y;
    const diff = currentOffset - prevOffset;

    if (
      isAnimating || // Check is animating
      Math.abs(diff) < offsetThrottle // Check offset difference)
    ) {
      prevOffset = currentOffset;
      return;
    }

    prevOffset = currentOffset;

    // if (diff < 0) {
    //   // Scrolling up
    //   shrinkScrollView();
    //   return;
    // }

    if (diff >= 0) {
      // Scrolling down
      expandScrollView();
      return;
    }
  };

  const expandScrollView = () => {
    if (isAnimating) {
      return;
    }

    isAnimating = true;
    setIsBottomViewExpanded(true);

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
    if (isAnimating) {
      return;
    }

    isAnimating = true;
    setIsBottomViewExpanded(false);

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

          // inner content height + padding top + padding bottom + caret height + caret's margin bottom + WITHOUT extra space for scrolling
          maxHeight: bottomViewInnerContentHeight + 12 * 2 + 24.5 + 12,

          height: scrollViewAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [
              bottomViewDefaultHeight,
              0.75 * props.calendarScreenViewHeight,
            ],
          }),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (isBottomViewExpanded) {
              shrinkScrollView();
            } else {
              expandScrollView();
            }
          }}
        >
          <AntDesign
            name={isBottomViewExpanded ? "caretdown" : "caretup"}
            size={24}
            color="white"
            style={{ marginBottom: 12 }}
          />
        </TouchableOpacity>

        <ScrollView
          style={{
            flex: 1,
            width: "100%",
          }}
          scrollEventThrottle={100}
          onScrollEndDrag={(event) => {
            // Handle when scroll to top and scroll action ends => Shrink scroll view
            if (event.nativeEvent.contentOffset.y <= 0) {
              prevOffset = event.nativeEvent.contentOffset.y;
              shrinkScrollView();
              return;
            }
          }}
          onScroll={(event) => {
            onScroll(event);
          }}
        >
          <View
            style={styles.bottomSheetContent}
            onLayout={(event) => {
              setBottomViewInnerContentHeight(event.nativeEvent.layout.height);
            }}
          >
            {[
              "#1A4B9C",
              "#FC32F4",
              "#32FCC9",
              // "#FC8F32",
              // "#5432FC",
              // "#4CFC32",
              // "#FC3287",
              // "#32C2FC",
              // "#FCFC32",
              // "#C132FC",
              // // "#32FC86",
              // "#FC4B32",
              // "#3255FC",
              // "#90FC32",
              // "#FC32CB",
              // "#32FCF3",
              // "#FCB832",
              // "#7D32FC",
              // "#32FC42",
              // "#FC325D",
            ].map((color, i) => (
              <View
                key={i}
                style={{ backgroundColor: color, height: 60, width: "100%" }}
              >
                <Text>Test</Text>
              </View>
            ))}
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
      backgroundColor: theme.colors.paperBackground,
      // backgroundColor: "red",
    },
    bottomSheet: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,

      backgroundColor: theme.colors.paperBackgroundDark,

      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,

      paddingVertical: 12,
      paddingHorizontal: 20,

      display: "flex",
      alignItems: "center",
    },
    bottomSheetContent: {
      display: "flex",
      alignItems: "center",
      gap: 20,
      marginBottom: 1, // Extra space for scrolling
    },
  });
