const initialState = {
  cartItems: [],
};

const cart = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        cartItems: [...state.cartItems, action.payload],
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        cartItems: action.payload,
      };

    default:
      return state;
  }
};

export default cart;
