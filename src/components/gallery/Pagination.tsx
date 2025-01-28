import { useState } from 'react';
import { Button } from '../Button';
import { useSearchParams } from 'react-router-dom';

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);

  function addPageParam(page: number) {
    setSearchParams({ page: `${page}` });
  }

  function goBack() {
    if (currentPage === 0 || currentPage === 1) return;

    updatePage(-1);
  }

  function goForward() {
    updatePage(1);
  }

  function updatePage(page: number) {
    const newPage = currentPage + page;
    setCurrentPage(newPage);
    addPageParam(newPage);
  }

  return (
    <div className="flex justify-between items-center">
      <Button className="px-4" onClick={goBack} disabled={currentPage <= 1}>
        {' < '}
      </Button>

      <div className="mx-4">{currentPage}</div>
      <Button className="px-4" onClick={goForward}>
        {'>'}
      </Button>
    </div>
  );
};

export default Pagination;
