import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../store/auth/operations.js";
import { selectToken } from "../../store/auth/selectors.js";
import { useEffect } from "react";

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
  return (
    <>
      <button type="button" onClick={handleClick}>
        Register
      </button>
    </>
  );
};

export default HomePage;
