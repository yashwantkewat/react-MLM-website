import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: null,
  loading: false
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },

    fetchSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    },

    fetchFail: (state) => {
      state.loading = false;
    }
  }
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFail
} = dashboardSlice.actions;

export default dashboardSlice.reducer;