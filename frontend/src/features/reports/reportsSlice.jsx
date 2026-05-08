import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchReports = createAsyncThunk(
  "reports/fetchReports",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/reports");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed"
      );
    }
  }
);

const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    report: {},
    recentTransactions: [],
    userReports: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload.report;
        state.recentTransactions =
          action.payload.recentTransactions || [];
        state.userReports =
          action.payload.userReports || [];
      })

      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default reportsSlice.reducer;