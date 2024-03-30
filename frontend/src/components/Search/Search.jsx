import { useState } from "react";
import searchStyles from "./search.module.css";

export default function Search({ setSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <input
        className={searchStyles.input}
        type="text"
        placeholder="Enter Customer Name or Description"
        value={searchQuery}
        onChange={(e) => {
          const search = e.target.value;
          setSearchQuery(search);
          setSearch(search);
        }}
      ></input>
    </>
  );
}
