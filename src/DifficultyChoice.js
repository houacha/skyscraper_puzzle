import React from "react";
import BoardLength from "./BoardLength";
import GameBoard from "./GameBoard";
import "./DifficultyChoice.css";
import UserChoice from "./UserChoice";
import useVisible from "./useVisible";
import UserTools from "./UserTools";
import Menu from "./Menu";

function DifficultyChoice({
  time,
  setTimer,
  setHsPClasses,
  setHighscoreClasses,
  highscoreClasses,
  start,
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
  setStart,
}) {
  const { ref, isVisible, setIsVisible } = useVisible(false);
  const [hasUndefine, setUndefined] = React.useState(null);
  const [showTimer, setShow] = React.useState(false);
  const [stopTimer, setStop] = React.useState(false);
  const [indices, setIndices] = React.useState({ x: null, y: null });
  const [hintObj, setHintObj] = React.useState({
    timesClicked: 0,
    freeHints: 3,
    penaltyMod: 0,
  });

  const butArr = ["Easy", "Intermediate", "Hard"];
  let disable = false;
  let visibility;
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
  if (disable) {
    visibility = "none";
  }
  if (!start) {
    return null;
  }

  return (
    <div className="content_container">
      <Menu
        setHintObj={setHintObj}
        setHsPClasses={setHsPClasses}
        highscoreClasses={highscoreClasses}
        setHighscoreClasses={setHighscoreClasses}
        chooseLength={chooseLength}
        history={gameBoardObj.history}
        setDiff={setDiff}
        updateBoard={updateBoard}
        setErrors={setErrors}
        showSolved={showSolved}
        disable={disable}
        setTimer={setTimer}
        setStop={setStop}
        setStart={setStart}
      />

      <div className="game_container">
        <div className="difficulty_container">
          {butArr.map((val, i) => (
            <button
              disabled={disable}
              style={{ display: visibility }}
              key={i}
              className="choice"
              onClick={() => setDiff(i, true)}
            >
              {val}
            </button>
          ))}
        </div>

        <BoardLength
          chooseLength={chooseLength}
          isClicked={lengthObject.isClicked}
          diffChosen={diffObject.isClicked}
          level={diffObject.diffLevel}
          setClueAmount={setClueAmount}
          setInitialGameState={setInitialGameState}
          setShow={setShow}
          setStop={setStop}
          setTimer={setTimer}
        />

        <GameBoard
          errObject={errObject}
          gameBoardObj={gameBoardObj}
          setClues={setClues}
          visibility={visibility}
          showTimer={showTimer}
          length={lengthObject.length}
          solved={solved}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          setPos={setPos}
          hasUndefine={hasUndefine}
          stopTimer={stopTimer}
          time={time}
          setTimer={setTimer}
        />

        {isVisible && (
          <div
            className="choice_parent"
            ref={ref}
            style={{ width: lengthObject.length * 32 + "px" }}
          >
            <UserChoice
              length={lengthObject.length}
              gameBoard={board}
              updateBoard={updateBoard}
              indices={indices}
              history={gameBoardObj.history}
              current={gameBoardObj.currentI}
            />
          </div>
        )}

        <UserTools
          setHintObj={setHintObj}
          hintObj={hintObj}
          time={time}
          setTimer={setTimer}
          setHsPClasses={setHsPClasses}
          highscoreClasses={highscoreClasses}
          setHighscoreClasses={setHighscoreClasses}
          gameBoardObj={gameBoardObj}
          disable={disable}
          updateBoard={updateBoard}
          setStop={setStop}
          gameBoard={board}
          lengthObj={lengthObject}
          isUndefined={isUndefined}
          setErrors={setErrors}
          showSolved={showSolved}
          solved={solved}
          time={time}
        />
      </div>
    </div>
  );
}

export default DifficultyChoice;
