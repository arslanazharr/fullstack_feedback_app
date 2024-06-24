import { configureStore } from "@reduxjs/toolkit";
import reviews from "./fetchSlice";

export const store = configureStore({
  reducer: {
    reviews,
  },
});
