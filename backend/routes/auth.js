import express from "express";
import bcrypt from "bcryptjs";
import passport from "../auth/passport.js";
import { createUser, findUserByUsername, toPublicUser } from "../db/usersDB.js";

const router = express.Router();

const USERNAME_PATTERN = /^[a-z0-9_.-]{3,30}$/;

function logIn(req, user) {
  return new Promise((resolve, reject) => {
    req.login(user, (err) => (err ? reject(err) : resolve()));
  });
}

router.post("/register", async (req, res) => {
  const username = String(req.body?.username || "")
    .trim()
    .toLowerCase();
  const displayName = String(req.body?.displayName || "").trim();
  const password = String(req.body?.password || "");

  const errors = [];
  if (!USERNAME_PATTERN.test(username)) {
    errors.push(
      "Username must be 3-30 characters: letters, numbers, dots, dashes or underscores.",
    );
  }
  if (!displayName || displayName.length > 60) {
    errors.push("Display name is required (max 60 characters).");
  }
  if (password.length < 8 || password.length > 72) {
    errors.push("Password must be 8-72 characters.");
  }
  if (errors.length) return res.status(400).json({ error: errors.join(" ") });

  if (await findUserByUsername(username)) {
    return res.status(409).json({ error: "That username is already taken." });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = toPublicUser(
    await createUser({ username, displayName, passwordHash }),
  );
  await logIn(req, user);
  return res.status(201).json({ user });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: info?.message || "Login failed." });
    }
    try {
      await logIn(req, user);
      return res.json({ user });
    } catch (loginErr) {
      return next(loginErr);
    }
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("applied.sid");
      res.json({ ok: true });
    });
  });
});

router.get("/me", (req, res) => {
  res.json({ user: req.user || null });
});

export default router;
