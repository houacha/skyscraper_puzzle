import React from "react";
import "./StartMenu.css";
import HowToPlay from "./HowToPlay";

function StartMenu({
  setHsPClasses,
  start,
  setStart,
  title,
  highscoreClasses,
  setHighscoreClasses,
}) {
  const [modulClasses, setClasses] = React.useState([
    "how-to-play-modul",
    "hide-modul",
  ]);

  const [panelIndex, setPanelI] = React.useState(0);

  const panels = [
    {
      title: "How to Play",
      content:
        "Welcome to 'Skyscraper', a puzzle game similar to sudoku. The objective of the game is to completely fill the gameboard with the correct numbers.",
    },
    {
      title: "How to Play cont...",
      content:
        "Every row and column has clues to the correct number for each cell. The clues represent the amount of 'skyscrapers' that can be seen from that clue. The number in a cell represents the floors of a skyscraper.",
    },
    {
      title: "How to Play cont...",
      content:
        "Thus, a 'skyscraper' or cell can only been seen if the adjacent cell's number is lower. Example: In a 4x4 board, if a clue from the left is 4, then the numbers of that row going from left to right is 1, 2, 3, 4.",
    },
    {
      title: "Note!!!",
      content:
        "Some puzzles have more than one solution. Each row and column cannot have duplicate numbers.",
    },
  ];
  let tempArr;

  const howToPlay = () => {
    tempArr = modulClasses.slice();
    tempArr.pop();
    tempArr.push("show-htp");
    setClasses(tempArr);
  };
  const showScores = () => {
    tempArr = highscoreClasses.slice();
    tempArr.pop();
    tempArr.push("show-score");
    setHighscoreClasses(tempArr);
  };
  const startClicked = () => {
    setStart(true);
    setHsPClasses("hide-hsP");
  };

  if (start) {
    return null;
  }
  return (
    <div className="start_menu">
      <p className="title">{title}</p>
      <HowToPlay
        panelLength={panels.length}
        panel={panels[panelIndex]}
        panelI={panelIndex}
        setPanelI={setPanelI}
        modulClasses={modulClasses}
        setClasses={setClasses}
      />

      <button
        className="start_button start_item"
        onClick={() => startClicked()}
      >
        Start
      </button>

      <button className="how_to_play start_item" onClick={() => howToPlay()}>
        How To Play
      </button>

      <button className="start_item" onClick={() => showScores()}>
        Highscores
      </button>
    </div>
  );
}

export default StartMenu;
