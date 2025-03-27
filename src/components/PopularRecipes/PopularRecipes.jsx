import React, { useEffect } from "react";
import css from "./PopularRecipes.module.css";
import PopularRecipeCard from "../PopularRecipeCard/PopularRecipeCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecipeToFavoriteThunk,
  getPopularRecipesThunk,
  removeRecipeFromFavoriteThunk,
} from "../../store/recipes/operations";
import { selectPopularRecipes } from "../../store/recipes/selectors";
export default function PopularRecipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectPopularRecipes);

  const handleFavorite = (id, isFavorite) => {
    if (isFavorite) {
      dispatch(removeRecipeFromFavoriteThunk(id));
    } else {
      dispatch(addRecipeToFavoriteThunk(id));
    }
  };

  useEffect(() => {
    dispatch(getPopularRecipesThunk());
  }, []);

  return (
    <div className={css.card}>
      <h2 className={css.title}>Popular recipes</h2>
      <div className={css.items}>
        {recipes.map((recipe) => (
          <PopularRecipeCard key={recipe?.id} recipe={recipe} onChangeFavorite={handleFavorite} />
        ))}
      </div>
    </div>
  );
}
