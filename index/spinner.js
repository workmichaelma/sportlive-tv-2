import React from "react";
import tw from "tailwind-rn";
import { ActivityIndicator, Text, View } from "react-native";

function Spinner() {
  return (
    <View style={tw(`w-full h-full items-center`)}>
      <ActivityIndicator size="large" color="#aaaaaa" />
    </View>
  );
}

export default Spinner;
