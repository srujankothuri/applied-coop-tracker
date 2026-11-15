import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { userShape } from "../../utils/propShapes.js";
import "./NavBar.css";

export default function NavBar({ user, onLogout }) {
  const linkClass = ({ isActive }) =>
    isActive ? "navbar-link navbar-link-active" : "navbar-link";

  return (
    <header className="navbar">
      <nav className="navbar-inner" aria-label="Main">
        <Link to="/" className="navbar-brand">
          <img src="/applied-icon.svg" alt="" width="28" height="28" />
          Applied
        </Link>
        <ul className="navbar-links">
          <li>
            <NavLink to="/applications" className={linkClass}>
              My Applications
            </NavLink>
          </li>
          <li>
            <NavLink to="/questions" className={linkClass}>
              Question Bank
            </NavLink>
          </li>
        </ul>
        <div className="navbar-user">
          {user ? (
            <>
              <span className="navbar-greeting">Hi, {user.displayName}</span>
              <button
                type="button"
                className="btn btn-small"
                onClick={onLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-small btn-primary">
              Log in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

NavBar.propTypes = {
  user: userShape,
  onLogout: PropTypes.func.isRequired,
};
