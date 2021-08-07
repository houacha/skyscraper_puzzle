import React from "react";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";
import AlertTitle from "@material-ui/lab/AlertTitle";
import "./FlashMessage.css";

function FlashMessage({
  title,
  message,
  color,
  bgc,
  severity,
  variant = "outlined",
}) {
  const [flash, setFlash] = React.useState(true);
  setTimeout(() => {
    setFlash(false);
  }, 1500);

  return (
    <div>
      <Fade in={flash} timeout={{ enter: 300, exit: 1000 }}>
        <Alert
          style={{ backgroundColor: bgc }}
          variant={variant}
          color={color}
          className="alert"
          severity={severity}
        >
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Fade>
    </div>
  );
}

export default FlashMessage;
