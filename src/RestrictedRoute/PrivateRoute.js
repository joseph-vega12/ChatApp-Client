import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
function PrivateRoute({ children }) {
  let navigate = useNavigate();
  const isMyTokenExpired = isExpired(localStorage.getItem("token"));

  useEffect(() => {
    if (isMyTokenExpired === true) {
      navigate("/login");
    }
  }); // will check if token is expired

  return children;
}

export default PrivateRoute;
