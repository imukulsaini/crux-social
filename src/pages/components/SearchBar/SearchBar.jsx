import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import "./searchbar.css";
import { BiSearch } from "react-icons/bi";

export function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="search-bar">
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          className="search__input"
          type="text"
          placeholder="Search"
        />

        <button
          onClick={() =>
            navigate(
              `/search?${createSearchParams({
                q: searchValue.toLowerCase(),
              })}`
            )
          }
          to="/"
          className="search__button"
        >
          <BiSearch />
        </button>
      </div>
    </>
  );
}
