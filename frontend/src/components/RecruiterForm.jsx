import { useState } from "react";

function RecruiterForm({
  onSubmit,
  onClose,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (setter) => (e) => {
    setter(e.target.value);
  };

  const buildRecruiter = () => {
    return {
      name,
      email,
      password,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await onSubmit(buildRecruiter());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">
          Name
        </label>

        <input
          className="form-control"
          type="text"
          value={name}
          onChange={updateField(setName)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Email
        </label>

        <input
          className="form-control"
          type="email"
          value={email}
          onChange={updateField(setEmail)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label">
          Password
        </label>

        <input
          className="form-control"
          type="password"
          value={password}
          onChange={updateField(setPassword)}
          required
        />
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Recruiter"}
        </button>
      </div>
    </form>
  );
}

export default RecruiterForm;