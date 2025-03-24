import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { initialState } from "./initialState.js";
import { loginThunk, registerThunk } from "./operations.js";

const usersSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.currentUser = payload.user;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.currentUser = payload.user;
        state.isLoggedIn = true;
      })
      .addMatcher(
        isAnyOf(registerThunk.pending, loginThunk.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(registerThunk.rejected, loginThunk.rejected),
        (state, action) => {
          state.isLoading = false;
          state.isLoggedIn = false;
          state.error = action.payload;
          state.token = null;
          state.currentUser = {};
          state.fullUserDetails = {};
          state.followers = [];
          state.following = [];
        }
      ),
});

export const usersReducer = usersSlice.reducer;
