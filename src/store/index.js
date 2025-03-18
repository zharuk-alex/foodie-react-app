import { configureStore, createSlice } from "@reduxjs/toolkit";

// temporary
const tempSlice = createSlice({
  name: "temp",
  initialState: { message: "Hello Redux" },
  reducers: {
    updateMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { updateMessage } = tempSlice.actions;

export const store = configureStore({
  reducer: {
    temp: tempSlice.reducer, // temporary
  },
  devTools: process.env.NODE_ENV === "development",
});
