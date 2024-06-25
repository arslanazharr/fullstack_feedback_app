/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line no-undef
const BASE_URL = process.env.BASE_URL;

// Action
export const postReview = createAsyncThunk("postReview", async (obj) => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, obj);
    toast.success("Feedback Successful!");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

const postSlice = createSlice({
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

export default postSlice.reducer;
