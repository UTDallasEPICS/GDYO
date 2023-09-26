// eslint-disable-next-line perfectionist/sort-imports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Auth0Provider } from "react-native-auth0";

import LoginScreen from "./Screens/LoginScreen";
import TabNavigator from "./navigation/TabNavigator";

import "expo-dev-client";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Auth0Provider
      domain={"gdyo-auth.us.auth0.com"}
      clientId={"umzG2Jd5sVtOKAHmySVQ49z3olmUYnD0"}
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Auth0Provider>
  );
}
