import { useState } from "react";

function CVForm({ initialValues, onSubmit, onClose }) {
  const [candidateName, setCandidateName] = useState(
    initialValues?.candidateName ?? ""
  );

  const [positionTitle, setPositionTitle] = useState(
    initialValues?.positionTitle ?? ""
  );

  const [status, setStatus] = useState(
    initialValues?.status ?? ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !candidateName.trim() ||
      !positionTitle.trim() ||
      !status.trim()
    ) {
      alert("All fields are required.");
      return;
    }

    onSubmit({
      candidateName: candidateName.trim(),
      positionId: initialValues?.positionId ?? 1,
      positionTitle: positionTitle.trim(),
      status: status.trim(),
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
          onChange={(e) =>
            setCandidateName(e.target.value)
          }
        />
      </div>

      <div>
        <label>Position Title</label>

        <input
          type="text"
          value={positionTitle}
          onChange={(e) =>
            setPositionTitle(e.target.value)
          }
        />
      </div>

      <div>
        <label>Status</label>

        <input
          type="text"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        />
      </div>

      <button type="submit">
        {initialValues ? "Update" : "Create"}
      </button>

      <button
        type="button"
        onClick={onClose}
      >
        Cancel
      </button>
    </form>
  );
}

export default CVForm;