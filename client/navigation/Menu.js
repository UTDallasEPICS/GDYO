import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert, View, Image, SafeAreaView } from 'react-native';


export default function Menu() {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.mc} > 
       <Image style={styles.account}source={{
        width: 30,
        height: 30, 
       
        uri:"https://www.freeiconspng.com/thumbs/account-icon/account-icon-7.png"}
      }
       />  
        <Text style = {styles.schedule1textlight}> John Doe</Text>
    
    </View> 
    <View style={styles.mcc} > 
        { <Text style = {styles.directory}> Directory </Text>
         }
         
    </View> 
    <TouchableOpacity onPress={() => Alert.alert('Access to Directory')}>
      <View style={styles.magnifyingGlass}>
      <View style={styles.magnifyingGlassCircle} />
      <View style={styles.magnifyingGlassStick} />
    </View>
    </TouchableOpacity>
    <View style={styles.mcc2} > 
        { <Text style = {styles.settings}> Settings </Text>
         }
    </View>
    <TouchableOpacity onPress={() => Alert.alert('Access to Settings')}>
      <View style={styles.eightPointBurst}>
      <View style={styles.eightPointBurst20} />
      <View style={styles.eightPointBurst155} />
    </View>
    </TouchableOpacity>

    </SafeAreaView>
    
        );
      }
      
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#10579B',
          alignItems: 'center',
          justifyContent: 'center',
        
        },
  account: {
      top: 5, 
      right: 76,
      bottom: 543, 
        },
  
        schedule1textlight: {
          top: 0,
          textAlign: 'center',
          top: -25,
            fontWeight: 'bold',
            color: '#FFFFFF',
            fontSize: 11, 
            flexDirection: 'row', 
            right: 26,
          },

          mc: {
            backgroundColor: "#68B3FB",
            position: 'absolute',
            paddingTop: 12,
            paddingRight: 173,
            alignItems: 'center',
            width: 383,
            height: 65,
            top: 97,
            left: 26, 
            borderTopLeftRadius: 11,
            borderTopRightRadius: 11,
            borderBottomLeftRadius: 11,
            borderBottomRightRadius: 11, 
          },
          mcc: {
            backgroundColor: "#68B3FB",
            position: 'absolute',
            alignItems: 'center',
            width: 50,
            height: 50,
            top: '25%',
            left: 26, 
            borderTopLeftRadius: 11,
            borderTopRightRadius: 11,
            borderBottomLeftRadius: 11,
            borderBottomRightRadius: 11, 
          },
        magnifyingGlass: {
          top: -224,
            left: -168, 
           
        },
        magnifyingGlassCircle: {
          width: 15,
          height: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "white",
        },
        magnifyingGlassStick: {
          position: "absolute",
          right: -7,
          bottom: -6,
          backgroundColor: "white",
          borderWidth: -1, 
          borderColor: "white",
          width: 10,
          height: 6,
          transform: [{ rotate: "45deg" }],
        },
        directory: {
            fontWeight: 'normal',
            color: '#FFFFFF',
            fontSize: 11, 
            flexDirection: 'row', 
          top: '82%',
            left: 1,
        },
        mcc2: {
          backgroundColor: "#68B3FB",
          position: 'absolute',
          alignItems: 'center',
          width: 50,
          height: 50,
          top: '25%',
          left: 128, 
          borderTopLeftRadius: 11,
          borderTopRightRadius: 11,
          borderBottomLeftRadius: 11,
          borderBottomRightRadius: 11, 
        },
    settings: {
    fontWeight: 'normal',
    color: '#FFFFFF',
            fontSize: 11, 
            flexDirection: 'row', 
          top: '108%',
            left: 0,
        },

    eightPointBurst: {
        top: -238,
        left: -62, 
      },
    eightPointBurst20: {
      width: 20,
      height: 20,
      backgroundColor: "white",
      transform: [{ rotate: "20deg" }],
    },
    eightPointBurst155: {
      width: 20,
      height: 20,
      position: "absolute",
      backgroundColor: "white",
      top: 0,
      left: 0,
      transform: [{ rotate: "155deg" }],
  },
      });