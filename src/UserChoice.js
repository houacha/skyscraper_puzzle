import React from "react";
import "./UserChoice.css";

function UserChoice({
  length,
  gameBoard,
  updateBoard,
  indices,
  history,
  current,
}) {
  const choices = Array.from(Array(length));
  const chooseNum = (n) => {
    const board = [];
    for (let i = 0; i < gameBoard.length; i++) {
      board[i] = gameBoard[i].slice();
    }
    board[indices.x][indices.y] = n;
    const hist = history.slice(0, current + 1);
    updateBoard(board, hist);
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
