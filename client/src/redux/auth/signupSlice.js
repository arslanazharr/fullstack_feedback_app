/* eslint-disable no-unused-vars */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const signup = createAsyncThunk("signup", async (obj) => {
  const response = await axios.post("http://localhost:3001/api/signup", obj);
  return response.data;
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
