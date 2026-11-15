import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import {
  findUserById,
  findUserByUsername,
  toPublicUser,
} from "../db/usersDB.js";

const INVALID_LOGIN = { message: "Incorrect username or password." };

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await findUserByUsername(username);
      if (!user) return done(null, false, INVALID_LOGIN);
      const matches = await bcrypt.compare(password, user.passwordHash);
      if (!matches) return done(null, false, INVALID_LOGIN);
      return done(null, toPublicUser(user));
    } catch (err) {
      return done(err);
    }
  }),
);

// Only the user id is stored in the session; the user is reloaded
// from MongoDB on each request.
passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    done(null, user ? toPublicUser(user) : false);
  } catch (err) {
    done(err);
  }
});

export default passport;
