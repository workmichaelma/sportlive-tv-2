import React, { useEffect, useState } from "react";
import { View, TVEventHandler, useTVEventHandler } from "react-native";
import { WebView } from "react-native-webview";
import tw from "tailwind-rn";

const Player = ({ route }) => {
  const { url } = route.params || {};

  const [showOverlay, setShowOverlay] = useState(false);
  const [lastEventType, setLastEventType] = React.useState("");

  const myTVEventHandler = (evt) => {
    setLastEventType(evt.eventType);
  };
  useTVEventHandler(myTVEventHandler);

  useEffect(() => {
    setShowOverlay(false);
    const hideOverlay = setTimeout(() => {
      setShowOverlay(true);
    }, 3000);
    return () => clearTimeout(hideOverlay);
  }, [lastEventType, setShowOverlay]);

  return (
    <>
      <WebView
        style={tw(`w-full h-full`)}
        source={{ uri: url }}
        userAgent="macOS"
        scrollEnabled={false}
        overScrollMode="never"
        javaScriptEnabled={true}
        scalesPageToFit={true}
      />
      {showOverlay && (
        <View style={tw(`absolute w-full h-14 bg-black bottom-0`)} />
      )}
    </>
  );
};

export default Player;
