import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
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
import StudentList from "./StudentList";

type Props = {
  setScrollOffsetY: (y: number) => void;
};

export default function Attendance(props: Props) {
  const theme = useCustomTheme();
  const styles = makeStyles(theme);

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(
    () => [
      // "15%",
      "90%",
    ],
    []
  );

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
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
          <BottomSheetScrollView
            stickyHeaderIndices={[0]}
            style={styles.modalContent}
          >
            <View>
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={() => {
                    bottomSheetModalRef.current?.close();
                  }}
                >
                  <Text style={styles.textBold}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text
                    style={{ ...styles.textBold, color: theme.colors.primary }}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <AttendanceDetails />

            <View style={styles.modalDivider} />

            <StudentList />
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
      backgroundColor: theme.colors.modalBackground,
    },

    modalDivider: {
      width: "95%",
      borderBottomColor: "white",
      borderBottomWidth: 2,
      borderRadius: 20,
      marginVertical: 10,
    },
  });
