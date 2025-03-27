import React from "react";
import css from "./RecipeMainInfo.module.css";
export default function RecipeMainInfo({ recipe }) {
  return (
    <div className={css.card}>
      <h2 className={css.title}>{recipe?.title}</h2>
      <div className={css.infos}>
        <span className={css.info}>{recipe?.category}</span>
        <span className={css.info}>{`${recipe?.time} min`}</span>
      </div>
      <p className={css.text}>{recipe?.description}</p>
      <div className={css.userContainer}>
        <img className={css.userAvatar} src={`${recipe?.ownerAvatar || 'https://placehold.co/32x32'}`} alt="" />
        <div className={css.userDetails}>
          <span className={css.userDetailName}>Created by:</span>
          <span className={css.userDetailValue}>{recipe?.ownerName}</span>
        </div>
      </div>
    </div>
  );
}
