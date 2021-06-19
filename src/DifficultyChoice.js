import React from "react";
import BoardLength from "./BoardLength";
import GameBoard from "./GameBoard";
import "./DifficultyChoice.css";
import UserChoice from "./UserChoice.js";
import useVisible from "./useVisible";

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
}) {
  const { ref, isVisible, setIsVisible } = useVisible(false);
  const [indices, setIndices] = React.useState({ x: null, y: null });

  const setPos = (x, y) => {
    setIndices({ x: x, y: y });
  };

  let disable = false;
  if (isClicked) {
    disable = true;
  }
  const butArr = ["Easy", "Intermediate", "Hard"];
  return (
    <div className="game_container">
      {butArr.map((val, i) => (
        <button
          disabled={disable}
          key={i}
          className="choice"
          onClick={() => setDiff(i)}
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
        gameBoard={gameBoard}
      ></GameBoard>
      {isVisible && (
        <div ref={ref} style={{ width: length * 32 + "px" }}>
          <UserChoice
            length={length}
            gameBoard={gameBoard}
            updateBoard={updateBoard}
            indices={indices}
          ></UserChoice>
        </div>
      )}
    </div>
  );
}

export default DifficultyChoice;
