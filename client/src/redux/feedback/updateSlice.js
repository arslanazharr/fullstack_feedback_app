/* eslint-disable no-unused-vars */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const updateReview = createAsyncThunk(
  "updateReview",
  async ({ obj, id }) => {
    const response = await axios.put(
      `http://localhost:3001/api/edit/${id}`,
      obj
    );
    return response.data;
  }
);

const updateSlice = createSlice({
  name: "updateReview",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(updateReview.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(updateReview.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default updateSlice.reducer;
