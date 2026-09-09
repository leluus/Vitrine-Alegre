import { useState } from "react";
import { translateCategory } from "../utils/categories";
import "./CategoryPills.css";

const VISIBLE_COUNT = 7;

function CategoryPills({ categories, selected, onSelect }) {
  const [expanded, setExpanded] = useState(false);

  const visibleCategories = expanded ? categories : categories.slice(0, VISIBLE_COUNT);
  const hiddenCount = categories.length - VISIBLE_COUNT;

  return (
    <div className="category-pills">
      <button
        className={`category-pills__pill ${selected === "" ? "category-pills__pill--active" : ""}`}
        onClick={() => onSelect("")}
      >
        Todas
      </button>

      {visibleCategories.map((cat) => (
        <button
          key={cat.slug}
          className={`category-pills__pill ${selected === cat.slug ? "category-pills__pill--active" : ""}`}
          onClick={() => onSelect(cat.slug)}
        >
          {translateCategory(cat.slug)}
        </button>
      ))}

      {!expanded && hiddenCount > 0 && (
        <button className="category-pills__more" onClick={() => setExpanded(true)}>
          +{hiddenCount}
        </button>
      )}
    </div>
  );
}

export default CategoryPills;