import { Btn, Chip, Icon } from "components/UI";
import css from "./CategoryItem.module.css";
import clsx from "clsx";

const CategoryItem = ({ category, className = "", onClick }) => {
  // TODO - REPLACE IT !!!
  const placeholder = `/src/images/categories/${category.name}.webp`;

  return (
    <div
      className={clsx(css.card, className)}
      style={{
        backgroundImage: `url(${category.imageUrl ?? placeholder})`,
      }}
    >
      <div className={css.backdrop}></div>
      <div className={css.actions}>
        <Chip className={css.chip} label={category.name} />
        <Btn variant="btn-icon" onClick={() => onClick(category.id)}>
          <Icon name="icon-arrow-up-right" size="18" color="#fff" />
        </Btn>
      </div>
    </div>
  );
};

export default CategoryItem;
