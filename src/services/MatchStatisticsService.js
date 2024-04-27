import axios from "axios";

const API_URL = "http://localhost:3001/match-stats";

export const getMatchStatisticsData = async (matchId) => {
  try {
    const role = sessionStorage.getItem("username");
    const response = await axios.get(`${API_URL}?matchId=${matchId}`, {
      headers: {
        Role: role.toLowerCase(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching match data:", error);
    throw error;
  }
};

export const createMatchStatistics = async ({
  match_id,
  hometeam_score,
  awayteam_score,
  possession,
  hometeam_shot,
  awayteam_shot,
}) => {
  const role = sessionStorage.getItem("username");
  const data = {
    matchId: match_id,
    homeTeamScore: hometeam_score,
    awayTeamScore: awayteam_score,
    possession,
    homeTeamShot: hometeam_shot,
    awayTeamShot: awayteam_shot,
  };
  try {
    await axios.post(API_URL, data, {
      headers: {
        Role: role.toLowerCase(),
      },
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export const editMatchStatistics = async ({ matchstatistics_id, ...matchData }) => {
  try {
    const role = sessionStorage.getItem("username");
    await axios.put(`${API_URL}/${matchstatistics_id}`, matchData, {
      headers: {
        Role: role.toLowerCase(),
      },
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export const deleteMatchStatistics = async (matchStatId) => {
  try {
    const role = sessionStorage.getItem("username");
    const response = await axios.delete(`${API_URL}/${matchStatId}`, {
      headers: {
        Role: role.toLowerCase(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting search result:", error);
    throw new Error("Something went wrong while deleting search result");
  }
};
