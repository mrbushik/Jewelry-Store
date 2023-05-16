import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios, { all } from "axios";
import {
  mansJewelry,
  mensJewelryRequest,
  womanJewelryRequest,
} from "../redux/actions/productData";
import { ALL } from "dns";
import { log } from "util";
import { productItem } from "../interfaces";
import ProductRender from "../ui/productRender";
import ProductsForEditRender from "../ui/productsForEditRender";
import AddProductForm from "../ui/addProductForm";

type CategoryType = "" | "man" | "woman";

const AdminProducts: React.FC = () => {
  const history = useHistory();
  const dispatch: any = useDispatch();

  const userInfo = useSelector((state: any) => state.auth.userData);
  const womanJewelryItems: productItem[] = useSelector(
    (state: any) => state.productData.womanJewelry
  );
  const mansJewelryItems: productItem[] = useSelector(
    (state: any) => state.productData.mensJewelry
  );

  const mansJewelryURL: string = `${process.env.REACT_APP_DOMAIN_NAME}/Products/mens.json`;
  const womanJewelryURL: string = `${process.env.REACT_APP_DOMAIN_NAME}/Products/woman.json`;

  const [allProducts, setAllProducts] = useState<any>();
  const [category, setCategory] = useState<CategoryType>();
  const [collection, setCollection] = useState({
    title: "",
    imageLink: "",
    category: "",
    metal: "",
    price: "",
    type: "",
    weight: "",
  });

  const handleChange = (target: any) => {
    setCollection((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  useEffect(() => {
    if (userInfo.statusUser !== "ADMIN") history.push("/");
    dispatch(womanJewelryRequest(womanJewelryURL));
    dispatch(mensJewelryRequest(mansJewelryURL));
  }, []);

  if (allProducts) {
    // console.log(allProducts.map((item: any) => Object.values(item)));
  }
  const handleChangeCategory = (category: CategoryType) =>
    setCategory(category);

  const handleDeleteProduct = async (
    url: string,
    category: string,
    imageUrl: string
  ) => {
    const targetProducts: productItem[] = mansJewelryItems.filter(
      (item: productItem) => item.imageLink !== imageUrl
    );
    // console.log(mansJewelryItems);
    console.log(targetProducts);
    axios
      .put(url, targetProducts)
      .then(dispatch(mansJewelry(targetProducts)))
      .catch((error) => {});
  };
  return (
    <div>
      <h1>Admin Products</h1>
      <AddProductForm onChange={handleChange} collection={collection} />
      <p> Какую категорию надо отредактировать?</p>
      <div onClick={() => handleChangeCategory("man")}>Мужское</div>
      <div onClick={() => handleChangeCategory("woman")}>Женское</div>
      {category === "man" && !!mansJewelryItems.length && (
        <div className="d-flex flex-wrap justify-content-center my-5">
          {mansJewelryItems?.map((item: productItem, index: number) => (
            <ProductsForEditRender
              onDelete={handleDeleteProduct}
              item={item}
              id={index}
              key={index + item.imageLink}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
