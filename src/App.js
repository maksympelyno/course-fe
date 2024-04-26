import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LeagueProvider } from "./context/LeagueContext";
import Home from "./components/Home";
import League from "./components/League";
import Season from "./components/Season";
import Match from "./components/Match";
import Search from "./components/Search";
import Team from "./components/Team";
import Header from "./components/Header";
import Login from "./components/Login";
import AddPage from "./components/AddPage";
import NotFound from "./components/NotFound";
import Statistics from "./components/Statistics";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAdmin = sessionStorage.getItem("username") === "admin";

  const handleLogin = (isAuthenticated) => {
    setIsAuthenticated(isAuthenticated);
  };

  return (
    <>
      {isAuthenticated || !!sessionStorage.getItem("username") ? (
        <LeagueProvider>
          <BrowserRouter>
            <Header onLogin={handleLogin} />
            <Routes>
              <Route path="/" index element={<Home />} />
              <Route path="/league" element={<League />} />
              <Route path="/season" element={<Season />} />
              <Route path="/match" element={<Match />} />
              <Route path="/team" element={<Team />} />
              <Route path="/search" element={<Search />} />
              <Route path="/statistics" element={<Statistics />} />
              {isAdmin && <Route path="/add" element={<AddPage />} />}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LeagueProvider>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
