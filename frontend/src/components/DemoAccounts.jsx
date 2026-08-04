function DemoAccounts({
  onSelectAccount,
}) {
  return (
    <div className="card border-0 shadow-sm rounded-4 mt-4">
      <div className="card-body">
        <h6 className="fw-bold mb-3">
          Demo Accounts
        </h6>

        <p className="text-muted small mb-4">
          Click any account below to automatically fill the login form.
        </p>

        <div className="d-grid gap-2">
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() =>
              onSelectAccount({
                email: "admin@test.com",
                password: "admin123",
              })
            }
          >
            <div className="fw-semibold">
              Administrator
            </div>

            <small className="text-muted">
              Full system access
            </small>
          </button>

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() =>
              onSelectAccount({
                email: "recruiter@test.com",
                password: "recruit123",
              })
            }
          >
            <div className="fw-semibold">
              Recruiter
            </div>

            <small className="text-muted">
              Recruitment management
            </small>
          </button>

          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() =>
              onSelectAccount({
                email: "candidate@test.com",
                password: "candidate123",
              })
            }
          >
            <div className="fw-semibold">
              Candidate
            </div>

            <small className="text-muted">
              Candidate portal
            </small>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DemoAccounts;