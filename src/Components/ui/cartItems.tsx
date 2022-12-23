import React from "react";
import { productItem } from "../interfaces";

type cartItemsProps = {
  item: productItem;
  onDelete(item?: productItem): any;
};

const CartItems: React.FC<cartItemsProps> = ({ item, onDelete }) => {
  return (
    <div className=" my-3 d-flex align-items-center px-2">
      <img className="cart-img me-3" src={item.imageLink} />
      <p className="pt-2">{item.title}</p>
      <div className="d-flex justify-content-between">
        <p className="pt-2 ms-2">{item.price} BYN</p>
          {/*{onDelete &&  <div*/}
          {/*    className="text-danger ms-3 pointer  mt-2"*/}
          {/*    onClick={() => onDelete(item)}*/}
          {/*>*/}
          {/*    Удалить*/}
          {/*</div>}*/}
      </div>
    </div>
  );
};

export default CartItems;
