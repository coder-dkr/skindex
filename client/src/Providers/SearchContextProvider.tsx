import { SearchContext } from "../contexts/SearchContext";

import { useState, ReactNode } from "react";

interface SearchResult {
  imageUrl: string;
  title: string;
  price: number;
  category: string;
}

const SearchContextProvider = ({ children }: { children: ReactNode }) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [Query, setQuery] = useState<string>("");

  return (
    <SearchContext.Provider
      value={{ searchResults, setSearchResults, Query, setQuery }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
