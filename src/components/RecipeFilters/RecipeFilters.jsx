import React from 'react';
import { Dropdown } from '../UI';
import clsx from 'clsx';

const RecipeFilters = ({ areas, ingredients, filters = {}, onChange, className = '' }) => {
  const areaOptions = [{ value: null, label: 'All areas' }, ...areas];
  const ingredientOptions = [{ value: null, label: 'All ingredients' }, ...ingredients];

  return (
    <div className={clsx(className)}>
      <Dropdown options={areaOptions} value={filters.area} onChange={val => onChange('area', val)} placeholder="Area" />
      <Dropdown options={ingredientOptions} value={filters.ingredient} onChange={val => onChange('ingredient', val)} placeholder="Ingredients" />
    </div>
  );
};

export default RecipeFilters;
