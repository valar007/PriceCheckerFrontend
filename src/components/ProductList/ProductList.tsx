import React from "react";
import ReactLoading from "react-loading";
import "./ProductList.css";

function ProductList(props: any) {
  const products =
    props.productList !== null &&
    Array.isArray(props.productList) &&
    props.productList.map((val: any, index: any) => {
      return (
        <div className="product" key={index}>
          <p>
            {val.brand} {val.name}
          </p>
          {val.features !== null &&
            Object.entries(val.features).map((item: any) => {
              return (
                <span key={item}>
                  {item[1]} {item[0]}{" "}
                </span>
              );
            })}
          <p>Type: {val.type}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.setProductSelected(val["_id"]);
            }}
          >
            More details
          </button>
        </div>
      );
    });
  return (
    <div className="product-container">
      {props.searchTerm === null && (
        <div>Use the search bar to search for an item!</div>
      )}
      {props.isLoading === true && props.searchTerm !== null && (
        <div>
          <span className="search-text">
            Searching for the query: '{props.searchTerm}'
          </span>
          <ReactLoading
            type="bars"
            color="#000000"
            className="loading-spinner"
          />
        </div>
      )}
      {props.isLoading === false && props.productList.length === 0 && props.searchTerm !== null &&(
        <div>No results found!</div>
      )}
      {props.isLoading === false && props.searchTerm !== null && props.productList.length !== 0 &&(
        <div>
          <span className="search-text">
            Search results for '{props.searchTerm}':
          </span>
          <div className="product-list">{products}</div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
