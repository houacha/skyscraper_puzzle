import React from "react";
import "./Clues.css";

function Clues({ value }) {
  return (
    <input className="clues" type="text" disabled value={value || ""}></input>
  );
}
export default Clues;
