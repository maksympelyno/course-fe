import React, { useState, useEffect } from "react";
import { getMatchStatisticsData } from "../services/MatchStatisticsService";
import "../styles/MatchModal.css";

const MatchModal = ({ match, onClose }) => {
  const [matchStatistics, setMatchStatistics] = useState({});

  useEffect(() => {
    if (match) {
      getData(match.match_id);
    }
  }, [match]);

  const getData = (match_id) => {
    getMatchStatisticsData(match_id)
      .then((data) => {
        setMatchStatistics(...data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (!matchStatistics) {
    return <></>;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          ×
        </span>

        <div className="matches-container">
          <div className="match-item">
            <div className="team">{match.homeTeam.name}</div>
            <div className="match-details">
              <div className="team">
                {matchStatistics.hometeam_score}:{matchStatistics.awayteam_score}
              </div>
            </div>
            <div className="team">{match.awayTeam.name}</div>
          </div>
          <div className="stats-item">
            <div className="team">{matchStatistics.possession}</div>
            <div className="match-details">
              <div className="team">Possesion</div>
            </div>
            <div className="team">{100.0 - matchStatistics.possession}</div>
          </div>
          <div className="stats-item">
            <div className="team">{matchStatistics.hometeam_shot}</div>
            <div className="match-details">
              <div className="team">Shot</div>
            </div>
            <div className="team">{matchStatistics.awayteam_shot}</div>
          </div>
          <div className="match-details">
            <div className="stadium">{match.stadium}</div>
            <div className="date">{new Date(match.date).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;
