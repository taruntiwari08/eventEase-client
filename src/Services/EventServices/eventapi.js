import API from "../../config/axios";

export const getAllEvents = async () => {
  try {
    const response = await API.get("/api/v1/events/all-events");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const getEventById = async (eventId) => {
  try {
    const response = await API.get(`/api/v1/events/event/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const createEvent = async (formData) => {
  try {
    const token = localStorage.getItem("accessToken");
    if(!token){
      console.log("User not logged in");
      return
    }
    const response = await API.post("/api/v1/events/create-event", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Update event (with optional image upload)
export const updateEvent = async (eventId, formData) => {
  try {
    const token = localStorage.getItem("accessToken");
    if(!token){
      console.log("User not logged in");
      return
    }    
    const response = await API.put(`/api/v1/events/update-event/${eventId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const token = localStorage.getItem("accessToken");
    if(!token){
      console.log("User not logged in");
      return
    }    
    const response = await API.delete(`/api/v1/events/delete-event/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const getEventAnalytics = async (eventId) => {
  try {
    const token = localStorage.getItem("accessToken");
    if(!token){
      console.log("User not logged in");
      return
    }
    const response = await API.get(`/api/v1/events/analytics/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const deleteEventbyAdmin = async (eventId) => {
  try {
    const response = await API.delete(`/api/v1/events/admin/delete-event/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}