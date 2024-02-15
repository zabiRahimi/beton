import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css'

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
