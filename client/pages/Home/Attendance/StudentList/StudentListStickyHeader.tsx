import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { AttendanceStatus } from "@/models/AttendanceItem";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Row, Col } from "react-native-easy-grid";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CustomTheme, useCustomTheme } from "@/utils/theme";

import StudentListFilter from "./StudentListFilter";
import { ATTENDANCE_COLORS, COLUMN_WIDTH } from "./StudentRowItem";

type Props = {
  searchName: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;

  searchMode: boolean;
  setSearchMode: React.Dispatch<React.SetStateAction<boolean>>;

  filterAttendance: AttendanceStatus;
  setFilterAttendance: React.Dispatch<React.SetStateAction<AttendanceStatus>>;

  onSearch: () => void;
};

export default function StudentListStickyHeader(props: Props) {
  const theme = useCustomTheme();
  const styles = makeStyles(theme);

  return (
    <View style={[styles.sticky]}>
      <Text style={styles.textTitle}>Student Search</Text>

      <View style={styles.toolbar}>
        <View style={styles.searchBar}>
          {props.searchMode === false && (
            <FontAwesome
              name="search"
              size={24}
              color={theme.colors.textFieldPlaceholderText}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor={theme.colors.textFieldPlaceholderText}
            value={props.searchName}
            onFocus={() => {
              props.setSearchMode(true);
            }}
            onBlur={() => {
              props.setSearchMode(false);
            }}
            onChangeText={(text) => {
              props.setSearchName(text);
            }}
            onSubmitEditing={() => {
              props.onSearch();
            }}
          />

          {props.searchMode === true && (
            <TouchableOpacity
              onPressIn={() => {
                props.onSearch();
              }}
            >
              <Ionicons
                name="enter"
                size={24}
                color={theme.colors.normalText}
              />
            </TouchableOpacity>
          )}
        </View>

        <StudentListFilter
          filterAttendance={props.filterAttendance}
          setFilterAttendance={props.setFilterAttendance}
        />
      </View>

      <Row style={[styles.header]}>
        <Col style={styles.col}>
          <Text style={[styles.headerText]}>Student</Text>
        </Col>
        <Col style={[styles.col, styles.colCenter]}>
          <Text
            style={[
              styles.headerText,
              { color: ATTENDANCE_COLORS[AttendanceStatus.ATTENDED] },
            ]}
          >
            Attended
          </Text>
        </Col>

        <Col style={[styles.col, styles.colCenter]}>
          <Text
            style={[
              styles.headerText,
              { color: ATTENDANCE_COLORS[AttendanceStatus.TARDY] },
            ]}
          >
            Tardy
          </Text>
        </Col>

        <Col style={[styles.col, styles.colCenter]}>
          <Text
            style={[
              styles.headerText,
              { color: ATTENDANCE_COLORS[AttendanceStatus.MISSED] },
            ]}
          >
            Missed
          </Text>
        </Col>
      </Row>
    </View>
  );
}

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    sticky: {
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      backgroundColor: theme.colors.modalBackground,
    },

    textTitle: {
      color: "white",
      fontSize: 24,
      fontWeight: "700",
      marginVertical: 10,
    },

    toolbar: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 12,
    },

    searchBar: {
      width: "85%",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      borderRadius: 36,
      height: 48,
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: theme.colors.textFieldBackground,
    },

    input: {
      flex: 1,
      fontWeight: "700",
      fontSize: 18,
      color: "white",
      alignItems: "center",
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
