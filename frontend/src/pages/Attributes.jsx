import { useState, useEffect } from "react";
import { apiFetch } from "../utils/apiFetch";
import Toolbar from "../components/Toolbar";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import AttributeForm from "../components/AttributeForm";
import AttributeTable from "../components/AttributeTable";
import CategoryFilter from "../components/CategoryFilter";

const API_URL = `${import.meta.env.VITE_API_URL}/api/attributes`;
const ROWS_PER_PAGE = 5;

const Attributes = () => {
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchAttributes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiFetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch attributes.");
        }

        const data = await response.json();
        setAttributes(data);
      } catch (err) {
        console.error(err);
        setError("Error loading attributes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttributes();
  }, []);

  const normalizedSearchText = searchText.trim().toLowerCase();

  const filteredAttributes = attributes.filter(
    (attribute) =>
      (normalizedSearchText === "" ||
        attribute.name.toLowerCase().includes(normalizedSearchText)) &&
      (category === "" || attribute.category === category),
  );

  const totalPages = Math.ceil(filteredAttributes.length / ROWS_PER_PAGE);

  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  const currentPageAttributes = filteredAttributes.slice(startIndex, endIndex);

  // ---------- Selection Logic ----------

  const visibleIds = currentPageAttributes.map((attribute) => attribute.id);

  const allSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) => selectedAttributes.includes(id));

  const handleToggleSelection = (id) => {
    setSelectedAttributes((prev) => {
      if (prev.includes(id)) {
        return prev.filter((attributeId) => attributeId !== id);
      }

      return [...prev, id];
    });
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedAttributes((prev) =>
        prev.filter((id) => !visibleIds.includes(id)),
      );
    } else {
      setSelectedAttributes((prev) => [
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
  }, [searchText, category]);

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
      `Are you sure you want to delete ${selectedAttributes.length} selected attribute(s)?`,
    );

    if (!confirmed) return;

    try {
      const response = await apiFetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedAttributes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete attributes.");
      }

      setAttributes((prev) =>
        prev.filter((attribute) => !selectedAttributes.includes(attribute.id)),
      );
      setSuccessMessage("Attribute(s) deleted successfully.");

      setSelectedAttributes([]);
    } catch (err) {
      console.error(err);
      alert("Unable to delete attributes.");
    }
  };

  // ---------- Create ----------

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleCreateAttribute = async (newAttribute) => {
    try {
      const response = await apiFetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAttribute),
      });

      if (!response.ok) {
        throw new Error("Failed to create attribute.");
      }

      const createdAttribute = await response.json();

      setAttributes((prev) => [...prev, createdAttribute]);
      setSuccessMessage("Attribute created successfully.");
      handleCloseAddModal();
    } catch (err) {
      console.error(err);
      alert("Unable to create attribute.");
    }
  };

  // ---------- Edit ----------

  const handleOpenEditModal = () => {
    const attribute = attributes.find(
      (attribute) => attribute.id === selectedAttributes[0],
    );

    if (!attribute) return;

    setEditingAttribute(attribute);
  };

  const handleCloseEditModal = () => {
    setEditingAttribute(null);
  };

  const handleUpdateAttribute = async (updatedData) => {
    try {
      const response = await apiFetch(`${API_URL}/${editingAttribute.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update attribute.");
      }

      const updatedAttribute = await response.json();

      setAttributes((prev) =>
        prev.map((attribute) =>
          attribute.id === updatedAttribute.id ? updatedAttribute : attribute,
        ),
      );
      setSuccessMessage("Attribute updated successfully.");

      handleCloseEditModal();
      setSelectedAttributes([]);
    } catch (err) {
      console.error(err);
      alert("Unable to update attribute.");
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
        <h2 className="fw-bold">Attributes</h2>
        <p className="text-muted mb-0">Manage available attributes.</p>
      </div>
      <Toolbar
        onAdd={handleOpenAddModal}
        onEditSelected={handleOpenEditModal}
        onDeleteSelected={handleDeleteSelected}
        canEdit={selectedAttributes.length === 1}
        canDelete={selectedAttributes.length > 0}
        addLabel="Add Attribute"
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
            placeholder="Search by attribute name..."
          />
        </div>

        <div className="col-md-4">
          <CategoryFilter category={category} setCategory={setCategory} />
        </div>
      </div>

      <AttributeTable
        attributes={currentPageAttributes}
        selectedAttributes={selectedAttributes}
        allSelected={allSelected}
        onToggleSelection={handleToggleSelection}
        onSelectAll={handleSelectAll}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {editingAttribute && (
        <Modal title="Edit Attribute" onClose={handleCloseEditModal}>
          <AttributeForm
            initialValues={editingAttribute}
            onSubmit={handleUpdateAttribute}
            onClose={handleCloseEditModal}
          />
        </Modal>
      )}

      {isAddModalOpen && (
        <Modal title="Add Attribute" onClose={handleCloseAddModal}>
          <AttributeForm
            initialValues={null}
            onSubmit={handleCreateAttribute}
            onClose={handleCloseAddModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Attributes;
