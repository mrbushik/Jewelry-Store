import axios from "axios";

export const mensJewelry = (theme: any) => ({
  type: "CHANGE_MENS_JEWELRY",
  payload: theme,
});

export const womanJewelry = (theme: any) => ({
  type: "CHANGE_WOMAN_JEWELRY",
  payload: theme,
});

export const mensJewelryRequest = (url: string) => async (dispatch: any) => {
  await axios
    .get(url)
    .then((response) => dispatch(mensJewelry(Object.values(response.data))))
    .catch((error) => {});
};

export const womanJewelryRequest = (url: string) => async (dispatch: any) => {
  await axios
      .get(url)
      .then((response) => dispatch(womanJewelry(Object.values(response.data))))
      .catch((error) => {});
};