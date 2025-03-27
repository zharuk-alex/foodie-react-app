import React from "react";
import css from "./PopularRecipeCard.module.css";
import { useNavigate } from "react-router-dom";
import Btn from "../UI/Btn/Btn";
import Icon from "../UI/Icon/Icon";
export default function PopularRecipeCard({ recipe, onChangeFavorite }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe?.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className={css.card}>
      <img className={css.image} src={recipe?.thumb} alt="" />
      <div className={css.content}>
        <h2 className={css.title}>{recipe?.title}</h2>
        <p className={css.description}>{recipe?.description}</p>
        <div className={css.bottomMenu}>
          <div className={css.userDetails}>
            <img className={css.avatar} src={recipe?.thumb} alt="" />
            <span className={css.name}>Ivetta</span>
          </div>
          <div className={css.buttons}>
            {recipe?.isFavorite ? (
              <Btn
                variant="btn-icon-active"
                onClick={() => {
                  onChangeFavorite(recipe?.id, recipe?.isFavorite);
                }}
              >
                <Icon name="icon-heart" size="18" color="#050505" />
              </Btn>
            ) : (
              <Btn
                variant="btn-icon"
                onClick={() => {
                  onChangeFavorite(recipe?.id, recipe?.isFavorite);
                }}
              >
                <Icon name="icon-heart" size="18" color="#050505" />
              </Btn>
            )}

            <Btn variant="btn-icon" onClick={handleClick}>
              <Icon name="icon-arrow-up-right" size="18" color="#050505" />
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
