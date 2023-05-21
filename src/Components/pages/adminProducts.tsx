import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios, { all } from "axios";
import {
  mansJewelry,
  mensJewelryRequest,
  womanJewelryRequest,
} from "../redux/actions/productData";
import { productItem } from "../interfaces";
import ProductRender from "../ui/productRender";
import ProductsForEditRender from "../ui/productsForEditRender";
import AddProductForm from "../ui/addProductForm";
import { validator } from "../utils/validator";

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
  const [category, setCategory] = useState<any>();
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [collection, setCollection] = useState({
    title: "",
    imageLink: "",
    category: "",
    metal: "",
    price: "",
    weight: "",
  });

  const handleCleanForm = () => {
    setCollection({
      title: "",
      imageLink: "",
      category: "",
      metal: "",
      price: "",
      weight: "",
    });
  };

  const handleChange = (target: any) => {
    setCollection((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    title: {
      isRequired: {
        message: "Это обязаельное поле",
      },
    },
    metal: {
      isRequiredSelect: {
        message: "Это обязаельное поле",
      },
    },
    category: {
      isRequiredSelect: {
        message: "Это обязаельное поле",
      },
    },
    price: {
      isRequired: {
        message: "Это обязаельное поле",
      },
    },
    imageLink: {
      isRequired: {
        message: "Это обязаельное поле",
      },
    },
    weight: {
      isRequired: {
        message: "Это обязаельное поле",
      },
    },
  };

  const validate = () => {
    const errors: any = validator(collection, validatorConfig);
    setErrors(errors);
    return !Object.keys(errors).length;
  };

  useEffect(() => {
    validate();
  }, [collection]);

  useEffect(() => {
    if (userInfo.statusUser !== "ADMIN") history.push("/");
    dispatch(womanJewelryRequest(womanJewelryURL));
    dispatch(mensJewelryRequest(mansJewelryURL));
  }, []);

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
    axios
      .put(url, targetProducts)
      .then(dispatch(mansJewelry(targetProducts)))
      .catch((error) => {});
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <div>
      <h1 className='text-center'>Редактирование и добавление товаров</h1>
      <AddProductForm
          onClean={handleCleanForm}
        onChange={handleChange}
        collection={collection}
        isValid={!Object.keys(errors).length}
        errors={errors}
      />
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
          {category === "" && !!mansJewelryItems.length && (
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
