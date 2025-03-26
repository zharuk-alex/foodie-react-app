import css from "./UserInfo.module.css";
import defaultAvatar from "assets/images/default_avatar.jpg";

const UserInfo = ({ user, isOwnProfile, onAvatarChange }) => {
  if (!user) return null;

  const {
    avatarUrl,
    email,
    stats: {
      recipes = 0,
      favorites = 0,
      followers = 0,
      following = 0,
    } = {},
  } = user;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onAvatarChange) {
      onAvatarChange(file);
    }
  };

  return (
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
        <p className={css.email}><strong>Email:</strong> {email}</p>
        <ul className={cssstats}>
          <li><strong>Recipes:</strong> {recipes}</li>
          <li><strong>Favorites:</strong> {favorites}</li>
          <li><strong>Followers:</strong> {followers}</li>
          <li><strong>Following:</strong> {following}</li>
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
