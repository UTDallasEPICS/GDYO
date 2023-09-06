import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";

type Props = {
  label: string;
  icon: JSX.Element;
  inputType?: string;
  keyboardType?: KeyboardTypeOptions;
  fieldButtonLabel?: string;
  fieldButtonFunction?: () => void;
};

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "#FFFFFF",
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}
    >
      {icon}
      {inputType == "password" ? (
        <TextInput
          placeholder={label}
          placeholderTextColor={"lightgrey"}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, color: "#FFFFFF" }}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          placeholderTextColor={"lightgrey"}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, color: "#FFFFFF" }}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: "#FFFFFF", fontWeight: "400" }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
