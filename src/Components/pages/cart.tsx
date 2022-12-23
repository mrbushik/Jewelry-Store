import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { productItem } from "../interfaces";
import { Link } from "react-router-dom";

import CartItems from "../ui/cartItems";
import { deleteProductInCart } from "../redux/actions/cart";

const Cart: React.FC = () => {
  const dispatch: any = useDispatch();

  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const cartPrice = useSelector((state: any) => state.cart.cartPrice);
  const handleDelete = (item: productItem) => {
    dispatch(
      deleteProductInCart(
        cartItems.filter(
          (product: productItem) => product.imageLink !== item.imageLink
        )
      )
    );
  };
  return (
    <div>
      <h3 className="text-center mt-4">Корзина с товаром</h3>
      <div className="d-flex justify-content-center mt-5 cart-list">
        {!!cartItems.length ? (
          <div>
            {cartItems.map((item: productItem, index: number) => (
              <CartItems item={item} key={index} onDelete={handleDelete} />
            ))}
            <div className="d-flex flex-wrap">
              <div className="text-center fs-3 fw-semibold mt-5">
                Итого к оплате {cartPrice} BYN
              </div>
              <div>
                <Link to="/order" className="btn btn-outline-primary mt-5 ms-3">
                  Оформить заказ
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-danger mt-5">Вы не выбрали не одного товара</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
