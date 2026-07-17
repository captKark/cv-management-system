// DepartmentFilter.jsx (Kept separate as intended)
function DepartmentFilter({ department, setDepartment }) {
  return (
    <select value={department} onChange={(e) => setDepartment(e.target.value)}>
      <option value="">All Departments</option>
      <option value="Engineering">Engineering</option>
      <option value="Analytics">Analytics</option>
      <option value="Product">Product</option>
      <option value="Human Resources">Human Resources</option>
      <option value="Infrastructure">Infrastructure</option>
    </select>
  );
}

export default DepartmentFilter;
