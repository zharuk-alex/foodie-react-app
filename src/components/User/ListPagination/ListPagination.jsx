import css from "./ListPagination.module.css";

const ListPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`${css.pageButton} ${
            page === currentPage ? css.active : ""
          }`}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default ListPagination;
