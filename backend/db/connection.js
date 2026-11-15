import { MongoClient, ObjectId } from "mongodb";
import { MONGODB_URI, DB_NAME } from "../config/env.js";

const client = new MongoClient(MONGODB_URI);
let db = null;

export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db(DB_NAME);
  }
  return db;
}

export function getCollection(name) {
  if (!db) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return db.collection(name);
}

export async function closeDB() {
  await client.close();
  db = null;
}

// Returns an ObjectId, or null when the string is not a valid id,
// so routes can answer 404 instead of crashing on bad input.
export function toObjectId(id) {
  return typeof id === "string" && ObjectId.isValid(id)
    ? new ObjectId(id)
    : null;
}
