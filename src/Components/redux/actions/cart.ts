export const addProductInCart = (theme: any) => ({
  type: "ADD_PRODUCT",
  payload: theme,
});

export const deleteProductInCart = (theme: any) => ({
  type: "DELETE_PRODUCT",
  payload: theme,
});

