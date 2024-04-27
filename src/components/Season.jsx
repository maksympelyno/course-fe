import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LeagueContext } from "../context/LeagueContext";
import { getSeasonData } from "../services/SeasonService";
import "../styles/Season.css";

const Season = () => {
  const { selectedLeague, setSelectedSeason } = useContext(LeagueContext);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    try {
      getData(selectedLeague.league_id);
    } catch (error) {
      console.log(error);
    }
  }, [selectedLeague]);

  const getData = (league_id) => {
    getSeasonData(league_id)
      .then((data) => {
        setSeasons(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
  };

  return (
    <div className="center-container">
      <h2 className="season-heading">
        Seasons for League: {selectedLeague ? selectedLeague.name : "No league selected"}
      </h2>
      <ul className="season-list">
        {seasons.map((season) => (
          <li key={season.season_id} className="season-item">
            <Link to={`/match`} className="season-link" onClick={() => handleSeasonSelect(season)}>
              {season.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Season;
