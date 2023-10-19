import { AntDesign } from "@expo/vector-icons";
import { CalendarEvent } from "models/CalendarEvent";
import moment from "moment";
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
import { useSwipe } from "utils/hooks/useSwipe";
import { CustomTheme, useCustomTheme } from "utils/theme";

import EventItem from "./EventItem";

const EventSequenceColorsOnBottomView = [
  "rgb(109, 41, 246)",
  "rgb(255, 166, 158)",
  "rgb(244, 211, 94)",
];

type Props = {
  calendarScreenViewHeight: number;
  eventsOnDate: Record<string, CalendarEvent[]>;
  chosenDate: string;
  setChosenDate: React.Dispatch<React.SetStateAction<string>>;
};

export default function EventsBottomView(props: Props) {
  // min up/down scroll distance to trigger animation
  const offsetThrottle = 10;

  // --- Refs

  const scrollViewAnim = React.useRef(new Animated.Value(0)).current; // We will set value 0 or 1 only
  let prevOffset = React.useRef(0).current;
  // used to prevent any other animations during one animation
  let isAnimating = React.useRef(false).current;

  // --- Hooks

  const theme = useCustomTheme();
  const styles = makeStyles(theme);

  const onSwipeLeft = () => {
    props.setChosenDate(
      moment(props.chosenDate).add(1, "month").format("YYYY-MM-DD")
    );
  };

  const onSwipeRight = () => {
    props.setChosenDate(
      moment(props.chosenDate).add(-1, "month").format("YYYY-MM-DD")
    );
  };

  const {
    onTouchStart: extendedBackgroundTouchStart,
    onTouchEnd: extendedBackgroundTouchEnd,
  } = useSwipe(onSwipeLeft, onSwipeRight, 6);

  // --- States

  const [bottomViewDefaultHeight, setBottomViewDefaultHeight] = useState(0);
  const [bottomViewHeaderHeight, setBottomViewHeaderHeight] = useState(0);
  const [bottomViewListHeight, setBottomViewListHeight] = useState(0);
  const [isBottomViewExpanded, setIsBottomViewExpanded] = useState(false);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // https://stackoverflow.com/questions/72601597/increase-height-of-a-view-on-swipe-up-in-react-native-expo
    // https://stackoverflow.com/questions/36747541/finding-out-scroll-direction-in-react-native-listview-scrollview

    const currentOffset = e.nativeEvent.contentOffset.y;
    const diff = currentOffset - prevOffset;

    if (
      isAnimating || // Check is animating
      Math.abs(diff) < offsetThrottle // Check offset difference
    ) {
      prevOffset = Math.max(0, currentOffset);
      return;
    }

    prevOffset = Math.max(0, currentOffset);

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

  const events = props.eventsOnDate[props.chosenDate];

  return (
    <Fragment>
      <View
        style={{
          ...styles.extendedBackground,
        }}
        onLayout={({ nativeEvent }) => {
          setBottomViewDefaultHeight(nativeEvent.layout.height);
        }}
        onTouchStart={extendedBackgroundTouchStart}
        onTouchEnd={extendedBackgroundTouchEnd}
      />

      <Animated.View
        style={{
          ...styles.bottomSheet,

          // header height + inner content height + padding top + padding bottom + header margin bottom + WITHOUT extra space for scrolling
          maxHeight:
            bottomViewHeaderHeight + bottomViewListHeight + 12 + 16 + 14,

          height: scrollViewAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [
              bottomViewDefaultHeight,
              0.75 * props.calendarScreenViewHeight,
            ],
          }),
        }}
      >
        <View
          style={styles.bottomSheetHeader}
          onLayout={(event) => {
            setBottomViewHeaderHeight(event.nativeEvent.layout.height);
          }}
        >
          <TouchableOpacity
            style={styles.caretButton}
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
            />
          </TouchableOpacity>

          <Text style={styles.headerDate}>
            {moment(props.chosenDate).format("MMM D, YYYY")}
          </Text>
        </View>

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
            style={styles.bottomSheetListContent}
            onLayout={(event) => {
              setBottomViewListHeight(event.nativeEvent.layout.height);
            }}
          >
            <React.Fragment>
              {events &&
                events.length !== 0 &&
                events.map((event, index) => (
                  <EventItem
                    key={index}
                    barColor={
                      EventSequenceColorsOnBottomView[
                        index % EventSequenceColorsOnBottomView.length
                      ]
                    }
                    event={event}
                  />
                ))}

              {(!events || events.length === 0) && (
                <Text style={styles.noEvent}>No event on this day</Text>
              )}
            </React.Fragment>
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

      paddingTop: 12,
      paddingBottom: 16,
      paddingHorizontal: 20,

      display: "flex",
      alignItems: "center",
    },

    bottomSheetHeader: {
      display: "flex",
      alignItems: "flex-start",
      width: "100%",
      marginBottom: 14,
    },
    caretButton: {
      alignSelf: "center",
    },
    headerDate: {
      fontSize: 18,
      fontWeight: "700",
      color: "#C9C4C4",
    },

    bottomSheetListContent: {
      display: "flex",
      alignItems: "flex-start",
      gap: 24,
      flex: 1,
      marginBottom: 1, // Extra space for scrolling
    },
    noEvent: {
      color: "white",
      fontSize: 24,
      fontWeight: "500",
    },
  });
