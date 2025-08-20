import API from "../../config/axios";

export const getChatHistory = async (eventId) => {
  try {
    const response = await API.get(`/api/v1/chat/chat-history/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}