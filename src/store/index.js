import { configureStore } from "@reduxjs/toolkit";
import { recipesReducer } from "./recipes/slice";
import { testimonialsReducer } from "./testimonials/slice";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    testimonials: testimonialsReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});
