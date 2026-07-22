import { useState } from "react";
import { DEPARTMENTS } from "../constants/departments";
import { POSITION_STATUSES } from "../constants/status";

function PositionForm({ initialValues, onSubmit, onClose }) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [department, setDepartment] = useState(initialValues?.department ?? "");
  const [location, setLocation] = useState(initialValues?.location ?? "");
  const [status, setStatus] = useState(initialValues?.status ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !department.trim() ||
      !location.trim() ||
      !status.trim()
    ) {
      alert("All fields are required.");
      return;
    }

    onSubmit({
      title: title.trim(),
      department: department.trim(),
      location: location.trim(),
      status: status.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>

        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Department</label>

        <select
          className="form-select"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select department</option>

          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Location</label>

        <input
          type="text"
          className="form-control"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Status</label>

        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select status</option>

          {POSITION_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onClose}
        >
          Cancel
        </button>

        <button type="submit" className="btn btn-primary">
          {initialValues ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}

export default PositionForm;
