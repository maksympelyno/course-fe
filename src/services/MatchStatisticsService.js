import axios from "axios";

const API_URL = "http://localhost:3001/match-stats";

export const getMatchStatisticsData = async (matchId) => {
  try {
    const response = await axios.get(`${API_URL}?matchId=${matchId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching match data:", error);
    throw error;
  }
};

export const createMatchStatistics = async ({
  match_id,
  hometeam_score,
  awayteam_score,
  possession,
  hometeam_shot,
  awayteam_shot,
}) => {
  const data = {
    matchId: match_id,
    homeTeamScore: hometeam_score,
    awayTeamScore: awayteam_score,
    possession,
    homeTeamShot: hometeam_shot,
    awayTeamShot: awayteam_shot,
  };
  try {
    await axios.post(API_URL, data);
    return true;
  } catch (error) {
    throw error;
  }
};
