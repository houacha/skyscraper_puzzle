import React from "react";
import "./BoardLength.css";

function BoardLength({
  chooseLength,
  isClicked,
  diffChosen,
  level,
  setClueAmount,
  setInitialGameState,
}) {
  if (isClicked || !diffChosen) {
    return null;
  }
  const randomNum = (range, start) => {
    return Math.floor(Math.random() * range) + start;
  };

  let size = 8;
  switch (level) {
    case 0:
      size = 3;
      break;
    case 1:
      size = 5;
      break;
    default:
      break;
  }

  const setProps = (n) => {
    let count = null;
    switch (level) {
      case 0:
        count = 0;
        break;
      case 1:
        if (n > 5) {
          count = 0;
        } else {
          count = randomNum(Math.floor((n * 4) / 4) + 1, 0);
        }
        break;
      case 2:
        if (n > 7) {
          count = 0;
        } else if (n < 8 && n > 5) {
          count = randomNum(Math.floor((n * 4) / 4) + 1, 0);
        } else {
          count = randomNum(
            Math.floor(n * 4 * (3 / 5)) - Math.floor((n * 4) / 2) + 1,
            Math.floor((n * 4) / 2)
          );
        }
        break;
      default:
        break;
    }
    setClueAmount(n * 4 - count);
    chooseLength(n);
    setInitialGameState(n);
  };
  const lengthArr = Array.from(Array(size));
  return (
    <div className="length_container">
      <h5>Select board length:</h5>
      {lengthArr.map((_, i) => (
        <button
          className="length_button"
          key={i}
          onClick={() => setProps(i + 3)}
        >
          {i + 3}
        </button>
      ))}
    </div>
  );
}

export default BoardLength;
