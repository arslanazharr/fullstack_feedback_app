/* eslint-disable no-unused-vars */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const deleteReview = createAsyncThunk("deleteReview", async (id) => {
  const response = await axios.delete(`http://localhost:3001/api/delete/${id}`);
  return response.data;
});

const deleteSlice = createSlice({
  name: "deleteReview",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteReview.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default deleteSlice.reducer;
