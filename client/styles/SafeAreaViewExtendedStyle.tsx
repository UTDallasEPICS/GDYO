import { StyleSheet, Platform, StatusBar } from "react-native";

// https://stackoverflow.com/questions/51289587/how-to-use-safeareaview-for-android-notch-devices

const SafeAreaViewExtendedStyle = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default SafeAreaViewExtendedStyle;
