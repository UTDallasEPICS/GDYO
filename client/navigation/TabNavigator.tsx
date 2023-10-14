import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useCustomTheme } from "utils/theme";

import CalendarScreen from "../pages/CalendarScreen/CalendarScreen";
import Home from "../pages/Home";

const Tab = createBottomTabNavigator();

type Props = NativeStackScreenProps<RootStackParamList, "TabNavigator">;

const TabNavigator = (props: Props) => {
  const theme = useCustomTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" color={color} size={size} />
          ),
        }}
      />

      {/* https://stackoverflow.com/questions/70884055/how-to-add-a-button-on-the-bottomtabnavigator-rather-than-navigating-to-a-screen */}
      <Tab.Screen
        name="Login"
        component={Home} // Any component works. Does not matter here.
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="login" color={color} size={size} />
          ),
          tabBarButton: (buttonProps) => (
            <Pressable
              style={buttonProps.style}
              onPress={() => {
                props.navigation.navigate("LoginScreen");
              }}
            >
              <View
                style={{
                  flex: 1,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    minWidth: 25,
                    opacity: 1,
                  }}
                >
                  <MaterialIcons
                    name="login"
                    color={theme.colors.secondaryText}
                    size={25}
                  />
                </View>
              </View>

              <Text style={{ color: theme.colors.secondaryText, fontSize: 10 }}>
                Login
              </Text>
            </Pressable>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
