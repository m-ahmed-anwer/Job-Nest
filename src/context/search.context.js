import { createContext, useState } from "react";

export const SearchContext = createContext({
  search: null,
  setSearch: () => null,
});

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState(null);
  const values = { search, setSearch };
  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
};
