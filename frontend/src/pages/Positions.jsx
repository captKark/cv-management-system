import { useState, useEffect } from "react";
import Toolbar from "../components/Toolbar";
import Searchbar from "../components/Searchbar";
import DepartmentFilter from "../components/DepartmentFilter";
import PositionTable from "../components/PositionTable";
import Pagination from "../components/Pagination";

const ROWS_PER_PAGE = 5;

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  // --- Selection Business Logic

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

  const handleDeleteSelected = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedPositions.length} selected position(s)?`,
    );
    if (!confirmDelete) return;
    setPositions((prev) =>
      prev.filter((position) => !selectedPositions.includes(position.id)),
    );
    setSelectedPositions([]);
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
        onDeleteSelected={handleDeleteSelected}
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
    </>
  );
};
export default Positions;
