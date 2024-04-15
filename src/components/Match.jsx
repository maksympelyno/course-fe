import React, { useContext, useState, useEffect } from "react";
import { LeagueContext } from "../context/LeagueContext";
import { getMatchData } from "../services/MatchService";
import { Link } from "react-router-dom";

import MatchModal from "./MatchModal";
import "../styles/Match.css";

const Match = () => {
  const { selectedSeason, setSelectedTeam } = useContext(LeagueContext);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleTeamSelect = (team) => {
    console.log("hui " + team);
    setSelectedTeam(team);
  };

  useEffect(() => {
    if (selectedSeason) {
      getData(selectedSeason.season_id);
    }
  }, [selectedSeason]);

  const getData = (season_id) => {
    getMatchData(season_id)
      .then((data) => {
        setMatches(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="match-container">
      <h2 className="season-heading">Season: {selectedSeason ? selectedSeason.name : "No season selected"}</h2>
      <div className="matches-container">
        {matches.map((match) => (
          <div key={match.match_id} className="match-item" onClick={() => setSelectedMatch(match)}>
            <div className="team">
              {" "}
              <Link to="/team" onClick={() => handleTeamSelect(match.homeTeam)} className="team-link">
                {match.homeTeam.name}
              </Link>
            </div>

            <div className="match-details">
              <div className="stadium">{match.stadium}</div>
              <div className="date">{new Date(match.date).toLocaleString()}</div>
            </div>

            <div className="team">
              {" "}
              <Link to="/team" onClick={() => handleTeamSelect(match.awayTeam)} className="team-link">
                {match.awayTeam.name}{" "}
              </Link>
            </div>
          </div>
        ))}
      </div>
      {selectedMatch && <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />}
    </div>
  );
};

export default Match;
