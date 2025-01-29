import { useState } from 'react';
import { Button } from './Button';
import { useSearchParams } from 'react-router-dom';

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  function addPageParam(page: number) {
    const newParams = new URLSearchParams({...searchParams});
    newParams.set('page', `${page}`);
    setSearchParams(newParams);
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
