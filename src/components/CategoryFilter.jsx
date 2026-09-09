function CategoryFilter({ categories, selectedCategory, onChange }) {
  return (
    <select
      className="category-filter"
      value={selectedCategory}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Todas as categorias</option>
      {categories.map((cat) => (
        <option key={cat.slug} value={cat.slug}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;