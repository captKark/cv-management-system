import StatusBadge from "./StatusBadge";

function UserTable({
  users,
  selectedUsers,
  allSelected,
  onToggleSelection,
  onSelectAll,
}) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th
                  className="text-center"
                  style={{ width: "60px" }}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={allSelected}
                    onChange={onSelectAll}
                  />
                </th>

                <th className="text-nowrap">Name</th>
                <th className="text-nowrap">Email</th>
                <th className="text-nowrap">Role</th>
                <th className="text-nowrap">Status</th>
                <th className="text-nowrap">Created</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-muted py-5"
                  >
                    <h5 className="mb-2">
                      No users found
                    </h5>

                    <p className="mb-0">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const isSelected =
                    selectedUsers.includes(user.id);

                  return (
                    <tr key={user.id}>
                      <td className="text-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={isSelected}
                          onChange={() =>
                            onToggleSelection(user.id)
                          }
                        />
                      </td>

                      <td>{user.name}</td>

                      <td>{user.email}</td>

                      <td className="text-capitalize">
                        {user.role}
                      </td>

                      <td>
                        <StatusBadge
                          status={
                            user.isActive
                              ? "Active"
                              : "Inactive"
                          }
                        />
                      </td>

                      <td>
                        {new Date(
                          user.createdAt,
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserTable;