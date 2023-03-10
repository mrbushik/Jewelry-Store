import { combineReducers } from "redux";

import productData from "./productData";
import cart from "./cart";
import auth from "./auth";
const rootReducer = combineReducers({
  productData,
  cart,
  auth,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
