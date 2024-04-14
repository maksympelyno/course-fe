import axios from "axios";

const API_URL = "http://localhost:3001/league";

export const getLeagueData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching league data:", error);
  }
};

export const updateLeague = async (id, matchData) => {
  try {
    const url = `${API_URL}/${id}`;
    await axios.put(url, matchData);
  } catch (error) {
    console.error(`Error updating league with id ${id}:`, error);
    throw error;
  }
};

export const deleteLeague = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    if (response.status === 200) {
      return true;
    }
    throw new Error(`Error deleting league with id ${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const createLeague = async ({ country, name }) => {
  const data = {
    country,
    name,
  };

  try {
    await axios.post(API_URL, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
