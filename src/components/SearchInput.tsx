import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';


const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(initialQuery);

  const handleSearch = (query: string) => {
    const newParams = new URLSearchParams({...searchParams});
    newParams.set('query', `${query}`);
    setSearchParams(newParams);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={inputValue}
        onChange={handleChange}
        placeholder="Search for images.."
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-colors duration-200 shadow-sm border border-gray-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
