// import React, { useContext, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { LeagueContext } from "../context/LeagueContext";
// import { getMatchData } from "../services/MatchService";
// import "../styles/Match.css";

// const Match = () => {
//   const { selectedSeason, setSelectedMatch } = useContext(LeagueContext);
//   const [matches, setMatches] = useState([]);

//   useEffect(() => {
//     if (selectedSeason) {
//       getData(selectedSeason.season_id);
//     }
//   }, [selectedSeason]);

//   const getData = (season_id) => {
//     console.log(season_id);
//     getMatchData(season_id)
//       .then((data) => {
//         setMatches(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleMatchSelect = (match) => {
//     setSelectedMatch(match);
//   };

//   return (
//     <div className="match-container">
//       <h2 className="season-heading">Season: {selectedSeason ? selectedSeason.name : "No season selected"}</h2>
//       <div className="matches-container">
//         {matches.map((match) => (
//           <div key={match.match_id} className="match-item" onClick={() => handleMatchSelect(match)}>
//             <div className="team">{match.homeTeam.name}</div>
//             <div className="match-details">
//               <div className="stadium">{match.stadium}</div>
//               <div className="date">{new Date(match.date).toLocaleString()}</div>
//             </div>
//             <div className="team">{match.awayTeam.name}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Match;

import React, { useContext, useState, useEffect } from "react";
import { LeagueContext } from "../context/LeagueContext";
import { getMatchData } from "../services/MatchService";
import MatchModal from "./MatchModal";
import "../styles/Match.css";

const Match = () => {
  const { selectedSeason } = useContext(LeagueContext);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

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

  return (
    <div className="match-container">
      <h2 className="season-heading">Season: {selectedSeason ? selectedSeason.name : "No season selected"}</h2>
      <div className="matches-container">
        {matches.map((match) => (
          <div key={match.match_id} className="match-item" onClick={() => setSelectedMatch(match)}>
            <div className="team">{match.homeTeam.name}</div>
            <div className="match-details">
              <div className="stadium">{match.stadium}</div>
              <div className="date">{new Date(match.date).toLocaleString()}</div>
            </div>
            <div className="team">{match.awayTeam.name}</div>
          </div>
        ))}
      </div>
      {selectedMatch && <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />}
    </div>
  );
};

export default Match;
