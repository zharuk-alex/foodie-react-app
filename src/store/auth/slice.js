import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { initialState } from "./initialState.js";
import { registerThunk } from "./operations.js";

const usersSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.current = payload.user;
        state.isLoggedIn = true;
      })
      .addMatcher(isAnyOf(registerThunk.pending), (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(
          registerThunk.rejected,
        ),
        (state, action) => {
          state.isLoading = false;
          state.isLoggedIn = false;
          state.error = action.payload;
        }
      ),
});

export const usersReducer = usersSlice.reducer;
