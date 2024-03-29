import { AttendanceItem } from "@/models/AttendanceItem";
import { StyleSheet } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import { CustomTheme, useCustomTheme } from "@/utils/theme";

import StudentRowItem, { COLUMN_WIDTH } from "./StudentRowItem";

type Props = {
  attendanceListView: AttendanceItem[];
  setAttendanceListView: React.Dispatch<React.SetStateAction<AttendanceItem[]>>;

  attendanceList: AttendanceItem[];
  setAttendanceList: React.Dispatch<React.SetStateAction<AttendanceItem[]>>;
};

export default function StudentListGrid(props: Props) {
  const theme = useCustomTheme();
  const styles = makeStyles(theme);

  return (
    <Grid style={styles.grid}>
      <Row
        style={[
          styles.header,
          { borderWidth: 0, borderColor: "transparent", height: 0 },
        ]}
      >
        <Col style={styles.col}></Col>
        <Col style={[styles.col, styles.colCenter]}></Col>
        <Col style={[styles.col, styles.colCenter]}></Col>
        <Col style={[styles.col, styles.colCenter]}></Col>
      </Row>

      {props.attendanceListView.map((item, idx) => (
        <StudentRowItem
          key={idx}
          attendanceItem={item}
          attendanceList={props.attendanceList}
          setAttendanceList={props.setAttendanceList}
          attendanceListView={props.attendanceListView}
          setAttendanceListView={props.setAttendanceListView}
        />
      ))}
    </Grid>
  );
}

const makeStyles = (_theme: CustomTheme) =>
  StyleSheet.create({
    grid: {
      width: "100%",
    },
    header: {
      height: 48,
      alignItems: "center",
      borderBottomWidth: 1,
      borderColor: "white",
    },
    headerText: {
      fontSize: 17,
      fontWeight: "700",
      color: "white",
    },
    col: {
      paddingHorizontal: 4,
    },
    colCenter: {
      width: COLUMN_WIDTH,
      flexDirection: "row",
      justifyContent: "center",
    },
  });
