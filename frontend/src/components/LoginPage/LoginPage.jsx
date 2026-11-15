import { useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../../api/client.js";
import "./LoginPage.css";

const EMPTY_FORM = { username: "", displayName: "", password: "" };

export default function LoginPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isRegister = mode === "register";
  // RequireAuth sends people here with the page they wanted to open.
  const redirectTo = location.state?.from || "/applications";

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function switchMode() {
    setMode(isRegister ? "login" : "register");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { user } = isRegister
        ? await authApi.register(form)
        : await authApi.login({
            username: form.username,
            password: form.password,
          });
      onLogin(user);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <div className="page login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>{isRegister ? "Create your account" : "Log in to Applied"}</h1>
        <p className="muted">
          {isRegister
            ? "Your applications stay private to your account."
            : "Welcome back. Pick up where you left off."}
        </p>

        <div className="login-field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={30}
          />
        </div>

        {isRegister && (
          <div className="login-field">
            <label htmlFor="displayName">Display name</label>
            <input
              id="displayName"
              name="displayName"
              autoComplete="name"
              value={form.displayName}
              onChange={handleChange}
              required
              maxLength={60}
            />
            <small className="muted">Shown next to questions you share.</small>
          </div>
        )}

        <div className="login-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            value={form.password}
            onChange={handleChange}
            required
            minLength={isRegister ? 8 : undefined}
          />
          {isRegister && (
            <small className="muted">At least 8 characters.</small>
          )}
        </div>

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary login-submit"
          disabled={submitting}
        >
          {submitting
            ? "Please wait…"
            : isRegister
              ? "Create account"
              : "Log in"}
        </button>

        <p className="login-switch">
          {isRegister ? "Already have an account?" : "New to Applied?"}{" "}
          <button
            type="button"
            className="login-switch-button"
            onClick={switchMode}
          >
            {isRegister ? "Log in" : "Create an account"}
          </button>
        </p>
      </form>
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
