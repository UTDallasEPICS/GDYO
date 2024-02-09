import { FontAwesome } from "@expo/vector-icons";
import { AttendanceStatus } from "@/models/AttendanceItem";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { CustomTheme, useCustomTheme } from "@/utils/theme";

import { ATTENDANCE_COLORS } from "./StudentRowItem";

type Props = {
  filterAttendance: AttendanceStatus;
  setFilterAttendance: React.Dispatch<React.SetStateAction<AttendanceStatus>>;
};

export default function StudentListFilter(props: Props) {
  const theme = useCustomTheme();
  const styles = makeStyles(theme);

  return (
    <Menu>
      <MenuTrigger>
        <TouchableOpacity>
          <FontAwesome
            name="filter"
            size={32}
            color={
              props.filterAttendance === AttendanceStatus.ATTENDED
                ? ATTENDANCE_COLORS.attended
                : props.filterAttendance === AttendanceStatus.TARDY
                ? ATTENDANCE_COLORS.tardy
                : props.filterAttendance === AttendanceStatus.MISSED
                ? ATTENDANCE_COLORS.missed
                : theme.colors.iconGrey
            }
          />
        </TouchableOpacity>
      </MenuTrigger>

      <MenuOptions customStyles={{ optionsContainer: styles.menu }}>
        <Text style={styles.menuOptionTitle}>Filter By</Text>

        <MenuOption
          customStyles={{
            optionWrapper: [
              styles.optionWrapper,
              props.filterAttendance === AttendanceStatus.ATTENDED &&
                styles.optionWrapperChosen,
            ],
          }}
          onSelect={() => {
            if (props.filterAttendance === AttendanceStatus.ATTENDED) {
              props.setFilterAttendance(null);
            } else {
              props.setFilterAttendance(AttendanceStatus.ATTENDED);
            }
          }}
        >
          <View
            style={[
              styles.optionBox,
              { backgroundColor: ATTENDANCE_COLORS.attended },
            ]}
          />
          <Text
            style={[styles.optionText, { color: ATTENDANCE_COLORS.attended }]}
          >
            Attended
          </Text>
        </MenuOption>

        <MenuOption
          customStyles={{
            optionWrapper: [
              styles.optionWrapper,
              props.filterAttendance === AttendanceStatus.TARDY &&
                styles.optionWrapperChosen,
            ],
          }}
          onSelect={() => {
            if (props.filterAttendance === AttendanceStatus.TARDY) {
              props.setFilterAttendance(null);
            } else {
              props.setFilterAttendance(AttendanceStatus.TARDY);
            }
          }}
        >
          <View
            style={[
              styles.optionBox,
              { backgroundColor: ATTENDANCE_COLORS.tardy },
            ]}
          />
          <Text style={[styles.optionText, { color: ATTENDANCE_COLORS.tardy }]}>
            Tardy
          </Text>
        </MenuOption>

        <MenuOption
          customStyles={{
            optionWrapper: [
              styles.optionWrapper,
              { marginBottom: 0 },
              props.filterAttendance === AttendanceStatus.MISSED &&
                styles.optionWrapperChosen,
            ],
          }}
          onSelect={() => {
            if (props.filterAttendance === AttendanceStatus.MISSED) {
              props.setFilterAttendance(null);
            } else {
              props.setFilterAttendance(AttendanceStatus.MISSED);
            }
          }}
        >
          <View
            style={[
              styles.optionBox,
              { backgroundColor: ATTENDANCE_COLORS.missed },
            ]}
          />
          <Text
            style={[styles.optionText, { color: ATTENDANCE_COLORS.missed }]}
          >
            Missed
          </Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    menu: {
      backgroundColor: theme.colors.paperBackground,
      padding: 12,
      borderRadius: 10,
    },

    menuOptionTitle: {
      marginBottom: 10,
      color: "white",
      fontSize: 18,
      fontWeight: "700",
    },

    optionWrapper: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 4,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    optionWrapperChosen: {
      backgroundColor: theme.colors.paperBackgroundDark,
      borderRadius: 4,
    },

    optionBox: {
      height: 20,
      width: 20,
      borderRadius: 5,
    },

    optionText: {
      fontSize: 16,
      color: "white",
      fontWeight: "500",
    },
  });
