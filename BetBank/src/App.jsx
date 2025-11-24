import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Cycles from "./components/Cycles/Cycles.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Header from "./components/Header/Header.jsx";
import Bets from "./components/Bets/Bets.jsx";

function App() {
  return (
    <div className="app_content">
      <NavBar />
      <div className="container-principal">
        <Header />
        <Bets />
      </div>
    </div>
  );
}

export default App;
