import axios from "axios";

const API_URL = "http://localhost:3001/team";

export const getTeamBySeason = async (seasonId) => {
  try {
    const response = await axios.get(`${API_URL}?seasonId=${seasonId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching team data:", error);
  }
};

export const getTeamWinner = async () => {
  try {
    const response = await axios.get(`${API_URL}/winner`);
    return response.data;
  } catch (error) {
    console.error("Error fetching team data:", error);
  }
};

export const getTeamLoser = async () => {
  try {
    const response = await axios.get(`${API_URL}/loser`);
    return response.data;
  } catch (error) {
    console.error("Error fetching team data:", error);
  }
};
