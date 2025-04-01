import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ROUTES } from '../../api/constants/API_ROUTES.js';
import { api, clearToken, setToken } from '../../api/configApi.js';

export const registerThunk = createAsyncThunk('auth/register', async (body, { rejectWithValue }) => {
  try {
    const { data: response } = await api.post(API_ROUTES.USERS.REGISTER, body);
    setToken(response.data.token);
    return response?.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Server Response:', error.response?.data);
    return rejectWithValue(errorMessage);
  }
});

export const loginThunk = createAsyncThunk('auth/login', async (body, { rejectWithValue }) => {
  try {
    const { data: response } = await api.post(API_ROUTES.USERS.LOGIN, body);
    setToken(response?.data?.token);
    return response?.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logoutThunk = createAsyncThunk('auth/logout', async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.token;
    setToken(token);
    const response = await api.post(API_ROUTES.USERS.LOGOUT);
    if (response.status === 204 || response.status === 200) {
      clearToken();
    } else {
      throw new Error('Logout failed');
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const currentUserThunk = createAsyncThunk('auth/current', async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    setToken(token);
    const { data: response } = await api.get(API_ROUTES.USERS.CURRENT_USER);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getFullUserDetailsThunk = createAsyncThunk('auth/fullUserDetails', async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    setToken(token);
    const { data: response } = await api.get(API_ROUTES.USERS.FULL_INFO(id));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateAvatarThunk = createAsyncThunk('auth/updateAvatar', async (avatar, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    setToken(token);
    const { data: response } = await api.patch(API_ROUTES.USERS.AVATAR, avatar, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});