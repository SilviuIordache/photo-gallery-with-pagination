import { useState, useEffect } from 'react';
import usePhotosQuery from '../../queries/usePhotosQuery';
import type { PhotosWithTotalResults } from 'pexels';
import SearchInput from '../SearchInput';
import GalleryGrid from './GalleryGrid';
import SkeletonGrid from './SkeletonGrid';
import Pagination from '../Pagination';
import { useSearchParams } from 'react-router-dom';

const GalleryPage = () => {
  const [searchParams] = useSearchParams();

  const initialPage = Number(searchParams.get('page')) || 1;
  const [page, setPage] = useState(initialPage);
  const [query, setQuery] = useState('');
  const [prevQuery, setPrevQuery] = useState('');

  const [photos, setPhotos] = useState<PhotosWithTotalResults['photos']>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [loadCountdown, setLoadCountdown] = useState<number | null>(3);

  const {
    data: photosResponse,
    error,
    isLoading: isLoadingPhotos,
  } = usePhotosQuery({
    query: query,
    per_page: 11,
    page: page,
  });

  // used to set new query or page when they change
  useEffect(() => {
    const page = searchParams.get('page');
    const query = searchParams.get('query');

    if (page) {
      setPage(Number(page));
    }

    if (query && query !== prevQuery) {
      setQuery(query);
      setPage(1);
      setPrevQuery(query);
    }
  }, [searchParams, prevQuery]);

  // used to clear the photos when the query changes
  useEffect(() => {
    setPhotos([]);
  }, [query]);

  // used to update the photos after loading more
  useEffect(() => {
    if (photosResponse && 'photos' in photosResponse) {
      setPhotos(photosResponse.photos);
      setIsFetchingMore(false);
    }
  }, [photosResponse]);

  // used to update the loadCountdown state
  useEffect(() => {
    if (loadCountdown === null) return;

    const interval = setInterval(() => {
      setLoadCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(interval);
          return null;
        }
        return prevCountdown! - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loadCountdown]);



  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1">
      <div className="fixed top-0 left-0 bg-zinc-900 z-10 w-full py-5">
        <div className="flex justify-center">
          <SearchInput />
        </div>
      </div>

      <div className="flex justify-start mb-4">
        <Pagination currentPage={page} setPage={setPage} />
      </div>

      <div className="relative min-h-[540px]">
        {!photos.length && !isFetchingMore && (
          <div className="absolute inset-0 flex items-center justify-center text-lg text-gray-500">
            Loading images...
          </div>
        )}

        <div className="mt-15">
          {isLoadingPhotos ? (
            <SkeletonGrid />
          ) : (
            <GalleryGrid photos={photos} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
