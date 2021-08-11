import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <div>
    {/* <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
      crossOrigin="anonymous"
    ></link> */}
    <script
      src="https://unpkg.com/react/umd/react.production.min.js"
      crossOrigin="true"
    ></script>

    <script
      src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
      crossOrigin="true"
    ></script>

    <script
      src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
      crossOrigin="true"
    ></script>

    <App />
  </div>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
