import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { CustomTheme, useCustomTheme } from "utils/theme";

type Props = {
  setScrollOffsetY: (y: number) => void;
};

export default function Attendance(props: Props) {
  const theme = useCustomTheme();
  const styles = makeStyles(theme);

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
        <Text style={styles.textBase}>Attendance</Text>
        <Button
          title="Prototype"
          onPress={() => {
            return;
          }}
        />
      </View>
    </ScrollView>
  );
}

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    bodyContent: {
      backgroundColor: "purple",
    },
    textBase: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: "700",
    },
  });
