import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { userShape } from "../../utils/propShapes.js";

// Sends logged-out visitors to the login page, remembering where they
// were going so they return there after logging in.
export default function RequireAuth({ user, children }) {
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}

RequireAuth.propTypes = {
  user: userShape,
  children: PropTypes.node.isRequired,
};
