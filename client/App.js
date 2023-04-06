import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Activites from './navigation/Activities'
import Attendance from './navigation/Attendance';
import Calendar from './navigation/Calendar';
import Menu from './navigation/Menu';
import Shop
 from './navigation/Shop';
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
        {<Tab.Screen name = "Shop" component = {Shop}/> }
        <Tab.Screen name = "Activities" component = {Activites} />
        <Tab.Screen name = "Attendance" component = {Attendance}/>
        {<Tab.Screen name = "Calendar" component = {Calendar}/> }
        <Tab.Screen name = "Menu" component = {Menu}/>
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
