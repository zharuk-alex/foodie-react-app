import React from "react";
import css from "./RecipeCard.module.css";
import clsx from "clsx";
import { Btn, Icon, Avatar } from "components/UI";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe = {}, className = "" }) => {
  const { id, thumb, title, description, ownerAvatar, ownerName } =
    recipe ?? {};
  const navigate = useNavigate();

  const handleClickFav = () => {
    console.log("handle click fav", id);
  };

  const handleClickAvatar = () => {
    console.log("handle click profile", id);
    // SignInModal || userPage
  };

  return (
    <div className={clsx(css.card, className)}>
      <img className={css.img} src={thumb} alt="" />
      <p className={css.title}>{title}</p>
      <p className={css.text}>{description}</p>
      <div className={css.actions}>
        <button className={css.profileLink} onClick={handleClickAvatar}>
          <Avatar
            src={ownerAvatar}
            placeholder={ownerName}
            className={css.avatar}
          >
            {ownerName && <span>{ownerName}</span>}
          </Avatar>
        </button>
        <div className={css.actionBtns}>
          <Btn className={css.btn} variant="btn-icon" onClick={handleClickFav}>
            <Icon name="icon-heart" size="18" />
          </Btn>
          <Btn
            className={css.btn}
            variant="btn-icon"
            onClick={() => navigate(`/recipe/${id}`)}
          >
            <Icon name="icon-arrow-up-right" size="18" color="#000" />
          </Btn>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
