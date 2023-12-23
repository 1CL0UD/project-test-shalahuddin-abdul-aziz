import React from 'react';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  handlePageChange: (pageNumber: number) => void;
}

const Pagination = ({
  currentPage,
  lastPage,
  handlePageChange,
}: PaginationProps) => {
  const generatePages = () => {
    const pages = [];
    const pagesToShow = 2; // Adjusted to display currentPage + 2 pages

    const showEllipsis = currentPage + pagesToShow < lastPage;

    let startPage = currentPage - pagesToShow;
    let endPage = currentPage + pagesToShow;

    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > lastPage) {
      startPage -= endPage - lastPage;
      endPage = lastPage;
    }

    if (currentPage > pagesToShow + 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`mx-1 p-2 border border-gray-300 rounded hover:bg-gray-200 ${
            currentPage === 1 ? 'bg-orange-500 text-white' : ''
          }`}
        >
          1
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i === startPage && i !== 1) {
        pages.push(<span key="firstEllipsis">...</span>);
      }

      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 p-2 border border-gray-300 rounded hover:bg-gray-200 ${
            currentPage === i ? 'bg-orange-500 text-white' : ''
          }`}
        >
          {i}
        </button>
      );

      if (i === endPage && i !== lastPage && showEllipsis) {
        pages.push(<span key="lastEllipsis">...</span>);
        pages.push(
          <button
            key={lastPage}
            onClick={() => handlePageChange(lastPage)}
            className={`mx-1 p-2 border border-gray-300 rounded hover:bg-gray-200 ${
              currentPage === lastPage ? 'bg-orange-500 text-white' : ''
            }`}
          >
            {lastPage}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      {generatePages()}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
};

export default Pagination;
