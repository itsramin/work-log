import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  editId: null,
  deleteId: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    add(state, action) {
      state.list.unshift(action.payload);
    },
    delete(state, action) {
      state.list = state.list.filter((item) => item.id !== action.payload.id);
      state.deleteId = null;
    },
    edit(state, action) {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      state.list[index] = action.payload;
      state.editId = null;
    },

    setEditId(state, action) {
      state.editId = action.payload.id;
    },
    clearEditId(state) {
      state.editId = null;
    },
    setDeleteId(state, action) {
      state.deleteId = action.payload.id;
    },
    clearDeleteId(state) {
      state.deleteId = null;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice.reducer;
