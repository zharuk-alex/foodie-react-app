import { useDispatch } from "react-redux";
import { registerThunk } from "../../store/auth/operations.js";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      registerThunk({
        name: "Ivo",
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
