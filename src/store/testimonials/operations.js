import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/testimonials`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
