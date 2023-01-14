import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from 'react-router-dom'
import AnimRoutes from "./routes/AnimRoutes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router key={1}>
    <AnimRoutes/>
    </Router>
  </React.StrictMode>
);