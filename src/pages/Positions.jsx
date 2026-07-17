// Positions.jsx (Parent)
import { useState } from "react";
import Toolbar from "../components/Toolbar";
import SearchBar from "../components/SearchBar";
import DepartmentFilter from "../components/DepartmentFilter";
import PositionTable from "../components/PositionTable";
import Pagination from "../components/Pagination";

const Positions = () => {
  const positions = [
    { id: 1, title: "Frontend Developer", department: "Engineering", location: "Remote", status: "Active" },
    { id: 2, title: "Data Analyst", department: "Analytics", location: "New York, NY", status: "Interviewing" },
    { id: 3, title: "Product Manager", department: "Product", location: "London, UK", status: "On Hold" },
    { id: 4, title: "HR Generalist", department: "Human Resources", location: "Austin, TX", status: "Active" },
    { id: 5, title: "DevOps Engineer", department: "Engineering", location: "Remote", status: "Closed" },
    { id: 6, title: "Systems Administrator", department: "Infrastructure", location: "Berlin", status: "Active" }
  ];

  const [searchText, setSearchText] = useState("");
  const [department, setDepartment] = useState("");

  const normalizedSearchText = searchText.trim().toLowerCase();

  const filteredPositions = positions.filter((position) => {
    const matchesSearch =
      normalizedSearchText === "" ||
      position.title.toLowerCase().includes(normalizedSearchText) ||
      position.location.toLowerCase().includes(normalizedSearchText);

    const matchesDepartment =
      department === "" ||
      position.department === department;

    return matchesSearch && matchesDepartment;
  });

  return (
    <>
      <Toolbar />
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <DepartmentFilter department={department} setDepartment={setDepartment} />
      <PositionTable positions={filteredPositions} />
      <Pagination />
    </>
  );
};
export default Positions;
