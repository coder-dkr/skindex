import { createContext } from "react";

interface SearchResult {
  imageUrl: string;
  title: string;
  price: number;
  category : string
}

interface SearchContextProps {
  searchResults: SearchResult[];
  setSearchResults: (value: SearchResult[]) => void;
  Query : string;
  setQuery : (value : string) => void;
}


export const SearchContext = createContext<SearchContextProps>({
  searchResults: [],
  setSearchResults: () => {},
  Query : '',
  setQuery : () => {}
});
