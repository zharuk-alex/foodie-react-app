import clsx from "clsx";
import React from "react";
import css from "./Avatar.module.css";

const Avatar = ({
  src,
  srcSet = null,
  placeholder = "",
  children,
  className = "",
}) => {
  const firstLetter = placeholder?.trim().charAt(0).toUpperCase();

  return (
    <div className={clsx(css.wrapper, className)}>
      {src ? (
        <img
          src={src}
          srcSet={srcSet || undefined}
          alt="avatar"
          className={css.avatar}
        />
      ) : (
        <div className={clsx(css.avatar, css.placeholder)}>{firstLetter}</div>
      )}
      <div className={css.placeholder}>{children}</div>
    </div>
  );
};

export default Avatar;
