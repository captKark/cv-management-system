function DemoAccounts({ onSelectAccount }) {
  const accounts = [
    {
      title: "Administrator",
      description: "Full platform administration",
      email: "admin@test.com",
      password: "admin123",
      icon: "bi-shield-lock",
    },
    {
      title: "Recruiter",
      description: "Manage hiring and candidates",
      email: "recruiter@test.com",
      password: "recruit123",
      icon: "bi-briefcase",
    },
    {
      title: "Candidate",
      description: "Create and manage your CV",
      email: "candidate@test.com",
      password: "candidate123",
      icon: "bi-person",
    },
  ];

  return (
    <div className="card border-0 shadow-sm rounded-4 mt-4">
      <div className="card-body p-4">
        <div className="mb-3">
          <h6 className="fw-bold mb-1">
            Demo Accounts
          </h6>

          <p className="text-muted small mb-0">
            Select an account to automatically fill the login
            credentials.
          </p>
        </div>

        <div className="d-grid gap-3">
          {accounts.map((account) => (
            <button
              key={account.email}
              type="button"
              className="btn btn-light border text-start rounded-3 p-3"
              onClick={() =>
                onSelectAccount({
                  email: account.email,
                  password: account.password,
                })
              }
            >
              <div className="d-flex align-items-center">
                <div
                  className="d-flex justify-content-center align-items-center rounded-circle bg-light border flex-shrink-0"
                  style={{
                    width: "46px",
                    height: "46px",
                  }}
                >
                  <i
                    className={`bi ${account.icon} fs-5 text-dark`}
                  ></i>
                </div>

                <div className="ms-3 flex-grow-1">
                  <div className="fw-semibold">
                    {account.title}
                  </div>

                  <small className="text-muted">
                    {account.description}
                  </small>
                </div>

                <i className="bi bi-arrow-right text-muted"></i>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DemoAccounts;