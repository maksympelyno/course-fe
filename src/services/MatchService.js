import axios from "axios";
import { saveAs } from "file-saver";

const API_URL = "http://localhost:3001/match";

export const getMatchData = async (seasonId) => {
  try {
    const role = sessionStorage.getItem("username");
    const response = await axios.get(`${API_URL}?seasonId=${seasonId}`, {
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

export const getMatchesWithoutStatistics = async () => {
  try {
    const role = sessionStorage.getItem("username");
    const response = await axios.get(`http://localhost:3001/match/withoutStats`, {
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

export const createMatch = async ({ season_id, hometeam_id, awayteam_id, stadium, date }) => {
  const role = sessionStorage.getItem("username");
  const data = { season_id, hometeam_id, awayteam_id, stadium, date };

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

export const deleteMatch = async (matchId) => {
  try {
    const role = sessionStorage.getItem("username");
    const response = await axios.delete(`${API_URL}/${matchId}`, {
      headers: {
        Role: role.toLowerCase(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting match:", error);
    throw new Error("Something went wrong while deleting match");
  }
};

export const createAndDownloadFile = async (fileType) => {
  try {
    let endpoint = `${API_URL}/create-pdf`;
    let fileName = "matches.pdf";
    let responseType = "application/pdf";

    if (fileType === "json") {
      endpoint = `${API_URL}/create-json`;
      fileName = "matches.json";
      responseType = "application/json";
    }

    await axios.post(endpoint);
    const res = await axios.get(`${API_URL}/fetch-${fileType}`, {
      responseType: "blob",
    });
    const fileBlob = new Blob([res.data], {
      type: `aplication/${responseType}`,
    });

    saveAs(fileBlob, fileName);
    return true;
  } catch (error) {
    console.error("Error creating or downloading file:", error);
    throw error;
  }
};
