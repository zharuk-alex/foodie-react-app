import React from 'react';
import css from './RecipeIngredients.module.css';
export default function RecipeIngredients({ ingredients }) {
  return (
    <div className={css.card}>
      <h2 className={css.title}>Ingredients</h2>
      <div className={css.items}>
        {ingredients?.map(ingredient => (
          <div key={ingredient?.id} className={css.item}>
            <div className={css.imgContainer}>
              <img className={css.img} src={ingredient?.img} alt="" />
            </div>
            <div className={css.itemContent}>
              <span className={css.name} title={ingredient?.name}>{ingredient?.name}</span>
              <span className={css.amount} title={ingredient?.measure}>{ingredient?.measure}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
