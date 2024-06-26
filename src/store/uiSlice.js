import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "Fa",
  langOption: "fa-IR",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLang(state, action) {
      state.language = action.payload;
      state.langOption = action.payload === "En" ? "en-US" : "fa-IR";
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
