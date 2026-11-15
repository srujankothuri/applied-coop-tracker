import { getCollection, toObjectId } from "./connection.js";
import { escapeRegex } from "../utils/validate.js";

const applications = () => getCollection("applications");

export async function ensureApplicationIndexes() {
  await applications().createIndex({ userId: 1, dateApplied: -1 });
}

// Every query includes userId, so a user can only ever see or change
// their own applications.
function buildFilter(userId, { company, role, status, from, to }) {
  const filter = { userId };
  if (company) filter.company = new RegExp(escapeRegex(company), "i");
  if (role) filter.role = new RegExp(escapeRegex(role), "i");
  if (status) filter.status = status;
  if (from || to) {
    filter.dateApplied = {};
    if (from) filter.dateApplied.$gte = from;
    if (to) filter.dateApplied.$lte = to;
  }
  return filter;
}

export function listApplications(userId, filters) {
  return applications()
    .find(buildFilter(userId, filters))
    .sort({ dateApplied: -1, _id: -1 })
    .limit(1000)
    .toArray();
}

export async function createApplication(userId, data) {
  const now = new Date();
  const doc = { ...data, userId, createdAt: now, updatedAt: now };
  const result = await applications().insertOne(doc);
  return { ...doc, _id: result.insertedId };
}

export function updateApplication(userId, id, changes) {
  const _id = toObjectId(id);
  if (!_id) return null;
  return applications().findOneAndUpdate(
    { _id, userId },
    { $set: { ...changes, updatedAt: new Date() } },
    { returnDocument: "after" },
  );
}

export async function deleteApplication(userId, id) {
  const _id = toObjectId(id);
  if (!_id) return false;
  const result = await applications().deleteOne({ _id, userId });
  return result.deletedCount === 1;
}
