import { getCollection, toObjectId } from "./connection.js";
import { escapeRegex } from "../utils/validate.js";

const questions = () => getCollection("questions");

export async function ensureQuestionIndexes() {
  await questions().createIndex({ company: 1 });
  await questions().createIndex({ topic: 1, difficulty: 1, round: 1 });
  await questions().createIndex({ authorId: 1 });
  await questions().createIndex({ createdAt: -1 });
}

const SORTS = {
  newest: { createdAt: -1, _id: -1 },
  oldest: { createdAt: 1, _id: 1 },
  company: { company: 1, createdAt: -1 },
};

function buildFilter({ q, company, topic, difficulty, round, authorId }) {
  const filter = {};
  if (q) {
    const pattern = new RegExp(escapeRegex(q), "i");
    filter.$or = [{ question: pattern }, { prepNotes: pattern }];
  }
  if (company) filter.company = new RegExp(`^${escapeRegex(company)}`, "i");
  if (topic) filter.topic = topic;
  if (difficulty) filter.difficulty = difficulty;
  if (round) filter.round = round;
  if (authorId) filter.authorId = authorId;
  return filter;
}

export async function listQuestions(filters, { page, limit, sort }) {
  const filter = buildFilter(filters);
  const [items, total] = await Promise.all([
    questions()
      .find(filter)
      .sort(SORTS[sort] || SORTS.newest)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray(),
    questions().countDocuments(filter),
  ]);
  return { questions: items, total };
}

export function listQuestionCompanies() {
  return questions().distinct("company");
}

export function getQuestion(id) {
  const _id = toObjectId(id);
  return _id ? questions().findOne({ _id }) : null;
}

export async function createQuestion(author, data) {
  const now = new Date();
  const doc = {
    ...data,
    authorId: author._id,
    authorName: author.displayName,
    createdAt: now,
    updatedAt: now,
  };
  const result = await questions().insertOne(doc);
  return { ...doc, _id: result.insertedId };
}

// Only the author can edit or delete: the filter includes authorId,
// so another user's request matches nothing.
export function updateQuestion(authorId, id, changes) {
  return questions().findOneAndUpdate(
    { _id: toObjectId(id), authorId },
    { $set: { ...changes, updatedAt: new Date() } },
    { returnDocument: "after" },
  );
}

export async function deleteQuestion(authorId, id) {
  const result = await questions().deleteOne({
    _id: toObjectId(id),
    authorId,
  });
  return result.deletedCount === 1;
}
