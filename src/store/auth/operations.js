import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES } from "../../api/constants/API_ROUTES.js";
import { api, clearToken, setToken } from "../../api/configApi.js";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (body, { rejectWithValue }) => {
    try {
      const { data: response } = await api.post(
        API_ROUTES.USERS.REGISTER,
        body
      );
      setToken(response.data.token);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (body, { rejectWithValue }) => {
    try {
      const { data: response } = await api.post(API_ROUTES.USERS.LOGIN, body);
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (__, { rejectWithValue, dispatch, getState }) => {
    try {
      const token = getState().auth.token;
      setToken(token);
      const response = await api.post(API_ROUTES.USERS.LOGOUT);
      if (response.status === 204 || response.status === 200) {
        clearToken();
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
