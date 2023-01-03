import { combineReducers } from "redux";
import reducerMovies from "./reducerMovie";

const rootReducer = combineReducers({
  infoMovies: reducerMovies,
});

export default rootReducer;