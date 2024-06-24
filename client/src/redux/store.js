import { configureStore } from "@reduxjs/toolkit";
import reviews from "./feedback/fetchSlice";

export const store = configureStore({
  reducer: {
    reviews,
  },
});
