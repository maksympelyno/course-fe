import React, { useContext, useState, useEffect } from "react";
import { LeagueContext } from "../context/LeagueContext";
import { getMatchData, deleteMatch, createAndDownloadFile } from "../services/MatchService";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import MatchModal from "./MatchModal";
import "../styles/Match.css";

const Match = () => {
  const { selectedSeason, setSelectedTeam } = useContext(LeagueContext);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [sortByDate, setSortByDate] = useState(true); // State to toggle sorting by date ascending

  const username = sessionStorage.getItem("username");

  const handleSortByDate = () => {
    setSortByDate(!sortByDate);
    const sortedMatches = [...matches]; // Копіюємо масив матчів, щоб не мутувати оригінальний
    if (sortByDate) {
      sortedMatches.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      sortedMatches.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setMatches(sortedMatches);
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  const handleDelete = (matchId) => {
    deleteMatch(matchId)
      .then((data) => {
        const updatedMatches = matches.filter((match) => match.match_id !== matchId);
        setMatches(updatedMatches);
        setSelectedMatch(null);
        toast.success("Match deleted successfully.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((error) => {
        toast.error("Cannot delete, try again.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
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

  const handleDownloadPDF = async () => {
    try {
      await createAndDownloadFile("pdf");
      toast.success("Matches downloaded successfully");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error(error.response?.data?.message || "Error downloading PDF");
    }
  };
  const handleDownloadJSON = async () => {
    try {
      await createAndDownloadFile("json");
      toast.success("Matches json downloaded successfully");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error(error.response?.data?.message || "Error downloading PDF");
    }
  };

  return (
    <div className="match-container">
      <ToastContainer />

      <div className="matches-container">
        <h2 className="season-heading">Season: {selectedSeason ? selectedSeason.name : "No season selected"}</h2>

        <div className="button-container">
          <button className="download-button" onClick={handleSortByDate}>
            Sort by {sortByDate ? "Newest" : "Oldest"}
          </button>
          {username === "admin" && (
            <>
              <button className="download-button" onClick={() => handleDownloadPDF()}>
                Download PDF
              </button>
              <button className="download-button" onClick={() => handleDownloadJSON()}>
                Download JSON
              </button>
            </>
          )}
        </div>

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
            {username === "admin" && (
              <button className="delete-button" onClick={() => handleDelete(match.match_id)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
      {selectedMatch && <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />}
    </div>
  );
};

export default Match;
