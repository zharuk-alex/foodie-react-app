import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { initialState } from './initialState.js';
import {
  currentUserThunk,
  getFullUserDetailsThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
  updateAvatarThunk,
} from './operations.js';

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};


const usersSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    cleanFullUserDetails: state => {
      state.fullUserDetails = {};
    },
    updateFollowStatus: (state, action) => {
      if (state.fullUserDetails && state.fullUserDetails.id === action.payload.userId) {
        state.fullUserDetails.isFollowing = action.payload.isFollowing;
      }
    },
    forceLogout: () => initialState,
  },
  extraReducers: builder =>
    builder
      .addCase(logoutThunk.fulfilled, () => initialState)
      .addCase(getFullUserDetailsThunk.fulfilled, (state, { payload }) => {
        state.fullUserDetails = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateAvatarThunk.fulfilled, (state, { payload }) => {
        state.currentUser.avatarURL = payload.avatarURL;
        state.fullUserDetails.avatar = payload.avatarURL;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(isAnyOf(registerThunk.fulfilled, loginThunk.fulfilled, currentUserThunk.fulfilled), (state, { payload }) => {
        state.token = payload.token;
        state.currentUser = payload.user;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(
          registerThunk.pending,
          loginThunk.pending,
          logoutThunk.pending,
          currentUserThunk.pending,
          getFullUserDetailsThunk.pending,
          updateAvatarThunk.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          registerThunk.rejected,
          loginThunk.rejected,
          logoutThunk.rejected,
          currentUserThunk.rejected,
          getFullUserDetailsThunk.rejected,
          updateAvatarThunk.rejected
        ),
        handleRejected
      ),
});

export const {
  cleanFullUserDetails,
  forceLogout,
  updateFollowStatus,
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
