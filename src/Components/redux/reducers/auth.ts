const initialState = {
  auth: false,
  userData: "",
};

const productData = (state = initialState, action: any) => {
  switch (action.type) {
    case "IS_AUTH":
      return {
        ...state,
        auth: action.payload,
      };

    case "USER_DATA":
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
};

export default productData;
