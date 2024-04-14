import axios from "axios";

const API_URL = "http://localhost:3001/season";

export const getSeasonData = async (id) => {
  try {
    console.log(`${API_URL}?leagueId=${id}`);
    const response = await axios.get(`${API_URL}?leagueId=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching league data:", error);
  }
};
