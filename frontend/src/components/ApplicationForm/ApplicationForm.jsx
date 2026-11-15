import { useState } from "react";
import PropTypes from "prop-types";
import { APPLICATION_STATUSES } from "../../utils/constants.js";
import { applicationShape } from "../../utils/propShapes.js";
import "./ApplicationForm.css";

const today = () => new Date().toISOString().slice(0, 10);

// Used both to add a new application and to edit an existing one.
export default function ApplicationForm({ initialValues, onSubmit, onCancel }) {
  const isEditing = Boolean(initialValues);
  const [form, setForm] = useState({
    company: initialValues?.company ?? "",
    role: initialValues?.role ?? "",
    dateApplied: initialValues?.dateApplied ?? today(),
    status: initialValues?.status ?? APPLICATION_STATUSES[0],
    notes: initialValues?.notes ?? "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? "Edit application" : "Add an application"}</h2>
      <div className="application-form-grid">
        <div>
          <label htmlFor="app-company">Company</label>
          <input
            id="app-company"
            name="company"
            value={form.company}
            onChange={handleChange}
            required
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="app-role">Role</label>
          <input
            id="app-role"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            maxLength={100}
            placeholder="e.g. Software Engineer Co-op"
          />
        </div>
        <div>
          <label htmlFor="app-date">Date applied</label>
          <input
            id="app-date"
            name="dateApplied"
            type="date"
            value={form.dateApplied}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="app-status">Status</label>
          <select
            id="app-status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            {APPLICATION_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="application-form-notes">
          <label htmlFor="app-notes">Notes</label>
          <textarea
            id="app-notes"
            name="notes"
            rows={3}
            value={form.notes}
            onChange={handleChange}
            maxLength={2000}
            placeholder="Recruiter name, next steps, interview dates…"
          />
        </div>
      </div>

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      <div className="application-form-actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving…" : isEditing ? "Save changes" : "Add application"}
        </button>
        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

ApplicationForm.propTypes = {
  initialValues: applicationShape,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
