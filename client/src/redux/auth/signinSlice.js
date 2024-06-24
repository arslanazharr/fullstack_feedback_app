/* eslint-disable no-unused-vars */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const signin = createAsyncThunk("signin", async (obj) => {
  const response = await axios.post("http://localhost:3001/api/signin", obj);
  return response.data;
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
