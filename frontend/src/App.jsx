import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { authApi } from "./api/client.js";
import NavBar from "./components/NavBar/NavBar.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import LoginPage from "./components/LoginPage/LoginPage.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const navigate = useNavigate();

  // On first load, ask the server whether a session already exists.
  useEffect(() => {
    authApi
      .me()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setCheckingSession(false));
  }, []);

  async function handleLogout() {
    await authApi.logout();
    setUser(null);
    navigate("/");
  }

  if (checkingSession) {
    return <p className="page muted">Loading…</p>;
  }

  return (
    <>
      <NavBar user={user} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/login" element={<LoginPage onLogin={setUser} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
