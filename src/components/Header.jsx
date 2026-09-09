import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { useCart } from "../context/CartContext";
import "./Header.css";

const DEBOUNCE_MS = 400;

function Header() {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [searchTerm, setSearchTerm] = useState(
    isHome ? new URLSearchParams(location.search).get("busca") || "" : ""
  );

  const debounceRef = useRef(null);

  useEffect(() => {
    if (isHome) {
      setSearchTerm(new URLSearchParams(location.search).get("busca") || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, location.pathname]);

  function goToSearch(term) {
    const params = new URLSearchParams(isHome ? location.search : "");
    if (term.trim() !== "") {
      params.set("busca", term.trim());
    } else {
      params.delete("busca");
    }
    params.delete("pagina");
    navigate(`/?${params.toString()}`);
  }

  function handleChange(e) {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => goToSearch(value), DEBOUNCE_MS);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    goToSearch(searchTerm);
  }

  return (
    <header className="header">
      <div className="header__inner">
        <Logo />

        <form className="header__search" onSubmit={handleSubmit}>
          <span className="header__search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={handleChange}
          />
        </form>

        <div className="header__actions">
          <span className="header__login">Entrar</span>
          <Link to="/carrinho" className="header__cart">
            <span className="header__cart-icon">🛒</span>
            Carrinho
            {totalItems > 0 && <span className="header__badge">{totalItems}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;