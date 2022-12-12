import React, { useEffect } from "react";
import { productItem } from "../interfaces";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../redux/actions/cart";

type productRenderProps = {
  item: productItem;
};
const ProductRender: React.FC<productRenderProps> = ({ item }) => {
  const dispatch: any = useDispatch();

  const addToCart = () => dispatch(addProductToCart(item));

  return (
    <div className="product-cart my-3">
      <img className="product-img" src={item.imageLink} />
      <p>{item.title}</p>
      <div className="d-flex justify-content-between">
        {" "}
        <p>{item.price} BYN</p>
        <span className="btn btn-danger" onClick={addToCart}>
          В корзину
        </span>
      </div>
    </div>
  );
};

export default ProductRender;
