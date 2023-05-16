import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios, { all } from "axios";
import {
  currentProduct,
  mensJewelryRequest,
  womanJewelryRequest,
} from "../redux/actions/productData";
import { ALL } from "dns";
import { log } from "util";
import {productItem} from "../interfaces";

type CategoryType = '' | 'man'| 'woman'

const AdminProducts: React.FC = () => {
  const history = useHistory();
  const dispatch: any = useDispatch();
    const womanJewelryItems: productItem[] = useSelector(
        (state: any) => state.productData.womanJewelry
    );

  const mansJewelryURL: string = `${process.env.REACT_APP_DOMAIN_NAME}/Products/mens.json`;
  const womanJewelryURL: string = `${process.env.REACT_APP_DOMAIN_NAME}/Products/woman.json`;
  const userInfo = useSelector((state: any) => state.auth.userData);
  const [allProducts, setAllProducts] = useState<any>();
  const [category, setCategory]= useState<CategoryType>()
  useEffect(() => {
    if (userInfo.statusUser !== "ADMIN") history.push("/");
    dispatch(womanJewelryRequest(womanJewelryURL));
    dispatch(mensJewelryRequest(mansJewelryURL));
  }, []);

  if (allProducts) {
    // console.log(allProducts.map((item: any) => Object.values(item)));
  }
  const handleChangeCategory = (category: CategoryType) => setCategory(category)
  return (
    <div>
      <h1>Admin Products</h1>
      <p> Какую категорию надо отредактировать?</p>
        <div  onClick={()=> handleChangeCategory('man')}>Мужское</div>
        <div onClick={()=> handleChangeCategory('woman')}>Женское</div>
        {category === 'man' && <div>{}</div>}
    </div>
  );
};

export default AdminProducts;
