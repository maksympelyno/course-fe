import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LeagueProvider } from "./context/LeagueContext";
import Home from "./components/Home";
import League from "./components/League";
import Season from "./components/Season";
import "./App.css";
import Match from "./components/Match";
import Team from "./components/Team";

function App() {
  return (
    <LeagueProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/league" element={<League />} />
          <Route path="/season" element={<Season />} />
          <Route path="/match" element={<Match />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </BrowserRouter>
    </LeagueProvider>
  );
}

export default App;
