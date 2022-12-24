const initialState = {
  mensJewelry: [],
  womanJewelry: [],
  currentProduct: [],
  orders: [],
};

const getTargetProduct = (data: any) => {
  if (!data.index) return data.theme;
  return data.theme[data.index];
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
    case "CURRENT_PRODUCT":
      return {
        ...state,
        currentProduct: getTargetProduct(action.payload),
      };

    default:
      return state;
  }
};

export default productData;
