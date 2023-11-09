import "expo-dev-client";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import queryString from "query-string";
import { useEffect } from "react";
import { Auth0Provider } from "react-native-auth0";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { report } from "utils/error";
import { Theme } from "utils/theme";

import TabNavigator from "./navigation/TabNavigator";
import LoginScreen from "./pages/LoginScreen";

export type RootStackParamList = {
  TabNavigator: undefined;
  LoginScreen: { test?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    // https://rapidapi.com/guides/query-parameters-fetch

    const queryParams = queryString.parse("");
    queryParams.test = "Test Value";

    console.log();
    console.log("--- API url:", process.env.EXPO_PUBLIC_API_URL);
    console.log("--- Query params:", queryParams);

    fetch(
      `${process.env.EXPO_PUBLIC_API_URL}?${queryString.stringify(
        queryParams
      )}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        try {
          const data = await res.json();
          console.log("--- Data:", data);
        } catch (err) {
          const text = await res.text();
          console.log("--- Text:", JSON.parse(text));
        }
      })
      .catch((err) => {
        report(err);
      });
  }, []);

  const post = () => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/post`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstParam: "yourValue",
        secondParam: "yourOtherValue",
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log();
        console.log("--- Post data:", data);
      })
      .catch((err) => {
        report(err);
      });
  };

  return (
    <Auth0Provider
      domain={"gdyo-auth.us.auth0.com"}
      clientId={"umzG2Jd5sVtOKAHmySVQ49z3olmUYnD0"}
    >
      <NavigationContainer theme={Theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="TabNavigator" component={TabNavigator} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
            </Stack.Navigator>

            <StatusBar style="light" />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </Auth0Provider>
  );
}
