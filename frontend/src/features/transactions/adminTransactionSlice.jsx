import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchAdminTransactions = createAsyncThunk(
  "adminTransactions/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/wallet-transactions");

      // ✅ backend sends users
      return res.data.transactions;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch"
      );
    }
  }
);

const adminTransactionSlice = createSlice({
  name: "adminTransactions",
  initialState: {
    list: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminTransactions.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAdminTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })

      .addCase(fetchAdminTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default adminTransactionSlice.reducer;