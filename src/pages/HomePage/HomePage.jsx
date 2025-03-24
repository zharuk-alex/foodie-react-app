import { useDispatch, useSelector } from "react-redux";
import {
  currentUserThunk,
  getFullUserDetailsThunk,
  loginThunk,
  logoutThunk,
} from "../../store/auth/operations.js";
import { selectToken } from "../../store/auth/selectors.js";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectToken);

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
      </div>
    </>
  );
};

export default HomePage;
