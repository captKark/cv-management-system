import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Modal from "../components/Modal";
import SalesforceExportModal from "../components/SalesforceExportModal";
import OdooExportModal from "../components/OdooExportModal";

import { getProfile } from "../services/profileService";
import { exportToPowerAutomate } from "../services/powerAutomateService";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [showSalesforceModal, setShowSalesforceModal] = useState(false);
  const [showOdooModal, setShowOdooModal] = useState(false);
  const [searchParams] = useSearchParams();

  const salesforceStatus = searchParams.get("salesforce");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [powerAutomateLoading, setPowerAutomateLoading] = useState(false);
  const [powerAutomateLoading, setPowerAutomateLoading] = useState(false);

  const [powerAutomateResult, setPowerAutomateResult] = useState(null);

  const [powerAutomateError, setPowerAutomateError] = useState("");
  const startLoading = () => {
    setLoading(true);
    setError("");
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const handleError = (err) => {
    setError(err.message);
  };

  const loadProfile = async () => {
    const data = await getProfile();
    setProfile(data);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      startLoading();

      try {
        await loadProfile();
      } catch (err) {
        handleError(err);
      } finally {
        stopLoading();
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger mt-3">{error}</div>;
  }
  const handlePowerAutomateExport = async () => {
    try {
      setPowerAutomateLoading(true);
      setPowerAutomateError("");
      setPowerAutomateResult(null);

      const result = await exportToPowerAutomate();

      setPowerAutomateResult(result);
    } catch (err) {
      setPowerAutomateError(
        err.message || "Unable to export to Power Automate.",
      );
    } finally {
      setPowerAutomateLoading(false);
    }
  };
  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">My Profile</h2>

        <p className="text-muted mb-0">View your account information.</p>

        {salesforceStatus === "success" && (
          <div className="alert alert-success mt-3">
            Successfully exported to Salesforce.
          </div>
        )}

        {salesforceStatus === "failed" && (
          <div className="alert alert-danger mt-3">
            Salesforce export failed.
          </div>
        )}
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Name</label>

              <input className="form-control" value={profile.name} disabled />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Email</label>

              <input className="form-control" value={profile.email} disabled />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Role</label>

              <input className="form-control" value={profile.role} disabled />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Status</label>

              <input
                className="form-control"
                value={profile.isActive ? "Active" : "Inactive"}
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">My CVs</h5>

          {profile.cvs.length === 0 ? (
            <p className="text-muted mb-0">No CVs found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped mb-0">
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Status</th>
                    <th>Updated</th>
                  </tr>
                </thead>

                <tbody>
                  {profile.cvs.map((cv) => (
                    <tr key={cv.id}>
                      <td>{cv.positionTitle}</td>
                      <td>{cv.status}</td>
                      <td>{cv.updatedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="d-flex gap-2 mt-4">
        <button
          className="btn btn-primary"
          onClick={() => setShowSalesforceModal(true)}
        >
          Export to Salesforce
        </button>

        <button
          className="btn btn-success"
          onClick={() => setShowOdooModal(true)}
        >
          Export to Odoo
        </button>

        <button
          className="btn btn-warning"
          onClick={handlePowerAutomateExport}
          disabled={powerAutomateLoading}
        >
          {powerAutomateLoading ? "Exporting..." : "Export to Power Automate"}
        </button>
      </div>

      {showSalesforceModal && (
        <Modal
          title="Export to Salesforce"
          onClose={() => setShowSalesforceModal(false)}
        >
          <SalesforceExportModal
            onClose={() => setShowSalesforceModal(false)}
          />
        </Modal>
      )}

      {showOdooModal && (
        <Modal
          title="Export to Odoo"
          onClose={() => setShowOdooModal(false)}
          size="sm"
        >
          <OdooExportModal
            onClose={() => setShowOdooModal(false)}
            onSuccess={() => {
              setShowOdooModal(false);
              alert("Successfully exported to Odoo.");
            }}
          />
        </Modal>
      )}
      {powerAutomateResult && (
        <div className="alert alert-success mt-3 mb-0">
          <div className="fw-semibold">
            ✓ Successfully exported to Power Automate.
          </div>

          <div className="mt-2">
            <strong>Generated file:</strong> {powerAutomateResult.fileName}
          </div>

          {powerAutomateResult.driveFileId && (
            <div>
              <strong>Drive File ID:</strong> {powerAutomateResult.driveFileId}
            </div>
          )}
        </div>
      )}

      {powerAutomateError && (
        <div className="alert alert-danger mt-3 mb-0">{powerAutomateError}</div>
      )}
    </div>
  );
}

export default Profile;
