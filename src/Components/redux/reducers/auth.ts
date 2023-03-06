const initialState = {
  auth: false,
};

const productData = (state = initialState, action: any) => {
  switch (action.type) {
    case "IS_AUTH":
      return {
        ...state,
        auth: action.payload,
      };

    default:
      return state;
  }
};

export default productData;
