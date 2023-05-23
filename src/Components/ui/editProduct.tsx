import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import {
  mensJewelryRequest,
  womanJewelryRequest,
} from "../redux/actions/productData";
import { productItem } from "../interfaces";
import AddProductForm from "./addProductForm";
import { validator } from "../utils/validator";
import axios from "axios";
import AdminNavBar from "../navigation/adminNavBar";

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

  const [errors, setErrors] = useState({ email: "", password: "" });
  const [currentProduct, setCurrentProduct] = useState<productItem>({
    category: "",
    imageLink: "",
    metal: "",
    price: "",
    title: "",
    type: "",
    weight: "",
  });

  const handleCleanForm = () => {
    setCurrentProduct({
      category: "",
      imageLink: "",
      metal: "",
      price: "",
      title: "",
      type: "",
      weight: "",
    });
  };

  useEffect(() => {
    if (userInfo.statusUser !== "ADMIN") history.push("/");

    if (location.pathname.includes("mens")) {
      getMansProducts();
    } else {
      getWomanProducts();
    }
  }, []);

  function findNumbersInString(str: any) {
    let regex = /\d+(\.\d+)?/g;
    let match = str.match(regex);
    return Number(match[0]);
  }

  useEffect(() => {
    if (location.pathname.includes("mens")) {
      setCurrentProduct(
        mansJewelryItems[findNumbersInString(location.pathname)]
      );
    } else {
      setCurrentProduct(
        womanJewelryItems[findNumbersInString(location.pathname)]
      );
    }
  }, [mansJewelryItems, womanJewelryItems]);

  const getMansProducts = () => {
    dispatch(mensJewelryRequest(mansJewelryURL));
  };
  const getWomanProducts = () => {
    dispatch(mensJewelryRequest(womanJewelryURL));
  };

  const handleChange = (target: any) => {
    setCurrentProduct((prevState) => ({
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
      isRequiredEdit: {
        message: "Это обязаельное поле",
      },
    },
    category: {
      isRequiredEdit: {
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
      isRequiredNumber: {
        message: "Это обязаельное поле",
      },
    },
  };

  const validate = () => {
    const errors: any = validator(currentProduct, validatorConfig);
    setErrors(errors);
    return !Object.keys(errors).length;
  };
  //
  useEffect(() => {
    if (currentProduct) validate();
  }, [currentProduct]);

  const handleSubmit = () => {
    let data;
    if (location.pathname.includes("mens")) {
      data = mansJewelryItems;
      data[findNumbersInString(location.pathname)] = currentProduct;
      handleRequest(
        JSON.stringify(data),
        `${process.env.REACT_APP_DOMAIN_NAME}/Products/mens.json`
      );
    } else {
      data = womanJewelryItems;
      data[findNumbersInString(location.pathname)] = currentProduct;
      handleRequest(
        JSON.stringify(data),
        `${process.env.REACT_APP_DOMAIN_NAME}/Products/woman.json`
      );
    }
  };

  const handleRequest = (data: any, url: string) => {
    axios.put(url, data).catch((error) => {});
  };

  return (
    <div>
      <AdminNavBar/>
      <h1 className="mt-4 text-center">Редактирование товара</h1>
      <Link to={"/adminproducts"} className="btn ms-3  btn-secondary">
        Назад
      </Link>
      <AddProductForm
        onChange={handleChange}
        collection={currentProduct}
        isValid={!Object.keys(errors).length}
        errors={errors}
        onClean={handleCleanForm}
        handleSubmit={handleSubmit}
        isEdit={true}
      />
    </div>
  );
};

export default EditProduct;
