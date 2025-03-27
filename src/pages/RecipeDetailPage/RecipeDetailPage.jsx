import css from "./RecipeDetailPage.module.css";
import PathInfo from "../../components/PathInfo/PathInfo";
import RecipeInfo from "../../components/RecipeInfo/RecipeInfo";
import PopularRecipes from "../../components/PopularRecipes/PopularRecipes";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSingleRecipe } from "../../store/recipes/selectors";
import { getRecipeByIdThunk } from "../../store/recipes/operations";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeByIdThunk(id));
  }, [id]);

  const recipe = useSelector(selectSingleRecipe);

  return (
    <div className={css.main}>
      <PathInfo activePath={recipe?.title} />
      <RecipeInfo recipe={recipe} />
      <PopularRecipes />
    </div>
  );
};

export default RecipeDetailPage;
