// imports go here.

import { View, Text, StyleSheet } from "react-native";
import { CustomTheme, useCustomTheme } from "utils/theme";

export const PROFILE_CONTAINER_HEIGHT = 260;

type Props = {
  date: number;
  month: string;
  time: string;
  name: string;
  place: string;
  color: string;
};

export const EventItem = (props: Props) => {
  // JS code.
  const theme = useCustomTheme();
  const styles = makeStyles(theme);

  // get number of events
  return (
    <View style={styles.eventContainer}>
      <View
        style={[styles.eventArrow, { borderLeftColor: props.color }]}
      ></View>
      <View style={styles.MonthBox}>
        <Text style={{ fontSize: 20 }}>{props.month}</Text>
        <Text style={[{ fontSize: 40, lineHeight: 43 }]}>{props.date}</Text>
      </View>
      <View style={styles.EventDetailBox}>
        <Text
          style={[
            styles.TextBase,
            { fontWeight: "normal", fontSize: 15, paddingTop: "1%" },
          ]}
        >
          {props.time}
        </Text>
        <Text numberOfLines={1} style={[styles.TextBase, { fontSize: 20 }]}>
          {props.name}
        </Text>
        <Text numberOfLines={1} style={[styles.TextBase, { fontSize: 15 }]}>
          {props.place}
        </Text>
      </View>
    </View>
  );
};

//helper functions(like styling or whatever).
const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    eventContainer: {
      flexDirection: "row",
      display: "flex",
      marginTop: "4%",
      height: PROFILE_CONTAINER_HEIGHT * 0.3,
      width: "100%",
      backgroundColor: theme.colors.primary,
      // borderLeftColor:
    },
    MonthBox: {
      // flex: 1,
      height: "100%",
      width: "25%",
      alignItems: "center",
      justifyContent: "center",
    },
    EventDetailBox: {
      // flex: 2,
      paddingTop: "0.5%",
      height: "100%",
      flex: 1,
    },
    eventArrow: {
      borderTopWidth: 38,
      borderTopColor: "transparent",
      borderLeftWidth: 40,
      borderLeftColor: "red",
      borderBottomWidth: 38,
      borderBottomColor: "transparent",
    },
    TextBase: {
      fontWeight: "bold",
      fontSize: 12,
      // width: 100%
    },
  });
