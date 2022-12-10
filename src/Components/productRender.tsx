import React, { useEffect } from "react";
import { productItem } from "./interfaces";

type productRenderProps = {
  item: productItem;
};
const ProductRender: React.FC<productRenderProps> = ({ item }) => {
  return (
    <div className="product-cart my-3">
      <img className="product-img" src={item.imageLink} />
      <p>{item.title}</p>
      <div className="d-flex justify-content-between">
        {" "}
        <p>{item.price} BYN</p>
        <span className="btn btn-danger">В корзину</span>
      </div>
    </div>
  );
};

export default ProductRender;
