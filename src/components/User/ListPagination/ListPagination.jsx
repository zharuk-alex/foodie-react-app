import ReactPaginate from 'react-paginate';
import css from './ListPagination.module.css';

const ListPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePageClick = event => {
    const selectedPage = event.selected + 1;
    onPageChange(selectedPage);
  };

  return (
    <div className={css.paginationWrapper}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        previousLabel="<"
        forcePage={currentPage - 1}
        containerClassName={css.pagination}
        pageClassName={css.page}
        activeClassName={css.active}
        previousClassName={css.prev}
        nextClassName={css.next}
        disabledClassName={css.disabled}
        breakClassName={css.break}
      />
    </div>
  );
};

export default ListPagination;
