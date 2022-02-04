import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";
export function PrivateRoute({ path, ...props }) {
  const { isUserLogin} = useSelector(state=>state.users); 
  let location = useLocation();
  
  return isUserLogin ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}
