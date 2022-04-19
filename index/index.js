import React, { useEffect, useState, useRef } from "react";
import { AppState, ScrollView, Text } from "react-native";
import axios from "axios";
import tw from "tailwind-rn";
import moment from "moment-timezone";

import { ButtonProvider } from "../hooks/useButton";
import Row from "./row";
import Matches from "./matches";
import Spinner from "./spinner";
import { useMemo } from "react";

// const url = "https://ds04s2074b.execute-api.ap-east-1.amazonaws.com/api/heibai";
// const url =
//   "https://dfqoxdjhdf.execute-api.ap-east-1.amazonaws.com/api/getmatches?all=true";
const url = "https://334p0jpuqf.execute-api.us-east-1.amazonaws.com/prod";

const Index = ({ navigation }) => {
  const appState = useRef(AppState.currentState);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState({});
  const [sport, setSport] = useState("足球");
  useEffect(() => {
    fetchMatches();
  }, []);

  const items = useMemo(() => {
    return typeof list === "object" ? list[sport] : [];
  });

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      fetchMatches();
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const fetchMatches = () => {
    setLoading(true);
    setList([]);
    axios
      .get(url)
      .then(({ data }) => {
        setLoading(false);
        if (typeof data === "object") {
          setList(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ButtonProvider>
      <ScrollView style={tw(`min-h-full w-full bg-gray-800 py-5`)}>
        {loading ? (
          <Spinner />
        ) : items ? (
          // <SportList item={item} sport={sport} setSport={setSport} />
          <Matches items={items} />
        ) : (
          <Text style={tw(`text-white`)}>無比賽</Text>
        )}
      </ScrollView>
    </ButtonProvider>
  );
};

export default Index;
