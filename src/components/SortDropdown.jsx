import "./SortDropdown.css";

const OPTIONS = [
  { value: "", label: "Relevância" },
  { value: "preco-asc", label: "Menor preço" },
  { value: "preco-desc", label: "Maior preço" },
  { value: "avaliacao-desc", label: "Melhor avaliação" },
];

function SortDropdown({ value, onChange }) {
  return (
    <label className="sort-dropdown">
      Ordenar:
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </label>
  );
}

export default SortDropdown;