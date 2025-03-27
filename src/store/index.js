import { configureStore } from "@reduxjs/toolkit";
import { recipesReducer } from "./recipes/slice";
import { testimonialsReducer } from "./testimonials/slice";
import { usersReducer } from "./auth/slice.js";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    testimonials: testimonialsReducer,
    auth: usersReducer,
  },
  devTools: import.meta.env.MODE === "development",
});
