import fs from "node:fs";
import path from "node:path";
import express from "express";
import session from "express-session";
import { isProduction, SESSION_SECRET } from "./config/env.js";
import { connectDB } from "./db/connection.js";
import { ensureUserIndexes } from "./db/usersDB.js";
import { ensureApplicationIndexes } from "./db/applicationsDB.js";
import { ensureQuestionIndexes } from "./db/questionsDB.js";
import MongoSessionStore from "./db/sessionStore.js";
import passport from "./auth/passport.js";
import authRouter from "./routes/auth.js";
import applicationsRouter from "./routes/applications.js";
import questionsRouter from "./routes/questions.js";

if (!SESSION_SECRET) {
  throw new Error(
    "SESSION_SECRET is not set. Copy backend/.env.example to backend/.env and fill it in.",
  );
}

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

const app = express();
const sessionStore = new MongoSessionStore();

// Connects to MongoDB and creates indexes once per server instance.
// On Vercel the app runs as a serverless function, so this happens on
// the first request instead of at startup. If it fails, the next
// request tries again.
let ready = null;
function ensureReady() {
  if (!ready) {
    ready = (async () => {
      await connectDB();
      await Promise.all([
        ensureUserIndexes(),
        ensureApplicationIndexes(),
        ensureQuestionIndexes(),
        sessionStore.ensureIndexes(),
      ]);
    })().catch((err) => {
      ready = null;
      throw err;
    });
  }
  return ready;
}

// Vercel sits behind a proxy that terminates HTTPS.
app.set("trust proxy", 1);
app.use(async (req, res, next) => {
  await ensureReady();
  next();
});
app.use(express.json({ limit: "100kb" }));
app.use(
  session({
    name: "applied.sid",
    secret: SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: isProduction,
      maxAge: SEVEN_DAYS_MS,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);
app.use("/api/applications", applicationsRouter);
app.use("/api/questions", questionsRouter);
app.use("/api", (req, res) => {
  res.status(404).json({ error: "API route not found." });
});

// The React build lives in public/ (see frontend/vite.config.js). On
// Vercel those files are served by its CDN; this fallback returns
// index.html for app routes such as /applications, so refreshing a page
// or opening a link to it still loads the React app.
const indexHtml = path.join(process.cwd(), "public", "index.html");
app.get("/{*splat}", (req, res, next) => {
  if (!fs.existsSync(indexHtml)) return next();
  return res.sendFile(indexHtml);
});

// Express 5 forwards errors from async handlers here.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Request body is not valid JSON." });
  }
  return res.status(500).json({ error: "Something went wrong on the server." });
});

export default app;
