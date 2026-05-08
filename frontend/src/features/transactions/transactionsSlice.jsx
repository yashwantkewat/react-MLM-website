import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// 📥 FETCH TRANSACTIONS
export const fetchTransactions = createAsyncThunk(
  "transactions/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/wallet/history");
      return res.data.transactions;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch transactions"
      );
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default transactionsSlice.reducer;