import { getCollection, toObjectId } from "./connection.js";

const users = () => getCollection("users");

export async function ensureUserIndexes() {
  await users().createIndex({ username: 1 }, { unique: true });
}

export function findUserByUsername(username) {
  return users().findOne({ username: username.toLowerCase() });
}

export function findUserById(id) {
  const _id = toObjectId(id);
  return _id ? users().findOne({ _id }) : null;
}

export async function createUser({ username, displayName, passwordHash }) {
  const doc = {
    username: username.toLowerCase(),
    displayName,
    passwordHash,
    createdAt: new Date(),
  };
  const result = await users().insertOne(doc);
  return { ...doc, _id: result.insertedId };
}

// The shape sent to the browser: never includes the password hash.
export function toPublicUser(user) {
  return {
    _id: user._id.toString(),
    username: user.username,
    displayName: user.displayName,
  };
}
