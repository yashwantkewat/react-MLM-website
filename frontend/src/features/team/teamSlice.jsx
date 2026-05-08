import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchTeamTree = createAsyncThunk(
  "team/fetchTree",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/team/tree");
      return res.data.tree;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed"
      );
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState: {
    tree: null,
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamTree.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeamTree.fulfilled, (state, action) => {
        state.loading = false;
        state.tree = action.payload;
      })
      .addCase(fetchTeamTree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default teamSlice.reducer;