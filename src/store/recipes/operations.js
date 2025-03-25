import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

export const fetchCategories = createAsyncThunk(
  "recipes/fetchCatogories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/categories`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchAreas = createAsyncThunk(
  "recipes/fetchAreas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/areas`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchIngredients = createAsyncThunk(
  "recipes/fetchIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/ingredients`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (params, { rejectWithValue }) => {
    const query = new URLSearchParams(params).toString();
    try {
      const response = await axios.get(`/recipes/?${query}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
