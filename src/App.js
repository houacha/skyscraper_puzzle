import React from "react";
import DifficultyChoice from "./DifficultyChoice";
import StartMenu from "./StartMenu";
import "./App.css";
import * as gameLogic from "./GameLogic.js";
import HighScores from "./HighScores";

function App() {
  //states
  const [start, setStart] = React.useState(false);
  const [time, setTimer] = React.useState(0);
  const [highscoreClasses, setHighscoreClasses] = React.useState([
    "highscore-container",
    "hide-score",
  ]);
  const [hsPClasses, setHsPClasses] = React.useState("");
  const [diffObject, setDiff] = React.useState({
    clueAmount: null,
    isClicked: false,
    diffLevel: null,
  });
  const [lengthObject, setLength] = React.useState({
    length: null,
    isClicked: false,
  });
  const [gameBoardObj, setGame] = React.useState({
    solution: null,
    history: [],
    clues: null,
    board: [],
    currentI: null,
    solved: false,
  });
  const [errObject, setErrs] = React.useState({
    errors: null,
    repeats: null,
    checkIsClicked: null,
  });
  const [solved, setSolved] = React.useState(false);

  //useStates
  const chooseDiff = (n, c) => {
    setDiff({ ...diffObject, isClicked: c, diffLevel: n });
  };
  const setClueAmount = (n) => {
    setDiff({ ...diffObject, clueAmount: n });
  };
  const chooseLength = (n, c) => {
    setLength({ ...lengthObject, length: n, isClicked: c });
  };
  const setInitialGameState = (n) => {
    const puzzle = gameLogic.makePuzzle(n);
    const b = Array.from(Array(n)).map(() => Array.from(Array(n)));
    setGame({
      ...gameBoardObj,
      solution: puzzle,
      history: gameBoardObj.history.concat({ b }),
      board: b,
      currentI: 0,
    });
    console.log(puzzle);
  };
  const setClues = () => {
    const cols = gameLogic.convertToColumns(gameBoardObj.solution);
    let clueArr = gameLogic.findClues(gameBoardObj.solution, cols);
    clueArr = gameLogic.removeClues(diffObject.clueAmount, clueArr);
    setGame({ ...gameBoardObj, clues: clueArr });
  };
  const updateBoard = (
    b,
    h,
    i = gameBoardObj.currentI + 1,
    c = gameBoardObj.clues,
    s = gameBoardObj.solution
  ) => {
    let hist;
    if (h) {
      if (b.length === 0 || b === gameBoardObj.history[0]["b"]) {
        hist = h;
      } else {
        hist = h.concat({ b });
      }
    } else {
      hist = gameBoardObj.history;
    }
    setGame({
      ...gameBoardObj,
      history: hist,
      board: b,
      currentI: i,
      clues: c,
      solution: s,
    });
  };
  const setErrors = (e, r, clicked) => {
    setErrs({ errors: e, repeats: r, checkIsClicked: clicked });
  };
  const showSolved = (s) => {
    setSolved(s);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setErrs({ ...errObject, checkIsClicked: null });
    }, 2000);
    return () => clearTimeout(timer);
  }, [errObject.checkIsClicked]);

  return (
    <React.StrictMode>
      <div className="App">
        <StartMenu
          setHsPClasses={setHsPClasses}
          highscoreClasses={highscoreClasses}
          setHighscoreClasses={setHighscoreClasses}
          setStart={setStart}
          start={start}
          title={"Skyscraper"}
        />

        <div className={`highscore-parent ${hsPClasses}`}>
          <HighScores
            length={lengthObject.length}
            diff={diffObject.diffLevel}
            time={time}
            solved={solved}
            highscoreClasses={highscoreClasses}
            setHighscoreClasses={setHighscoreClasses}
          />
        </div>

        <DifficultyChoice
          time={time}
          setTimer={setTimer}
          setHsPClasses={setHsPClasses}
          highscoreClasses={highscoreClasses}
          setHighscoreClasses={setHighscoreClasses}
          start={start}
          setStart={setStart}
          diffObject={diffObject}
          lengthObject={lengthObject}
          gameBoardObj={gameBoardObj}
          errObject={errObject}
          solved={solved}
          setDiff={chooseDiff}
          setClueAmount={setClueAmount}
          chooseLength={chooseLength}
          setInitialGameState={setInitialGameState}
          setClues={setClues}
          updateBoard={updateBoard}
          setErrors={setErrors}
          showSolved={showSolved}
        />
      </div>
    </React.StrictMode>
  );
}

export default App;
