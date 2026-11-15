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
