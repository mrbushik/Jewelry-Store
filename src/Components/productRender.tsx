import React, { useEffect } from "react";
import { productItem } from "./interfaces";

type productRenderProps = {
  item: productItem;
};
const ProductRender: React.FC<productRenderProps> = ({ item }) => {
  return (
    <div className="product-cart">
      <img className="product-img" src={item.imageLink} />
      <p>{item.title}</p>
      <p>{item.price} BYN</p>
    </div>
  );
};

export default ProductRender;
