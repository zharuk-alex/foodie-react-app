import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { initialState } from "./initialState.js";
import {
  currentUserThunk,
  getFullUserDetailsThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
} from "./operations.js";

const usersSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(logoutThunk.fulfilled, () => initialState)
      .addCase(getFullUserDetailsThunk.fulfilled, (state, { payload }) => {
        state.fullUserDetails = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(
          registerThunk.fulfilled,
          loginThunk.fulfilled,
          currentUserThunk.fulfilled
        ),
        (state, { payload }) => {
          state.token = payload.token;
          state.currentUser = payload.user;
          state.isLoggedIn = true;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          registerThunk.pending,
          loginThunk.pending,
          logoutThunk.pending,
          currentUserThunk.pending,
          getFullUserDetailsThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          registerThunk.rejected,
          loginThunk.rejected,
          logoutThunk.rejected,
          currentUserThunk.rejected,
          getFullUserDetailsThunk.rejected
        ),
        (state, action) => {
          Object.assign(state, initialState);
          state.error = action.payload;
          state.isLoading = false;
        }
      ),
});

export const usersReducer = usersSlice.reducer;
