import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/api";
import { useCart } from "../context/CartContext";
import { getPricing } from "../utils/pricing";
import { formatBRL, formatInstallments } from "../utils/currency";
import { formatDate, getInitial } from "../utils/format";
import { translateCategory } from "../utils/categories";
import { translateShipping, translateWarranty, translateReturnPolicy } from "../utils/productInfo";
import Breadcrumb from "../components/Breadcrumb";
import StarRating from "../components/StarRating";
import QuantityStepper from "../components/QuantityStepper";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProductById(id);
      setProduct(data);
      setSelectedImage(0);
      setQuantity(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <p className="detail__status">Carregando produto...</p>;
  }

  if (error) {
    return (
      <div className="detail__status">
        <p>Não foi possível carregar o produto: {error}</p>
        <button className="btn btn--primary" onClick={loadProduct}>Tentar novamente</button>
      </div>
    );
  }

  if (!product) return null;

  const {
    title, description, brand, sku, category, rating, reviews = [],
    stock, images, tags = [], weight, dimensions,
    minimumOrderQuantity, warrantyInformation, shippingInformation, returnPolicy,
  } = product;

  const { hasDiscount, originalBRL, discountedBRL, discountPercent, savingsBRL } = getPricing(product);

  function handleAddToCart() {
    addToCart(product, quantity);
    navigate("/carrinho");
  }

  return (
    <div className="detail">
      <Breadcrumb category={category} title={title} />

      <div className="detail__card">
        <div className="detail__content">
          <div className="detail__gallery">
            <img src={images[selectedImage]} alt={title} className="detail__main-image" />
            <div className="detail__thumbnails">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${title} ${index + 1}`}
                  className={`detail__thumbnail ${index === selectedImage ? "detail__thumbnail--active" : ""}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          <div className="detail__info">
            <span className="detail__category">{translateCategory(category)}</span>
            <h1 className="detail__title">{title}</h1>
            <p className="detail__meta">
              {brand && <>Marca: {brand} · </>}
              {sku && <>SKU: {sku}</>}
            </p>

            <StarRating rating={rating} reviewCount={reviews.length} />

            <hr className="detail__divider" />

            <div className="detail__price-block">
              {hasDiscount && (
                <div className="detail__price-top">
                  <span className="detail__old-price">{formatBRL(originalBRL)}</span>
                  <span className="detail__savings">economize {formatBRL(savingsBRL)}</span>
                </div>
              )}
              <div className="detail__price-row">
                <span className="detail__price">{formatBRL(discountedBRL)}</span>
                {hasDiscount && <span className="detail__discount-badge">-{discountPercent}%</span>}
              </div>
              <p className="detail__installments">{formatInstallments(discountedBRL)}</p>
            </div>

            <p className={`detail__stock ${stock === 0 ? "detail__stock--out" : ""}`}>
              <span className="detail__stock-dot" />
              {stock === 0 ? "Fora de estoque" : `${stock} em estoque`}
            </p>

            <div className="detail__actions">
              {stock > 0 && (
                <QuantityStepper
                  quantity={quantity}
                  onIncrease={() => setQuantity((q) => q + 1)}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                />
              )}
              <button
                className="btn btn--primary detail__add-button"
                disabled={stock === 0}
                onClick={handleAddToCart}
              >
                {stock === 0 ? "Esgotado" : "Adicionar ao carrinho"}
              </button>
            </div>

            <div className="detail__extra-info">
              {shippingInformation && (
                <div className="detail__extra-box">
                  <span className="detail__extra-label">Envio</span>
                  <span>{translateShipping(shippingInformation)}</span>
                </div>
              )}
              {warrantyInformation && (
                <div className="detail__extra-box">
                  <span className="detail__extra-label">Garantia</span>
                  <span>{translateWarranty(warrantyInformation)}</span>
                </div>
              )}
              {returnPolicy && (
                <div className="detail__extra-box">
                  <span className="detail__extra-label">Devolução</span>
                  <span>{translateReturnPolicy(returnPolicy)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="detail__sections">
        <section className="detail__section">
          <h2>Descrição</h2>
          <div className="detail__description-box">
            <p>{description}</p>
            {tags.length > 0 && (
              <div className="detail__tags">
                {tags.map((tag) => <span key={tag} className="detail__tag">#{translateCategory(tag)}</span>)}
              </div>
            )}
          </div>
        </section>

        <section className="detail__section">
          <h2>Especificações</h2>
          <div className="detail__specs-box">
            {weight && (
              <div className="detail__spec-row"><span>Peso</span><span>{weight} kg</span></div>
            )}
            {dimensions && (
              <div className="detail__spec-row">
                <span>Dimensões</span>
                <span>{dimensions.width} × {dimensions.height} × {dimensions.depth} cm</span>
              </div>
            )}
            <div className="detail__spec-row"><span>Estoque</span><span>{stock} unidades</span></div>
            {minimumOrderQuantity && (
              <div className="detail__spec-row"><span>Pedido mínimo</span><span>{minimumOrderQuantity} unidades</span></div>
            )}
          </div>
        </section>
      </div>

      {reviews.length > 0 && (
        <section className="detail__section detail__reviews">
          <h2>Avaliações ({reviews.length})</h2>
          <div className="detail__reviews-grid">
            {reviews.map((review, index) => (
              <div className="review-card" key={index}>
                <div className="review-card__header">
                  <span className="review-card__avatar">{getInitial(review.reviewerName)}</span>
                  <div>
                    <p className="review-card__name">{review.reviewerName}</p>
                    <span className="review-card__date">{formatDate(review.date)}</span>
                  </div>
                </div>
                <StarRating rating={review.rating} />
                <p className="review-card__comment">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;