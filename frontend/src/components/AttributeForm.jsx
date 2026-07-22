import { useState } from "react";
import { ATTRIBUTE_CATEGORIES } from "../constants/attributeCategories";
import { ATTRIBUTE_TYPES } from "../constants/attributeTypes";

function AttributeForm({ initialValues, onSubmit, onClose }) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [category, setCategory] = useState(initialValues?.category ?? "");
  const [type, setType] = useState(initialValues?.type ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !category || !type) {
      alert("All fields are required.");
      return;
    }

    onSubmit({
      name: name.trim(),
      category,
      type,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <h4 className="fw-bold mb-1">
          {initialValues ? "Edit Attribute" : "Add Attribute"}
        </h4>

        <p className="text-muted mb-0">
          {initialValues
            ? "Update the selected attribute."
            : "Create a new reusable attribute."}
        </p>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Attribute Name
        </label>

        <input
          type="text"
          className="form-control"
          placeholder="Enter attribute name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Category
        </label>

        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>

          {ATTRIBUTE_CATEGORIES.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">
          Type
        </label>

        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select type</option>

          {ATTRIBUTE_TYPES.map((type) => (
            <option
              key={type}
              value={type}
            >
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-primary"
        >
          {initialValues ? "Update Attribute" : "Create Attribute"}
        </button>
      </div>
    </form>
  );
}

export default AttributeForm;