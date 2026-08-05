import { useState } from "react";

import { exportToOdoo } from "../services/odooService";

function OdooExportModal({ onClose, onSuccess }) {
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!company.trim() || !phone.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await exportToOdoo(
        company.trim(),
        phone.trim(),
      );

      onSuccess();
    } catch (err) {
      setLoading(false);

      setError(
        err.response?.data?.message ??
          "Unable to export to Odoo.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger py-2">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">
          Company
        </label>

        <input
          className="form-control"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
        />
      </div>

      <div className="mb-4">
        <label className="form-label">
          Phone
        </label>

        <input
          className="form-control"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-outline-secondary"
          disabled={loading}
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-success"
          disabled={loading}
        >
          {loading
            ? "Exporting..."
            : "Export"}
        </button>
      </div>
    </form>
  );
}

export default OdooExportModal;