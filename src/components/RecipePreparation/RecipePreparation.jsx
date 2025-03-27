import React from "react";
import css from "./RecipePreparation.module.css";
export default function RecipePreparation({ id,instructions, isFavorite,onChangeFavorite }) {
  return (
    <div className={css.card}>
      <h2 className={css.title}>Recipe Preparation</h2>
      <p className={css.content}>{instructions}</p>
      <button className={css.button} onClick={()=>{onChangeFavorite(id,isFavorite)}}> {isFavorite ? `REMOVE FROM FAVORITES` : `ADD TO FAVORITES`}</button>
    </div>
  );
}
