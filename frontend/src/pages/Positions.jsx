import { useState, useEffect } from "react";
import Toolbar from "../components/Toolbar";
import Searchbar from "../components/Searchbar";
import DepartmentFilter from "../components/DepartmentFilter";
import PositionTable from "../components/PositionTable";
import Pagination from "../components/Pagination";
import PositionForm from "../components/PositionForm";
import Modal from "../components/Modal";

const API_URL = `${import.meta.env.VITE_API_URL}/api/positions`;
const ROWS_PER_PAGE = 5;

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [department, setDepartment] = useState("");

  const [selectedPositions, setSelectedPositions] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchPositions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/positions`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch positions.");
        }

        const data = await response.json();
        setPositions(data);
      } catch (err) {
        console.error(err);
        setError("Error loading positions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  const normalizedSearchText = searchText.trim().toLowerCase();

  const filteredPositions = positions.filter((position) => {
    const matchesSearch =
      normalizedSearchText === "" ||
      position.title.toLowerCase().includes(normalizedSearchText) ||
      position.location.toLowerCase().includes(normalizedSearchText);

    const matchesDepartment =
      department === "" || position.department === department;

    return matchesSearch && matchesDepartment;
  });

  const totalPages = Math.ceil(filteredPositions.length / ROWS_PER_PAGE);

  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  const currentPagePositions = filteredPositions.slice(startIndex, endIndex);

  // ---------- Selection Logic ----------

  const visibleIds = currentPagePositions.map((position) => position.id);

  const allSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) => selectedPositions.includes(id));

  const handleToggleSelection = (id) => {
    setSelectedPositions((prev) => {
      if (prev.includes(id)) {
        return prev.filter((positionId) => positionId !== id);
      }

      return [...prev, id];
    });
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedPositions((prev) =>
        prev.filter((id) => !visibleIds.includes(id)),
      );
    } else {
      setSelectedPositions((prev) => [
        ...prev,
        ...visibleIds.filter((id) => !prev.includes(id)),
      ]);
    }
  };

  // ---------- Pagination ----------

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, department]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);
  // ---------- Delete ----------

  const handleDeleteSelected = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedPositions.length} selected position(s)?`,
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/positions`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: selectedPositions,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete positions.");
      }

      setPositions((prev) =>
        prev.filter((position) => !selectedPositions.includes(position.id)),
      );
      setSuccessMessage("Position(s) deleted successfully.");

      setSelectedPositions([]);
    } catch (err) {
      console.error(err);
      alert("Unable to delete positions.");
    }
  };

  // ---------- Create ----------

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleCreatePosition = async (newPosition) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/positions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPosition),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create position.");
      }

      const createdPosition = await response.json();

      setPositions((prev) => [...prev, createdPosition]);
      setSuccessMessage("Position created successfully.");
      handleCloseAddModal();
    } catch (err) {
      console.error(err);
      alert("Unable to create position.");
    }
  };

  // ---------- Edit ----------

  const handleOpenEditModal = () => {
    const position = positions.find(
      (position) => position.id === selectedPositions[0],
    );

    if (!position) return;

    setEditingPosition(position);
  };

  const handleCloseEditModal = () => {
    setEditingPosition(null);
  };

  const handleUpdatePosition = async (updatedData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/positions/${editingPosition.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update position.");
      }

      const updatedPosition = await response.json();

      setPositions((prev) =>
        prev.map((position) =>
          position.id === updatedPosition.id ? updatedPosition : position,
        ),
      );
      setSuccessMessage("Position updated successfully.");

      handleCloseEditModal();
      setSelectedPositions([]);
    } catch (err) {
      console.error(err);
      alert("Unable to update position.");
    }
  };

  const handleDuplicateSelected = async () => {
    if (selectedPositions.length !== 1) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${selectedPositions[0]}/duplicate`,
        {
          method: "POST",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to duplicate position.");
      }

      const duplicatedPosition = await response.json();

      setPositions((prev) => [...prev, duplicatedPosition]);
      setSuccessMessage("Position duplicated successfully.");
      setSelectedPositions([]);
    } catch (err) {
      console.error(err);
      alert("Unable to duplicate position.");
    }
  };

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
        <h2 className="fw-bold">Positions</h2>
        <p className="text-muted mb-0">Manage available job positions.</p>
      </div>
      <Toolbar
        onAdd={handleOpenAddModal}
        onDuplicateSelected={handleDuplicateSelected}
        onEditSelected={handleOpenEditModal}
        onDeleteSelected={handleDeleteSelected}
        canDuplicate={selectedPositions.length === 1}
        canEdit={selectedPositions.length === 1}
        canDelete={selectedPositions.length > 0}
        addLabel="Add Position"
      />
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show mt-3">
          {successMessage}

          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccessMessage("")}
          />
        </div>
      )}
      <div className="row mb-3">
        <div className="col-md-8">
          <Searchbar
            searchText={searchText}
            setSearchText={setSearchText}
            placeholder="Search by title or department..."
          />
        </div>

        <div className="col-md-4">
          <DepartmentFilter
            department={department}
            setDepartment={setDepartment}
          />
        </div>
      </div>

      <PositionTable
        positions={currentPagePositions}
        selectedPositions={selectedPositions}
        allSelected={allSelected}
        onToggleSelection={handleToggleSelection}
        onSelectAll={handleSelectAll}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {editingPosition && (
        <Modal title="Edit Position" onClose={handleCloseEditModal}>
          <PositionForm
            initialValues={editingPosition}
            onSubmit={handleUpdatePosition}
            onClose={handleCloseEditModal}
          />
        </Modal>
      )}

      {isAddModalOpen && (
        <Modal title="Add Position" onClose={handleCloseAddModal}>
          <PositionForm
            initialValues={null}
            onSubmit={handleCreatePosition}
            onClose={handleCloseAddModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Positions;
