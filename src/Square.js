import React from "react";
import "./Square.css";

function Square({ setIsVisible, isVisible, setPos, xAxis, yAxis, value }) {
  const onSquareClick = () => {
    setPos(xAxis, yAxis);
    setIsVisible(!isVisible);
  };
  return (
    <input
      type="text"
      className="Square"
      readOnly
      onClick={(e) => onSquareClick()}
      value={value || ""}
    ></input>
  );
}

export default Square;
