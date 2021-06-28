import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import * as gameLogic from "./GameLogic.js";

function UserTools({
  history,
  disable,
  updateBoard,
  current,
  chooseLength,
  setDiff,
  gameBoard,
  clues,
}) {
  if (!disable) {
    return null;
  }

  const undo = () => {
    let hist;
    if (history.slice(0, current).length > 0) {
      hist = history.slice(0, current);
    } else {
      hist = history.slice(0, 1);
    }
    const prev = hist[hist.length - 1]["b"];
    updateBoard(prev, null, hist.length - 1);
  };
  const redo = () => {
    const hist = history.slice(0, current + 2);
    const next = hist[hist.length - 1]["b"];
    updateBoard(next, null, hist.length - 1);
  };
  const restart = () => {
    const hist = history.slice(0, 1);
    const board = hist[0]["b"];
    updateBoard(board, hist, 0);
  };
  const changeDiff = () => {
    updateBoard(null, [], null, null, null);
    setDiff(null, false);
    chooseLength(null, false);
  };
  const checkSol = () => {
    const errs = gameLogic.checkSolution(gameBoard, clues);
    var s = 0;
  };
  const solve = () => {};

  return (
    <div>
      <div>
        <button className="undo" title="undo" onClick={() => undo()}>
          <FontAwesomeIcon icon={faUndoAlt} />
        </button>
        <button className="redo" title="redo" onClick={() => redo()}>
          <FontAwesomeIcon icon={faRedoAlt} />
        </button>
        <button onClick={() => solve()}>Submit Solution</button>
        <button onClick={() => checkSol()}>Check Solution</button>
      </div>
      <div>
        <button className="restart" onClick={() => restart()}>
          Start Over
        </button>
        <button className="change-difficulty" onClick={() => changeDiff()}>
          Change Difficulty
        </button>
      </div>
    </div>
  );
}

export default UserTools;
