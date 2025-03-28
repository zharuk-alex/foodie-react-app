import css from "./UserInfo.module.css";
import defaultAvatar from "images/avatar/default_avatar.jpg";

const UserInfo = ({ user, isOwnProfile, onAvatarChange }) => {
  if (!user) return null;

  const {
    avatarUrl,
    name,
    email,
    stats: { recipes = 0, favorites = 0, followers = 0, following = 0 } = {},
  } = user;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onAvatarChange) {
      onAvatarChange(file);
    }
  };

  return (
    <div className={css.userWrapper}>
      <div className={css.userInfo}>
        <div className={css.avatarWrapper}>
          <img
            src={avatarUrl || defaultAvatar}
            alt="User Avatar"
            className={css.avatar}
          />
          {isOwnProfile && (
            <label className={css.uploadLabel}>
              Change Avatar
              <input
                type="file"
                accept="image/*"
                className={css.fileInput}
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
        <div className={css.info}>
          <p className={css.name}>{name}</p>
          <ul className={css.stats}>
            <li>
              Email: <strong>{email}</strong>
            </li>
            <li>
              Added recipes: <strong>{recipes}</strong>
            </li>
            <li>
              Favorites: <strong>{favorites}</strong>
            </li>
            <li>
              Followers: <strong>{followers}</strong>
            </li>
            <li>
              Following: <strong>{following}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
