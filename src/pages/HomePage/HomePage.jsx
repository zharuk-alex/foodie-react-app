import { useDispatch, useSelector } from "react-redux";
import {
  addToFollowingThunk,
  currentUserThunk,
  getFullUserDetailsThunk,
  loginThunk,
  logoutThunk,
  updateAvatarThunk,
} from "../../store/auth/operations.js";
import { selectToken } from "../../store/auth/selectors.js";
import styles from "./HomePage.module.css";
import { useState } from "react";

const HomePage = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectToken);
  const [file, setFile] = useState(null);

  const handleClick = () => {
    dispatch(
      loginThunk({
        email: "ivo@gmail.com",
        password: "12345678",
      })
    );
  };

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  const handleCurrent = () => {
    dispatch(getFullUserDetailsThunk("B6DZ-1oEfXMBH_giWCuEq"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);

    dispatch(updateAvatarThunk(formData));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFollow = () => {
    dispatch(addToFollowingThunk("iddLLAtVZg2HXJkCXvJf8"));
  };

  const handleUnfollow = () => {
    console.log('unfollow');
    // dispatch();
  };

  return (
    <>
      <div className={styles["wrapper"]}>
        <button type="button" onClick={handleClick}>
          Login
        </button>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>

        <button type="button" onClick={handleCurrent}>
          Current user full details
        </button>

        <button type="button" onClick={handleFollow}>
          Follow
        </button>

        <button type="button" onClick={handleUnfollow}>
          Unfollow
        </button>
      </div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          accept="image/*"
          required
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
    </>
  );
};

export default HomePage;
