import React from "react";
import BoardLength from "./BoardLength";
import GameBoard from "./GameBoard";
import "./DifficultyChoice.css";
import UserChoice from "./UserChoice.js";
import useVisible from "./useVisible";
import UserTools from "./UserTools";

function DifficultyChoice({
  isClicked,
  setDiff,
  length,
  level,
  setClueAmount,
  diffChosen,
  chooseLength,
  setInitialGameState,
  solution,
  finalC,
  setClues,
  gameBoard,
  updateBoard,
  history,
  current,
  solved,
}) {
  const { ref, isVisible, setIsVisible } = useVisible(false);
  const [indices, setIndices] = React.useState({ x: null, y: null });
  const butArr = ["Easy", "Intermediate", "Hard"];
  let disable = false;
  let board = [];

  const setPos = (x, y) => {
    setIndices({ x: x, y: y });
  };

  if (gameBoard) {
    board = gameBoard;
  }
  if (isClicked) {
    disable = true;
  }

  return (
    <div className="game_container">
      {butArr.map((val, i) => (
        <button
          disabled={disable}
          key={i}
          className="choice"
          onClick={() => setDiff(i, true)}
        >
          {val}
        </button>
      ))}

      <BoardLength
        chooseLength={chooseLength}
        isClicked={isClicked}
        diffChosen={diffChosen}
        setClueAmount={setClueAmount}
        level={level}
        setInitialGameState={setInitialGameState}
      ></BoardLength>

      <GameBoard
        finalC={finalC}
        setClues={setClues}
        length={length}
        solution={solution}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        setPos={setPos}
        board={board}
        solved={solved}
      ></GameBoard>

      {isVisible && (
        <div ref={ref} style={{ width: length * 32 + "px" }}>
          <UserChoice
            length={length}
            gameBoard={board}
            updateBoard={updateBoard}
            indices={indices}
            history={history}
            current={current}
          ></UserChoice>
        </div>
      )}

      <UserTools
        chooseLength={chooseLength}
        clues={finalC}
        setDiff={setDiff}
        history={history}
        disable={disable}
        updateBoard={updateBoard}
        current={current}
        gameBoard={gameBoard}
      ></UserTools>
    </div>
  );
}

export default DifficultyChoice;
