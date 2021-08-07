import React from "react";
import "./Timer.css";

function Timer({ show, showTimer, stopTimer, time, setTimer }) {
  React.useEffect(() => {
    let interval = null;
    if (!stopTimer && showTimer) {
      interval = setInterval(() => {
        setTimer((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [stopTimer, showTimer]);

  if (!show) {
    return null;
  }

  return (
    <div className="timer">
      <span className="digits">
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
      </span>
      <span className="digits mili-sec">
        {("0" + ((time / 10) % 100)).slice(-2)}
      </span>
    </div>
  );
}

export default Timer;
