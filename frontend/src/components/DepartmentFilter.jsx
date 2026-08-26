import { DEPARTMENTS } from "../constants/departments";

function DepartmentFilter({ department, setDepartment }) {
  return (
    <div className="mb-3">
      <select
        className="form-select"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="">All Departments</option>

        {DEPARTMENTS.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DepartmentFilter;