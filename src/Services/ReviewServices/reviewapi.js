import API from "../../config/axios";

// ✅ Post a Review
export const postReview = async (eventId, {rating, comment }) => {
  try {
    const res = await API.post(`/api/v1/reviews/post-review/${eventId}`, {
            rating,
            comment
        });
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ Get All Reviews for an Event
export const getEventReviews = async (eventId) => {
  try {
    const res = await API.get(`/api/v1/reviews/AllReviews/${eventId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ Edit a Review
export const editReview = async (reviewId, {rating, comment}) => {
  try {
    const res = await API.patch(`/api/v1/reviews/edit/${reviewId}`, {
      rating,
      comment
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ Delete a Review
export const deleteReview = async (reviewId) => {
  try {
    const res = await API.delete(`/api/v1/reviews/delete-review/${reviewId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
