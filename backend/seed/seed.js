// Seeds MongoDB with synthetic data: demo users, 1,200 interview
// questions, and a few hundred co-op applications.
// Run with: npm run seed   (this REPLACES existing users, questions,
// applications, and sessions in the configured database).
import bcrypt from "bcryptjs";
import { closeDB, connectDB } from "../db/connection.js";
import { ensureUserIndexes } from "../db/usersDB.js";
import { ensureApplicationIndexes } from "../db/applicationsDB.js";
import { ensureQuestionIndexes } from "../db/questionsDB.js";
import { APPLICATION_STATUSES } from "../config/constants.js";
import {
  APPLICATION_NOTES,
  BASE_QUESTIONS,
  COMPANIES,
  CONTRIBUTORS,
  ROLES,
} from "./seedData.js";

const QUESTION_COUNT = 1200;

const ROUNDS_BY_TOPIC = {
  Behavioral: ["Behavioral Interview", "Final Round", "Phone Screen"],
  "System Design": ["Technical Interview", "Final Round"],
  "Object-Oriented Design": ["Technical Interview", "Final Round"],
};
const CODING_ROUNDS = [
  "Online Assessment",
  "Phone Screen",
  "Technical Interview",
  "Final Round",
];

const EXTRA_NOTES = [
  "",
  "",
  "",
  " The interviewer gave a hint after about ten minutes.",
  " We had 45 minutes and they wanted working code.",
  " They cared more about explaining my thinking than finishing.",
  " Asked me to write test cases at the end.",
  " Done in a shared editor without running the code.",
  " Follow-up questions were about time and space complexity.",
];

// Small seeded random generator, so every run produces the same data.
function createRandom(seed) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const random = createRandom(5610);
const pick = (list) => list[Math.floor(random() * list.length)];
const randomInt = (min, max) => min + Math.floor(random() * (max - min + 1));

function randomDate(start, end) {
  return new Date(
    start.getTime() + random() * (end.getTime() - start.getTime()),
  );
}

function weightedPick(weights) {
  let roll = random() * weights.reduce((sum, [, w]) => sum + w, 0);
  for (const [value, weight] of weights) {
    roll -= weight;
    if (roll <= 0) return value;
  }
  return weights[0][0];
}

function shiftDifficulty(difficulty) {
  if (random() > 0.2) return difficulty;
  const levels = ["Easy", "Medium", "Hard"];
  const index = levels.indexOf(difficulty) + (random() < 0.5 ? -1 : 1);
  return levels[Math.min(2, Math.max(0, index))];
}

async function seedUsers(db, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const docs = CONTRIBUTORS.map((user) => ({
    ...user,
    passwordHash,
    createdAt: new Date("2026-08-01T12:00:00Z"),
  }));
  const result = await db.collection("users").insertMany(docs);
  return docs.map((doc, i) => ({ ...doc, _id: result.insertedIds[i] }));
}

function buildQuestions(users) {
  const topics = Object.keys(BASE_QUESTIONS);
  const arun = users.find((u) => u.username === "arun");
  const start = new Date("2025-06-01T00:00:00Z");
  const end = new Date("2026-11-01T00:00:00Z");

  return Array.from({ length: QUESTION_COUNT }, () => {
    const topic = pick(topics);
    const [question, notes, difficulty] = pick(BASE_QUESTIONS[topic]);
    // Arun posts more than anyone else, so his demo account has plenty
    // of questions to edit and delete.
    const author = random() < 0.15 ? arun : pick(users);
    const createdAt = randomDate(start, end);
    return {
      question,
      company: pick(COMPANIES),
      role: pick(ROLES),
      round: pick(ROUNDS_BY_TOPIC[topic] || CODING_ROUNDS),
      topic,
      difficulty: shiftDifficulty(difficulty),
      prepNotes: notes + pick(EXTRA_NOTES),
      authorId: author._id,
      authorName: author.displayName,
      createdAt,
      updatedAt: createdAt,
    };
  });
}

function buildApplications(users) {
  const counts = { kavya: 40, daniel: 60, arun: 50 };
  const start = new Date("2026-08-01T00:00:00Z");
  const end = new Date("2026-11-01T00:00:00Z");
  const statusWeights = [
    [APPLICATION_STATUSES[0], 45],
    [APPLICATION_STATUSES[1], 25],
    [APPLICATION_STATUSES[2], 8],
    [APPLICATION_STATUSES[3], 22],
  ];

  return users.flatMap((user) => {
    const count = counts[user.username] ?? randomInt(15, 30);
    return Array.from({ length: count }, () => {
      const applied = randomDate(start, end);
      const updated = randomDate(applied, end);
      return {
        userId: user._id,
        company: pick(COMPANIES),
        role: pick(ROLES),
        dateApplied: applied.toISOString().slice(0, 10),
        status: weightedPick(statusWeights),
        notes: pick(APPLICATION_NOTES),
        createdAt: applied,
        updatedAt: updated,
      };
    });
  });
}

async function main() {
  const password = process.env.DEMO_PASSWORD;
  if (!password || password.length < 8) {
    throw new Error(
      "Set DEMO_PASSWORD (8+ characters) in backend/.env before seeding.",
    );
  }

  const db = await connectDB();
  for (const name of ["users", "questions", "applications", "sessions"]) {
    await db.collection(name).deleteMany({});
  }
  await ensureUserIndexes();
  await ensureQuestionIndexes();
  await ensureApplicationIndexes();

  const users = await seedUsers(db, password);
  const questions = buildQuestions(users);
  const applications = buildApplications(users);
  await db.collection("questions").insertMany(questions);
  await db.collection("applications").insertMany(applications);

  console.log(
    `Seeded ${users.length} users, ${questions.length} questions, ` +
      `${applications.length} applications ` +
      `(${users.length + questions.length + applications.length} records).`,
  );
  console.log(
    `Demo logins: ${users.map((u) => u.username).join(", ")} (password = DEMO_PASSWORD)`,
  );
}

try {
  await main();
} catch (err) {
  console.error(err.message);
  process.exitCode = 1;
} finally {
  await closeDB();
}
