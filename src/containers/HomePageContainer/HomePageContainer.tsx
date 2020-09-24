import React, { useState } from "react";
import "./HomePageContainer.css";

function HomePageContainer(props: any) {
  const axios = require("axios");
  // const types = ["Processor", "Motherboard", "Graphics Card"];
  const [searchTerm, setSearchTerm] = useState(null);
  const [error, setError] = useState("");
  // const hyperlinks = types.map((val, index) => {
  //   return (
  //     <a href={"/" + val} key={index}>
  //       {val}
  //     </a>
  //   );
  // });
  const getItems = (searchQuery: any) => {
    if (searchQuery !== null && searchQuery.trim(" ").length >= 3) {
      props.setIsLoading(true);
      setError("");
      axios
        .get(process.env.REACT_APP_SERVER_URI + "/search/" + searchQuery)
        .then((res: any) => {
          props.setSearchResults(res.data);
          props.setIsLoading(false);
        })
        .catch((err: any) => {
          console.log(JSON.stringify(err));
        });
    } else {
      setError("Search query must be greater than 2 letters!");
    }
  };
  return (
    <div>
      <div className="searchContainer">
        <div className="message">
          This is the sample website. I have loaded a few products with random
          data. Some of the products that you can search for are: 'Ryzen 9
          3950X','Ryzen 7 3700X','Ryzen 7 3800X','Ryzen 7 3800XT','Ryzen 5 3500','Ryzen 5 3600','Ryzen 5 3600X' and 'Ryzen 5 3600XT'
        </div>
        <form autoComplete="off">
          <label htmlFor="search">Search for an item</label>
          <input
            type="text"
            name="search"
            id="search"
            onChange={(e: any) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button
            id="search"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              props.searchTerm(searchTerm);
              getItems(searchTerm);
            }}
          >
            Search
          </button>
        </form>
        {error !== "" && <div className="error">{error}</div>}
        {/* {hyperlinks} */}
      </div>
    </div>
  );
}

export default HomePageContainer;
