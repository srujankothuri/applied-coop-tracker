// Blocks API routes for visitors who are not logged in.
export default function requireAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ error: "Please log in to continue." });
}
