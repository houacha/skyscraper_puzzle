import React from "react";
import "./GameBoard.css";
import Clues from "./Clues";
import Square from "./Square";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import FlashMessage from "./FlashMessage";

function GameBoard({
  gameBoardObj,
  errObject,
  length,
  setClues,
  setIsVisible,
  isVisible,
  setPos,
  hasUndefine,
  solved,
}) {
  const clues = Array.from(Array(length));
  let clueArr = [];
  let display = "";

  React.useEffect(() => {
    if (gameBoardObj.solution && !gameBoardObj.clues) {
      setClues();
    }
  }, [length, gameBoardObj.solution, gameBoardObj.clues, setClues]);

  if (gameBoardObj.clues) {
    clueArr = gameBoardObj.clues;
  }
  if (solved) {
    display = "initial";
  } else {
    display = "none";
  }

  const showRepeats = (repeats) => {
    return gameBoardObj.board.map((_, i) =>
      gameBoardObj.board[i].map((_, j) => {
        let isDouble = null;
        if (repeats) {
          if (repeats.length > 0) {
            const currentR = repeats[0].split(",");
            if (Number(currentR[0]) === i && Number(currentR[1]) === j) {
              isDouble = true;
              repeats.shift();
            }
          }
        }
        return (
          <Square
            length={length}
            xAxis={i}
            yAxis={j}
            key={i * length + j}
            setIsVisible={setIsVisible}
            isVisible={isVisible}
            setPos={setPos}
            value={gameBoardObj.board[i][j]}
            isDouble={isDouble}
          ></Square>
        );
      })
    );
  };
  const showUndef = () => {
    let repeats;
    if (errObject.repeats) {
      repeats = Object.keys(errObject.repeats);
    }
    if (hasUndefine) {
      const message = "Cannot submit solution with empty squares.";
      if (errObject.repeats) {
        repeats = Object.keys(errObject.repeats);
      }
      return (
        <div>
          <FlashMessage message={message}></FlashMessage>
          <div>{showRepeats(repeats)}</div>
        </div>
      );
    }
    return showRepeats(repeats);
  };

  return (
    <div>
      <div
        className="check_icon"
        style={{
          fontSize: length * 36 + "px",
          display: display,
        }}
      >
        <FontAwesomeIcon icon={faCheck} />
      </div>
      <div className="gameboard_parent">
        <div className="game_board">
          <div
            className="board_container"
            style={{ width: length * 36 + "px" }}
          >
            {showUndef()}
          </div>

          <div className="top_container">
            {clues.map((_, i) => (
              <Clues className="clues_top" value={clueArr[i]} key={i}></Clues>
            ))}
          </div>

          <div className="left_container" style={{ width: 36 + "px" }}>
            {clues.map((_, i) => (
              <Clues
                className="clues_left"
                value={clueArr[i + clueArr.length * (3 / 4)]}
                key={i}
              ></Clues>
            ))}
          </div>

          <div className="right_container" style={{ width: 36 + "px" }}>
            {clues.map((_, i) => (
              <Clues
                className="clues_right"
                value={clueArr[clueArr.length * (1 / 4) + i]}
                key={i}
              ></Clues>
            ))}
          </div>

          <div className="bot_container">
            {clues.map((_, i) => (
              <Clues
                className="clues_bot"
                value={clueArr[i + clueArr.length * (1 / 2)]}
                key={i}
              ></Clues>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameBoard;
