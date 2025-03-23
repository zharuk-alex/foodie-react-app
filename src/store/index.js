import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./auth/slice.js";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  // devTools: import.meta.env.MODE === "development",
});
