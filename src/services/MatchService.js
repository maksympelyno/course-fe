import axios from "axios";

const API_URL = "http://localhost:3001/match";

export const getMatchData = async (seasonId) => {
  try {
    const response = await axios.get(`${API_URL}?seasonId=${seasonId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching match data:", error);
    throw error;
  }
};

export const createMatch = async ({ season_id, hometeam_id, awayteam_id, stadium, date }) => {
  const data = {
    season_id,
    hometeam_id,
    awayteam_id,
    stadium,
    date,
  };

  try {
    await axios.post(API_URL, data);
    return true;
  } catch (error) {
    throw error;
  }
};
