import React, { createContext, useState } from "react";

export const LeagueContext = createContext();

export const LeagueProvider = ({ children }) => {
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <LeagueContext.Provider
      value={{
        selectedLeague,
        setSelectedLeague,
        selectedSeason,
        setSelectedSeason,
        selectedMatch,
        setSelectedMatch,
        selectedTeam,
        setSelectedTeam,
      }}
    >
      {children}
    </LeagueContext.Provider>
  );
};
