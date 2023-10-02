import { StyleSheet, Text, View } from "react-native";
import { useCustomTheme } from "utils/theme";

export default function Home() {
  const theme = useCustomTheme();

  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.text }}>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
