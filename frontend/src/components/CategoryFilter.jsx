import { ATTRIBUTE_CATEGORIES } from "../constants/attributeCategories";

function CategoryFilter({ category, setCategory }) {
  return (
    <div className="mb-3">
      <select
        className="form-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>

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
  );
}

export default CategoryFilter;