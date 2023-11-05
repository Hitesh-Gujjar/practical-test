import { createStore } from "redux";
import messageReducer from "../Reducers/reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  validationMessage: messageReducer,
});

const store = createStore(rootReducer);

export default store;
