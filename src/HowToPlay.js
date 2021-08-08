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
  const removeModul = () => {
    setClasses("hide-modul");
    setPanelI(0);
  };
  const nextPanel = () => {
    let next = panelI + 1;
    if (next === panelLength) {
      next = 0;
    }
    setPanelI(next);
  };
  const prePanel = () => {
    let pre = panelI - 1;
    if (pre < 0) {
      pre = panelLength - 1;
    }
    setPanelI(pre);
  };

  return (
    <div>
      <div className={`how-to-play-modul ${modulClasses}`}>
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
