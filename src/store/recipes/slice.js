import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  fetchAreas,
  fetchRecipes,
  fetchIngredients,
} from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    total: 0,
    recipes: [],
    categories: [],
    areas: [],
    isLoading: false,
    error: null,
    appendMode: false,
  },
  reducers: {
    clearCategories(state) {
      state.categories = [];
    },
    setAppendMode(state, action) {
      state.appendMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, handlePending)
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categories = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, handleRejected)

      .addCase(fetchAreas.pending, handlePending)
      .addCase(fetchAreas.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.areas = payload ?? [];
      })
      .addCase(fetchAreas.rejected, handleRejected)

      .addCase(fetchIngredients.pending, handlePending)
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.ingredients = payload ?? [];
      })
      .addCase(fetchIngredients.rejected, handleRejected)

      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.recipes = payload?.recipes ?? [];
        state.total = payload?.total;
      })
      .addCase(fetchRecipes.rejected, handleRejected);
  },
});

export const { clearCategories, setAppendMode } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
