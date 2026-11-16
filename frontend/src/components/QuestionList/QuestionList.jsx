import PropTypes from "prop-types";
import { questionShape } from "../../utils/propShapes.js";
import QuestionCard from "../QuestionCard/QuestionCard.jsx";
import "./QuestionList.css";

export default function QuestionList({ questions, loading }) {
  if (!loading && questions.length === 0) {
    return (
      <p className="question-list-empty muted">
        No questions match these filters. Try clearing some of them.
      </p>
    );
  }

  return (
    <ul className={`question-list${loading ? " question-list-loading" : ""}`}>
      {questions.map((question) => (
        <li key={question._id}>
          <QuestionCard question={question} />
        </li>
      ))}
    </ul>
  );
}

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(questionShape).isRequired,
  loading: PropTypes.bool.isRequired,
};
