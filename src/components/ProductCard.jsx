import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getPricing } from "../utils/pricing";
import { formatBRL } from "../utils/currency";
import { translateCategory } from "../utils/categories";
import StarRating from "./StarRating";
import "./ProductCard.css";

const FEEDBACK_DURATION = 1500;

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { id, title, category, rating, thumbnail, stock } = product;
  const { hasDiscount, originalBRL, discountedBRL, discountPercent } = getPricing(product);
  const [justAdded, setJustAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), FEEDBACK_DURATION);
  }

  return (
    <div className="product-card">
      <Link to={`/produto/${id}`} className="product-card__link">
        <div className="product-card__image-wrap">
          {hasDiscount && <span className="product-card__badge">-{discountPercent}%</span>}
          <img src={thumbnail} alt={title} className="product-card__image" />
        </div>
        <div className="product-card__body">
          <span className="product-card__category">{translateCategory(category)}</span>
          <h3 className="product-card__title">{title}</h3>
          <StarRating rating={rating} />
          <div className="product-card__price">
            {hasDiscount && <span className="product-card__old-price">{formatBRL(originalBRL)}</span>}
            <span className="product-card__final-price">{formatBRL(discountedBRL)}</span>
          </div>
        </div>
      </Link>

      {stock === 0 ? (
        <button className="btn btn--primary product-card__button" disabled>Esgotado</button>
      ) : (
        <button
          className={`btn product-card__button ${justAdded ? "product-card__button--added" : "btn--primary"}`}
          onClick={handleAddToCart}
        >
          {justAdded ? "Adicionado ✓" : "Adicionar"}
        </button>
      )}
    </div>
  );
}

export default ProductCard;