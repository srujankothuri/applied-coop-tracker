import PropTypes from "prop-types";
import "./DifficultyBadge.css";

export default function DifficultyBadge({ difficulty }) {
  return (
    <span className={`difficulty-badge difficulty-${difficulty.toLowerCase()}`}>
      {difficulty}
    </span>
  );
}

DifficultyBadge.propTypes = {
  difficulty: PropTypes.string.isRequired,
};
