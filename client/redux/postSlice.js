/* eslint-disable no-unused-vars */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const postReview = createAsyncThunk("postReview", async (obj) => {
  const response = await axios.post("http://localhost:3001/api/add", obj);
  return response.data;
});

const fetchSlice = createSlice({
  name: "postReview",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(postReview.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(postReview.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default fetchSlice.reducer;
