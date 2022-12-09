import React, { useEffect } from "react";
import { productItem } from "./interfaces";
import { useDispatch, useSelector } from "react-redux";

type productRenderProps = {
  items: Array<productItem>;
};
const ProductRender: React.FC<productRenderProps> = ({ items }) => {
  const dispatch: any = useDispatch();

  const filteredJewelry: productItem[] = useSelector(
    (state: any) => state.productData.mensFilteredJewelry
  );
  useEffect(() => {
    console.log("change22222222");
  }, [items]);

  return (
    <div className="d-flex flex-wrap justify-content-center mt-5">
      {items.map((item: productItem, index: number) => (
        <div className="product-cart" key={index}>
          <img className="product-img" src={item.imageLink} />
          <p>{item.title}</p>
          <p>{item.price} BYN</p>
        </div>
      ))}
    </div>
  );
};

export default ProductRender;
