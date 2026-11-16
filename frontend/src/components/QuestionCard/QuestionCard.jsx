import { Link, useLocation } from "react-router-dom";
import { formatDate } from "../../utils/constants.js";
import { questionShape } from "../../utils/propShapes.js";
import DifficultyBadge from "../DifficultyBadge/DifficultyBadge.jsx";
import "./QuestionCard.css";

export default function QuestionCard({ question }) {
  const location = useLocation();

  return (
    <article className="question-card">
      <h2 className="question-card-title">
        {/* Remember the current search so "Back to results" returns to it. */}
        <Link
          to={`/questions/${question._id}`}
          state={{ from: `${location.pathname}${location.search}` }}
        >
          {question.question}
        </Link>
      </h2>
      <p className="question-card-meta">
        <strong>{question.company}</strong> · {question.role} · {question.round}
      </p>
      <div className="question-card-footer">
        <span className="question-card-topic">{question.topic}</span>
        <DifficultyBadge difficulty={question.difficulty} />
        <span className="question-card-author muted">
          Shared by {question.authorName} on {formatDate(question.createdAt)}
        </span>
      </div>
    </article>
  );
}

QuestionCard.propTypes = {
  question: questionShape.isRequired,
};
