import React from "react";
import { Buffer } from "buffer";
import Header from "./Header"
import Layout from "./Layout";
import { useSearch } from "../context/Search";
import ItemDetails from "./ItemDetails";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <>
      <Header />
      <h3>Search Results</h3>
        <h6>
          {values?.results.length < 1  ? "No Products Found" : `Found ${values?.results.length}`}
        </h6>
        <div className='items-list'>
          {values?.results.map((p) => (
            <ItemDetails key={p._id} item={p}></ItemDetails>
          ))}
        </div>
    </>          
  );
};

export default Search;