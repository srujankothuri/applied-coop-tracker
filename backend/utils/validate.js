import {
  APPLICATION_STATUSES,
  QUESTION_DIFFICULTIES,
  QUESTION_ROUNDS,
  QUESTION_TOPICS,
} from "../config/constants.js";

// Escapes user input before it is used inside a RegExp, so a search
// for "C++" or "(" does not throw or match unintended text.
export function escapeRegex(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isIsoDate(value) {
  return (
    typeof value === "string" &&
    DATE_PATTERN.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

function cleanText(value, field, { required, max }, errors) {
  const text = typeof value === "string" ? value.trim() : "";
  if (required && !text) errors.push(`${field} is required.`);
  if (text.length > max) {
    errors.push(`${field} must be at most ${max} characters.`);
  }
  return text;
}

function cleanChoice(value, field, choices, errors) {
  if (!choices.includes(value)) {
    errors.push(`${field} must be one of: ${choices.join(", ")}.`);
  }
  return value;
}

// Each validator returns { data, errors }. Only known fields are copied
// into data, so a client cannot set userId, authorId, or timestamps.
export function validateApplication(body = {}) {
  const errors = [];
  const data = {
    company: cleanText(
      body.company,
      "Company",
      { required: true, max: 100 },
      errors,
    ),
    role: cleanText(body.role, "Role", { required: true, max: 100 }, errors),
    status: cleanChoice(body.status, "Status", APPLICATION_STATUSES, errors),
    notes: cleanText(
      body.notes,
      "Notes",
      { required: false, max: 2000 },
      errors,
    ),
    dateApplied: body.dateApplied,
  };
  if (!isIsoDate(body.dateApplied)) {
    errors.push("Date applied must be a valid date (YYYY-MM-DD).");
  }
  return { data, errors };
}

export function validateQuestion(body = {}) {
  const errors = [];
  const data = {
    question: cleanText(
      body.question,
      "Question",
      { required: true, max: 1000 },
      errors,
    ),
    company: cleanText(
      body.company,
      "Company",
      { required: true, max: 100 },
      errors,
    ),
    role: cleanText(body.role, "Role", { required: true, max: 100 }, errors),
    round: cleanChoice(body.round, "Round", QUESTION_ROUNDS, errors),
    topic: cleanChoice(body.topic, "Topic", QUESTION_TOPICS, errors),
    difficulty: cleanChoice(
      body.difficulty,
      "Difficulty",
      QUESTION_DIFFICULTIES,
      errors,
    ),
    prepNotes: cleanText(
      body.prepNotes,
      "Preparation notes",
      { required: false, max: 3000 },
      errors,
    ),
  };
  return { data, errors };
}

// Reads a query-string value only if it is one of the allowed choices.
export function pickChoice(value, choices) {
  return choices.includes(value) ? value : undefined;
}

export function pickText(value, max = 100) {
  return typeof value === "string" && value.trim()
    ? value.trim().slice(0, max)
    : undefined;
}

export function pickPositiveInt(value, fallback, max) {
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(n, max);
}
