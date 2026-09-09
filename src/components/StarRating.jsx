import "./StarRating.css";

function StarRating({ rating, reviewCount }) {
  const fullStars = Math.round(rating);

  return (
    <div className="star-rating">
      <span className="star-rating__stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= fullStars ? "star-rating__star--full" : "star-rating__star--empty"}>
            ★
          </span>
        ))}
      </span>
      <span className="star-rating__value">{rating.toFixed(2).replace(".", ",")}</span>
      {reviewCount !== undefined && (
        <span className="star-rating__count">· {reviewCount} avaliações</span>
      )}
    </div>
  );
}

export default StarRating;