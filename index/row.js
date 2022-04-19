import React, { useMemo } from "react";
import { Text, View } from "react-native";
import tw from "tailwind-rn";
import moment from "moment-timezone";
import { useNavigation } from "@react-navigation/native";

import useButton from "../hooks/useButton";
import Button from "../Button";

function Row({ item }) {
  const navigation = useNavigation();
  const { url, hd, datetime, language, league, teams } = item || {};
  const buttonId = `row__${url}`;
  const { button, setButton } = useButton({ buttonId });
  const isFocusing = useMemo(() => {
    return buttonId === button;
  }, [buttonId, button]);
  return (
    <Button
      onPress={() => {
        navigation.navigate("Player", {
          url,
        });
      }}
      onFocus={() => {
        setButton(buttonId);
      }}
    >
      <View
        style={tw(
          `flex flex-row bg-gray-700 p-4 opacity-100 text-white border-gray-${
            isFocusing ? "200" : "600"
          } ${isFocusing ? "bg-gray-300" : ""}`
        )}
      >
        <Text style={tw(`text-white`)}>
          {moment(datetime).format("MM月DD日 hh:mm")}
        </Text>
        <Text style={tw(`text-white`)}>{league}</Text>
        <Text style={tw(`text-white`)}>{teams}</Text>
        <Text style={tw(`text-white`)}>{language}</Text>
        <Text style={tw(`text-white`)}>{hd ? "高清" : ""}</Text>
      </View>
    </Button>
  );
}

export default Row;
