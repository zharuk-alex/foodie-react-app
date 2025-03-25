import React from "react";
import css from "./RecipeCard.module.css";
import clsx from "clsx";
import { Btn, Icon, Avatar } from "components/UI";
// Універсальний компонент, що містить:
//  - зображення страви
//  - назву рецепта
//  - опис рецепта
//  - інформацію про автора рецепта (що містить аватарку та його ім'я), яка  має бути реалізована у вигляді кнопки типу "button", по clickу на яку
//    - неавторизованому користувачеві слід відкривати модальне вікно Modal, що містить SignInModal
//    - авторизованого користувача слід перенаправити на сторінку UserPage з профілем автора
//  - кнопку типу "button" у вигляді іконки-серця, по clickу на яку користувач може або додати рецепт в список улюблених, або видалити з нього. Якщо цей рецепт вже додано до списку улюблених, іконка серця має підсвічуватись
//  - кнопку типу "button" у вигляді іконки-стрілочки, по clickу на яку користувача має перенаправляти на сторінку RecipePage

// areaId: "6462a6f04c3d0ddd28897fb2";
// categoryId: "6462a6cd4c3d0ddd28897f8d";
// createdAt: "2025-03-19T14:12:36.614Z";
// description: "A classic Caribbean dish featuring tender chicken pieces, slow-cooked with flavorful herbs and spices in a rich, brown gravy, served with rice and peas.";
// id: "6462a8f74c3d0ddd2889806b";
// instructions: "Squeeze lime over chicken and rub well. Drain off excess lime juice.\r\nCombine tomato, scallion, onion, garlic, pepper, thyme, pimento and soy sauce in a large bowl with the chicken pieces. Cover and marinate at least one hour.\r\nHeat oil in a dutch pot or large saucepan. Shake off the seasonings as you remove each piece of chicken from the marinade. Reserve the marinade for sauce.\r\nLightly brown the chicken a few pieces at a time in very hot oil. Place browned chicken pieces on a plate to rest while you brown the remaining pieces.\r\nDrain off excess oil and return the chicken to the pan. Pour the marinade over the chicken and add the carrots. Stir and cook over medium heat for 10 minutes.\r\nMix flour and coconut milk and add to stew, stirring constantly. Turn heat down to minimum and cook another 20 minutes or until tender.";
// ownerAvatar: null;
// ownerId: "64c8d958249fae54bae90bb9";
// ownerName: "GoIT";
// thumb: "https://ftp.goit.study/img/so-yummy/preview/Brown%20Stew%20Chicken.jpg";
// time: 90;
// title: "Brown Stew Chicken";
// updatedAt: "2025-03-19T14:12:36.614Z";

const RecipeCard = ({
  thumb,
  title,
  description,
  ownerAvatar,
  ownerName,
  className = "",
}) => {
  return (
    <div className={clsx(css.card, className)}>
      <img className={css.img} src={thumb} alt="" />
      <p className={css.title}>{title}</p>
      <p className={css.text}>{description}</p>
      <div className={css.actions}>
        <Avatar
          src={ownerAvatar}
          placeholder={ownerName}
          className={css.avatar}
        >
          {ownerName && <span>{ownerName}</span>}
        </Avatar>
        <div className={css.actionBtns}>
          <Btn
            className={css.btn}
            variant="btn-icon"
            onClick={() => onClick(category.id)}
          >
            <Icon name="icon-heart" size="18" />
          </Btn>
          <Btn
            className={css.btn}
            variant="btn-icon"
            onClick={() => onClick(category.id)}
          >
            <Icon name="icon-arrow-up-right" size="18" color="#000" />
          </Btn>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
