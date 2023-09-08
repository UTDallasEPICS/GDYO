import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function CustomButton({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#68B3FB",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "400",
          fontSize: 16,
          color: "#FFFFFF",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
