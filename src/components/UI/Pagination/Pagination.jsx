import React from "react";
import css from "./Pagination.module.css";
import clsx from "clsx";

const Pagination = ({ total = 3, current = 1, onChange = () => {} }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className={css.pagination}>
      {pages.map((page) => (
        <button
          key={page}
          className={clsx(css.pageBtn, {
            [css.active]: page === current,
          })}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
