import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import uiReducer from "./uiSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  data: dataReducer,
  ui: uiReducer,
});
const persistConfig = {
  key: "root",
  whitelist: ["data"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
