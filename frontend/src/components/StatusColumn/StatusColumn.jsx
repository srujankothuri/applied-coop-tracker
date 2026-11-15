import PropTypes from "prop-types";
import { applicationShape } from "../../utils/propShapes.js";
import ApplicationCard from "../ApplicationCard/ApplicationCard.jsx";
import "./StatusColumn.css";

export default function StatusColumn({
  status,
  applications,
  onStatusChange,
  onEdit,
  onDelete,
}) {
  const headingId = `column-${status.toLowerCase()}`;
  return (
    <section
      className={`status-column status-${status.toLowerCase()}`}
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="status-column-title">
        {status}
        <span className="status-column-count">{applications.length}</span>
      </h2>
      {applications.length === 0 ? (
        <p className="status-column-empty muted">No applications here.</p>
      ) : (
        <ul className="status-column-list">
          {applications.map((application) => (
            <li key={application._id}>
              <ApplicationCard
                application={application}
                onStatusChange={onStatusChange}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

StatusColumn.propTypes = {
  status: PropTypes.string.isRequired,
  applications: PropTypes.arrayOf(applicationShape).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
