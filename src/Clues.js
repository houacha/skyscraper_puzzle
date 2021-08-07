import React from "react";
import "./Clues.css";

function Clues({ value, hasError }) {
  let classes = "";
  if (hasError) {
    classes = "hasError";
  }
  return (
    <input
      className={`clues ${classes}`}
      type="text"
      disabled
      value={value || ""}
    ></input>
  );
}
export default Clues;
