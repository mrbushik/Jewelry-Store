import axios from "axios";

export const mansJewelry = (theme: any) => ({
  type: "CHANGE_MENS_JEWELRY",
  payload: theme,
});

export const womanJewelry = (theme: any) => ({
  type: "CHANGE_WOMAN_JEWELRY",
  payload: theme,
});

export const allOrders = (theme: any) => ({
  type: "GET_ALL_ORDERS",
  payload: theme,
});

export const currentProduct = (theme: any, index?: number) => ({
  type: "CURRENT_PRODUCT",
  payload: { theme, index },
});

export const mensJewelryRequest = (url: string) => async (dispatch: any) => {
  await axios
    .get(url)
    .then((response) => dispatch(mansJewelry(Object.values(response.data))))
    .catch((error) => {});
};

export const womanJewelryRequest = (url: string) => async (dispatch: any) => {
  await axios
    .get(url)
    .then((response) => dispatch(womanJewelry(Object.values(response.data))))
    .catch((error) => {});
};

export const allOrdersRequest = (url: string) => async (dispatch: any) => {
  await axios
    .get(url)
    .then((response) => dispatch(allOrders(response.data)))
    .catch((error) => {});
};

export const currentProductsRequest =
  (url: string, index: number) => async (dispatch: any) => {
    await axios
      .get(url)
      .then((response) =>
        dispatch(currentProduct(Object.values(response.data), index))
      )
      .catch((error) => {});
  };
