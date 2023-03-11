import { productItem } from "../../interfaces";
const storedCartItems: any = localStorage.getItem("cart");
const storedCartPrice: string | null = localStorage.getItem("price");

const initialState = {
  cartItems: JSON.parse(storedCartItems) || [],
  cartPrice: storedCartPrice || 0,
};

const countFullPrice = (items: productItem[]) => {
  const fullPrice: number = items.reduce(
    (acc, item) => acc + Number(item.price),
    0
  );
  localStorage.setItem("price", String(fullPrice));
  return fullPrice;
};

const handleSaveInStorage = (items: productItem[] | []) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const cart = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      handleSaveInStorage([...state.cartItems, action.payload]);
      return {
        cartPrice: countFullPrice([...state.cartItems, action.payload]),
        cartItems: [...state.cartItems, action.payload],
      };
    case "DELETE_PRODUCT":
      handleSaveInStorage(action.payload);
      return {
        cartPrice: countFullPrice(action.payload),
        cartItems: action.payload,
      };

    default:
      return state;
  }
};

export default cart;
