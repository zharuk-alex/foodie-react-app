import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./auth/slice.js";

export const store = configureStore({
  reducer: {
    auth: usersReducer,
  },
  // devTools: import.meta.env.MODE === "development",
});
