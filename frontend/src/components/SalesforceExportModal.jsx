import { useState } from "react";

import { startSalesforceExport } from "../services/salesforceService";

function SalesforceExportModal({ onClose }) {
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

      const { authorizationUrl } =
        await startSalesforceExport(
          company.trim(),
          phone.trim(),
        );

      window.location.href = authorizationUrl;
    } catch (err) {
      setLoading(false);

      setError(
        err.response?.data?.message ??
          "Unable to connect to Salesforce.",
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
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading
            ? "Connecting..."
            : "Continue"}
        </button>
      </div>
    </form>
  );
}

export default SalesforceExportModal;