import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Cycles from "./components/Cycles/Cycles.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";

function App() {
  return (
    <div className="app_content">
      <NavBar />
      <Cycles />
    </div>
  );
}

export default App;
