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
    history: { id: 0, board: [] },
    clues: null,
  });

  //useStates
  const chooseDiff = (n) => {
    setDiff({ ...diffObject, isClicked: true, diffLevel: n });
  };
  const setClueAmount = (n) => {
    setDiff({ ...diffObject, clueAmount: n });
  };
  const chooseLength = (n) => {
    setLength({ ...lengthObject, length: n, isClicked: true });
  };
  const setInitialGameState = (n) => {
    const puzzle = gameLogic.makePuzzle(n);
    const board = Array.from(Array(n)).map(() => Array.from(Array(n)));
    setGame({
      ...gameBoardObj,
      solution: puzzle,
      history: { ...gameBoardObj.history, board: board },
    });
    console.log(puzzle);
  };
  const setClues = () => {
    const cols = gameLogic.convertToColumns(gameBoardObj.solution);
    let clueArr = gameLogic.findClues(gameBoardObj.solution, cols);
    clueArr = gameLogic.removeClues(diffObject.clueAmount, clueArr);
    setGame({ ...gameBoardObj, clues: clueArr });
  };
  const updateBoard = (b) => {
    setGame({
      ...gameBoardObj,
      history: {
        ...gameBoardObj.history,
        board: b,
        id: (gameBoardObj.history.id += 1),
      },
    });
  };
  if (!gameBoardObj.history.board.includes(undefined)) {
    if (gameBoardObj.history.board === gameBoardObj.solution) {
      console.log("CONGRATS");
    }
  }

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
          gameBoard={gameBoardObj.history.board}
          updateBoard={updateBoard}
        ></DifficultyChoice>
      </div>
    </React.StrictMode>
  );
}

export default App;
