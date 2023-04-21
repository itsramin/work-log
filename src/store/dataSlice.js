import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  editId: null,
  deleteIds: null,
  date1Filter: null,
  date2Filter: null,
  statusFilter: null,
  sort: "Za",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    add(state, action) {
      state.list.unshift(action.payload);
    },
    delete(state, action) {
      state.list = state.list.filter(
        (item) => !action.payload.includes(item.id)
      );
      state.deleteIds = null;
    },
    edit(state, action) {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      state.list[index] = action.payload;
      state.editId = null;
    },
    import(state, action) {
      state.list = [...state.list, ...action.payload];
    },
    deleteAll(state) {
      state.list = [];
    },

    setEditId(state, action) {
      state.editId = action.payload.id;
    },
    clearEditId(state) {
      state.editId = null;
    },
    setDeleteIds(state, action) {
      state.deleteIds = action.payload;
    },
    clearDeleteIds(state) {
      state.deleteIds = null;
    },
    setDate1Filter(state, action) {
      state.date1Filter = action.payload;
    },
    clearDate1Filter(state) {
      state.date1Filter = null;
    },
    setDate2Filter(state, action) {
      state.date2Filter = action.payload;
    },
    clearDate2Filter(state) {
      state.date2Filter = null;
    },
    setStatusFilter(state, action) {
      state.statusFilter = action.payload;
    },
    clearStatusFilter(state) {
      state.statusFilter = null;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    clearSort(state) {
      state.sort = null;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice.reducer;
