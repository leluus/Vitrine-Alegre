import { Link } from "react-router-dom";
import "./Logo.css";

function Logo() {
  return (
    <Link to="/" className="logo">
      <span className="logo__icon">V</span>
      <span className="logo__text">
        Vitrine <span className="logo__accent">Alegre</span>
      </span>
    </Link>
  );
}

export default Logo;