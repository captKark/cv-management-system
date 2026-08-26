import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DEPARTMENTS } from "../constants/departments";

function TemplateForm({ template, attributes, onSubmit, onCancel }) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [projectTag, setProjectTag] = useState("");
  const [maxProjects, setMaxProjects] = useState(5);
  const [description, setDescription] = useState("");

  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const resetForm = () => {
    setName("");
    setDepartment("");
    setLocation("");
    setVisibility("Public");
    setProjectTag("");
    setMaxProjects(5);
    setDescription("");
    setSelectedAttributes([]);
  };
  useEffect(() => {
    if (!template) {
      resetForm();
      return;
    }

    setName(template.name);
    setDepartment(template.department);
    setLocation(template.location);
    setVisibility(template.visibility);
    setProjectTag(template.projectTag || "");
    setMaxProjects(template.maxProjects);
    setDescription(template.description || "");

    setSelectedAttributes(template.attributes.map((item) => item.attributeId));
  }, [template]);

  const toggleAttribute = (id) => {
    setSelectedAttributes((previous) => {
      if (previous.includes(id)) {
        return previous.filter((value) => value !== id);
      }

      return [...previous, id];
    });
  };

  const buildTemplate = () => ({
    name,
    department,
    location,
    visibility,
    projectTag,
    maxProjects: Number(maxProjects),
    description,
    attributeIds: selectedAttributes,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(buildTemplate());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>

        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Department</label>

          <select
            className="form-select"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">Select Department</option>

            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Location</label>

          <input
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Visibility</label>

          <select
            className="form-select"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Max Projects</label>

          <input
            type="number"
            min={1}
            className="form-control"
            value={maxProjects}
            onChange={(e) => setMaxProjects(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Project Tag</label>

        <input
          className="form-control"
          value={projectTag}
          onChange={(e) => setProjectTag(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>

        <textarea
          rows={3}
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Attributes</label>

        <div
          className="border rounded p-3"
          style={{
            maxHeight: 220,
            overflowY: "auto",
          }}
        >
          {attributes.map((attribute) => (
            <div className="form-check" key={attribute.id}>
              <input
                type="checkbox"
                className="form-check-input"
                checked={selectedAttributes.includes(attribute.id)}
                onChange={() => toggleAttribute(attribute.id)}
              />

              <label className="form-check-label">{attribute.name}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>

        <button type="submit" className="btn btn-primary">
          Save Template
        </button>
      </div>
    </form>
  );
}

TemplateForm.propTypes = {
  template: PropTypes.object,
  attributes: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default TemplateForm;
