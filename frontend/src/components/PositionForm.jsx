import { useState } from "react";

function PositionForm({ onCreate, onClose }) {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

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

    onCreate({
      title: title.trim(),
      department: department.trim(),
      location: location.trim(),
      status: status.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Position</h2>

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
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
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
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>

      <button type="submit">Create</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}

export default PositionForm;