import "./ProductCardSkeleton.css";

function ProductCardSkeleton() {
  return (
    <div className="product-skeleton">
      <div className="product-skeleton__image" />
      <div className="product-skeleton__line product-skeleton__line--short" />
      <div className="product-skeleton__line" />
      <div className="product-skeleton__line product-skeleton__line--short" />
    </div>
  );
}

export default ProductCardSkeleton;