import React from "react";
import "./UserChoice.css";

function UserChoice({ length, gameBoard, updateBoard, indices }) {
  const choices = Array.from(Array(length));
  const chooseNum = (n) => {
    gameBoard[indices.x][indices.y] = n;
    updateBoard(gameBoard);
  };
  return (
    <div className="choice_container">
      {choices.map((_, i) => (
        <button key={i} className="num_choice" onClick={() => chooseNum(i + 1)}>
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export default UserChoice;
