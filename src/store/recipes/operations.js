import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/configApi.js";

export const fetchCategories = createAsyncThunk(
  "recipes/fetchCatogories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/categories`);
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
      const response = await api.get(`/areas`);
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
      const response = await api.get(`/ingredients`);
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
      const response = await api.get(`/recipes/?${query}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
