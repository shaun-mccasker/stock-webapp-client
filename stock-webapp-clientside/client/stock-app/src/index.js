import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "react-datepicker/dist/react-datepicker.css";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
