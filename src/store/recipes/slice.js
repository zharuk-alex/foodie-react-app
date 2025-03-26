import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchCategories,
  fetchAreas,
  fetchRecipes,
  fetchIngredients,
  getOwnRecipesThunk,
  getFavoriteRecipesThunk,
  addRecipeThunk,
  removeRecipeThunk,
  getRecipeByIdThunk,
  getPopularRecipesThunk,
  addRecipeToFavoriteThunk,
  removeRecipeFromFavoriteThunk,
} from "./operations";
import { initialState } from "./initialState.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    clearCategories(state) {
      state.categories = [];
    },
    setAppendMode(state, action) {
      state.appendMode = action.payload;
    },
    cleanPagination: (state) => {
      state.pagination = { ...initialState.pagination };
    },
    cleanRecipes: (state) => {
      state.recipes = [];
    },
    cleanPopularRecipes: (state) => {
      state.popularRecipes = [];
    },
    cleanSingleRecipe: (state) => {
      state.singleRecipe = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categories = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAreas.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.areas = payload ?? [];
      })
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.ingredients = payload ?? [];
      })
      .addCase(fetchRecipes.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.recipes = payload?.recipes ?? [];
        state.total = payload?.total;
        if (payload?.recipes?.length > 0) {
          state.pagination.page = payload.page;
          state.pagination.limit = payload.limit;
          state.pagination.totalPages = payload.totalPage;
          state.pagination.hasNextPage = payload.hasNextPage;
          state.pagination.hasPreviousPage = payload.hasPreviousPage;
        }
      })
      .addCase(getRecipeByIdThunk.fulfilled, (state, { payload }) => {
        state.singleRecipe = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addRecipeThunk.fulfilled, (state, { payload }) => {
        state.singleRecipe = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(removeRecipeThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getPopularRecipesThunk.fulfilled, (state, { payload }) => {
        state.popularRecipes = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addRecipeToFavoriteThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(
        removeRecipeFromFavoriteThunk.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getOwnRecipesThunk.fulfilled,
          getFavoriteRecipesThunk.fulfilled
        ),
        (state, { payload }) => {
          state.recipes = payload?.recipes ?? [];
          if (payload.recipes?.length > 0) {
            state.pagination.page = payload.page;
            state.pagination.limit = payload.limit;
            state.pagination.totalPages = payload.totalPage;
            state.pagination.hasNextPage = payload.hasNextPage;
            state.pagination.hasPreviousPage = payload.hasPreviousPage;
          }
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          addRecipeThunk.pending,
          removeRecipeThunk.pending,
          getRecipeByIdThunk.pending,
          getPopularRecipesThunk.pending,
          getOwnRecipesThunk.pending,
          getFavoriteRecipesThunk.pending,
          addRecipeToFavoriteThunk.pending,
          removeRecipeFromFavoriteThunk.pending,
          fetchCategories.pending,
          fetchAreas.pending,
          fetchIngredients.pending,
          fetchRecipes.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          addRecipeThunk.rejected,
          removeRecipeThunk.rejected,
          getRecipeByIdThunk.rejected,
          getPopularRecipesThunk.rejected,
          getOwnRecipesThunk.rejected,
          getFavoriteRecipesThunk.rejected,
          addRecipeToFavoriteThunk.rejected,
          removeRecipeFromFavoriteThunk.rejected,
          fetchCategories.rejected,
          fetchAreas.rejected,
          fetchIngredients.rejected,
          fetchRecipes.rejected
        ),
        handleRejected
      );
  },
});

export const {
  clearCategories,
  setAppendMode,
  cleanPagination,
  cleanRecipes,
  cleanSingleRecipe,
  cleanPopularRecipes,
} = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
