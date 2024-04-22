import axios from "axios";

const API_URL = "http://localhost:3001/search";

export const getSearchResult = async (search) => {
  try {
    const role = sessionStorage.getItem("username");
    const response = await axios.get(`${API_URL}?searchTerm=${search}`, {
      headers: {
        Role: role.toLowerCase(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching league data:", error);
    throw new Error("fuck");
  }
};
