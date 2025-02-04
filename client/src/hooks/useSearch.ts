import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

const useSearch = () => {
  const { searchResults, setSearchResults , Query , setQuery } = useContext(SearchContext);

  return { searchResults, setSearchResults,setQuery ,Query};
};

export default useSearch;
