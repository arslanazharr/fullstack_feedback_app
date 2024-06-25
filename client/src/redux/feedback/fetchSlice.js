/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line no-undef
const BASE_URL = process.env.BASE_URL;

// Action
export const fetchReviews = createAsyncThunk("fetchReviews", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

const fetchSlice = createSlice({
  name: "fetchReviews",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchReviews.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default fetchSlice.reducer;
