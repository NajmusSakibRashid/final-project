"use client";

import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchHandler = async () => {
    const { data } = await axios.get(`/api/search/${searchText}`);
    // console.log(data);
    setSearchResults(data.rows);
  };
  return (
    <div className="w-2/3 flex gap-2 dropdown dropdown-bottom">
      <input
        type="text"
        name="search-text"
        onChange={(e) => setSearchText(e.target.value)}
        className="input input-bordered w-full"
      />
      <button tabIndex={0} className="btn btn-neutral" onClick={searchHandler}>
        Search
      </button>
      <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {searchResults.map((result, index) => (
          <li key={index}>
            <a href={`/template/${result.id}`}>{result.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
