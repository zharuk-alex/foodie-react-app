import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ROUTES } from '../../api/constants/API_ROUTES.js';
import { api, setToken } from '../../api/configApi.js';

export const addToFollowingThunk = createAsyncThunk('auth/addToFollowing', async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    setToken(token);
    const { data: response } = await api.post(API_ROUTES.USERS.FOLLOW(id));
    return response?.data?.userId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const removeFromFollowingThunk = createAsyncThunk('auth/removeFromFollowing', async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    setToken(token);
    const { data: response } = await api.delete(API_ROUTES.USERS.UNFOLLOW(id));
    return response?.data?.userId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getFollowersThunk = createAsyncThunk('auth/getAllFollowers', async ({ id, page = 1, limit = 10 }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    setToken(token);
    const { data: response } = await api.get(API_ROUTES.USERS.FOLLOWERS(id), {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getFollowingThunk = createAsyncThunk('auth/getFollowing', async ({ page, limit }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    setToken(token);
    const { data: response } = await api.get(API_ROUTES.USERS.FOLLOWING, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});