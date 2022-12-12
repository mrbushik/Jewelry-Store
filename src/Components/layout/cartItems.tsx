import React from "react";
import { productItem } from "../interfaces";

type cartItemsProps = {
  item: productItem;
};

const CartItems: React.FC<cartItemsProps> = ({ item }) => {
  return (
    <div className=" my-3 d-flex align-items-center">
      <img className="cart-img me-3" src={item.imageLink} />
      <p className="pt-2" >{item.title}</p>
      <div className="d-flex justify-content-between">
        <p className='pt-2 ms-2'>{item.price} BYN</p>
        <div className="text-danger ms-3 pointer  mt-2">
          Удалить
        </div>
      </div>
    </div>
  );
};

export default CartItems;
