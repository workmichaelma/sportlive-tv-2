import React, { useMemo, useRef } from "react";
import { Image, Text, View } from "react-native";
import tw from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";

import Button from "../Button";

import useButton from "../hooks/useButton";

function Card({ match }) {
  const { id, league, homeName, awayName, homeLogo, awayLogo, url } =
    match || {};
  const buttonId = `card__${id}`;
  const { button, setButton } = useButton({ buttonId });
  const ref = useRef();
  const navigation = useNavigation();
  const isFocusing = useMemo(() => {
    return buttonId === button;
  }, [buttonId, button]);

  return (
    <Button
      ref={ref}
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
          `flex bg-gray-700 p-4 border-2 my-2
           border-solid rounded-lg mr-5 opacity-100 border-gray-${
             isFocusing ? "200" : "600"
           }`
        )}
      >
        <View style={tw()}>
          <View style={tw(`mb-2`)}>
            <Text style={tw(`text-gray-400 text-center`)}>{league}</Text>
          </View>
          <View style={tw(`flex flex-row`)}>
            <View style={tw(`flex items-center justify-center`)}>
              <Image source={{ uri: homeLogo }} style={tw(`w-12 h-12`)} />
              <Text style={tw(`text-gray-400 text-center mt-2 w-20`)}>
                {homeName}
              </Text>
            </View>
            <View style={tw(`flex items-center justify-center ml-10`)}>
              <Image source={{ uri: awayLogo }} style={tw(`w-12 h-12`)} />
              <Text style={tw(`text-gray-400 text-center mt-2 w-20`)}>
                {awayName}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Button>
  );
}

export default Card;
