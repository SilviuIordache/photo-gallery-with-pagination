import { useState } from 'react';
import { Button } from '../Button';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(0);

  function goBack() {
    setCurrentPage((val) => val - 1);
  }

  function goForward() {
    setCurrentPage((val) => val + 1);
  }

  return (
    <div className="flex justify-between items-center">
      <Button className="px-4" onClick={goBack} disabled={true}>
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
