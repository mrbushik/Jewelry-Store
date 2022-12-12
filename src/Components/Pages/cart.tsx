import React from "react";
import { useSelector } from "react-redux";
import { productItem } from "../interfaces";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  console.log(cartItems);
  return (
    <div>
      <h3 className="text-center mt-4">Корзина с товаром</h3>
      {cartItems.map((item: productItem, index: number) => (
        <div className="product-cart my-3" key={index}>
          <img className="product-img" src={item.imageLink} />
          <p>{item.title}</p>
          <div className="d-flex justify-content-between">
            <p>{item.price} BYN</p>
            <span className="btn btn-danger">Удалить</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
