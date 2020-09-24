import React, { useState } from "react";
import "./App.css";
import HomePageContainer from "../src/containers/HomePageContainer/HomePageContainer";
import ProductList from "./components/ProductList/ProductList";
import ProductView from "./components/ProductView/ProductView";
import ChartComponent from "./components/ChartComponent/ChartComponent";

function App() {
  const [searchTerm, setSearchTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [productSelected, setProductSelected] = useState(null);
  return (
    <div className="App">
      {console.log(process.env.REACT_APP_SERVER_URI)}
      <div className="title-bar">PriceChecker</div>
      <HomePageContainer
        searchTerm={setSearchTerm}
        setIsLoading={setIsLoading}
        setSearchResults={setSearchResults}
        productSelected={productSelected}
      />
      <ProductList
        searchTerm={searchTerm}
        isLoading={isLoading}
        productList={searchResults}
        setProductSelected={setProductSelected}
      />
      {productSelected !== null && (
        <ProductView productSelected={productSelected} />
      )}
      {productSelected !== null && (
        <ChartComponent productSelected={productSelected} />
      )}
    </div>
  );
}

export default App;
