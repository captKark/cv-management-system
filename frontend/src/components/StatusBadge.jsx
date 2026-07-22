function StatusBadge({ status }) {
  const badgeClasses = {
    Active: "bg-success",
    Closed: "bg-danger",
    Draft: "bg-secondary",
    Submitted: "bg-primary",
    "On Hold": "bg-secondary",
    Interviewing: "bg-warning text-dark",
  };

  return (
    <span className={`badge ${badgeClasses[status] ?? "bg-dark"}`}>
      {status}
    </span>
  );
}

export default StatusBadge;