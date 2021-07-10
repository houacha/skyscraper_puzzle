import React from "react";
import BoardLength from "./BoardLength";
import GameBoard from "./GameBoard";
import "./DifficultyChoice.css";
import UserChoice from "./UserChoice.js";
import useVisible from "./useVisible";
import UserTools from "./UserTools";

function DifficultyChoice({
  diffObject,
  lengthObject,
  gameBoardObj,
  errObject,
  setDiff,
  setClueAmount,
  chooseLength,
  setInitialGameState,
  setClues,
  updateBoard,
  setErrors,
  showSolved,
  solved,
}) {
  const { ref, isVisible, setIsVisible } = useVisible(false);
  const [hasUndefine, setUndefined] = React.useState(null);
  const [indices, setIndices] = React.useState({ x: null, y: null });
  const butArr = ["Easy", "Intermediate", "Hard"];
  let disable = false;
  let board = [];

  const setPos = (x, y) => {
    setIndices({ x: x, y: y });
  };
  const isUndefined = (t) => {
    setUndefined(t);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setUndefined(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [hasUndefine]);

  if (gameBoardObj.board) {
    board = gameBoardObj.board;
  }
  if (lengthObject.isClicked) {
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
        isClicked={lengthObject.isClicked}
        diffChosen={diffObject.isClicked}
        level={diffObject.diffLevel}
        setClueAmount={setClueAmount}
        setInitialGameState={setInitialGameState}
      ></BoardLength>

      <GameBoard
        errObject={errObject}
        gameBoardObj={gameBoardObj}
        setClues={setClues}
        length={lengthObject.length}
        solved={solved}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        setPos={setPos}
        hasUndefine={hasUndefine}
      ></GameBoard>

      {isVisible && (
        <div ref={ref} style={{ width: lengthObject.length * 32 + "px" }}>
          <UserChoice
            length={lengthObject.length}
            gameBoard={board}
            updateBoard={updateBoard}
            indices={indices}
            history={gameBoardObj.history}
            current={gameBoardObj.currentI}
          ></UserChoice>
        </div>
      )}

      <UserTools
        errObject={errObject}
        chooseLength={chooseLength}
        clues={gameBoardObj.clues}
        history={gameBoardObj.history}
        current={gameBoardObj.currentI}
        setDiff={setDiff}
        disable={disable}
        updateBoard={updateBoard}
        gameBoard={board}
        isUndefined={isUndefined}
        setErrors={setErrors}
        showSolved={showSolved}
      ></UserTools>
    </div>
  );
}

export default DifficultyChoice;
