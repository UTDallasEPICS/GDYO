import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Activites from './Activities'
import Attendance from './Attendance';
import Calendar from './Calendar';
import Menu from './Menu';
import Shop from './Shop';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
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
  );
};

export default TabNavigator;