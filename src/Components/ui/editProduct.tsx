import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  mensJewelryRequest,
  womanJewelryRequest,
} from "../redux/actions/productData";
import { productItem } from "../interfaces";

const EditProduct: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch: any = useDispatch();
  const userInfo = useSelector((state: any) => state.auth.userData);

  const mansJewelryURL: string = `${process.env.REACT_APP_DOMAIN_NAME}/Products/mens.json`;
  const womanJewelryURL: string = `${process.env.REACT_APP_DOMAIN_NAME}/Products/woman.json`;

  const womanJewelryItems: productItem[] = useSelector(
    (state: any) => state.productData.womanJewelry
  );
  const mansJewelryItems: productItem[] = useSelector(
    (state: any) => state.productData.mensJewelry
  );

  const [currentProduct, setCurrentProduct] = useState<productItem>();

  useEffect(() => {
    if (userInfo.statusUser !== "ADMIN") history.push("/");
    location.pathname.includes("mans")
      ? dispatch(womanJewelryRequest(womanJewelryURL))
      : dispatch(mensJewelryRequest(mansJewelryURL));
  }, []);

  function findNumbersInString(str: any) {
    let regex = /\d+(\.\d+)?/g;
    let match = str.match(regex);
    return Number(match[0]);
  }

  useEffect(() => {
    // if (location.pathname.includes("mans") ) {
      console.log(mansJewelryItems);
      setCurrentProduct(
        mansJewelryItems[findNumbersInString(location.pathname)]
      );
    // }
    // console.log(mansJewelryItems[findNumbersInString(location.pathname)])
  }, [mansJewelryItems, womanJewelryItems]);
  console.log(currentProduct);

  const getMansProducts = () => {
    dispatch(mensJewelryRequest(mansJewelryURL)).then(() =>
      console.log(mansJewelryItems)
    );
    // console.log(mansJewelryItems);
  };
  const getWomanProducts = () => {
    dispatch(mensJewelryRequest(womanJewelryURL));
    console.log(womanJewelryURL);
  };

  return (
    <div>
      <h1>cccc</h1>
    </div>
  );
};

export default EditProduct;
