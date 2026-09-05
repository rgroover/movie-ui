import { createContext, useContext, type Dispatch, type SetStateAction } from "react";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Custom hook to easily use the SearchContext
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
