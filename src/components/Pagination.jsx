import "./Pagination.css";

function getPageList(current, total) {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let last;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }

  range.forEach((i) => {
    if (last !== undefined) {
      if (i - last === 2) {
        rangeWithDots.push(last + 1);
      } else if (i - last !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    last = i;
  });

  return rangeWithDots;
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageList(currentPage, totalPages);

  return (
    <div className="pagination">
      <button
        className="pagination__arrow"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        ‹
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="pagination__dots">…</span>
        ) : (
          <button
            key={page}
            className={`pagination__page ${page === currentPage ? "pagination__page--active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        className="pagination__arrow"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        ›
      </button>
    </div>
  );
}

export default Pagination;