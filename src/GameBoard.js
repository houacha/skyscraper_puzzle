import React from "react";
import "./GameBoard.css";
import Clues from "./Clues";
import Square from "./Square";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function GameBoard({
  length,
  solution,
  finalC,
  setClues,
  setIsVisible,
  isVisible,
  setPos,
  board,
  solved,
}) {
  const clues = Array.from(Array(length));
  let clueArr = [];
  let display = "";

  React.useEffect(() => {
    if (solution && !finalC) {
      setClues();
    }
  }, [length, solution, finalC, setClues]);

  if (finalC) {
    clueArr = finalC;
  }
  if (solved) {
    display = "initial";
  } else {
    display = "none";
  }

  return (
    <div className="gameboard_parent">
      <div className="game_board">
        <div className="board_container" style={{ width: length * 36 + "px" }}>
          {board.map((_, i) =>
            board[i].map((_, j) => (
              <Square
                length={length}
                xAxis={i}
                yAxis={j}
                key={i * length + j}
                setIsVisible={setIsVisible}
                isVisible={isVisible}
                setPos={setPos}
                value={board[i][j]}
              ></Square>
            ))
          )}

          <div
            className="check_icon"
            style={{
              fontSize: length * 36 + "px",
              height: length * 36 + "px",
              display: display,
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </div>
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
  );
}

export default GameBoard;
