import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Activites from './navigation/Activities'
import Attendance from './navigation/Attendance';
import Calendar from './navigation/Calendar';
import Menu from './navigation/Menu';
import { Ionicons } from '@expo/vector-icons';
import Shop from './navigation/Shop';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator
        screenOptions={{
          headerShown:false,
          headerStyle:
            {backgroundColor: 'white'},
          headerTitleStyle:
            { fontSize: 23, color: 'white'},
          tabBarStyle:
            {backgroundColor: 'white'},
          tabBarLabelStyle: {
            color: 'black'
          },
          
          }}
          
          >
        {<Tab.Screen name = "Shop" component = {Shop}
        options={{tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        ), }}
        
        /> }
        <Tab.Screen name = "Activities" component = {Activites}
        options={{tabBarLabel: 'Activities',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="body-outline" color={color} size={size} />
        ), }}
        />
        <Tab.Screen name = "Attendance" component = {Attendance}
        options={{tabBarLabel: 'Attendance',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="hand-left-outline" color={color} size={size} />
        ), }}
        
        />
        {<Tab.Screen name = "Calendar" component = {Calendar}
        options={{tabBarLabel: 'Calendar',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calendar-outline" color={color} size={size} />
        ), }}
        /> }
        <Tab.Screen name = "Menu" component = {Menu}
        options={{tabBarLabel: 'Menu',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="menu-outline" color={color} size={size} />
        ), }}
        />
      </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
