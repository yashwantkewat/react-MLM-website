import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// 📥 FETCH ALL KYC
export const fetchAllKYC = createAsyncThunk(
  "kyc/fetchAllKYC",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/kyc/all");
      return res.data.kycs;
      console.log("API RESPONSE:", res.data.kycs); // 🔥 ADD THIS

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load KYC"
      );
    }
  }
);

// 🛠 UPDATE STATUS
export const updateKYCStatus = createAsyncThunk(
  "kyc/updateKYCStatus",
  async ({ userId, status }, thunkAPI) => {
    try {
      await api.put("/kyc/update-status", {
        userId,
        status
      });

      return { userId, status };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update"
      );
    }
  }
);

const kycSlice = createSlice({
  name: "kyc",
  initialState: {
    list: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // 📥 FETCH ALL
      .addCase(fetchAllKYC.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllKYC.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllKYC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🛠 UPDATE STATUS
      .addCase(updateKYCStatus.fulfilled, (state, action) => {
        const { userId, status } = action.payload;

        const index = state.list.findIndex(
          (item) => item.user_id === userId
        );

        if (index !== -1) {
          state.list[index].status = status;
        }
      });
  }
});

export default kycSlice.reducer;