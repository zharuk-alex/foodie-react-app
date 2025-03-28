import React from "react";
import styles from "./ClearButton.module.css"; // Стилі для кнопки

const ClearButton = ({ onClick }) => {
  return (
    <button className={styles.clearButton} onClick={onClick}>
      <svg
        className={styles.icon}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <use href="#icon-trash-2" />
      </svg>
    </button>
  );
};

export default ClearButton;
