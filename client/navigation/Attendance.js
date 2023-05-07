import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Attendance() {
  return (
    <View style={styles.container}>
        
      {/* user profile icon image */}
      <Image style={{ 
          height: 50, 
          width: 50, 
          top: 0, 
          left: 140,
        }} 
        source={require('../assets/icon1.png')}
      />
    
      {/* Main Header */}
      <Text style={styles.header}>Scan for {'\n'}attendance, {'\n'}userName</Text> 

      {/* Header for upcoming classes rectangle */}
      <View style={styles.bigSquare1}>
        {<Text style={styles.classTimesText}>{'\t'}     Upcoming class times</Text>}
      </View>

      {/* Rectangle displaying 1st upcoming class date and time */}
      <View style={styles.dateTimeRectangle1}>
        {<Text style={styles.dateTimeText1}>Date: {'\t'}{'\t'}{'\t'}{'\t'} Time:</Text>}
      </View>

      {/* Rectangle displaying 2nd upcoming class date and time */}
      <View style={styles.dateTimeRectangle2}>
        {<Text style={styles.dateTimeText2}>Date: {'\t'}{'\t'}{'\t'}{'\t'} Time:</Text>}
      </View>

      {/* Rectangle displaying 3rd upcoming class date and time */}
      <View style={styles.dateTimeRectangle3}>
        {<Text style={styles.dateTimeText3}>Date: {'\t'}{'\t'}{'\t'}{'\t'} Time:</Text>}
      </View>

      {/* QR code button (attendance) */}
      <View style={styles.clickHereRectangle}>
        {<Text style={styles.clickHereText}>Click here to scan attendance QR code</Text>}
      </View>

      {/* Rectangle tracking total student hours amongst different sessions */}
      <View style={styles.bigSquare2}>
        {
          // Date rectangle and header
          <View style={styles.dateRectangle}>
          {<Text style={styles.dateRectangleText}>Date</Text>}
          </View>
        }
        {
          // Time rectangle and header
          <View style={styles.timeRectangle}>
          {<Text style={styles.timeRectangleText}>Time</Text>}
          </View>
        }
        {
          // Total hours rectangle and header
          <View style={styles.totalHoursRectangle}>
          {<Text style={styles.totalHoursRectangleText}> Total {'\n'}Hours</Text>}
          </View>
        }
        {
          // List displaying total student hours amongst different sessions
          <View style={styles.listRectangle}>
            {<View style={styles.listRectangleDivider1}/>}
            {<View style={styles.listRectangleDivider2}/>}
          </View>
        }
      </View> 
    <StatusBar style="auto"/>
    </View>
  );
}

// STYLES FOR THE VARIOUS RECTANGLES & TEXT DISPLAYED ON THE APPLICATION
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10579B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: { 
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
    position: 'absolute',
    top: 20,
    left: 20,
    margin: 16,
  },
  bigSquare1: {
    width: 315,
    height: 200,
    top: 40,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    backgroundColor: '#5194D4',
  },
  classTimesText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    position: 'absolute',
    top: -10,
    left: -5,
    margin: 16,
  },
  dateTimeRectangle1: {
    width: 290,
    height: 40,
    top: -125,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    backgroundColor: '#68B3FB',
  },
  dateTimeText1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    position: 'absolute',
    top: -5,
    left: 0,
    margin: 16,
  },
  dateTimeRectangle2: {
    width: 290,
    height: 40,
    top: -115,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    backgroundColor: '#68B3FB',
  },
  dateTimeText2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    position: 'absolute',
    top: -5,
    left: 0,
    margin: 16,
  },
  dateTimeRectangle3: {
    width: 290,
    height: 40,
    top: -105,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    backgroundColor: '#68B3FB',
  },
  dateTimeText3: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    position: 'absolute',
    top: -5,
    left: 0,
    margin: 16,
  },
  clickHereRectangle: {
    width: 315,
    height: 50,
    top: -50,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    backgroundColor: '#68B3FB',
  },
  clickHereText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 16,
  },
  bigSquare2: {
    width: 315,
    height: 200,
    top: -5,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    backgroundColor: '#5194D4',
  },
  dateRectangle: {
    width: 85,
    height: 40,
    top: 15,
    left: 20,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    backgroundColor: '#68B3FB',
  },
  dateRectangleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    position: 'absolute',
    top: -5,
    left: 10,
    margin: 16,
  },
  timeRectangle: {
    width: 85,
    height: 40,
    top: -25,
    left: 115,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    backgroundColor: '#68B3FB',
  },
  timeRectangleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    position: 'absolute',
    top: -5,
    left: 10,
    margin: 16,
  },
  totalHoursRectangle: {
    width: 85,
    height: 40,
    top: -65,
    left: 210,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    backgroundColor: '#68B3FB',
  },
  totalHoursRectangleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    position: 'absolute',
    top: -12.5,
    left: 7.5,
    margin: 16,
  },
  listRectangle: {
    width: 270,
    height: 110,
    top: -50,
    left: 22.5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#68B3FB',
  },
  listRectangleDivider1: {
    width: 1,
    height: 108,
    top: 0,
    left: 90,
    backgroundColor: 'white',
  },
  listRectangleDivider2: {
    width: 1,
    height: 108,
    top: -108,
    left: 180,
    backgroundColor: 'white',
  },
});
