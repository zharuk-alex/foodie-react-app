import css from "./RecipeDetailPage.module.css";
import PathInfoElement from "../../components/PathInfoElement/PathInfoElement";
import RecipeInfo from "../../components/RecipeInfo/RecipeInfo";
import PopularRecipes from "../../components/PopularRecipes/PopularRecipes";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSingleRecipe } from "../../store/recipes/selectors";
import { getRecipeByIdThunk } from "../../store/recipes/operations";
import { selectIsLoggedIn } from "../../store/auth/selectors";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector(selectSingleRecipe);
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    dispatch(getRecipeByIdThunk(id));
  }, [id,isLoggedIn]);

  return (
    <div className={css.main}>
      <PathInfoElement activePath={recipe?.title} />
      <RecipeInfo recipe={recipe} isLoggedIn={isLoggedIn}/>
      <PopularRecipes />
    </div>
  );
};

export default RecipeDetailPage;
