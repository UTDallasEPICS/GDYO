import { FontAwesome } from "@expo/vector-icons";
import { AttendanceItem, AttendanceStatus } from "models/AttendanceItem";
import { StyleSheet, Text, View } from "react-native";
import { Row, Col } from "react-native-easy-grid";
import { CustomTheme, useCustomTheme } from "utils/theme";

export const COLUMN_WIDTH = 78;

export const ATTENDANCE_COLORS = {
  [AttendanceStatus.ATTENDED]: "rgba(0, 179, 131, 1)",
  [AttendanceStatus.TARDY]: "rgba(249, 154, 14, 1)",
  [AttendanceStatus.MISSED]: "rgba(255, 0, 0, 1)",
};

type Props = {
  attendanceItem: AttendanceItem;
};

export default function RowItem(props: Props) {
  const theme = useCustomTheme();
  const styles = makeStyles(theme);

  return (
    <Row style={styles.row}>
      <Col style={[styles.col]}>
        <Text style={styles.text}>{props.attendanceItem.studentName}</Text>
      </Col>

      <Col style={[styles.col, styles.colCenter]}>
        {props.attendanceItem.status === AttendanceStatus.ATTENDED && (
          <FontAwesome
            name="check-square"
            size={24}
            color={ATTENDANCE_COLORS[AttendanceStatus.ATTENDED]}
          />
        )}

        {props.attendanceItem.status !== AttendanceStatus.ATTENDED && (
          <View style={styles.uncheckedBox} />
        )}
      </Col>

      <Col style={[styles.col, styles.colCenter]}>
        {props.attendanceItem.status === AttendanceStatus.TARDY && (
          <FontAwesome
            name="check-square"
            size={24}
            color={ATTENDANCE_COLORS[AttendanceStatus.TARDY]}
          />
        )}

        {props.attendanceItem.status !== AttendanceStatus.TARDY && (
          <View style={styles.uncheckedBox} />
        )}
      </Col>

      <Col style={[styles.col, styles.colCenter]}>
        {props.attendanceItem.status === AttendanceStatus.MISSED && (
          <FontAwesome
            name="check-square"
            size={24}
            color={ATTENDANCE_COLORS[AttendanceStatus.MISSED]}
          />
        )}

        {props.attendanceItem.status !== AttendanceStatus.MISSED && (
          <View style={styles.uncheckedBox} />
        )}
      </Col>
    </Row>
  );
}

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.normalText,
      fontSize: 16,
    },

    row: {
      minHeight: 80,
      borderBottomWidth: 1,
      borderColor: "white",
      alignItems: "center",
    },
    col: {
      paddingHorizontal: 4,
    },
    colCenter: {
      width: COLUMN_WIDTH,
      flexDirection: "row",
      justifyContent: "center",
    },

    uncheckedBox: {
      height: 21,
      width: 21,
      backgroundColor: theme.colors.iconGrey,
      borderRadius: 4,
    },
  });
