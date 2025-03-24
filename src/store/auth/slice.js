import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { initialState } from "./initialState.js";
import {
  currentUserThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
} from "./operations.js";

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
      .addCase(logoutThunk.fulfilled, () => initialState)
      .addCase(currentUserThunk.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.currentUser = payload.user;
        state.isLoggedIn = true;
      })
      .addMatcher(
        isAnyOf(registerThunk.pending, loginThunk.pending, logoutThunk.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          registerThunk.rejected,
          loginThunk.rejected,
          logoutThunk.rejected
        ),
        (state, action) => {
          const { error } = state;
          Object.assign(state, initialState);
          state.error = action.payload ?? error;
        }
      ),
});

export const usersReducer = usersSlice.reducer;
