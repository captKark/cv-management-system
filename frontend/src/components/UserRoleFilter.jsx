function UserRoleFilter({ role, setRole }) {
  return (
    <select
      className="form-select"
      style={{ maxWidth: "220px" }}
      value={role}
      onChange={(e) => setRole(e.target.value)}
    >
      <option value="">All Roles</option>
      <option value="admin">Administrator</option>
      <option value="recruiter">Recruiter</option>
      <option value="candidate">Candidate</option>
    </select>
  );
}

export default UserRoleFilter;