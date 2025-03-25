import React, { useEffect, useState } from "react";
import css from "./Recipes.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  selectLoading,
  selectError,
  selectRecipes,
  selectTotalRecipes,
  selectCategories,
  selectAreas,
  selectIngredients,
} from "store/recipes/selectors";
import {
  fetchAreas,
  fetchIngredients,
  fetchRecipes,
} from "store/recipes/operations";
import PageTitle from "../PageTitle/PageTitle";
import { Dropdown, Pagination, Icon, AppLoader } from "../UI";
import RecipeList from "../RecipeList/RecipeList";
import useScrollToElement from "../../hooks/useScrollToElement";

const Recipes = ({ activeCategory, onUpdateActiveCategory }) => {
  const dispatch = useDispatch();
  const scrollToElement = useScrollToElement();
  const isLoading = useSelector(selectLoading);
  const [filters, setFilters] = useState({});
  const rawRecipes = useSelector(selectRecipes);
  const recipes = rawRecipes.filter(
    (recipe) => recipe.categoryId === activeCategory.id
  );
  const rawAreas = useSelector(selectAreas);
  const rawIngredients = useSelector(selectIngredients);
  const totalRecipes = useSelector(selectTotalRecipes);
  const perPage = 12;
  const [page, setPage] = useState(1);
  const pages = Math.ceil(totalRecipes / perPage);

  const areas = [{ value: null, label: "All areas" }, ...rawAreas];
  const ingredients = [
    { value: null, label: "All ingredients" },
    ...rawIngredients,
  ];

  const pageTitle = {
    title: activeCategory.name,
    subtitle:
      "Lorem Ipsum je jednostavno probni tekst koji se koristi u tiskarskoj i slovoslagarskoj industriji. Lorem Ipsum postoji kao industrijski standard još od 16-og stoljeća,",
  };

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchAreas());
  }, [dispatch]);

  useEffect(() => {
    if (!activeCategory?.id) return;

    const hasFilters = Object.keys(filters).length > 0;

    const filtersValues = hasFilters
      ? Object.fromEntries(
          Object.entries(filters)
            .filter(([_, option]) => option?.value != null)
            .map(([key, option]) => [key, option.value])
        )
      : {};

    dispatch(
      fetchRecipes({
        category: activeCategory.id,
        limit: perPage,
        page,
        ...filtersValues,
      })
    );
    setTimeout(() => scrollToElement("homepage-categories"), 100);
  }, [filters, activeCategory?.id, page, dispatch]);

  const updateFilter = (key, option) => {
    setFilters((prev) => ({
      ...prev,
      [key]: option,
    }));
    setPage(1);
  };

  const handleBack = () => {
    onUpdateActiveCategory(null);
  };

  return (
    <>
      <button onClick={handleBack} className={css.backLink}>
        <Icon name="icon-arrow-left" size="12" color="#000" />
        Back
      </button>
      <PageTitle {...pageTitle} />
      <div className={css.wrapper}>
        <div className={css.filters}>
          <Dropdown
            options={areas}
            value={filters.area}
            onChange={(value) => updateFilter("area", value)}
            placeholder="Area"
          />
          <Dropdown
            options={ingredients}
            value={filters.ingredient}
            onChange={(value) => updateFilter("ingredient", value)}
            placeholder="Ingredients"
          />
        </div>
        <div>
          {isLoading && <AppLoader />}
          <RecipeList recipes={recipes} className={css.recipeList} />
          {pages > 1 && (
            <Pagination
              total={pages}
              current={page}
              onChange={(p) => setPage(p)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Recipes;
