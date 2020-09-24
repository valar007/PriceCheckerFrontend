import React, { useState, useEffect } from "react";
import "./ProductView.css";

function ProductView(props: any) {
  const axios = require("axios");
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URI+"/"+props.productSelected).then((res:any) => {
        setProductData(res.data);
        setLoading(false);
      });
  }, [props.productSelected, axios]);
  return (
    <div>
      {!loading && (
        <div className="product-details">
          <div className="title">
            {productData.type}: {productData.brand} {productData.name}
          </div>
          <div className="features">
            {Object.entries(productData["features"]).map((feature: any) => {
              return (
                <div className="feature" key={feature[0]}>
                  <div className="name">{feature[0]}:</div>
                  <div className="value">{feature[1]}</div>
                </div>
              );
            })}
          </div>
          <div className="prices">
            <div className="vendor-price header">
              <div className="price">Price</div>
              <div className="link-header">Vendor</div>
            </div>
            {Object.entries(productData["currentprice"]).map((price: any) => {
              return (
                <div className="vendor-price">
                  <div className="price">₹{price[1]}</div>
                  <button className="link" onClick={() => window.open(productData.producturl[price[0]], '_blank)')}><span className="text">{price[0]}</span></button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductView;
