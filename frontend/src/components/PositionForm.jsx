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
      <h2>{initialValues ? "Edit Position" : "Add Position"}</h2>

      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label>Department</label>
        <select
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

      <div>
        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select status</option>

          {POSITION_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">{initialValues ? "Update" : "Create"}</button>

      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}

export default PositionForm;
