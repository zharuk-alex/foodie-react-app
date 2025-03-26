import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/configApi.js";

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/testimonials`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
