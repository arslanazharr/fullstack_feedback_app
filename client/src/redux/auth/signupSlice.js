/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line no-undef
const BASE_URL = process.env.BASE_URL;

// Action
export const signup = createAsyncThunk("signup", async (obj) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, obj);
    toast.success("Signup Successful!");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default signupSlice.reducer;
