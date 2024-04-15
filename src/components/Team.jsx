import { useContext, useState, useEffect } from "react";
import { LeagueContext } from "../context/LeagueContext.js";
import { getTeamStatsData } from "../services/TeamStatsService.js";
import "../styles/Team.css"; // Підключаємо файл стилів

const Team = () => {
  const { selectedTeam, selectedSeason } = useContext(LeagueContext);

  const [teamStats, setTeamStats] = useState();

  useEffect(() => {
    try {
      getData(selectedTeam.team_id, selectedSeason.season_id);
    } catch (error) {
      console.log(error);
    }
  }, [selectedTeam, selectedSeason]);

  const getData = (team_id, season_id) => {
    getTeamStatsData(team_id, season_id)
      .then((data) => {
        setTeamStats(...data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="team-container">
      <h2 className="team-title">Team Statistics</h2>
      {selectedTeam ? (
        <div className="stats-table">
          <h3 className="team-title">{selectedTeam.name}</h3>
          {teamStats ? (
            <div className="team-stats">
              <div className="stat-item">
                <span className="stat-title">Matches Played:</span>
                <span className="stat-title">{teamStats.matches_played}</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Wins:</span>
                <span className="stat-title">{teamStats.wins}</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Draws:</span>
                <span className="stat-title">{teamStats.draws}</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Losses:</span>
                <span className="stat-title">{teamStats.losses}</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Points:</span>
                <span className="stat-title">{teamStats.points}</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Place:</span>
                <span className="stat-title">{teamStats.place}</span>
              </div>
            </div>
          ) : (
            <p className="loading-message">Loading team statistics...</p>
          )}
        </div>
      ) : (
        <p className="no-team-selected">No team selected</p>
      )}
    </div>
  );
};

export default Team;
