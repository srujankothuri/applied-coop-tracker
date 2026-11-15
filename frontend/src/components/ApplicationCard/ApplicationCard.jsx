import PropTypes from "prop-types";
import { APPLICATION_STATUSES, formatDate } from "../../utils/constants.js";
import { applicationShape } from "../../utils/propShapes.js";
import "./ApplicationCard.css";

export default function ApplicationCard({
  application,
  onStatusChange,
  onEdit,
  onDelete,
}) {
  const otherStatuses = APPLICATION_STATUSES.filter(
    (status) => status !== application.status,
  );

  return (
    <article className="application-card">
      <h3 className="application-card-company">{application.company}</h3>
      <p className="application-card-role">{application.role}</p>
      <p className="application-card-date muted">
        Applied {formatDate(application.dateApplied)}
      </p>
      {application.notes && (
        <p className="application-card-notes">{application.notes}</p>
      )}

      <div className="application-card-move" role="group" aria-label="Move to">
        <span className="muted">Move to:</span>
        {otherStatuses.map((status) => (
          <button
            key={status}
            type="button"
            className="btn btn-small"
            onClick={() => onStatusChange(application._id, status)}
            aria-label={`Move ${application.company} to ${status}`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="application-card-actions">
        <button
          type="button"
          className="btn btn-small"
          onClick={() => onEdit(application)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-small btn-danger"
          onClick={() => onDelete(application)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

ApplicationCard.propTypes = {
  application: applicationShape.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
