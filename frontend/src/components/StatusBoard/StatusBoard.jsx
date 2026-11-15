import PropTypes from "prop-types";
import { applicationShape } from "../../utils/propShapes.js";
import StatusColumn from "../StatusColumn/StatusColumn.jsx";
import "./StatusBoard.css";

// Groups applications into one column per status.
export default function StatusBoard({
  applications,
  statuses,
  onStatusChange,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className="status-board"
      style={{ "--board-columns": statuses.length }}
    >
      {statuses.map((status) => (
        <StatusColumn
          key={status}
          status={status}
          applications={applications.filter((a) => a.status === status)}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

StatusBoard.propTypes = {
  applications: PropTypes.arrayOf(applicationShape).isRequired,
  statuses: PropTypes.arrayOf(PropTypes.string).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
