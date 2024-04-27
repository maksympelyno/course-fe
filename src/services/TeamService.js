import axios from "axios";

const API_URL = "http://localhost:3001/team";

export const getTeamBySeason = async (seasonId) => {
  try {
    const role = sessionStorage.getItem("username");
    const response = await axios.get(`${API_URL}?seasonId=${seasonId}`, {
      headers: {
        Role: role.toLowerCase(),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTeamWinner = async () => {
  try {
    const role = sessionStorage.getItem("username");
    const response = await axios.get(`${API_URL}/winner`, {
      headers: {
        Role: role.toLowerCase(),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTeamLoser = async () => {
  try {
    const role = sessionStorage.getItem("username");
    const response = await axios.get(`${API_URL}/loser`, {
      headers: {
        Role: role.toLowerCase(),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
