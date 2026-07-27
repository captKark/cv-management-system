function ConfirmDeleteModal({
  itemName,
  count,
  onConfirm,
  onCancel,
  loading = false,
}) {
  return (
    <>
      <div className="text-center">
        <i
          className="bi bi-trash3-fill text-danger"
          style={{ fontSize: "2.25rem" }}
        />

        <h5 className="fw-semibold mt-3 mb-2">
          Delete {count} {itemName}
          {count > 1 ? "s" : ""}?
        </h5>

        <p className="text-muted mb-0">
          This action cannot be undone.
        </p>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button
          className="btn btn-outline-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          className="btn btn-danger"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              />
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </>
  );
}

export default ConfirmDeleteModal;