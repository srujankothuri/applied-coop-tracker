import PropTypes from "prop-types";

// A labelled <select> with an "all" option, used by the question filters.
export default function ChoiceFilter({
  id,
  label,
  value,
  choices,
  allLabel,
  onChange,
}) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{allLabel}</option>
        {choices.map((choice) => (
          <option key={choice} value={choice}>
            {choice}
          </option>
        ))}
      </select>
    </div>
  );
}

ChoiceFilter.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  allLabel: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
