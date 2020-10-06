import { combineReducers } from "redux";

import userReducer from "./userReducer";

//rootReducer is a root reducer function for TODO app
const rootReducer = combineReducers({ userReducer });

export default rootReducer;
