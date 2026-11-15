import PropTypes from "prop-types";
import { APPLICATION_STATUSES } from "../../utils/constants.js";
import "./ApplicationFilters.css";

export default function ApplicationFilters({ filters, onChange, onReset }) {
  function handleChange(event) {
    onChange({ ...filters, [event.target.name]: event.target.value });
  }

  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <form
      className="application-filters"
      role="search"
      aria-label="Filter applications"
      onSubmit={(event) => event.preventDefault()}
    >
      <div>
        <label htmlFor="filter-company">Company</label>
        <input
          id="filter-company"
          name="company"
          placeholder="e.g. Wayfair"
          value={filters.company}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="filter-role">Role</label>
        <input
          id="filter-role"
          name="role"
          placeholder="e.g. Backend"
          value={filters.role}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="filter-status">Status</label>
        <select
          id="filter-status"
          name="status"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="">All statuses</option>
          {APPLICATION_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-from">Applied from</label>
        <input
          id="filter-from"
          name="from"
          type="date"
          value={filters.from}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="filter-to">Applied to</label>
        <input
          id="filter-to"
          name="to"
          type="date"
          value={filters.to}
          onChange={handleChange}
        />
      </div>
      <div className="application-filters-reset">
        <button
          type="button"
          className="btn"
          onClick={onReset}
          disabled={!hasFilters}
        >
          Clear filters
        </button>
      </div>
    </form>
  );
}

ApplicationFilters.propTypes = {
  filters: PropTypes.shape({
    company: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
