import React, { useState } from "react";
import { productItem } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
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

  return (
    <>
      <div className="product-cart">
        <EditBlock onDelete={handleDelete} />
        <Link
          to={`${location.pathname}/${id}${item.category}`}
          className=" my-3 position-relative"
        >
          <img className="product-img" src={item.imageLink} />
          <p>{item.title}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="ms-1">{item.price} BYN</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductsForEditRender;
