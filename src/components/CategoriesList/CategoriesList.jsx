import css from "./CategoriesList.module.css";
import CategoryItem from "components/CategoryItem/CategoryItem";

import React from "react";
import clsx from "clsx";

const CategoriesList = ({
  categories,
  isShowAll,
  onClickCategory,
  onClickShowAll,
}) => {
  return (
    <ul className={css.itemsSet}>
      {categories.map((category, index) => {
        return (
          <li
            key={category.id}
            className={clsx(css.item, css[`item_${(index % 12) + 1}`] ?? "")}
          >
            <CategoryItem
              onClick={onClickCategory}
              category={category}
            ></CategoryItem>
          </li>
        );
      })}
      {!isShowAll && (
        <li className={clsx(css.item, css.showAll)} onClick={onClickShowAll}>
          All categories
        </li>
      )}
    </ul>
  );
};

export default CategoriesList;
