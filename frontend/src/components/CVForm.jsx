import { useState } from "react";
import { CV_STATUSES } from "../constants/status";

function CVForm({ positions, initialValues, onSubmit, onClose }) {
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
    <div className="card shadow-sm mt-4 mx-auto" style={{ maxWidth: "700px" }}>
      <div className="card-body">
        <h2 className="card-title mb-4">
          {initialValues ? "Edit CV" : "Create CV"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Candidate Name</label>

            <input
              type="text"
              className="form-control"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Position</label>

            <select
              className="form-select"
              value={positionId}
              onChange={(e) => {
                const selectedId = Number(e.target.value);

                const selectedPosition = positions.find(
                  (position) => position.id === selectedId,
                );

                setPositionId(selectedId);

                setPositionTitle(selectedPosition?.title ?? "");
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

          <div className="mb-4">
            <label className="form-label">Status</label>

            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select status</option>

              {CV_STATUSES.map((status) => (
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
      </div>
    </div>
  );
}

export default CVForm;
