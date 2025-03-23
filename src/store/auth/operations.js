import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES } from "../../api/constants/API_ROUTES.js";
import { api, setToken } from "../../api/configApi.js";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.post(API_ROUTES.USERS.REGISTER, body);
      return data?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
