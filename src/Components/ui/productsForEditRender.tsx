import React, { useState } from "react";
import { productItem } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addProductInCart, deleteProductInCart } from "../redux/actions/cart";
import EditBlock from "./editBlock";

type productRenderProps = {
  item: productItem;
  id: number;
  onDelete(url: string, category: string, imageUrl: string): void;
};

const ProductsForEditRender: React.FC<productRenderProps> = ({
  item,
  id,
  onDelete,
}) => {
  const dispatch: any = useDispatch();
  const mansJewelryURL: string = `${process.env.REACT_APP_DOMAIN_NAME}/Products/mens.json`;
  const location = useLocation();
  const cartItems = useSelector((state: any) => state.cart.cartItems);

  const handleDelete = () => onDelete(mansJewelryURL, "mans", item.imageLink);

  // const addToCart = (e: React.MouseEvent) => {
  //     e.preventDefault();
  //     dispatch(addProductInCart(item));
  //     setPutInCart(true);
  // };
  // const deleteProduct = (e: React.MouseEvent) => {
  //     e.preventDefault();
  //     dispatch(
  //         deleteProductInCart(
  //             cartItems.filter(
  //                 (product: productItem) => product.imageLink !== item.imageLink
  //             )
  //         )
  //     );
  //     setPutInCart(false);
  // };

  return (
    <Link
      to={`${location.pathname}/${id}${item.category}`}
      className="product-cart my-3 position-relative"
    >
      <EditBlock onDelete={handleDelete} />
      <img className="product-img" src={item.imageLink} />
      <p>{item.title}</p>
      <div className="d-flex justify-content-between align-items-center">
        <span className="ms-1">{item.price} BYN</span>
      </div>
    </Link>
  );
};

export default ProductsForEditRender;
