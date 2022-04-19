import React from "react";
import Button from "../Button";
import Row from "./row";

function Matches({ items }) {
  console.log({ items });
  return items.map((item) => {
    return <Row item={item} key={item.url} />;
  });
}

export default Matches;
