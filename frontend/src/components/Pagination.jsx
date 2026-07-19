function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  for (let page = 1; page <= totalPages; page++) {
    pageNumbers.push(page);
  }

  return (
    <div>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
          style={{
            backgroundColor: page === currentPage ? "blue" : "white",
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
