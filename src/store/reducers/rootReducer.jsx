import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import columnReducer from "./columnReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  columns: columnReducer
});

export default rootReducer;
