// eslint-disable-next-line perfectionist/sort-imports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Auth0Provider } from "react-native-auth0";
import { Theme } from "utils/theme";

import TabNavigator from "./navigation/TabNavigator";
import LoginScreen from "./screens/LoginScreen";

import "expo-dev-client";

export type RootStackParamList = {
  TabNavigator: undefined;
  LoginScreen: { test?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Auth0Provider
      domain={"gdyo-auth.us.auth0.com"}
      clientId={"umzG2Jd5sVtOKAHmySVQ49z3olmUYnD0"}
    >
      <NavigationContainer theme={Theme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>

        <StatusBar style="light" />
      </NavigationContainer>
    </Auth0Provider>
  );
}
