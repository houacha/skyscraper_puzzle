import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Menu.css";

function Menu({
  history,
  updateBoard,
  setErrors,
  showSolved,
  setDiff,
  chooseLength,
  disable,
  setShow,
  setStop,
  setTimer,
}) {
  const [sidebarClasses, setClass] = React.useState(["menu_container", "hide"]);
  const [menuClasses, setMenuClasses] = React.useState("hide-menu");
  const ref = React.useRef(null);
  let display = "hidden";

  if (disable) {
    display = "visible";
  }

  const handleClickOutside = (event) => {
    if (
      (ref.current && !ref.current.contains(event.target)) ||
      event.target === "button.dropdown-toggle.btn.btn-primary"
    ) {
      showSidebar("hide", "hide-menu");
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const showSidebar = (s, m) => {
    const tempArr = sidebarClasses.slice();
    tempArr.pop();
    tempArr.push(s);
    setClass(tempArr);
    setMenuClasses(m);
  };
  const switchIcon = () => {
    if (sidebarClasses.includes("show")) {
      return (
        <button
          aria-expanded={true}
          aria-haspopup={false}
          className="dropdown-toggle btn btn-primary"
          onClick={() => showSidebar("hide", "hide-menu")}
        >
          <FontAwesomeIcon icon={faTimes} style={{ marginLeft: "-5.5px" }} />
        </button>
      );
    } else {
      return (
        <button
          aria-expanded={false}
          aria-haspopup={true}
          className="dropdown-toggle btn btn-primary"
          onClick={() => showSidebar("show", "show-menu")}
        >
          <FontAwesomeIcon icon={faBars} style={{ marginLeft: "-5.5px" }} />
        </button>
      );
    }
  };
  const restart = () => {
    const hist = history.slice(0, 1);
    let board;
    if (hist.length > 0) {
      board = hist[0]["b"];
    } else {
      board = [];
    }
    showSidebar("hide", "hide-menu");
    updateBoard(board, hist, 0);
    setErrors(null, null);
    showSolved(false);
    setTimer(0);
    setStop(false);
  };
  const changeDiff = () => {
    console.clear();
    showSidebar("hide", "hide-menu");
    setTimeout(() => {
      updateBoard([], [], null, null, null);
      setDiff(null, false);
      chooseLength(null, false);
      setErrors(null, null);
      showSolved(false);
      setShow(false);
      setTimer(0);
    }, 400);
  };

  return (
    <div
      ref={ref}
      className={sidebarClasses.join(" ")}
      style={{ visibility: display, display: "flex" }}
    >
      <div className={`dropdown-menu ${menuClasses}`}>
        <div className="dropdown-header">Menu</div>
        <div className="dropdown-divider"></div>
        <p
          className="change-difficulty dropdown-item"
          onClick={() => changeDiff()}
        >
          New Game
        </p>
        <p className="restart dropdown-item" onClick={() => restart()}>
          Start Over
        </p>
      </div>

      <div className="dropdown">{switchIcon()}</div>
    </div>
  );
}

export default Menu;
