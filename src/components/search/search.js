import React, { useContext } from "react";
import { SearchContext } from "../../context/search.context";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Search() {
  const { search, setSearch } = useContext(SearchContext);
  const SearchSubmitHandler = (event) => {
    event.preventDefault();
    alert(search);
    setSearch("");
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  const handleEdit = () => {
    if (!search) return;
    setSearch("");
  };
  return (
    <form className="w-full sm:w-1/2 px-2" onSubmit={SearchSubmitHandler}>
      <div className="flex flex-row">
        <MagnifyingGlassIcon
          className="w-6 h-6 my-auto mr-3 text-gray-900 left-3 hover:cursor-pointer"
          onClick={SearchSubmitHandler}
        />
        <input
          type="text"
          placeholder="Search for Jobs"
          onChange={handleChange}
          value={search}
          onEndEditing={handleEdit}
          className="w-full py-2 px-4 text-gray-800 border placeholder:text-gray-500 outline-none bg-gray-100 focus:bg-gray-50 focus:border-blue-600 rounded-full"
        />
      </div>
    </form>
  );
}

export default Search;
