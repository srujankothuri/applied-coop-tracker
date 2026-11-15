// Thin wrapper around fetch for the Express API. The session cookie is
// sent automatically because the frontend and API share one origin.
async function request(path, { method = "GET", body } = {}) {
  const response = await fetch(`/api${path}`, {
    method,
    credentials: "same-origin",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (response.status === 204) return null;

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(
      data.error || `Request failed (${response.status})`,
    );
    error.status = response.status;
    throw error;
  }
  return data;
}

export const authApi = {
  me: () => request("/auth/me"),
  login: (credentials) =>
    request("/auth/login", { method: "POST", body: credentials }),
  register: (details) =>
    request("/auth/register", { method: "POST", body: details }),
  logout: () => request("/auth/logout", { method: "POST" }),
};
