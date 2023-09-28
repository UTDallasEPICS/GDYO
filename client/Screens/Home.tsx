import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  const theme = useTheme();

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
