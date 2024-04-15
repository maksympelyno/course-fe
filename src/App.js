import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LeagueProvider } from "./context/LeagueContext";
import Home from "./components/Home";
import League from "./components/League";
import Season from "./components/Season";
import "./App.css";
import Match from "./components/Match";
import Search from "./components/Search";
import Team from "./components/Team";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-link">
              Search
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function App() {
  return (
    <LeagueProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/league" element={<League />} />
          <Route path="/season" element={<Season />} />
          <Route path="/match" element={<Match />} />
          <Route path="/team" element={<Team />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </LeagueProvider>
  );
}

export default App;
