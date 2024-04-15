import axios from "axios";

const API_URL = "http://localhost:3001/team-stats";

export const getTeamStatsData = async (teamId, seasonId) => {
  try {
    const response = await axios.get(`${API_URL}?teamId=${teamId}&&seasonId=${seasonId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching match data:", error);
    throw error;
  }
};
