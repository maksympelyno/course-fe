import React, { useState } from "react";
import "../styles/Search.css";
import footballerPhoto from "../assets/footballer.png";
import { getSearchResult } from "../services/SearchService";

const Search = () => {
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState([]);

  const getData = (query) => {
    getSearchResult(query)
      .then((data) => {
        setPlayers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSearch = async () => {
    try {
      getData(query);
    } catch (error) {
      console.error("Error searching players:", error);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Players</h2>
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter player name"
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="players-list">
        {players.map((player) => (
          <div key={player.id} className="player-item">
            <img src={footballerPhoto} alt={player.name} />
            <div>
              <p className="player-title">
                {player.name} : {player.position}
              </p>
              <p className="player-title-team">{player.Team.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
