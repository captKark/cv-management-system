import { useEffect, useState } from "react";

const ATTRIBUTES_API = `${import.meta.env.VITE_API_URL}/api/attributes`;
const POSITIONS_API = `${import.meta.env.VITE_API_URL}/api/positions`;

function AssignAttributesModal({ positionId, onClose, onSaved }) {
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [attributesResponse, positionResponse] = await Promise.all([
          fetch(ATTRIBUTES_API),
          fetch(`${POSITIONS_API}/${positionId}/attributes`),
        ]);

        const allAttributes = await attributesResponse.json();
        const position = await positionResponse.json();

        setAttributes(allAttributes);

        setSelectedAttributes(
          position.attributes.map((item) => item.attribute.id),
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [positionId]);

  const handleToggle = (id) => {
    setSelectedAttributes((prev) =>
      prev.includes(id)
        ? prev.filter((attributeId) => attributeId !== id)
        : [...prev, id],
    );
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const response = await fetch(
        `${POSITIONS_API}/${positionId}/attributes`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            attributeIds: selectedAttributes,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to save.");
      }

      onSaved();
    } catch (err) {
      console.error(err);
      alert("Unable to save attributes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="mb-3">
        <h5 className="fw-bold mb-1">Assign Attributes</h5>

        <p className="text-muted mb-0">
          Select the attributes available for this position.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" />
        </div>
      ) : (
        <>
          <div
            className="border rounded p-3"
            style={{
              maxHeight: "350px",
              overflowY: "auto",
            }}
          >
            {attributes.map((attribute) => (
              <div
                key={attribute.id}
                className="form-check mb-2"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`attribute-${attribute.id}`}
                  checked={selectedAttributes.includes(attribute.id)}
                  onChange={() => handleToggle(attribute.id)}
                />

                <label
                  className="form-check-label"
                  htmlFor={`attribute-${attribute.id}`}
                >
                  <strong>{attribute.name}</strong>

                  <span className="text-muted ms-2">
                    ({attribute.category})
                  </span>
                </label>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default AssignAttributesModal;