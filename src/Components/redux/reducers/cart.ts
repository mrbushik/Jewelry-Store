import { productItem } from "../../interfaces";

const initialState = {
  cartItems: [],
  cartPrice: 0,
};

const countFullPrice = (items: productItem[]) => {
  return items.reduce((acc, item) => acc + Number(item.price), 0);
};

const cart = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        cartPrice: countFullPrice([...state.cartItems, action.payload]),
        cartItems: [...state.cartItems, action.payload],
      };
    case "DELETE_PRODUCT":
      return {
        cartPrice: countFullPrice(action.payload),
        cartItems: action.payload,
      };

    default:
      return state;
  }
};

export default cart;
