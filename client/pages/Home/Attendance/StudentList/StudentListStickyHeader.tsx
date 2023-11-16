import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { AttendanceStatus } from "models/AttendanceItem";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Row, Col } from "react-native-easy-grid";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CustomTheme, useCustomTheme } from "utils/theme";

import { ATTENDANCE_COLORS, COLUMN_WIDTH } from "./RowItem";

type Props = {
  searchName: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
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
          {props.searchName.length === 0 && (
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
            onChangeText={(text) => {
              props.setSearchName(text);
            }}
            onSubmitEditing={() => {
              props.onSearch();
            }}
          />

          {props.searchName.length !== 0 && (
            <TouchableOpacity
              onPress={() => {
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

        <FontAwesome name="filter" size={32} color={theme.colors.iconGrey} />
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
