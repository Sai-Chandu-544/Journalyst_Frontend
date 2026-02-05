import axios from "axios";

export const fetchAnalytics = async () => {
  try {
    const response = await axios.get("https://journalyst-backend-a2jc.onrender.com/api/analytics");
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
