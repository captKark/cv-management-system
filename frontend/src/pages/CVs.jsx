import { useEffect, useState } from "react";
import CVTable from "../components/CVTable";
import Toolbar from "../components/Toolbar";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import CVForm from "../components/CVForm";

const ROWS_PER_PAGE = 5;
const API_URL = `${import.meta.env.VITE_API_URL}/api/cvs`;

function CVs() {
  const [cvs, setCVs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [selectedCVs, setSelectedCVs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCV, setEditingCV] = useState(null);

  useEffect(() => {
    const fetchCVs = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch CVs.");
        }

        const data = await response.json();
        setCVs(data);
      } catch (err) {
        console.error(err);
        setError("Error loading CVs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCVs();
  }, []);

  const normalizedSearchText = searchText.trim().toLowerCase();

  const filteredCVs = cvs.filter(
    (cv) =>
      normalizedSearchText === "" ||
      cv.candidateName.toLowerCase().includes(normalizedSearchText) ||
      cv.positionTitle.toLowerCase().includes(normalizedSearchText),
  );

  const totalPages = Math.ceil(filteredCVs.length / ROWS_PER_PAGE);

  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  const currentPageCVs = filteredCVs.slice(startIndex, endIndex);

  const visibleIds = currentPageCVs.map((cv) => cv.id);

  const allSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedCVs.includes(id));

  const handleToggleSelection = (id) => {
    setSelectedCVs((prev) =>
      prev.includes(id) ? prev.filter((cvId) => cvId !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedCVs((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedCVs((prev) => [
        ...prev,
        ...visibleIds.filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const handleCreateCV = async (newCV) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCV),
      });

      if (!response.ok) {
        throw new Error("Failed to create CV.");
      }

      const createdCV = await response.json();

      setCVs((prev) => [...prev, createdCV]);

      setIsAddModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Unable to create CV.");
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = () => {
    const cv = cvs.find((cv) => cv.id === selectedCVs[0]);

    if (!cv) return;

    setEditingCV(cv);
  };

  const handleCloseEditModal = () => {
    setEditingCV(null);
  };
  const handleUpdateCV = async (updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${editingCV.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update CV.");
      }

      const updatedCV = await response.json();

      setCVs((prev) =>
        prev.map((cv) => (cv.id === updatedCV.id ? updatedCV : cv)),
      );

      handleCloseEditModal();
      setSelectedCVs([]);
    } catch (err) {
      console.error(err);
      alert("Unable to update CV.");
    }
  };
  const handleDeleteSelected = async () => {
    const confirmed = window.confirm(
      `Delete ${selectedCVs.length} selected CV(s)?`,
    );

    if (!confirmed) return;

    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedCVs,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete CVs.");
      }

      setCVs((prev) => prev.filter((cv) => !selectedCVs.includes(cv.id)));

      setSelectedCVs([]);
    } catch (err) {
      console.error(err);
      alert("Unable to delete CVs.");
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (loading) {
    return <p>Loading CVs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Toolbar
        onAdd={handleOpenAddModal}
        onEditSelected={handleOpenEditModal}
        onDeleteSelected={handleDeleteSelected}
        canEdit={selectedCVs.length === 1}
        canDelete={selectedCVs.length > 0}
        addLabel="Add CV"
      />

      <Searchbar searchText={searchText} setSearchText={setSearchText} />

      <CVTable
        cvs={currentPageCVs}
        selectedCVs={selectedCVs}
        allSelected={allSelected}
        onToggleSelection={handleToggleSelection}
        onSelectAll={handleSelectAll}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {editingCV ? (
        <CVForm
          initialValues={editingCV}
          onSubmit={handleUpdateCV}
          onClose={handleCloseEditModal}
        />
      ) : (
        isAddModalOpen && (
          <CVForm
            initialValues={null}
            onSubmit={handleCreateCV}
            onClose={() => setIsAddModalOpen(false)}
          />
        )
      )}
    </>
  );
}

export default CVs;
