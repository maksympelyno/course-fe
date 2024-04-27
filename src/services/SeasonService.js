import axios from "axios";

const API_URL = "http://localhost:3001/season";

export const getSeasonData = async (id) => {
  try {
    const role = sessionStorage.getItem("username");
    const response = await axios.get(`${API_URL}?leagueId=${id}`, {
      headers: {
        Role: role.toLowerCase(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching league data:", error);
  }
};

export const getAllSeason = async () => {
  try {
    const role = sessionStorage.getItem("username");
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Role: role.toLowerCase(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching league data:", error);
  }
};
