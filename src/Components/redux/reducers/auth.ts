const authStatus: string | null = localStorage.getItem("authStatus");
const userInfo: string | null = localStorage.getItem("userInfo");

const initialState = {
  auth: authStatus === "true",
  userData: userInfo ? JSON.parse(userInfo) : "",
};

const handleWriteAuthStatus = (status: boolean) => {
  localStorage.setItem("authStatus", status.toString());
  return status;
};

const handleWriteUserInfo = (items: any) => {
  localStorage.setItem("userInfo", JSON.stringify(items));
  return items;
};

const productData = (state = initialState, action: any) => {
  switch (action.type) {
    case "IS_AUTH":
      return {
        ...state,
        auth: handleWriteAuthStatus(action.payload),
      };

    case "USER_DATA":
      return {
        ...state,
        userData: handleWriteUserInfo(action.payload),
      };

    default:
      return state;
  }
};

export default productData;
