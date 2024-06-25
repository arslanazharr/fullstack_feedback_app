/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line no-undef
const BASE_URL = process.env.BASE_URL;

// Action
export const signin = createAsyncThunk("signin", async (obj) => {
  try {
    const response = await axios.post(`${BASE_URL}/signin`, obj);
    toast.success("Login Successful!");
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const signinSlice = createSlice({
  name: "signin",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(signin.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default signinSlice.reducer;
