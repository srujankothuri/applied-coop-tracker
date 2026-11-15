import { useEffect, useState } from "react";
import { applicationsApi } from "../../api/client.js";
import useDebouncedValue from "../../hooks/useDebouncedValue.js";
import { APPLICATION_STATUSES } from "../../utils/constants.js";
import ApplicationFilters from "../ApplicationFilters/ApplicationFilters.jsx";
import ApplicationForm from "../ApplicationForm/ApplicationForm.jsx";
import StatusBoard from "../StatusBoard/StatusBoard.jsx";
import "./ApplicationsPage.css";

const EMPTY_APPLICATION_FILTERS = {
  company: "",
  role: "",
  status: "",
  from: "",
  to: "",
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState(EMPTY_APPLICATION_FILTERS);
  const [error, setError] = useState("");
  // null = form closed, {} = adding a new one, an application = editing it
  const [editing, setEditing] = useState(null);
  const debouncedFilters = useDebouncedValue(filters, 300);
  // Which filter set the current list was loaded for; while it differs
  // from the active filters, a request is in flight.
  const requestKey = JSON.stringify(debouncedFilters);
  const [loadedKey, setLoadedKey] = useState(null);
  const loading = loadedKey !== requestKey;

  useEffect(() => {
    let ignore = false;
    applicationsApi
      .list(JSON.parse(requestKey))
      .then((data) => {
        if (!ignore) {
          setApplications(data.applications);
          setError("");
        }
      })
      .catch((err) => !ignore && setError(err.message))
      .finally(() => !ignore && setLoadedKey(requestKey));
    return () => {
      ignore = true;
    };
  }, [requestKey]);

  function replaceApplication(updated) {
    setApplications((current) =>
      current.map((a) => (a._id === updated._id ? updated : a)),
    );
  }

  async function handleSave(data) {
    if (editing._id) {
      const { application } = await applicationsApi.update(editing._id, data);
      replaceApplication(application);
    } else {
      const { application } = await applicationsApi.create(data);
      setApplications((current) => [application, ...current]);
    }
    setEditing(null);
  }

  async function handleStatusChange(id, status) {
    try {
      const { application } = await applicationsApi.setStatus(id, status);
      replaceApplication(application);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(application) {
    const confirmed = window.confirm(
      `Delete your ${application.role} application at ${application.company}?`,
    );
    if (!confirmed) return;
    try {
      await applicationsApi.remove(application._id);
      setApplications((current) =>
        current.filter((a) => a._id !== application._id),
      );
      if (editing?._id === application._id) setEditing(null);
    } catch (err) {
      setError(err.message);
    }
  }

  const visibleStatuses = filters.status
    ? [filters.status]
    : APPLICATION_STATUSES;

  return (
    <div className="page">
      <div className="applications-header">
        <div>
          <h1>My Applications</h1>
          <p className="muted">
            {loading
              ? "Loading…"
              : `${applications.length} application${applications.length === 1 ? "" : "s"} shown`}
          </p>
        </div>
        {!editing && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setEditing({})}
          >
            + Add application
          </button>
        )}
      </div>

      {editing && (
        <ApplicationForm
          key={editing._id || "new"}
          initialValues={editing._id ? editing : undefined}
          onSubmit={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      <ApplicationFilters
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(EMPTY_APPLICATION_FILTERS)}
      />

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      <StatusBoard
        applications={applications}
        statuses={visibleStatuses}
        onStatusChange={handleStatusChange}
        onEdit={(application) => {
          setEditing(application);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}
