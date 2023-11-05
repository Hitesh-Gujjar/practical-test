export const setSuccess = (message) => ({
  type: "SET_SUCCESS",
  payload: message,
});

export const setError = (message) => ({
  type: "SET_ERROR",
  payload: message,
});

export const clearMessages = () => ({
  type: "CLEAR_MESSAGES",
});
