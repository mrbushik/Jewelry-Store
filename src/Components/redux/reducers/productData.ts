const initialState = {
  mensJewelry: [],
  womanJewelry: [],
  mensFilteredJewelry: [],
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
    case "CHANGE_MENS_FILTERED_JEWELRY":
      return {
        ...state,
        mensFilteredJewelry: action.payload,
      };

    default:
      return state;
  }
};

export default productData;
