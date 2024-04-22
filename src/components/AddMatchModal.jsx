import React, { useState, useEffect } from "react";
import "../styles/AddModal.css";
import { getAllSeason } from "../services/SeasonService";
import { getTeamBySeason } from "../services/TeamService";
import { createMatch } from "../services/MatchService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMatchModal = ({ onClose }) => {
  const [matchData, setMatchData] = useState({
    season_id: "",
    hometeam_id: "",
    awayteam_id: "",
    stadium: "",
    date: "",
  });

  const [seasons, setSeasons] = useState([]);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    getAllSeason()
      .then((data) => {
        setSeasons(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (matchData.season_id) {
      getTeamBySeason(matchData.season_id)
        .then((data) => {
          setClubs(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setClubs([]);
    }
  }, [matchData.season_id]);

  const checkTeams = () => {
    if (matchData.awayteam_id === matchData.hometeam_id) {
      return false;
    }
    return true;
  };

  const handleAdd = async () => {
    try {
      if (
        !matchData.season_id ||
        !matchData.hometeam_id ||
        !matchData.awayteam_id ||
        !matchData.stadium ||
        !matchData.date ||
        !checkTeams()
      ) {
        toast.error("Something wrong, enter all data.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        await createMatch(matchData);
        toast.success("Match created successfully.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        onClose(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while creating match.", {
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
            <p className="head-text text-style">Add Match</p>
            <div className="property-section">
              <label className="label text-style">Season:</label>
              <select
                className="text-select text-style"
                value={matchData.season_id}
                onChange={(e) => setMatchData({ ...matchData, season_id: e.target.value })}
              >
                <option value="">Select Season</option>
                {seasons.map((season, index) => (
                  <option key={index} value={season.season_id}>
                    {season.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="property-section">
              <label className="label text-style">Home Team:</label>
              <select
                className="text-select text-style"
                value={matchData.hometeam_id}
                onChange={(e) => setMatchData({ ...matchData, hometeam_id: e.target.value })}
                disabled={!matchData.season_id}
              >
                <option value="">Select Home Team</option>
                {clubs.map((club, index) => (
                  <option key={index} value={club.team_id}>
                    {club.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="property-section">
              <label className="label text-style">Away Team:</label>
              <select
                className="text-select text-style"
                value={matchData.awayteam_id}
                onChange={(e) => setMatchData({ ...matchData, awayteam_id: e.target.value })}
                disabled={!matchData.season_id}
              >
                <option value="">Select Away Team</option>
                {clubs.map((club, index) => (
                  <option key={index} value={club.team_id}>
                    {club.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="property-section">
              <label className="label text-style">Stadium:</label>
              <input
                className="text-input text-style"
                type="text"
                value={matchData.stadium}
                onChange={(e) => setMatchData({ ...matchData, stadium: e.target.value })}
              />
            </div>
            <div className="property-section">
              <label className="label text-style">Date:</label>
              <input
                className="text-input text-style"
                type="datetime-local"
                value={matchData.date}
                onChange={(e) => setMatchData({ ...matchData, date: e.target.value })}
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

export default AddMatchModal;
