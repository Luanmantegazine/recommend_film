import ReactPaginate from "react-paginate";
import PropTypes from 'prop-types';

const Pagination = ({ pageCount, onPageChange }) => (
  <ReactPaginate
    nextLabel=">"
    previousLabel="<"
    breakLabel="..."
    pageRangeDisplayed={3}
    marginPagesDisplayed={1}
    onPageChange={onPageChange}
    pageCount={pageCount}
    containerClassName="flex gap-2 justify-center items-center py-4"
    pageClassName="px-3 py-1 rounded-lg border text-sm"
    activeClassName="bg-sky-600 text-white"
  />
);

export default Pagination;

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};