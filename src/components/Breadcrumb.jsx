import { Link } from "react-router-dom";
import { translateCategory } from "../utils/categories";
import "./Breadcrumb.css";

function Breadcrumb({ category, title }) {
  return (
    <nav className="breadcrumb">
      <Link to="/">Início</Link>
      <span className="breadcrumb__sep">›</span>
      <Link to={`/?categoria=${category}`}>{translateCategory(category)}</Link>
      <span className="breadcrumb__sep">›</span>
      <span className="breadcrumb__current">{title}</span>
    </nav>
  );
}

export default Breadcrumb;