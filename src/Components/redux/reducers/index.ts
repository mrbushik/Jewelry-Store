import { combineReducers } from "redux";

import productData from "./productData";
const rootReducer = combineReducers({
  productData,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
