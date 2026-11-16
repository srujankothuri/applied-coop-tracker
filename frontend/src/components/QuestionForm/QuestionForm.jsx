import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { questionsApi } from "../../api/client.js";
import { userShape } from "../../utils/propShapes.js";
import "./QuestionForm.css";

const EMPTY_QUESTION = {
  question: "",
  company: "",
  role: "",
  round: "",
  topic: "",
  difficulty: "",
  prepNotes: "",
};

// Used for both sharing a new question (/questions/new) and editing
// one you posted (/questions/:id/edit). Only the author can edit; the
// server enforces this too, but checking here avoids showing a form
// that would fail on save.
export default function QuestionForm({ user }) {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [options, setOptions] = useState(null);
  const [form, setForm] = useState(isEditing ? null : EMPTY_QUESTION);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [notAuthor, setNotAuthor] = useState(false);

  useEffect(() => {
    let ignore = false;
    const requests = [questionsApi.options()];
    if (id) requests.push(questionsApi.get(id));
    Promise.all(requests)
      .then(([optionData, questionData]) => {
        if (ignore) return;
        setOptions(optionData);
        if (questionData) {
          const q = questionData.question;
          if (q.authorId !== user._id) {
            setNotAuthor(true);
            return;
          }
          setForm({
            question: q.question,
            company: q.company,
            role: q.role,
            round: q.round,
            topic: q.topic,
            difficulty: q.difficulty,
            prepNotes: q.prepNotes || "",
          });
        }
      })
      .catch((err) => !ignore && setError(err.message));
    return () => {
      ignore = true;
    };
  }, [id, user._id]);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const { question } = isEditing
        ? await questionsApi.update(id, form)
        : await questionsApi.create(form);
      navigate(`/questions/${question._id}`, { replace: true });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  if (notAuthor) {
    return (
      <div className="page">
        <p className="error-message" role="alert">
          Only the person who shared this question can edit it.
        </p>
        <Link to={`/questions/${id}`}>Back to the question</Link>
      </div>
    );
  }

  if (!options || !form) {
    return (
      <div className="page">
        {error ? (
          <p className="error-message" role="alert">
            {error}
          </p>
        ) : (
          <p className="muted">Loading…</p>
        )}
      </div>
    );
  }

  return (
    <div className="page question-form-page">
      <form className="question-form" onSubmit={handleSubmit}>
        <h1>
          {isEditing ? "Edit your question" : "Share an interview question"}
        </h1>
        <p className="muted">
          Help other students prepare. Describe the question the way it was
          asked, and add tips in the preparation notes.
        </p>

        <div className="question-form-field">
          <label htmlFor="qf-question">Question</label>
          <textarea
            id="qf-question"
            name="question"
            rows={3}
            value={form.question}
            onChange={handleChange}
            required
            maxLength={1000}
          />
        </div>

        <div className="question-form-grid">
          <div>
            <label htmlFor="qf-company">Company</label>
            <input
              id="qf-company"
              name="company"
              list="qf-company-list"
              value={form.company}
              onChange={handleChange}
              required
              maxLength={100}
            />
            <datalist id="qf-company-list">
              {options.companies.map((company) => (
                <option key={company} value={company} />
              ))}
            </datalist>
          </div>
          <div>
            <label htmlFor="qf-role">Role</label>
            <input
              id="qf-role"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              maxLength={100}
              placeholder="e.g. Software Engineer Co-op"
            />
          </div>
          <div>
            <label htmlFor="qf-round">Interview round</label>
            <select
              id="qf-round"
              name="round"
              value={form.round}
              onChange={handleChange}
              required
            >
              <option value="">Choose a round</option>
              {options.rounds.map((round) => (
                <option key={round}>{round}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="qf-topic">Topic</label>
            <select
              id="qf-topic"
              name="topic"
              value={form.topic}
              onChange={handleChange}
              required
            >
              <option value="">Choose a topic</option>
              {options.topics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="qf-difficulty">Difficulty</label>
            <select
              id="qf-difficulty"
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              required
            >
              <option value="">Choose a difficulty</option>
              {options.difficulties.map((difficulty) => (
                <option key={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="question-form-field">
          <label htmlFor="qf-notes">Preparation notes</label>
          <textarea
            id="qf-notes"
            name="prepNotes"
            rows={5}
            value={form.prepNotes}
            onChange={handleChange}
            maxLength={3000}
            placeholder="How you approached it, follow-up questions, what the interviewer cared about…"
          />
        </div>

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        <div className="question-form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving…" : isEditing ? "Save changes" : "Share question"}
          </button>
          <Link
            to={isEditing ? `/questions/${id}` : "/questions"}
            className="btn"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

QuestionForm.propTypes = {
  user: userShape.isRequired,
};
