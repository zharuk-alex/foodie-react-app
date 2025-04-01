import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { initialState } from './initialState.js';
import {
  addToFollowingThunk,
  getFollowersThunk,
  getFollowingThunk,
  removeFromFollowingThunk,
} from './operations.js';

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const followersAndFollowingSlice = createSlice({
  name: 'followerAndFollowing',
  initialState,
  reducers: {
    cleanPagination: state => {
      state.pagination = { ...initialState.pagination };
    },
    cleanFollowers: state => {
      state.followers = [];
    },
    cleanFollowing: state => {
      state.following = [];
    },
  },
  extraReducers: builder =>
    builder
      .addCase(addToFollowingThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(removeFromFollowingThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getFollowersThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.followers = payload?.followers ?? [];
        state.total = payload?.totalItem;
        state.pagination.page = payload.page;
        state.pagination.limit = payload.limit;
        state.pagination.totalPages = payload.totalPage;
        state.pagination.hasNextPage = payload.hasNextPage;
        state.pagination.hasPreviousPage = payload.hasPreviousPage;
      })
      .addCase(getFollowingThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.following = payload?.following ?? [];
        state.total = payload?.totalItem;
        state.pagination.page = payload?.page;
        state.pagination.limit = payload.limit;
        state.pagination.totalPages = payload.totalPage;
        state.pagination.hasNextPage = payload.hasNextPage;
        state.pagination.hasPreviousPage = payload.hasPreviousPage;
      })
      .addMatcher(isAnyOf(addToFollowingThunk.pending, removeFromFollowingThunk.pending, getFollowersThunk.pending, getFollowingThunk.pending), handlePending)
      .addMatcher(
        isAnyOf(addToFollowingThunk.rejected, removeFromFollowingThunk.rejected, getFollowersThunk.rejected, getFollowingThunk.rejected),
        handleRejected
      ),
});

export const { cleanPagination, cleanFollowers, cleanFollowing } = followersAndFollowingSlice.actions;

export const followersAndFollowingSliceReducer = followersAndFollowingSlice.reducer;
