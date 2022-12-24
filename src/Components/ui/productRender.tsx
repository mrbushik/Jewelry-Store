import React, { useState } from "react";
import { productItem } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { addProductInCart, deleteProductInCart } from "../redux/actions/cart";
import { Link, useLocation } from "react-router-dom";

type productRenderProps = {
  item: productItem;
  id: number;
};
const ProductRender: React.FC<productRenderProps> = ({ item, id }) => {
  const dispatch: any = useDispatch();
  const location = useLocation();
  const cartItems = useSelector((state: any) => state.cart.cartItems);

  const [putInCart, setPutInCart] = useState<boolean | productItem>(
    cartItems.find(
      (product: productItem) => product.imageLink === item.imageLink
    )
  );

  const addToCart = () => {
    dispatch(addProductInCart(item));
    setPutInCart(true);
  };
  const deleteProduct = () => {
    dispatch(
      deleteProductInCart(
        cartItems.filter(
          (product: productItem) => product.imageLink !== item.imageLink
        )
      )
    );
    setPutInCart(false);
  };

  return (
    <Link
      to={`${location.pathname}/${id}`}
      className="product-cart my-3 position-relative"
    >
      {putInCart && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-cart-check-fill cart-icon "
          viewBox="0 0 16 16"
        >
          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z" />
        </svg>
      )}
      <img className="product-img" src={item.imageLink} />
      <p>{item.title}</p>
      <div className="d-flex justify-content-between">
        <p>{item.price} BYN</p>
        {putInCart ? (
          <span className="btn btn-danger" onClick={deleteProduct}>
            удалить из корзины
          </span>
        ) : (
          <span className="btn btn-danger" onClick={addToCart}>
            В корзину
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductRender;
