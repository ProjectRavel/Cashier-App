import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("user"); // Cek apakah user ada di localStorage


  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace /> // Redirect ke halaman login jika tidak ada user
  );
};

export default PrivateRoute;