import { useState } from "react";
import { apiFetch } from "../utils/apiFetch";
const API_URL = `${import.meta.env.VITE_API_URL}/api/cvs`;

function GeneratedAttributesModal({ cv, onClose, onSaved }) {
  const [values, setValues] = useState(
    cv.attributeValues.map((item) => ({
      attributeId: item.attributeId,
      attributeName: item.attribute.name,
      attributeType: item.attribute.type,
      value: item.value ?? "",
    })),
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (attributeId, value) => {
    setValues((prev) =>
      prev.map((item) =>
        item.attributeId === attributeId ? { ...item, value } : item,
      ),
    );
  };
  const getInputType = (attributeType) => {
    switch (attributeType) {
      case "Email":
        return "email";

      case "Phone":
        return "tel";

      case "URL":
        return "url";

      case "Number":
        return "number";

      default:
        return "text";
    }
  };
  const handleSave = async () => {
    setLoading(true);

    try {
      const response = await apiFetch(`${API_URL}/${cv.id}/attributes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          values.map((item) => ({
            attributeId: item.attributeId,
            value: item.value,
          })),
        ),
      });

      if (!response.ok) {
        throw new Error("Failed to update attribute values.");
      }

      onSaved(values);

      alert("Attribute values saved successfully.");

      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to save attribute values.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th style={{ width: "35%" }}>Attribute</th>
              <th>Value</th>
            </tr>
          </thead>

          <tbody>
            {values.map((item) => (
              <tr key={item.attributeId}>
                <td className="fw-semibold">{item.attributeName}</td>

                <td>
                  <input
                    type={getInputType(item.attributeType)}
                    className={`form-control ${
                      item.value.trim() === "" ? "border-danger" : ""
                    }`}
                    value={item.value}
                    onChange={(e) =>
                      handleChange(item.attributeId, e.target.value)
                    }
                  />

                  {item.value.trim() === "" && (
                    <small className="text-danger">Missing value</small>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-3">
        <button
          className="btn btn-outline-secondary"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </>
  );
}

export default GeneratedAttributesModal;
