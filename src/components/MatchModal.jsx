import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { getMatchStatisticsData, deleteMatchStatistics } from "../services/MatchStatisticsService";
import EditMatchStatModal from "./EditMatchStatModal";
import { Link } from "react-router-dom";
import "../styles/MatchModal.css";
import { LeagueContext } from "../context/LeagueContext";

const MatchModal = ({ match, onClose }) => {
  const [matchStatistics, setMatchStatistics] = useState({});
  const { setSelectedTeam } = useContext(LeagueContext);
  const [showMatchStatsModal, setShowMatchStatsModal] = useState(false);

  const username = sessionStorage.getItem("username");

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  const handleDelete = (id) => {
    deleteMatchStatistics(id)
      .then((data) => {
        toast.success("Match statistics deleted successfully.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((error) => {
        toast.error("Cannot delete, try again.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
    onClose();
  };

  useEffect(() => {
    if (match) {
      getData(match.match_id);
    }
  }, [match, showMatchStatsModal]);

  const getData = (match_id) => {
    getMatchStatisticsData(match_id)
      .then((data) => {
        setMatchStatistics(...data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (!matchStatistics) {
    return <></>;
  }

  return (
    <div className="modal-match">
      <div className="modal-content-match">
        <span className="close-button" onClick={onClose}>
          ×
        </span>

        <div className="matches-container">
          <div className="match-item">
            <div className="team">
              {" "}
              <Link to="/team" onClick={() => handleTeamSelect(match.homeTeam)} className="team-link">
                {match.homeTeam.name}{" "}
              </Link>
            </div>

            <div className="match-details">
              <div className="team">
                {matchStatistics.hometeam_score}:{matchStatistics.awayteam_score}
              </div>
            </div>

            <div className="team">
              <Link to="/team" onClick={() => handleTeamSelect(match.awayTeam)} className="team-link">
                {match.awayTeam.name}
              </Link>
            </div>
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
          {username === "admin" && (
            <div className="button-container">
              <button className="edit-button" onClick={() => setShowMatchStatsModal(true)}>
                Edit 📝
              </button>
              <button className="delete-button" onClick={() => handleDelete(matchStatistics.matchstatistics_id)}>
                Delete ❌
              </button>
            </div>
          )}
        </div>
      </div>
      {showMatchStatsModal && (
        <EditMatchStatModal onClose={() => setShowMatchStatsModal(false)} matchStatistics={matchStatistics} />
      )}
    </div>
  );
};

export default MatchModal;
