import React, { useEffect } from "react";
import { productItem } from "./interfaces";

type productRenderProps = {
  item: productItem;
};
const ProductRender: React.FC<productRenderProps> = ({ item }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center mt-5">
      <div className="product-cart">
        <img className="product-img" src={item.imageLink} />
        <p>{item.title}</p>
        <p>{item.price} BYN</p>
      </div>
    </div>
  );
};

export default ProductRender;
