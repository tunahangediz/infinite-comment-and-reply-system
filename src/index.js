import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CommentState from "./context/commentContext/CommentState";
import AuthContext from "./context/authContext/AuthContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
        <CommentState>
          <App />
        </CommentState>
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>
);
