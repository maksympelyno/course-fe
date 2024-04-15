import React, { useState } from "react";
import axios from "axios";
import "../styles/Search.css";
const Search = () => {
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`YOUR_BACKEND_URL/search?query=${query}`);
      setPlayers(response.data);
    } catch (error) {
      console.error("Error searching players:", error);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Players</h2>
      <div>
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
      <div>
        {players.map((player) => (
          <div key={player.id} className="player-item">
            <img src={player.photo} alt={player.name} />
            <div>
              <p>Name: {player.name}</p>
              <p>Position: {player.position}</p>
              <p>Club: {player.club}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
