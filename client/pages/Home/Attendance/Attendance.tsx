import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  AttendanceItem,
  AttendanceStatus,
  generateAttendanceItems,
} from "models/AttendanceItem";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { CustomTheme, useCustomTheme } from "utils/theme";

import AttendanceDetails from "./AttendanceDetails";
import StudentListGrid from "./StudentList/StudentListGrid";
import StudentListStickyHeader from "./StudentList/StudentListStickyHeader";

type Props = {
  setScrollOffsetY: (y: number) => void;
};

export default function Attendance(props: Props) {
  const theme = useCustomTheme();
  const styles = makeStyles(theme);

  // --- Search + Attendance

  const [searchName, setSearchName] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [filterAttendance, setFilterAttendance] =
    useState<AttendanceStatus>(null);

  const [attendanceList, setAttendanceList] = useState<AttendanceItem[]>(
    generateAttendanceItems()
  );

  const [attendanceListView, setAttendanceListView] =
    useState<AttendanceItem[]>(attendanceList);

  useEffect(() => {
    onSearch();
  }, [filterAttendance]);

  const onSearch = () => {
    if (searchName.length === 0) {
      if (filterAttendance) {
        setAttendanceListView(
          attendanceList.filter((item) => item.status === filterAttendance)
        );
      } else {
        setAttendanceListView(attendanceList);
      }

      return;
    }

    if (filterAttendance) {
      setAttendanceListView(
        attendanceList.filter(
          (item) =>
            item.studentName.toLowerCase().includes(searchName.toLowerCase()) &&
            item.status === filterAttendance
        )
      );

      return;
    }

    setAttendanceListView(
      attendanceList.filter((item) =>
        item.studentName.toLowerCase().includes(searchName.toLowerCase())
      )
    );
  };

  // --- Bottom Sheet Handlers

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(
    () => [
      // "15%",
      "95%",
    ],
    []
  );

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((_index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);

  return (
    <ScrollView
      style={styles.bodyContent}
      onScroll={(event) => {
        props.setScrollOffsetY(event.nativeEvent.contentOffset.y);
      }}
      scrollEventThrottle={300}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          height: 1000,
        }}
      >
        <Text style={styles.textBold}>Attendance</Text>

        <Button title="Prototype" onPress={handlePresentModalPress} />

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={snapPoints.length - 1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={styles.modalBackground}
          handleIndicatorStyle={styles.modalHandleIndicator}
        >
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => {
                bottomSheetModalRef.current?.close();
              }}
            >
              <Text style={styles.textBold}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={{ ...styles.textBold, color: theme.colors.primary }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>

          <BottomSheetScrollView
            stickyHeaderIndices={[2]}
            style={[styles.modalContent]}
          >
            <AttendanceDetails />

            <View style={styles.modalDividerContainer}>
              <View style={styles.modalDivider} />
            </View>

            <StudentListStickyHeader
              searchName={searchName}
              setSearchName={setSearchName}
              searchMode={searchMode}
              setSearchMode={setSearchMode}
              filterAttendance={filterAttendance}
              setFilterAttendance={setFilterAttendance}
              onSearch={onSearch}
            />

            <StudentListGrid
              attendanceListView={attendanceListView}
              setAttendanceListView={setAttendanceListView}
              attendanceList={attendanceList}
              setAttendanceList={setAttendanceList}
            />
          </BottomSheetScrollView>
        </BottomSheetModal>
      </View>
    </ScrollView>
  );
}

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    bodyContent: {
      backgroundColor: "purple",
    },

    text: {
      color: theme.colors.normalText,
    },
    textBold: {
      color: theme.colors.normalText,
      fontSize: 18,
      fontWeight: "700",
    },
    textTitle: {
      color: "white",
      fontSize: 24,
      fontWeight: "700",
      marginVertical: 10,
    },

    modalBackground: {
      backgroundColor: theme.colors.modalBackground,
    },
    modalHandleIndicator: {
      backgroundColor: theme.colors.secondaryText,
    },

    modalContent: {
      flex: 1,
    },
    modalHeader: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingBottom: 4,
      backgroundColor: theme.colors.modalBackground,
    },

    modalDividerContainer: {
      alignItems: "center",
    },
    modalDivider: {
      width: "95%",
      borderBottomColor: "white",
      borderBottomWidth: 2,
      borderRadius: 20,
      marginVertical: 10,
    },
  });
