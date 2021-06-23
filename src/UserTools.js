import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";

function UserTools({ history, disable, updateBoard, current }) {
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

  return (
    <div>
      <button className="undo" title="undo" onClick={() => undo()}>
        <FontAwesomeIcon icon={faUndoAlt} />
      </button>
      <button className="redo" title="redo" onClick={() => redo()}>
        <FontAwesomeIcon icon={faRedoAlt} />
      </button>
      <button className="restart" onClick={() => restart()}>
        Start Over
      </button>
    </div>
  );
}

export default UserTools;
