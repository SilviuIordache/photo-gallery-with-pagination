import { Button } from './Button';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  setPage: (page: number) => void;
}
const Pagination = ({ currentPage, setPage }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function addPageParam(page: number) {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', String(page));
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
    setPage(newPage);
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
