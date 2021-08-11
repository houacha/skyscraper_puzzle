import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import "./HowToPlay.css";

function HowToPlay({
  modulClasses,
  setClasses,
  panel,
  panelLength,
  setPanelI,
  panelI,
}) {
  const pages = Array.from(Array(panelLength));
  const tempArr = modulClasses.slice();

  const removeModul = () => {
    tempArr.pop();
    tempArr.push("hide-modul");
    setClasses(tempArr);
    setPanelI(0);
  };
  const nextPanel = () => {
    let next = panelI + 1;
    if (next === panelLength) {
      next = 0;
    }
    setClasses(tempArr);
    setPanelI(next);
  };
  const prePanel = () => {
    let pre = panelI - 1;
    if (pre < 0) {
      pre = panelLength - 1;
    }
    setClasses(tempArr);
    setPanelI(pre);
  };

  return (
    <div>
      <div className={modulClasses.join(" ")}>
        <div className="page-changer" onClick={() => prePanel()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="modul-content-container">
          <p className="modul-title">{panel.title}</p>
          <p className="modul-content">{panel.content}</p>
          <p className="modul-close" onClick={() => removeModul()}>
            Close
          </p>
          <div className="htp-pagination">
            {pages.map((_, i) => {
              if (i === panelI) {
                return (
                  <FontAwesomeIcon
                    key={i}
                    className="page-circle page-selected"
                    onClick={() => setPanelI(i)}
                    icon={faCircle}
                  />
                );
              }
              return (
                <FontAwesomeIcon
                  key={i}
                  className="page-circle"
                  onClick={() => setPanelI(i)}
                  icon={faCircle}
                />
              );
            })}
          </div>
        </div>
        <div className="page-changer" onClick={() => nextPanel()}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
}

export default HowToPlay;
