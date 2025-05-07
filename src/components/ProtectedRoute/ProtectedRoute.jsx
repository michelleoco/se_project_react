import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppContext from "../contexts/AppContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AppContext);
  return isLoggedIn ? children : <Navigate to="/" />; // Redirect to main page
}

export default ProtectedRoute;
