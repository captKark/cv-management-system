import { useState } from "react";
import Toolbar from "../components/Toolbar";
import Searchbar from "../components/Searchbar";
import DepartmentFilter from "../components/DepartmentFilter";
import PositionTable from "../components/PositionTable";
import Pagination from "../components/Pagination";

const initialPositions = [
  {
    id: 1,
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    status: "Active",
  },
  {
    id: 2,
    title: "Data Analyst",
    department: "Analytics",
    location: "New York, NY",
    status: "Interviewing",
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Product",
    location: "London, UK",
    status: "On Hold",
  },
  {
    id: 4,
    title: "HR Generalist",
    department: "Human Resources",
    location: "Austin, TX",
    status: "Active",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    status: "Closed",
  },
  {
    id: 6,
    title: "Systems Administrator",
    department: "Infrastructure",
    location: "Berlin",
    status: "Active",
  },
];

const Positions = () => {
  const [positions, setPositions] = useState(initialPositions);
  const [searchText, setSearchText] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedPositions, setSelectedPositions] = useState([]);

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

  // --- Selection Business Logic

  const visibleIds = filteredPositions.map((position) => position.id);

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

  return (
    <>
      <Toolbar
        onDeleteSelected={handleDeleteSelected}
        canDelete={selectedPositions.length > 0}
      />
      <Searchbar searchText={searchText} setSearchText={setSearchText} />
      <DepartmentFilter department={department} setDepartment={setDepartment} />
      <PositionTable
        positions={filteredPositions}
        selectedPositions={selectedPositions}
        allSelected={allSelected}
        onToggleSelection={handleToggleSelection}
        onSelectAll={handleSelectAll}
      />
      <Pagination />
    </>
  );
};
export default Positions;
