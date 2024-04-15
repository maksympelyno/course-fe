import { useContext, useState, useEffect } from "react";
import { LeagueContext } from "../context/LeagueContext.js";
import { getTeamStatsData } from "../services/TeamStatsService.js";

const Team = () => {
  const { selectedTeam, selectedSeason } = useContext(LeagueContext);

  const [teamStats, setTeamStats] = useState();

  useEffect(() => {
    getData(selectedTeam.team_id, selectedSeason.season_id);
    console.log(selectedTeam);
  }, [selectedTeam]);

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
    <div>
      <h2>Team Statistics</h2>
      {selectedTeam ? (
        <div>
          <h3>{selectedTeam.name}</h3>
          {teamStats ? (
            <div>
              <h4>Season {selectedSeason.name} Statistics:</h4>
              <p>Matches Played: {teamStats.matches_played}</p>
              <p>Wins: {teamStats.wins}</p>
              <p>Draws: {teamStats.draws}</p>
              <p>Losses: {teamStats.losses}</p>
              <p>Points: {teamStats.points}</p>
              <p>Place: {teamStats.place}</p>
            </div>
          ) : (
            <p>Loading team statistics...</p>
          )}
        </div>
      ) : (
        <p>No team selected</p>
      )}
    </div>
  );
};

export default Team;
