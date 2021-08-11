import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt, faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import * as gameLogic from "./GameLogic.js";
import "./UserTools.css";

function UserTools({
  setTimer,
  time,
  setHsPClasses,
  setHighscoreClasses,
  highscoreClasses,
  gameBoardObj,
  disable,
  updateBoard,
  gameBoard,
  isUndefined,
  setErrors,
  showSolved,
  solved,
  lengthObj,
  setStop,
  hintObj,
  setHintObj,
}) {
  let dis = false;

  if (solved) {
    dis = true;
  }
  if (!disable) {
    return null;
  }

  const undo = () => {
    let hist;
    if (gameBoardObj.history.slice(0, gameBoardObj.currentI).length > 0) {
      hist = gameBoardObj.history.slice(0, gameBoardObj.currentI);
    } else {
      hist = gameBoardObj.history.slice(0, 1);
    }
    const prev = hist[hist.length - 1]["b"];
    updateBoard(prev, null, hist.length - 1);
  };
  const redo = () => {
    const hist = gameBoardObj.history.slice(0, gameBoardObj.currentI + 2);
    const next = hist[hist.length - 1]["b"];
    updateBoard(next, null, hist.length - 1);
  };
  const checkSol = () => {
    const errs = gameLogic.checkSolution(gameBoard, gameBoardObj.clues);
    setErrors(errs.errors, errs.repeats, true);
  };
  const solve = () => {
    const solved = gameLogic.submitSolution(gameBoard, gameBoardObj.clues);
    if (
      solved.errors.length === 0 &&
      Object.keys(solved.repeats).length === 0 &&
      solved.undefined === 0
    ) {
      const tempArr = highscoreClasses.slice();
      tempArr.pop();
      tempArr.push("show-score");
      showSolved(true);
      setStop(true);
      setHsPClasses("win-show");
      setTimeout(() => {
        setHighscoreClasses(tempArr);
      }, 1000);
    } else {
      if (solved.undefined) {
        isUndefined(true);
      }
      setErrors(solved.errors, solved.repeats);
    }
  };
  const showHint = () => {
    let rndX, rndY;
    const board = [];
    let hasEmpty;
    gameBoard.forEach((element) => {
      if (element.includes(undefined)) {
        hasEmpty = true;
      }
    });
    if (hasEmpty) {
      do {
        rndX = Math.floor(Math.random() * lengthObj.length);
        rndY = Math.floor(Math.random() * lengthObj.length);
        const hint = gameBoardObj.solution[rndX][rndY];
        for (let i = 0; i < gameBoard.length; i++) {
          board[i] = gameBoard[i].slice();
        }
        board[rndX][rndY] = hint;
      } while (gameBoard[rndX][rndY]);
      const hist = gameBoardObj.history.slice(0, gameBoardObj.currentI + 1);
      calculatePenalty();
      updateBoard(board, hist);
    }
  };
  const calculatePenalty = () => {
    if (hintObj.freeHints <= hintObj.timesClicked) {
      const penalty = time + 5000 + 2000 * hintObj.penaltyMod;
      setTimer(penalty);
      setHintObj({
        freeHints: hintObj.freeHints,
        timesClicked: hintObj.timesClicked + 1,
        penaltyMod: hintObj.penaltyMod + 1,
      });
    } else {
      setHintObj({ ...hintObj, timesClicked: hintObj.timesClicked + 1 });
    }
  };

  return (
    <div>
      <div>
        <button
          className="undo"
          title="undo"
          onClick={() => undo()}
          disabled={dis}
        >
          <FontAwesomeIcon icon={faUndoAlt} />
        </button>
        <button
          className="redo"
          title="redo"
          onClick={() => redo()}
          disabled={dis}
        >
          <FontAwesomeIcon icon={faRedoAlt} />
        </button>
        <button
          disabled={dis}
          className="hint"
          title="hint"
          onClick={() => showHint()}
        >
          <FontAwesomeIcon icon={faLightbulb} />
        </button>
        <div>
          <button onClick={() => solve()} disabled={dis}>
            Submit Solution
          </button>
          <button onClick={() => checkSol()} disabled={dis}>
            Check Solution
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserTools;
