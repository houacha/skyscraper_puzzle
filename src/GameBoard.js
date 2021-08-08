import React from "react";
import "./GameBoard.css";
import Clues from "./Clues";
import Square from "./Square";
import Timer from "./Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import FlashMessage from "./FlashMessage";

function GameBoard({
  gameBoardObj,
  errObject,
  visibility,
  length,
  setClues,
  setIsVisible,
  isVisible,
  setPos,
  hasUndefine,
  solved,
  showTimer,
  stopTimer,
  time,
  setTimer,
}) {
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

  const makeClueContainer = () => {
    const container = Array.from(Array(4));
    return container.map((_, i) => {
      let className, min, max;
      switch (i) {
        case 0:
          className = "top_container";
          min = 0;
          max = length;
          break;
        case 1:
          className = "right_container";
          min = length;
          max = length * 2;
          break;
        case 2:
          className = "bot_container";
          min = length * 2;
          max = length * 3;
          break;
        case 3:
          className = "left_container";
          min = length * 3;
          max = length * 4;
          break;
        default:
          break;
      }
      return (
        <div className={className} key={className}>
          {displayClues(min, max)}
        </div>
      );
    });
  };
  const displayClues = (min, max) => {
    let cl = Array.from(Array(length));
    let cluePart = clueArr.slice(min, max);
    if (errObject.errors) {
      let errs = Array.from(errObject.errors);
      return cl.map((_, i) => {
        let hasError = false;
        if (errs.includes(i + min)) {
          hasError = true;
        }
        return <Clues hasError={hasError} value={cluePart[i]} key={i} />;
      });
    } else {
      return cl.map((_, i) => <Clues value={cluePart[i]} key={i} />);
    }
  };
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
          />
        );
      })
    );
  };
  const checkFlash = () => {
    let repeats;
    if (errObject.repeats) {
      repeats = Object.keys(errObject.repeats);
    }
    if (
      errObject.checkIsClicked &&
      errObject.errors.length === 0 &&
      repeats.length === 0
    ) {
      return (
        <FlashMessage
          title={"All Good"}
          message={"Everything looks good"}
          color={"info"}
          bgc={"lightblue"}
          severity={"info"}
        />
      );
    }
  };
  const showUndef = () => {
    let repeats;
    if (errObject.repeats) {
      repeats = Object.keys(errObject.repeats);
    }
    if (hasUndefine) {
      if (errObject.repeats) {
        repeats = Object.keys(errObject.repeats);
      }
      return (
        <div>
          <FlashMessage
            title={"Warning"}
            message={"Cannot submit solution with empty squares."}
            color={"warning"}
            bgc={"lightyellow"}
            severity={"error"}
          />
          <div>{showRepeats(repeats)}</div>
        </div>
      );
    }
    return showRepeats(repeats);
  };

  return (
    <div>
      <Timer
        time={time}
        setTimer={setTimer}
        show={visibility}
        showTimer={showTimer}
        stopTimer={stopTimer}
      />
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
            {checkFlash()}
            {showUndef()}
          </div>

          <div>{makeClueContainer()}</div>
        </div>
      </div>
    </div>
  );
}

export default GameBoard;
