/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line no-undef
const BASE_URL = process.env.BASE_URL;
// Action
export const updateReview = createAsyncThunk(
  "updateReview",
  async ({ obj, id }) => {
    try {
      const response = await axios.put(`${BASE_URL}/edit/${id}`, obj);
      toast.success("Feedback Updated!");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
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
