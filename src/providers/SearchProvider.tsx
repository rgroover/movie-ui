import React, { useState } from "react";
import { SearchContext } from "../hooks/useSearch.ts";

// Provider component to wrap around components that need access to searchQuery
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
