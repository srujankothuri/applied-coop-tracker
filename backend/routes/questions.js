import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import { toObjectId } from "../db/connection.js";
import {
  createQuestion,
  deleteQuestion,
  getQuestion,
  listQuestionCompanies,
  listQuestions,
  updateQuestion,
} from "../db/questionsDB.js";
import {
  QUESTION_DIFFICULTIES,
  QUESTION_ROUNDS,
  QUESTION_TOPICS,
} from "../config/constants.js";
import {
  pickChoice,
  pickPositiveInt,
  pickText,
  validateQuestion,
} from "../utils/validate.js";

const router = express.Router();

// Anyone can browse and read questions. Posting, editing, and deleting
// require login, and editing/deleting also require being the author.

router.get("/", async (req, res) => {
  const filters = {
    q: pickText(req.query.q, 200),
    company: pickText(req.query.company),
    topic: pickChoice(req.query.topic, QUESTION_TOPICS),
    difficulty: pickChoice(req.query.difficulty, QUESTION_DIFFICULTIES),
    round: pickChoice(req.query.round, QUESTION_ROUNDS),
  };
  if (req.query.mine === "true") {
    if (!req.user) {
      return res.status(401).json({ error: "Log in to see your questions." });
    }
    filters.authorId = toObjectId(req.user._id);
  }
  const page = pickPositiveInt(req.query.page, 1, 10000);
  const limit = pickPositiveInt(req.query.limit, 20, 50);
  const sort = pickChoice(req.query.sort, ["newest", "oldest", "company"]);

  const { questions, total } = await listQuestions(filters, {
    page,
    limit,
    sort,
  });
  return res.json({
    questions,
    total,
    page,
    pages: Math.max(1, Math.ceil(total / limit)),
  });
});

// Values for the filter dropdowns, so the React app does not hardcode them.
router.get("/options", async (req, res) => {
  const companies = (await listQuestionCompanies()).sort((a, b) =>
    a.localeCompare(b),
  );
  res.json({
    companies,
    topics: QUESTION_TOPICS,
    difficulties: QUESTION_DIFFICULTIES,
    rounds: QUESTION_ROUNDS,
  });
});

router.get("/:id", async (req, res) => {
  const question = await getQuestion(req.params.id);
  if (!question) return res.status(404).json({ error: "Question not found." });
  return res.json({ question });
});

router.post("/", requireAuth, async (req, res) => {
  const { data, errors } = validateQuestion(req.body);
  if (errors.length) return res.status(400).json({ error: errors.join(" ") });
  const author = { ...req.user, _id: toObjectId(req.user._id) };
  const question = await createQuestion(author, data);
  return res.status(201).json({ question });
});

// Loads the question and checks ownership, answering 404 or 403.
async function loadOwnQuestion(req, res) {
  const question = await getQuestion(req.params.id);
  if (!question) {
    res.status(404).json({ error: "Question not found." });
    return null;
  }
  if (question.authorId.toString() !== req.user._id) {
    res
      .status(403)
      .json({ error: "Only the author can change this question." });
    return null;
  }
  return question;
}

router.put("/:id", requireAuth, async (req, res) => {
  const { data, errors } = validateQuestion(req.body);
  if (errors.length) return res.status(400).json({ error: errors.join(" ") });
  if (!(await loadOwnQuestion(req, res))) return undefined;
  const question = await updateQuestion(
    toObjectId(req.user._id),
    req.params.id,
    data,
  );
  return res.json({ question });
});

router.delete("/:id", requireAuth, async (req, res) => {
  if (!(await loadOwnQuestion(req, res))) return undefined;
  await deleteQuestion(toObjectId(req.user._id), req.params.id);
  return res.status(204).end();
});

export default router;
