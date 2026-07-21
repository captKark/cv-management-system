import { useState } from "react";

function CVForm({ initialValues, onSubmit, onClose }) {
  const [candidateName, setCandidateName] = useState(
    initialValues?.candidateName ?? "",
  );

  const [positionTitle, setPositionTitle] = useState(
    initialValues?.positionTitle ?? "",
  );

  const [status, setStatus] = useState(initialValues?.status ?? "");
  const [positionId, setPositionId] = useState(initialValues?.positionId ?? "");
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!candidateName.trim() || !positionTitle.trim() || !status.trim()) {
      alert("All fields are required.");
      return;
    }

    onSubmit({
      candidateName: candidateName.trim(),
      positionId,
      positionTitle,
      status,
      updatedAt: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialValues ? "Edit CV" : "Create CV"}</h2>

      <div>
        <label>Candidate Name</label>

        <input
          type="text"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
      </div>

      <div>
        <label>Position</label>

        <select
          value={positionId}
          onChange={(e) => {
            const selectedId = Number(e.target.value);

            const selectedPosition = positions.find(
              (position) => position.id === selectedId,
            );

            setPositionId(selectedId);
            setPositionTitle(selectedPosition.title);
          }}
        >
          <option value="">Select Position</option>

          {positions.map((position) => (
            <option key={position.id} value={position.id}>
              {position.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Status</label>

        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>

      <button type="submit">{initialValues ? "Update" : "Create"}</button>

      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}

export default CVForm;
