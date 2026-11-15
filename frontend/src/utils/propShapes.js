import PropTypes from "prop-types";

// PropTypes shapes for the documents the API returns.

export const userShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
});
