import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from "react-native";
import { useAuth0 } from "react-native-auth0";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import LoginSVG from "@/assets/images/GDYO_Logo_Transparent.png";

import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

const LoginScreen = ({ navigation }) => {
  const { authorize, clearSession, user, error, isLoading } = useAuth0();

  const onLogin = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log("Log out cancelled");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  const loggedIn = user !== undefined && user !== null;

  // return (
  //   <View style={styles.container}>
  //     {loggedIn && <Text>You are logged in as {user.name}</Text>}
  //     {!loggedIn && <Text>You are not logged in</Text>}
  //     {error && <Text>{error.message}</Text>}

  //     <Button
  //       onPress={loggedIn ? onLogout : onLogin}
  //       title={loggedIn ? "Log Out" : "Log In"}
  //     />
  //   </View>
  // );

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#10579B" }}
    >
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image source={LoginSVG} style={{ height: 200, width: 200 }} />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#FFFFFF",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          Login
        </Text>

        <InputField
          label={"Email"}
          icon={
            <MaterialIcons
              name="email"
              size={20}
              color="#FFFFFF"
              style={{ marginRight: 5, marginTop: 4 }}
            />
          }
          keyboardType="email-address"
        />

        <InputField
          label={"Password"}
          icon={
            <MaterialIcons
              name="lock"
              size={20}
              color="#FFFFFF"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => {
            //
          }}
        />

        <CustomButton
          label={"Login"}
          onPress={() => {
            navigation.navigate("TabNavigator");
          }}
        />

        <Text
          style={{ textAlign: "center", color: "#FFFFFF", marginBottom: 20 }}
        >
          OR
        </Text>

        <View>
          <CustomButton
            label={"Register"}
            onPress={() => {
              //
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

export default LoginScreen;
