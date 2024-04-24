import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/Auth.context";
import { CoursesContextProvider } from "./context/Courses.context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <CoursesContextProvider>
        <App />
      </CoursesContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
