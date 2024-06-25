/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line no-undef
const BASE_URL = process.env.BASE_URL;

// Action
export const deleteReview = createAsyncThunk("deleteReview", async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${id}`);
    toast.success("Feedback Removed!");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
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
