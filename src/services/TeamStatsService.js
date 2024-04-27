import axios from "axios";

const API_URL = "http://localhost:3001/team-stats";

export const getTeamStatsData = async (teamId, seasonId) => {
  try {
    const role = sessionStorage.getItem("username");
    const response = await axios.get(`${API_URL}?teamId=${teamId}&&seasonId=${seasonId}`, {
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

export const getTeamStatsChart = async (teamChart) => {
  try {
    const role = sessionStorage.getItem("username");
    const response = await axios.get(`${API_URL}/chart?teamChart=${teamChart}`, {
      headers: {
        Role: role.toLowerCase(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching team stats data:", error);
    throw error;
  }
};
