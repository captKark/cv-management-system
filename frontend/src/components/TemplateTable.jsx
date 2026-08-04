import PropTypes from "prop-types";

import StatusBadge from "./StatusBadge";

function TemplateTable({
  templates,
  selectedTemplates,
  allSelected,
  onToggleSelection,
  onSelectAll,
}) {
  const isSelected = (id) => {
    return selectedTemplates.includes(id);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th style={{ width: "50px" }}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={allSelected}
                    onChange={onSelectAll}
                  />
                </th>

                <th>Name</th>

                <th>Department</th>

                <th>Location</th>

                <th>Visibility</th>

                <th>Attributes</th>

                <th>Projects</th>
              </tr>
            </thead>

            <tbody>
              {templates.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center text-muted py-5"
                  >
                    <h5 className="mb-2">
                      No templates found
                    </h5>

                    <p className="mb-0">
                      Try changing your search.
                    </p>
                  </td>
                </tr>
              ) : (
                templates.map((template) => (
                  <tr key={template.id}>
                    <td>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isSelected(template.id)}
                        onChange={() =>
                          onToggleSelection(
                            template.id,
                          )
                        }
                      />
                    </td>

                    <td>{template.name}</td>

                    <td>
                      {template.department}
                    </td>

                    <td>{template.location}</td>

                    <td>
                      <StatusBadge
                        status={
                          template.visibility
                        }
                      />
                    </td>

                    <td>
                      {
                        template.attributes
                          .length
                      }
                    </td>

                    <td>
                      {template.maxProjects}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

TemplateTable.propTypes = {
  templates: PropTypes.array.isRequired,
  selectedTemplates: PropTypes.array
    .isRequired,
  allSelected: PropTypes.bool.isRequired,
  onToggleSelection:
    PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
};

export default TemplateTable;