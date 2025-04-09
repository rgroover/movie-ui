import React, { createContext, useContext, useState } from "react";

// Define the shape of the context
interface SearchContextType {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

// Create the SearchContext with an undefined default value
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Provider component to wrap around components that need access to searchQuery
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to easily use the SearchContext
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
