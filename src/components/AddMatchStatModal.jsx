import React, { useState, useEffect } from "react";
import "../styles/AddModal.css";
import { createMatchStatistics } from "../services/MatchStatisticsService";
import { getMatchesWithoutStatistics } from "../services/MatchService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMatchStatModal = ({ onClose }) => {
  const [matches, setMatches] = useState([]);

  const [matchStats, setMatchStats] = useState({
    match_id: "",
    hometeam_score: "",
    awayteam_score: "",
    possession: "",
    hometeam_shot: "",
    awayteam_shot: "",
  });
  useEffect(() => {
    getMatchesWithoutStatistics()
      .then((data) => {
        setMatches(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAdd = async () => {
    try {
      if (
        !matchStats.match_id ||
        !matchStats.hometeam_score ||
        !matchStats.awayteam_score ||
        !matchStats.possession ||
        !matchStats.hometeam_shot ||
        !matchStats.awayteam_shot
      ) {
        toast.error("Please enter all data.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        await createMatchStatistics(matchStats);
        toast.success("Match statistics added successfully.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        onClose(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while adding match statistics.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <>
      <div className="modal">
        <div className="modal-window">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <div className="modal-content">
            <p className="head-text text-style">Add Match Statistics</p>
            <div className="property-section">
              <label className="label text-style">Match</label>
              <select
                className="text-select text-style"
                value={matches.match_id}
                onChange={(e) => setMatchStats({ ...matchStats, match_id: e.target.value })}
              >
                <option value="">Select Match</option>
                {matches.map((match, index) => (
                  <option key={index} value={match.match_id}>
                    {match.home_team_name}:{match.away_team_name}
                    {"   "}
                    {match.season_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="property-section">
              <label className="label text-style">Home Team Score:</label>
              <input
                className="text-input text-style"
                type="number"
                min="0"
                value={matchStats.hometeam_score}
                onChange={(e) => setMatchStats({ ...matchStats, hometeam_score: e.target.value })}
              />
            </div>
            <div className="property-section">
              <label className="label text-style">Away Team Score:</label>
              <input
                className="text-input text-style"
                type="number"
                min="0"
                value={matchStats.awayteam_score}
                onChange={(e) => setMatchStats({ ...matchStats, awayteam_score: e.target.value })}
              />
            </div>
            <div className="property-section">
              <label className="label text-style">Possession:</label>
              <input
                className="text-input text-style"
                type="number"
                min="0"
                step="0.1"
                value={matchStats.possession}
                onChange={(e) => setMatchStats({ ...matchStats, possession: e.target.value })}
              />
            </div>
            <div className="property-section">
              <label className="label text-style">Home Team Shots:</label>
              <input
                className="text-input text-style"
                type="number"
                min="0"
                value={matchStats.hometeam_shot}
                onChange={(e) => setMatchStats({ ...matchStats, hometeam_shot: e.target.value })}
              />
            </div>
            <div className="property-section">
              <label className="label text-style">Away Team Shots:</label>
              <input
                className="text-input text-style"
                type="number"
                min="0"
                value={matchStats.awayteam_shot}
                onChange={(e) => setMatchStats({ ...matchStats, awayteam_shot: e.target.value })}
              />
            </div>
            <button className="button-modal text-style" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMatchStatModal;
