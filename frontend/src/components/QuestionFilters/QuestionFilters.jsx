import PropTypes from "prop-types";
import { questionOptionsShape } from "../../utils/propShapes.js";
import ChoiceFilter from "../ChoiceFilter/ChoiceFilter.jsx";
import "./QuestionFilters.css";

export default function QuestionFilters({
  filters,
  searchText,
  onSearchTextChange,
  options,
  onChange,
  onReset,
  canFilterMine,
}) {
  const hasFilters =
    searchText ||
    filters.company ||
    filters.topic ||
    filters.difficulty ||
    filters.round ||
    filters.mine;

  return (
    <form
      className="question-filters"
      role="search"
      aria-label="Filter questions"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="question-filter">
        <label htmlFor="question-search">Search</label>
        <input
          id="question-search"
          type="search"
          placeholder="e.g. linked list, conflict"
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
        />
      </div>

      <ChoiceFilter
        id="question-company"
        label="Company"
        value={filters.company}
        choices={options.companies}
        allLabel="All companies"
        onChange={(company) => onChange({ company })}
      />
      <ChoiceFilter
        id="question-topic"
        label="Topic"
        value={filters.topic}
        choices={options.topics}
        allLabel="All topics"
        onChange={(topic) => onChange({ topic })}
      />
      <ChoiceFilter
        id="question-difficulty"
        label="Difficulty"
        value={filters.difficulty}
        choices={options.difficulties}
        allLabel="Any difficulty"
        onChange={(difficulty) => onChange({ difficulty })}
      />
      <ChoiceFilter
        id="question-round"
        label="Interview round"
        value={filters.round}
        choices={options.rounds}
        allLabel="All rounds"
        onChange={(round) => onChange({ round })}
      />

      <div className="question-filter">
        <label htmlFor="question-sort">Sort by</label>
        <select
          id="question-sort"
          value={filters.sort}
          onChange={(e) =>
            onChange({
              sort: e.target.value === "newest" ? "" : e.target.value,
            })
          }
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="company">Company A–Z</option>
        </select>
      </div>

      {canFilterMine && (
        <div className="question-filter question-filter-checkbox">
          <input
            id="question-mine"
            type="checkbox"
            checked={filters.mine}
            onChange={(e) => onChange({ mine: e.target.checked ? "true" : "" })}
          />
          <label htmlFor="question-mine">Only my questions</label>
        </div>
      )}

      <button
        type="button"
        className="btn question-filters-reset"
        onClick={onReset}
        disabled={!hasFilters}
      >
        Clear filters
      </button>
    </form>
  );
}

QuestionFilters.propTypes = {
  filters: PropTypes.shape({
    company: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    round: PropTypes.string.isRequired,
    sort: PropTypes.string.isRequired,
    mine: PropTypes.bool.isRequired,
  }).isRequired,
  searchText: PropTypes.string.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  options: questionOptionsShape.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  canFilterMine: PropTypes.bool.isRequired,
};
