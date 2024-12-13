import React, { createContext, useContext, useState } from "react";
import {ActorSearchResults, SearchResultsPagedModel, TVShowSearchResults} from "../api-client";

// Define the shape of the context
interface SearchContextType {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchType: string;
  setSearchType: React.Dispatch<React.SetStateAction<string>>;
  movieData: SearchResultsPagedModel | null | undefined;
  setMovieData:  React.Dispatch<React.SetStateAction<SearchResultsPagedModel | null | undefined>>;
  actorData: ActorSearchResults | null | undefined;
  setActorData: React.Dispatch<React.SetStateAction<ActorSearchResults | null | undefined>>;
  tvData: TVShowSearchResults | null | undefined;
  setTvData: React.Dispatch<React.SetStateAction<TVShowSearchResults | null | undefined>>;
  actorResultsMediaType: string;
  setActorResultsMediaType: React.Dispatch<React.SetStateAction<string>>;
}

// Create the SearchContext with an undefined default value
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Provider component to wrap around components that need access to searchQuery
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("movies");
  const [movieData, setMovieData] = useState<SearchResultsPagedModel | null | undefined>(); // Store fetched data
  const [actorData, setActorData] = useState<ActorSearchResults | null | undefined>(); // Store fetched data
  const [tvData, setTvData] = useState<TVShowSearchResults | null | undefined>(); // Store fetched data
  const [actorResultsMediaType, setActorResultsMediaType] = useState<string>("movie");

  return (
    <SearchContext.Provider value={{ 
        searchQuery, setSearchQuery, 
        searchType, setSearchType,
        movieData, setMovieData,
        actorData, setActorData,
        tvData, setTvData,
        actorResultsMediaType, setActorResultsMediaType
        }}>
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
