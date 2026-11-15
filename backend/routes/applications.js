import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import { toObjectId } from "../db/connection.js";
import {
  createApplication,
  deleteApplication,
  listApplications,
  updateApplication,
} from "../db/applicationsDB.js";
import { APPLICATION_STATUSES } from "../config/constants.js";
import {
  isIsoDate,
  pickChoice,
  pickText,
  validateApplication,
} from "../utils/validate.js";

const router = express.Router();

// Every application route is private to the logged-in user.
router.use(requireAuth);

const currentUserId = (req) => toObjectId(req.user._id);

router.get("/", async (req, res) => {
  const filters = {
    company: pickText(req.query.company),
    role: pickText(req.query.role),
    status: pickChoice(req.query.status, APPLICATION_STATUSES),
    from: isIsoDate(req.query.from) ? req.query.from : undefined,
    to: isIsoDate(req.query.to) ? req.query.to : undefined,
  };
  const applications = await listApplications(currentUserId(req), filters);
  res.json({ applications });
});

router.post("/", async (req, res) => {
  const { data, errors } = validateApplication(req.body);
  if (errors.length) return res.status(400).json({ error: errors.join(" ") });
  const application = await createApplication(currentUserId(req), data);
  return res.status(201).json({ application });
});

router.put("/:id", async (req, res) => {
  const { data, errors } = validateApplication(req.body);
  if (errors.length) return res.status(400).json({ error: errors.join(" ") });
  const application = await updateApplication(
    currentUserId(req),
    req.params.id,
    data,
  );
  if (!application) {
    return res.status(404).json({ error: "Application not found." });
  }
  return res.json({ application });
});

// Used by the status buttons on the board: changes only the status.
router.patch("/:id/status", async (req, res) => {
  const status = pickChoice(req.body?.status, APPLICATION_STATUSES);
  if (!status) {
    return res.status(400).json({
      error: `Status must be one of: ${APPLICATION_STATUSES.join(", ")}.`,
    });
  }
  const application = await updateApplication(
    currentUserId(req),
    req.params.id,
    { status },
  );
  if (!application) {
    return res.status(404).json({ error: "Application not found." });
  }
  return res.json({ application });
});

router.delete("/:id", async (req, res) => {
  const deleted = await deleteApplication(currentUserId(req), req.params.id);
  if (!deleted)
    return res.status(404).json({ error: "Application not found." });
  return res.status(204).end();
});

export default router;
