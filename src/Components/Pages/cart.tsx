import React from "react";
import { useSelector } from "react-redux";
import { productItem } from "../interfaces";
import CartItems from "../layout/cartItems";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  return (
    <div>
      <h3 className="text-center mt-4">Корзина с товаром</h3>
      <div className="d-flex justify-content-center mt-5 cart-list">
        {cartItems.map((item: productItem, index: number) => (
          <CartItems item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
