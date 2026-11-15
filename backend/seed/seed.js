// Seeds MongoDB with synthetic data: demo users and a few hundred
// co-op applications.
// Run with: npm run seed   (this REPLACES existing users, applications,
// and sessions in the configured database).
import bcrypt from "bcryptjs";
import { closeDB, connectDB } from "../db/connection.js";
import { ensureUserIndexes } from "../db/usersDB.js";
import { ensureApplicationIndexes } from "../db/applicationsDB.js";
import { APPLICATION_STATUSES } from "../config/constants.js";
import {
  APPLICATION_NOTES,
  COMPANIES,
  CONTRIBUTORS,
  ROLES,
} from "./seedData.js";

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
  for (const name of ["users", "applications", "sessions"]) {
    await db.collection(name).deleteMany({});
  }
  await ensureUserIndexes();
  await ensureApplicationIndexes();

  const users = await seedUsers(db, password);
  const applications = buildApplications(users);
  await db.collection("applications").insertMany(applications);

  console.log(
    `Seeded ${users.length} users and ${applications.length} applications ` +
      `(${users.length + applications.length} records).`,
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
