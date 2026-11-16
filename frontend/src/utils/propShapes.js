import PropTypes from "prop-types";

// PropTypes shapes for the documents the API returns.

export const userShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
});

export const applicationShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  dateApplied: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  notes: PropTypes.string,
});

export const questionShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  round: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  prepNotes: PropTypes.string,
  authorId: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
});

export const questionOptionsShape = PropTypes.shape({
  companies: PropTypes.arrayOf(PropTypes.string).isRequired,
  topics: PropTypes.arrayOf(PropTypes.string).isRequired,
  difficulties: PropTypes.arrayOf(PropTypes.string).isRequired,
  rounds: PropTypes.arrayOf(PropTypes.string).isRequired,
});
