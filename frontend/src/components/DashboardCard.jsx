function DashboardCard({ title, value, color }) {
  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className={`card border-0 shadow-sm bg-${color} text-white h-100`}>
        <div className="card-body">
          <h6 className="text-uppercase opacity-75 mb-2">
            {title}
          </h6>

          <h2 className="fw-bold mb-0">
            {value}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;