import React, { useState } from "react";
import "../styles/AddModal.css";
import { editMatchStatistics } from "../services/MatchStatisticsService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditMatchStatModal = ({ onClose, matchStatistics }) => {
  const [matchStats, setMatchStats] = useState({
    ...matchStatistics,
  });

  const handleEdit = async () => {
    try {
      if (
        matchStats.match_id === "" ||
        matchStats.hometeam_score === "" ||
        matchStats.awayteam_score === "" ||
        matchStats.possession === "" ||
        matchStats.hometeam_shot === "" ||
        matchStats.awayteam_shot === ""
      ) {
        toast.error("Please enter all data.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        await editMatchStatistics(matchStats);
        toast.success("Match statistics editted successfully.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        onClose(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while editting match statistics.", {
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
            <p className="head-text text-style">Edit Match Statistics</p>

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
            <button className="button-modal text-style" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMatchStatModal;
