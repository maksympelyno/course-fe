import axios from "axios";

const API_URL = "http://localhost:3001/match-stats";

export const getMatchStatisticsData = async (matchId) => {
  try {
    const response = await axios.get(`${API_URL}?matchId=${matchId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching match data:", error);
    throw error;
  }
};
