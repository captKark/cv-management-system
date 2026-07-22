function StatCard({ title, value }) {
  return (
    <div className="col-md-4">
      <div className="card shadow-sm h-100 text-center">
        <div className="card-body">
          <h6 className="text-muted">{title}</h6>
          <h2 className="mb-0">{value}</h2>
        </div>
      </div>
    </div>
  );
}

export default StatCard;