import { useEffect, useRef, useState } from "react";

import Toolbar from "../components/Toolbar";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import TemplateTable from "../components/TemplateTable";
import Modal from "../components/Modal";
import TemplateForm from "../components/TemplateForm";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

import {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplates,
  generatePosition,
} from "../services/templateService";

import { getAllAttributes } from "../services/attributeService";

const ROWS_PER_PAGE = 5;

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [attributes, setAttributes] = useState([]);

  const [selectedTemplates, setSelectedTemplates] = useState([]);

  const [editingTemplate, setEditingTemplate] = useState(null);

  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [error, setError] = useState("");

  const firstLoad = useRef(true);

  const handleError = (err) => {
    setError(err.message);
  };

  const buildQuery = () => ({
    page: currentPage,
    pageSize: ROWS_PER_PAGE,
    search: searchText,
  });
  
  const loadTemplates = async () => {
    const data = await getTemplates(buildQuery());

    setTemplates(data.templates);
    setTotalPages(data.totalPages);
  };

  const loadAttributes = async () => {
    const data = await getAllAttributes();

    setAttributes(data);
  };

  useEffect(() => {
    loadAttributes();
  }, []);

  useEffect(() => {
    const fetchTemplates = async () => {
      setError("");

      if (firstLoad.current) {
        setLoading(true);
      } else {
        setTableLoading(true);
      }

      try {
        await loadTemplates();
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
        setTableLoading(false);
        firstLoad.current = false;
      }
    };

    fetchTemplates();
  }, [currentPage, searchText]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const visibleIds = templates.map((template) => template.id);

  const allSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) => selectedTemplates.includes(id));

  const handleToggleSelection = (id) => {
    setSelectedTemplates((previous) => {
      if (previous.includes(id)) {
        return previous.filter((templateId) => templateId !== id);
      }

      return [...previous, id];
    });
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedTemplates((previous) =>
        previous.filter((id) => !visibleIds.includes(id)),
      );

      return;
    }

    setSelectedTemplates((previous) => [
      ...previous,
      ...visibleIds.filter((id) => !previous.includes(id)),
    ]);
  };

  const handleClearSelection = () => {
    setSelectedTemplates([]);
  };

  const openCreateModal = () => {
    setEditingTemplate(null);
    setShowForm(true);
  };

  const openEditModal = async () => {
    if (selectedTemplates.length !== 1) {
      return;
    }

    try {
      const template = await getTemplate(selectedTemplates[0]);

      setEditingTemplate(template);
      setShowForm(true);
    } catch (err) {
      handleError(err);
    }
  };

  const closeModal = () => {
    setEditingTemplate(null);
    setShowForm(false);
  };

  const saveTemplate = async (templateData) => {
    try {
      if (editingTemplate) {
        await updateTemplate(editingTemplate.id, templateData);
      } else {
        await createTemplate(templateData);
      }

      closeModal();
      handleClearSelection();

      setTableLoading(true);

      try {
        await loadTemplates();
      } finally {
        setTableLoading(false);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const refreshAfterDelete = async () => {
    if (
      templates.length === selectedTemplates.length &&
      currentPage > 1
    ) {
      setCurrentPage((page) => page - 1);
      return;
    }

    setTableLoading(true);

    try {
      await loadTemplates();
    } finally {
      setTableLoading(false);
    }
  };

  const removeTemplates = async () => {
    try {
      await deleteTemplates(selectedTemplates);

      closeDeleteModal();
      handleClearSelection();

      await refreshAfterDelete();
    } catch (err) {
      handleError(err);
    }
  };

  const handleGeneratePosition = async () => {
    if (selectedTemplates.length !== 1) {
      return;
    }

    try {
      setTableLoading(true);

      await generatePosition(selectedTemplates[0]);

      handleClearSelection();

      await loadTemplates();
    } catch (err) {
      handleError(err);
    } finally {
      setTableLoading(false);
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

  const canGeneratePosition = selectedTemplates.length === 1;

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Position Templates</h2>

        <p className="text-muted mb-0">
          Manage reusable position templates.
        </p>
      </div>

      <Toolbar
        addLabel="Template"
        selectedCount={selectedTemplates.length}
        canEdit={selectedTemplates.length === 1}
        canDelete={selectedTemplates.length > 0}
        onGeneratePosition={handleGeneratePosition}
        canGeneratePosition={canGeneratePosition}
        canDuplicate={false}
        onAdd={openCreateModal}
        onEditSelected={openEditModal}
        onDeleteSelected={openDeleteModal}
        onDuplicateSelected={() => {}}
        onClearSelection={handleClearSelection}
      />

      <div className="row mb-3">
        <div className="col-md-8">
          <Searchbar
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </div>
      </div>

      {tableLoading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">
              Loading templates...
            </span>
          </div>
        </div>
      ) : (
        <TemplateTable
          templates={templates}
          selectedTemplates={selectedTemplates}
          allSelected={allSelected}
          onToggleSelection={handleToggleSelection}
          onSelectAll={handleSelectAll}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {showForm && (
        <Modal
          show={showForm}
          title={
            editingTemplate
              ? "Edit Template"
              : "Create Template"
          }
          onClose={closeModal}
        >
          <TemplateForm
            template={editingTemplate}
            attributes={attributes}
            onSubmit={saveTemplate}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {showDeleteModal && (
        <Modal
          show={showDeleteModal}
          title="Delete Templates"
          onClose={closeDeleteModal}
        >
          <ConfirmDeleteModal
            itemName="Template"
            count={selectedTemplates.length}
            onConfirm={removeTemplates}
            onCancel={closeDeleteModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default Templates;