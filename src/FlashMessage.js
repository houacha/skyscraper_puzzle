import React from "react";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";
import AlertTitle from "@material-ui/lab/AlertTitle";
import "./FlashMessage.css";

function FlashMessage(message) {
  const [flash, setFlash] = React.useState(true);
  setTimeout(() => {
    setFlash(false);
  }, 1500);

  return (
    <div>
      <Fade in={flash} timeout={{ enter: 300, exit: 1000 }}>
        <Alert
          style={{ backgroundColor: "lightyellow" }}
          variant={"outlined"}
          color={"warning"}
          className="alert"
          severity={"error"}
        >
          <AlertTitle>Warning</AlertTitle>
          {message["message"]}
        </Alert>
      </Fade>
    </div>
  );
}

export default FlashMessage;
