const authStatus: string | null = localStorage.getItem("authStatus");
const adminAuth: string | null = localStorage.getItem("adminAuth");
const userInfo: string | null = localStorage.getItem("userInfo");

const initialState = {
  auth: authStatus === "true",
  userData: userInfo ? JSON.parse(userInfo) : "",
  adminAuth: adminAuth === "true",
};

const handleWriteAuthStatus = (status: boolean) => {
  localStorage.setItem("authStatus", status.toString());
  return status;
};

const handleChangeAuthAdmin = (status: boolean) => {
  localStorage.setItem("adminAuth", status.toString());
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
    case "ADMIN_AUTH":
      return {
        ...state,
        adminAuth: handleChangeAuthAdmin(action.payload),
      };
    default:
      return state;
  }
};

export default productData;
