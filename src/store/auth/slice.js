import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { initialState } from "./initialState.js";
import {
  addToFollowingThunk,
  currentUserThunk,
  getFullUserDetailsThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
  updateAvatarThunk,
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
      .addCase(updateAvatarThunk.fulfilled, (state, { payload }) => {
        state.currentUser.avatarURL = payload.avatarURL;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addToFollowingThunk.fulfilled, (state, { payload }) => {
        state.following.pop(payload);
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
          getFullUserDetailsThunk.pending,
          updateAvatarThunk.pending,
          addToFollowingThunk.pending
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
          getFullUserDetailsThunk.rejected,
          updateAvatarThunk.rejected,
          addToFollowingThunk.rejected
        ),
        (state, action) => {
          const { error } = state;
          Object.assign(state, initialState);
          state.error = action.payload ?? error;
          state.isLoading = false;
        }
      ),
});

export const usersReducer = usersSlice.reducer;
