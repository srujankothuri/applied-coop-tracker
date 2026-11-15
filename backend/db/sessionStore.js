import session from "express-session";
import { getCollection } from "./connection.js";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

// A small express-session store backed by the native MongoDB driver,
// so sessions survive server restarts without an extra library.
// MongoDB's TTL index deletes expired sessions automatically.
export default class MongoSessionStore extends session.Store {
  collection() {
    return getCollection("sessions");
  }

  async ensureIndexes() {
    await this.collection().createIndex(
      { expires: 1 },
      { expireAfterSeconds: 0 },
    );
  }

  expiryFor(sess) {
    return sess?.cookie?.expires
      ? new Date(sess.cookie.expires)
      : new Date(Date.now() + ONE_DAY_MS);
  }

  get(sid, callback) {
    this.collection()
      .findOne({ _id: sid, expires: { $gt: new Date() } })
      .then((doc) => callback(null, doc ? JSON.parse(doc.session) : null))
      .catch(callback);
  }

  set(sid, sess, callback) {
    this.collection()
      .updateOne(
        { _id: sid },
        {
          $set: {
            session: JSON.stringify(sess),
            expires: this.expiryFor(sess),
          },
        },
        { upsert: true },
      )
      .then(() => callback?.())
      .catch((err) => callback?.(err));
  }

  touch(sid, sess, callback) {
    this.collection()
      .updateOne({ _id: sid }, { $set: { expires: this.expiryFor(sess) } })
      .then(() => callback?.())
      .catch((err) => callback?.(err));
  }

  destroy(sid, callback) {
    this.collection()
      .deleteOne({ _id: sid })
      .then(() => callback?.())
      .catch((err) => callback?.(err));
  }
}
