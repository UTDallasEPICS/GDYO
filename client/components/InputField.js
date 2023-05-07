import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          placeholderTextColor={'lightgrey'}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0, color: '#FFFFFF'}}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          placeholderTextColor={'lightgrey'}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0, color: '#FFFFFF'}}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: '#FFFFFF', fontWeight: '400'}}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
