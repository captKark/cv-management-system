import { useState, useEffect } from "react";
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
  {
    id: 7,
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote",
    status: "Active",
  },
  {
    id: 8,
    title: "Fullstack Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    status: "Interviewing",
  },
  {
    id: 9,
    title: "QA Automation Engineer",
    department: "Quality Assurance",
    location: "Remote",
    status: "Active",
  },
  {
    id: 10,
    title: "Product Designer",
    department: "Product",
    location: "London, UK",
    status: "On Hold",
  },
  {
    id: 11,
    title: "Scrum Master",
    department: "Product",
    location: "Remote",
    status: "Active",
  },
  {
    id: 12,
    title: "Talent Acquisition Specialist",
    department: "Human Resources",
    location: "Austin, TX",
    status: "Active",
  },
  {
    id: 13,
    title: "Financial Analyst",
    department: "Finance",
    location: "New York, NY",
    status: "Interviewing",
  },
  {
    id: 14,
    title: "Security Engineer",
    department: "Infrastructure",
    location: "Remote",
    status: "Active",
  },
  {
    id: 15,
    title: "Cloud Architect",
    department: "Infrastructure",
    location: "Seattle, WA",
    status: "Closed",
  },
  {
    id: 16,
    title: "Technical Writer",
    department: "Product",
    location: "Remote",
    status: "Active",
  },
  {
    id: 17,
    title: "Data Engineer",
    department: "Analytics",
    location: "Austin, TX",
    status: "Active",
  },
  {
    id: 18,
    title: "Compensation Specialist",
    department: "Human Resources",
    location: "Remote",
    status: "On Hold",
  },
];
const ROWS_PER_PAGE = 5;

const Positions = () => {
  const [positions, setPositions] = useState(initialPositions);
  const [searchText, setSearchText] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
