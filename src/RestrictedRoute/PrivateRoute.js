import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
function PrivateRoute({ children }) {
  let navigate = useNavigate();
  const isMyTokenExpired = isExpired(localStorage.getItem("token"));

  useEffect(() => {
    if (isMyTokenExpired === false) {
      navigate("/");
    }
  }, []); // on render will check if token is expired

  if (isMyTokenExpired === true) {
    return children;
  }
}

export default PrivateRoute;
