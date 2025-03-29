import React from 'react';
import css from './RecipeCard.module.css';
import clsx from 'clsx';
import { Btn, Icon, Avatar } from 'components/UI';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'store/auth/selectors';
import { setModalLoginOpen } from 'store/modal/operations';
import { addRecipeToFavoriteThunk, removeRecipeFromFavoriteThunk } from 'store/recipes/operations';
import toast, { Toaster } from 'react-hot-toast';

const RecipeCard = ({ recipe = {}, className = '' }) => {
  const { id, thumb, title, description, ownerId, ownerAvatar, ownerName, isFavorite } = recipe ?? {};

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickFav = async () => {
    if (!isLoggedIn) {
      dispatch(setModalLoginOpen(true));
      return;
    }

    let result;
    try {
      if (isFavorite) {
        result = await dispatch(removeRecipeFromFavoriteThunk(id));
      } else {
        result = await dispatch(addRecipeToFavoriteThunk(id));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleClickAvatar = () => {
    isLoggedIn ? navigate(`/user/${ownerId}`) : dispatch(setModalLoginOpen(true));
  };

  return (
    <div className={clsx(css.card, className)}>
      <img className={css.img} src={thumb} alt="" />
      <p className={css.title}>{title}</p>
      <p className={css.text}>{description}</p>
      <div className={css.actions}>
        <button className={css.profileLink} onClick={handleClickAvatar}>
          <Avatar src={ownerAvatar} placeholder={ownerName} className={css.avatar}>
            {ownerName && <span>{ownerName}</span>}
          </Avatar>
        </button>
        <div className={css.actionBtns}>
          <Btn className={css.btn} variant="btn-icon" onClick={handleClickFav}>
            <Icon name="icon-heart" size="18" className={clsx(css.iconFav, isFavorite && css.iconIsFav)} />
          </Btn>
          <Btn className={css.btn} variant="btn-icon" onClick={() => navigate(`/recipe/${id}`)}>
            <Icon name="icon-arrow-up-right" size="18" color="#000" />
          </Btn>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
