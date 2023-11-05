const initialState = {
  status: "",
  Descriptions: "",
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, status: "error", Descriptions: action.payload };
    case "SET_SUCCESS":
      return { ...state, status: "success", Descriptions: action.payload };
    case "CLEAR_MESSAGES":
      return { ...state, status: "", Descriptions: "" };
    default:
      return state;
  }
};

export default messageReducer;
