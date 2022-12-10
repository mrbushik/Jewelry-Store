import { combineReducers } from "redux";

import productData from "./productData";
import cart from "./cart";
const rootReducer = combineReducers({
  productData,
  cart,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
