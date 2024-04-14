import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LeagueContext } from "../context/LeagueContext";
import { getLeagueData } from "../services/LeagueService";
import "../styles/League.css";
const League = () => {
  const { setSelectedLeague } = useContext(LeagueContext);
  const [leagues, setLeagues] = useState([]);

  const handleLeagueSelect = (league) => {
    setSelectedLeague(league);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getLeagueData()
      .then((data) => {
        setLeagues(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="center-container">
      <h2 className="league-heading">Leagues</h2>
      <div className="league-list">
        {leagues.map((league) => (
          <div key={league.id} className="league-item">
            <Link to="/season" className="league-link" onClick={() => handleLeagueSelect(league)}>
              {league.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default League;
