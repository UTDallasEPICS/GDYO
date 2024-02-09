import { FontAwesome } from "@expo/vector-icons";
import { AttendanceItem, AttendanceStatus } from "@/models/AttendanceItem";
import { StyleSheet, Text } from "react-native";
import { Row, Col } from "react-native-easy-grid";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CustomTheme, useCustomTheme } from "@/utils/theme";

export const COLUMN_WIDTH = 90;

export const ATTENDANCE_COLORS = {
  [AttendanceStatus.ATTENDED]: "rgba(0, 179, 131, 1)",
  [AttendanceStatus.TARDY]: "rgba(249, 154, 14, 1)",
  [AttendanceStatus.MISSED]: "rgba(255, 0, 0, 1)",
};

type Props = {
  attendanceItem: AttendanceItem;

  attendanceList: AttendanceItem[];
  setAttendanceList: React.Dispatch<React.SetStateAction<AttendanceItem[]>>;

  attendanceListView: AttendanceItem[];
  setAttendanceListView: React.Dispatch<React.SetStateAction<AttendanceItem[]>>;
};

export default function StudentRowItem(props: Props) {
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
          <TouchableOpacity
            onPressIn={() => {
              const newListView = props.attendanceListView.map((item) => {
                if (item.studentId !== props.attendanceItem.studentId) {
                  return item;
                }
                return { ...item, status: AttendanceStatus.ATTENDED };
              });
              props.setAttendanceListView(newListView);

              const newList = props.attendanceList.map((item) => {
                if (item.studentId !== props.attendanceItem.studentId) {
                  return item;
                }
                return { ...item, status: AttendanceStatus.ATTENDED };
              });
              props.setAttendanceList(newList);
            }}
            style={styles.uncheckedBox}
          />
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
          <TouchableOpacity
            onPressIn={() => {
              const newListView = props.attendanceListView.map((item) => {
                if (item.studentId !== props.attendanceItem.studentId) {
                  return item;
                }
                return { ...item, status: AttendanceStatus.TARDY };
              });
              props.setAttendanceListView(newListView);

              const newList = props.attendanceList.map((item) => {
                if (item.studentId !== props.attendanceItem.studentId) {
                  return item;
                }
                return { ...item, status: AttendanceStatus.TARDY };
              });
              props.setAttendanceList(newList);
            }}
            style={styles.uncheckedBox}
          />
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
          <TouchableOpacity
            onPressIn={() => {
              const newListView = props.attendanceListView.map((item) => {
                if (item.studentId !== props.attendanceItem.studentId) {
                  return item;
                }
                return { ...item, status: AttendanceStatus.MISSED };
              });
              props.setAttendanceListView(newListView);

              const newList = props.attendanceList.map((item) => {
                if (item.studentId !== props.attendanceItem.studentId) {
                  return item;
                }
                return { ...item, status: AttendanceStatus.MISSED };
              });
              props.setAttendanceList(newList);
            }}
            style={styles.uncheckedBox}
          />
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
