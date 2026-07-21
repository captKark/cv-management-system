import { useState, useEffect } from "react";
import Toolbar from "../components/Toolbar";
import Searchbar from "../components/Searchbar";
import DepartmentFilter from "../components/DepartmentFilter";
import PositionTable from "../components/PositionTable";
import Pagination from "../components/Pagination";
import PositionForm from "../components/PositionForm";

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

  // ---------- Delete ----------

  const handleDeleteSelected = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedPositions.length} selected position(s)?`,
    );

    if (!confirmDelete) return;

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

      handleCloseEditModal();
      setSelectedPositions([]);
    } catch (err) {
      console.error(err);
      alert("Unable to update position.");
    }
  };

  if (loading) {
    return <p>Loading positions...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Toolbar
        onAddPosition={handleOpenAddModal}
        onEditSelected={handleOpenEditModal}
        onDeleteSelected={handleDeleteSelected}
        canEdit={selectedPositions.length === 1}
        canDelete={selectedPositions.length > 0}
      />

      <Searchbar searchText={searchText} setSearchText={setSearchText} />

      <DepartmentFilter department={department} setDepartment={setDepartment} />

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

      {editingPosition ? (
        <PositionForm
          initialValues={editingPosition}
          onSubmit={handleUpdatePosition}
          onClose={handleCloseEditModal}
        />
      ) : (
        isAddModalOpen && (
          <PositionForm
            initialValues={null}
            onSubmit={handleCreatePosition}
            onClose={handleCloseAddModal}
          />
        )
      )}
    </>
  );
};

export default Positions;
