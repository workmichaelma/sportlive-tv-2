import React from "react";
import { Text, View } from "react-native";
import tw from "tailwind-rn";

import Card from "./card";

function Row({ time, matches, navigation }) {
  return (
    <View style={tw(`flex flex-row mb-4`)}>
      <View style={tw(`w-16 flex flex items-center justify-center`)}>
        <Text style={tw(`text-gray-100`)}>{time}</Text>
      </View>
      <View style={tw(`flex flex-row flex-grow flex-wrap`)}>
        {Array.isArray(matches)
          ? matches.map((m) => {
              return <Card match={m} key={m.id} />;
            })
          : null}
      </View>
    </View>
  );
}

export default Row;
