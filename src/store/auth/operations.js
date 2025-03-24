import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES } from "../../api/constants/API_ROUTES.js";
import { api, setToken } from "../../api/configApi.js";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (body, { rejectWithValue }) => {
    try {
      const { data: result } = await api.post(API_ROUTES.USERS.REGISTER, body);
      setToken(result.data.token);
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (body, { rejectWithValue }) => {
    try {
      const { data: result } = await api.post(API_ROUTES.USERS.LOGIN, body);
      setToken(result.data.token);
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
