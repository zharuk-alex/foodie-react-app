import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../store/auth/selectors.js';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { openLoginModal } from '../../store/modal/slice.js';

const PrivateRoute = ({ component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
    } 
  }, [ dispatch]);
    
  return isLoggedIn ? component : <Navigate to={redirectTo} replace />;
};
export default PrivateRoute;
