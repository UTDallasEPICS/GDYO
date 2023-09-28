import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

export default function Calendar() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.subView}>
        <Text style={{ color: theme.colors.text }}>Screen 1</Text>
      </View>

      <View style={styles.subView}>
        <Text style={{ color: theme.colors.text }}>Screen 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  subView: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
