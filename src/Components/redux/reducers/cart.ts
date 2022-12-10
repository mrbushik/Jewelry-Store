const initialState = {
  cartItems: [],
  cartPrice: [],
};

const cart = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        cartItems: action.payload,
      };

    default:
      return state;
  }
};

export default cart;
