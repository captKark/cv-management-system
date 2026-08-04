import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import RecruiterForm from "../components/RecruiterForm";
import Toolbar from "../components/Toolbar";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import UserTable from "../components/UserTable";
import UserRoleFilter from "../components/UserRoleFilter";
import useDebounce from "../hooks/useDebounce";
import ResetPasswordForm from "../components/ResetPasswordForm";
import {
  getUsers,
  activateUsers,
  deactivateUsers,
  createRecruiter,
} from "../services/userService";
import { getCurrentUser } from "../utils/auth";
function Users() {
  const [users, setUsers] = useState([]);

  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText);
  const [role, setRole] = useState("");

  const [selectedUsers, setSelectedUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });

  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const currentUser = getCurrentUser();

  const startLoading = () => {
    setLoading(true);
    setError("");
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const buildQuery = () => {
    return {
      page: currentPage,
      search: debouncedSearch,
      role,
    };
  };

  const handleError = (err) => {
    setError(err.message);
  };

  const loadUsers = async () => {
    startLoading();

    try {
      const data = await getUsers(buildQuery());

      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (err) {
      handleError(err);
    } finally {
      stopLoading();
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const visibleIds = users.map((user) => user.id);

  const allSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) => selectedUsers.includes(id));

  const handleToggleSelection = (id) => {
    setSelectedUsers((previous) => {
      if (previous.includes(id)) {
        return previous.filter((userId) => userId !== id);
      }

      return [...previous, id];
    });
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedUsers((previous) =>
        previous.filter((id) => !visibleIds.includes(id)),
      );
    } else {
      setSelectedUsers((previous) => [
        ...previous,
        ...visibleIds.filter((id) => !previous.includes(id)),
      ]);
    }
  };

  const clearSelection = () => {
    setSelectedUsers([]);
  };

  const handleAddRecruiter = () => {};

  const handleActivate = async () => {
    try {
      await activateUsers(selectedUsers);

      await loadUsers();

      clearSelection();

      setNotification({
        type: "success",
        message: "User(s) activated successfully.",
      });
    } catch (err) {
      handleError(err);
    }
  };

  const handleDeactivate = async () => {
    try {
      await deactivateUsers(selectedUsers);

      await loadUsers();

      clearSelection();

      setNotification({
        type: "success",
        message: "User(s) deactivated successfully.",
      });
    } catch (err) {
      handleError(err);
    }
  };
  const handleOpenRecruiterModal = () => {
    setIsRecruiterModalOpen(true);
  };

  const handleCloseRecruiterModal = () => {
    setIsRecruiterModalOpen(false);
  };
  const handleCreateRecruiter = async (recruiter) => {
    try {
      await createRecruiter(recruiter);

      handleCloseRecruiterModal();

      await loadUsers();

      clearSelection();

      setNotification({
        type: "success",
        message: "Recruiter created successfully.",
      });
    } catch (err) {
      throw err;
    }
  };
  const handleResetPassword = async (password) => {
    try {
      await resetPassword(selectedUsers[0], password);

      await loadUsers();

      setSelectedUsers([]);

      setNotification({
        type: "success",
        message: "Password reset successfully.",
      });

      handleCloseResetPasswordModal();
    } catch (err) {
      setNotification({
        type: "danger",
        message: err.message || "Unable to reset password.",
      });

      throw err;
    }
  };
  const handleOpenResetPasswordModal = () => {
    setIsResetPasswordModalOpen(true);
  };

  const handleCloseResetPasswordModal = () => {
    setIsResetPasswordModalOpen(false);
  };
  const includesCurrentUser = () => {
    return selectedUsers.includes(currentUser.id);
  };
  const canDeactivate = selectedUsers.length > 0 && !includesCurrentUser();
  useEffect(() => {
    loadUsers();
  }, [currentPage, debouncedSearch, role]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, role]);

  useEffect(() => {
    clearSelection();
  }, [currentPage, debouncedSearch, role]);
  useEffect(() => {
    if (!notification.message) {
      return;
    }

    const timer = setTimeout(() => {
      setNotification({
        type: "",
        message: "",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

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

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Users</h2>

        <p className="text-muted mb-0">Manage system users.</p>
      </div>

      <Toolbar
        onAdd={handleOpenRecruiterModal}
        addLabel="Recruiter"
        onEditSelected={handleActivate}
        canEdit={selectedUsers.length > 0}
        editLabel="Activate"
        onDeleteSelected={handleDeactivate}
        canDelete={selectedUsers.length > 0}
        deleteLabel="Deactivate"
        onDuplicateSelected={handleResetPassword}
        canDuplicate={selectedUsers.length === 1}
        duplicateLabel="Reset Password"
        selectedCount={selectedUsers.length}
        onClearSelection={clearSelection}
        onActivate={handleActivate}
        onDeactivate={handleDeactivate}
        canActivate={selectedUsers.length > 0}
        canDeactivate={canDeactivate}
        onResetPassword={handleOpenResetPasswordModal}
        canResetPassword={selectedUsers.length === 1}
      />
      {notification.message && (
        <div
          className={`alert alert-${notification.type} alert-dismissible fade show mt-3`}
          role="alert"
        >
          {notification.message}

          <button
            type="button"
            className="btn-close"
            onClick={() =>
              setNotification({
                type: "",
                message: "",
              })
            }
          />
        </div>
      )}
      <div className="row g-3 mb-4">
        <div className="col-md">
          <Searchbar searchText={searchText} setSearchText={handleSearch} />
        </div>

        <div className="col-md-auto">
          <UserRoleFilter role={role} setRole={setRole} />
        </div>
      </div>

      <UserTable
        users={users}
        selectedUsers={selectedUsers}
        allSelected={allSelected}
        onToggleSelection={handleToggleSelection}
        onSelectAll={handleSelectAll}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {isRecruiterModalOpen && (
        <Modal title="Create Recruiter" onClose={handleCloseRecruiterModal}>
          <RecruiterForm
            onSubmit={handleCreateRecruiter}
            onClose={handleCloseRecruiterModal}
          />
        </Modal>
      )}
      {isResetPasswordModalOpen && (
        <Modal
          title="Reset Password"
          size="sm"
          onClose={handleCloseResetPasswordModal}
        >
          <ResetPasswordForm
            onSubmit={handleResetPassword}
            onClose={handleCloseResetPasswordModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default Users;
