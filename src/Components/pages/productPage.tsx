import React, { useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { productItem } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import {
  currentProduct,
  currentProductsRequest,
} from "../redux/actions/productData";

const ProductPage: React.FC = () => {
  const params: any = useParams();
  const location = useLocation();
  const history = useHistory();
  const dispatch: any = useDispatch();

  const MANS_JEWELRY_URL =
    "https://jewelry-store-3488f-default-rtdb.europe-west1.firebasedatabase.app/Products/mens.json";
  const WOMAN_JEWELRY_URL: string =
    "https://jewelry-store-3488f-default-rtdb.europe-west1.firebasedatabase.app/Products/woman.json";

  const mansJewelryItems: productItem[] = useSelector(
    (state: any) => state.productData.mensJewelry
  );
  const womanJewelryItems: productItem[] = useSelector(
    (state: any) => state.productData.womanJewelry
  );

  const currentProductData: productItem = useSelector(
    (state: any) => state.productData.currentProduct
  );

  useEffect(() => {
    location.pathname.includes("mans") ? getMansProducts() : getWomanProducts();
  }, []);

  // useEffect()

  const getMansProducts = () => {
    if (mansJewelryItems.length)
      return dispatch(currentProduct(mansJewelryItems[params.Id]));
    dispatch(currentProductsRequest(MANS_JEWELRY_URL, params.Id));
  };

  const getWomanProducts = () => {
    if (womanJewelryItems.length)
      return dispatch(currentProduct(womanJewelryItems[params.Id]));
    dispatch(currentProductsRequest(WOMAN_JEWELRY_URL, params.Id));
  };

  return (
    <div>
      <div className="btn btn-outline-primary m-4" onClick={history.goBack}>
        Назад
      </div>
      <h1 className="mt-3 text-center">{currentProductData.title}</h1>
      <img className="mt-3" src={currentProductData.imageLink} />
      <p className="fs-5 mt-3 ms-5">
        Цена: <span className="fw-bolder">{currentProductData.price} BYN</span>
      </p>
    </div>
  );
};

export default ProductPage;
