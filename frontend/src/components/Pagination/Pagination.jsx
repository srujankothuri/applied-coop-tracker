import PropTypes from "prop-types";
import "./Pagination.css";

export default function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Question pages">
      <button
        type="button"
        className="btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        ← Previous
      </button>
      <span className="pagination-status">
        Page {page} of {pages}
      </span>
      <button
        type="button"
        className="btn"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pages}
      >
        Next →
      </button>
    </nav>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
