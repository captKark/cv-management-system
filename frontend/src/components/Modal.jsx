function Modal({ title, children, onClose, size = "md" }) {
  const modalClass =
    size === "sm"
      ? "modal-dialog modal-dialog-centered modal-sm"
      : size === "lg"
        ? "modal-dialog modal-dialog-centered modal-lg"
        : "modal-dialog modal-dialog-centered";

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
      >
        <div className={modalClass}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              />
            </div>

            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default Modal;