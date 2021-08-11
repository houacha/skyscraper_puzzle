import React from "react";
import { db } from "./firebase";
import "./HighScores.css";

function HighScores({
  diff,
  length,
  time,
  highscoreClasses,
  setHighscoreClasses,
  solved,
}) {
  const [name, setName] = React.useState();
  const [scores, setScores] = React.useState();

  React.useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        saveData();
        closeHigh();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [name]);
  React.useEffect(() => {
    db.collection("highscores").onSnapshot((snapshot) => {
      setScores(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  }, []);

  const saveData = () => {
    db.collection("highscores")
      .doc()
      .set({
        name: name,
        level: `${length}x${length} / ${convertLvl()}`,
        time: time,
      });
  };
  const convertLvl = () => {
    switch (diff) {
      case 0:
        return "easy";
      case 1:
        return "med";
      case 2:
        return "hard";
      default:
        break;
    }
  };
  const closeHigh = () => {
    const tempArr = highscoreClasses.slice();
    tempArr.pop();
    tempArr.push("hide-score");
    setHighscoreClasses(tempArr);
  };
  const makeHighscores = (arr) => {
    return arr.map((obj, i) => {
      if (obj.id === "") {
        return (
          <div className="highscore-content-item-container" key={i}>
            <div className="highscore-content-item">
              {i + 1}.{" "}
              <input
                type={"text"}
                className="score-input"
                placeholder={"Player"}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="highscore-content-item">{obj.data.level}</div>
            <div className="highscore-content-item">
              <span className="score-digits">
                {("0" + Math.floor((obj.data.time / 60000) % 60)).slice(-2)}:
              </span>
              <span className="score-digits">
                {("0" + Math.floor((obj.data.time / 1000) % 60)).slice(-2)}.
              </span>
              <span className="score-digits score-mili-sec">
                {("0" + ((obj.data.time / 10) % 100)).slice(-2)}
              </span>
            </div>
          </div>
        );
      } else {
        return (
          <div className="highscore-content-item-container" key={i}>
            <div className="highscore-content-item name-container">
              {i + 1}. <div className="score-input">{obj.data.name}</div>
            </div>
            <div className="highscore-content-item">{obj.data.level}</div>
            <div className="highscore-content-item">
              <span className="score-digits">
                {("0" + Math.floor((obj.data.time / 60000) % 60)).slice(-2)}:
              </span>
              <span className="score-digits">
                {("0" + Math.floor((obj.data.time / 1000) % 60)).slice(-2)}.
              </span>
              <span className="score-digits score-mili-sec">
                {("0" + ((obj.data.time / 10) % 100)).slice(-2)}
              </span>
            </div>
          </div>
        );
      }
    });
  };
  const isSolved = () => {
    if (solved) {
      const scoresCopy = scores.slice();
      scoresCopy.push({
        id: "",
        data: {
          name: "",
          level: `${length}x${length} / ${convertLvl()}`,
          time: time,
        },
      });
      const sortedCopy = scoresCopy.sort((a, b) => {
        return a.data.time - b.data.time;
      });
      return makeHighscores(sortedCopy);
    } else {
      if (scores) {
        const sortedScores = scores.sort((a, b) => {
          return a.data.time - b.data.time;
        });
        return sortedScores.map((_, i) => (
          <div className="highscore-content-item-container" key={i}>
            <div className="highscore-content-item name-container">
              {i + 1}.{" "}
              <div className="score-input">{sortedScores[i].data.name}</div>
            </div>
            <div className="highscore-content-item">
              {sortedScores[i].data.level}
            </div>
            <div className="highscore-content-item">
              <span className="score-digits">
                {(
                  "0" + Math.floor((sortedScores[i].data.time / 60000) % 60)
                ).slice(-2)}
                :
              </span>
              <span className="score-digits">
                {(
                  "0" + Math.floor((sortedScores[i].data.time / 1000) % 60)
                ).slice(-2)}
                .
              </span>
              <span className="score-digits score-mili-sec">
                {("0" + ((sortedScores[i].data.time / 10) % 100)).slice(-2)}
              </span>
            </div>
          </div>
        ));
      }
    }
  };

  return (
    <div className={highscoreClasses.join(" ")}>
      <div className="highscore-title">HighScores</div>
      <div className="highscore-content">
        <div className="content-header">
          <div className="highscore-content-header-item">Name:</div>
          <div className="highscore-content-header-item">Level:</div>
          <div className="highscore-content-header-item">
            <div className="time-unit">(Min / Sec)</div>
            Time:
          </div>
        </div>
        {isSolved()}
      </div>
      <div className="highscore-close" onClick={() => closeHigh()}>
        Close
      </div>
    </div>
  );
}

export default HighScores;
