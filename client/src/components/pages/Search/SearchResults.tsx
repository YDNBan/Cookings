import { useLocation } from "react-router-dom";
import { useSearch } from "../../molecules/useSearch";
import { useEffect } from "react";

const SearchResults: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const { data, loading, error, handleSearch } = useSearch();

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div className="p-5">
      <h1 className="text-2xl text-black">Search Results</h1>
      {loading && <p className="text-black">Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data ? (
        <div>
          <h3 className="text-black">Results:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p className="text-black">No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
