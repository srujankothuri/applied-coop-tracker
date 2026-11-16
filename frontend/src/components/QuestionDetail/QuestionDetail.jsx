import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { questionsApi } from "../../api/client.js";
import { formatDate } from "../../utils/constants.js";
import { userShape } from "../../utils/propShapes.js";
import DifficultyBadge from "../DifficultyBadge/DifficultyBadge.jsx";
import "./QuestionDetail.css";

export default function QuestionDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const backTo = location.state?.from || "/questions";
  const [result, setResult] = useState({ id: null, question: null, error: "" });
  const [deleteError, setDeleteError] = useState("");
  const loading = result.id !== id;

  useEffect(() => {
    let ignore = false;
    questionsApi
      .get(id)
      .then((data) => {
        if (!ignore) setResult({ id, question: data.question, error: "" });
      })
      .catch((err) => {
        if (!ignore) setResult({ id, question: null, error: err.message });
      });
    return () => {
      ignore = true;
    };
  }, [id]);

  async function handleDelete() {
    if (!window.confirm("Delete this question? This cannot be undone.")) return;
    try {
      await questionsApi.remove(id);
      navigate(backTo, { replace: true });
    } catch (err) {
      setDeleteError(err.message);
    }
  }

  if (loading) return <p className="page muted">Loading question…</p>;

  const { question, error } = result;
  if (error) {
    return (
      <div className="page">
        <p className="error-message" role="alert">
          {error}
        </p>
        <Link to="/questions" className="btn">
          Back to the question bank
        </Link>
      </div>
    );
  }

  const isAuthor = user?._id === question.authorId;

  return (
    <div className="page question-detail">
      <Link to={backTo} className="question-detail-back">
        ← Back to results
      </Link>

      <article className="question-detail-card">
        <div className="question-detail-tags">
          <span className="question-detail-topic">{question.topic}</span>
          <DifficultyBadge difficulty={question.difficulty} />
        </div>
        <h1>{question.question}</h1>

        <dl className="question-detail-facts">
          <div>
            <dt>Company</dt>
            <dd>{question.company}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{question.role}</dd>
          </div>
          <div>
            <dt>Interview round</dt>
            <dd>{question.round}</dd>
          </div>
          <div>
            <dt>Shared by</dt>
            <dd>
              {question.authorName} on {formatDate(question.createdAt)}
            </dd>
          </div>
        </dl>

        <section aria-labelledby="prep-notes-heading">
          <h2 id="prep-notes-heading">Preparation notes</h2>
          {question.prepNotes ? (
            <p className="question-detail-notes">{question.prepNotes}</p>
          ) : (
            <p className="muted">The author did not add preparation notes.</p>
          )}
        </section>

        {deleteError && (
          <p className="error-message" role="alert">
            {deleteError}
          </p>
        )}

        {isAuthor && (
          <div className="question-detail-actions">
            <Link to={`/questions/${question._id}/edit`} className="btn">
              Edit question
            </Link>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete question
            </button>
          </div>
        )}
      </article>
    </div>
  );
}

QuestionDetail.propTypes = {
  user: userShape,
};
