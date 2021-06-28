import React from "react";
import DifficultyChoice from "./DifficultyChoice";
import * as gameLogic from "./GameLogic.js";

function App() {
  //states
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
    board: null,
    currentI: null,
    solved: false,
  });

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
      if (b === null) {
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

  return (
    <React.StrictMode>
      <div className="App">
        <DifficultyChoice
          isClicked={lengthObject.isClicked}
          length={lengthObject.length}
          level={diffObject.diffLevel}
          setDiff={chooseDiff}
          setClueAmount={setClueAmount}
          chooseLength={chooseLength}
          diffChosen={diffObject.isClicked}
          setInitialGameState={setInitialGameState}
          solution={gameBoardObj.solution}
          clueAmount={diffObject.clueAmount}
          setClues={setClues}
          finalC={gameBoardObj.clues}
          gameBoard={gameBoardObj.board}
          updateBoard={updateBoard}
          history={gameBoardObj.history}
          current={gameBoardObj.currentI}
          solved={gameBoardObj.solved}
        ></DifficultyChoice>
      </div>
    </React.StrictMode>
  );
}

export default App;
