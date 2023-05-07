import React from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoginSVG from '../assets/images/GDYO_Logo_Transparent.png';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', backgroundColor: '#10579B'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <Image source={LoginSVG} style={{ height: 200, width: 200 }}/>  
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#FFFFFF',
            marginTop: 20,
            marginBottom: 20,
          }}>
          Login
        </Text>

        <InputField
          label={'Email'}
          icon={
            <MaterialIcons
              name="email"
              size={20}
              color="#FFFFFF"
              style={{marginRight: 5, marginTop: 4}}
            />
          }
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          icon={
            <MaterialIcons
              name="lock"
              size={20}
              color="#FFFFFF"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => {}}
        />
          
        <CustomButton label={"Login"} onPress={() => {navigation.navigate('TabNavigator')}} />

        <Text style={{textAlign: 'center', color: '#FFFFFF', marginBottom: 20}}>
          OR
        </Text>

        <View>
          <CustomButton label={"Register"} onPress={() => {}} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
