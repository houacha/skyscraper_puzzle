import React from "react";
import "./Square.css";

function Square({
  setIsVisible,
  isVisible,
  setPos,
  xAxis,
  yAxis,
  value,
  isDouble,
}) {
  let tempClass = "";
  const onSquareClick = () => {
    setPos(xAxis, yAxis);
    setIsVisible(!isVisible);
  };
  if (isDouble) {
    tempClass = "isDouble";
  }

  return (
    <input
      type="text"
      className={`Square ${tempClass}`}
      readOnly
      onClick={(e) => onSquareClick()}
      value={value || ""}
    ></input>
  );
}

export default Square;
