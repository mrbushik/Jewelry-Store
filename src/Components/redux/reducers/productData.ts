const initialState = {
  mensJewelry: [],
  womanJewelry: [],
  orders:[]
};

const productData = (state = initialState, action: any) => {
  switch (action.type) {
    case "CHANGE_MENS_JEWELRY":
      return {
        ...state,
        mensJewelry: action.payload,
      };
    case "CHANGE_WOMAN_JEWELRY":
      return {
        ...state,
        womanJewelry: action.payload,
      };
    case "GET_ALL_ORDERS":
      return {
       ...state,
        orders: action.payload,
      };

    default:
      return state;
  }
};

export default productData;
