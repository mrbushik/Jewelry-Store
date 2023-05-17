import React from "react";
import TextField from "../form/textField";
import SelectedField from "../form/selectedField";
import UploadField from "../form/uploadField";
import axios from "axios";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

interface addProductFormProps {
  onChange: any;
  collection: any;
  isValid: any;
  errors: any;
  onClean(): void
}

const AddProductForm: React.FC<addProductFormProps> = ({
  onChange,
  collection,
  isValid,
  errors,
    onClean,
}) => {
  const mansJewelryURL: string = `${process.env.REACT_APP_DOMAIN_NAME}/Products/mens.json`;
  const womanJewelryURL: string = `${process.env.REACT_APP_DOMAIN_NAME}/Products/woman.json`;

  const submitProduct ={
    title: collection.title,
    imageLink: collection.imageLink,
    category: collection.category.value,
    metal: collection.category.value,
    price: collection.price,
    weight: collection.weight,
    type: ''
  }

  const handleSubmitNewProduct = () => {
    if (collection.category.value === "mans") {
      addManProduct();
    }else{
      addWomanProduct()
    }
    onClean()
  };
  const addManProduct = () => {
    axios.post(mansJewelryURL, collection).catch((error) => {});
  };

  const addWomanProduct = () => {
    axios.post(womanJewelryURL, collection).catch((error) => {});
  };

  return (
    <div>
      <div className="add__product-wrapper">
        <TextField
          label={"Название товара"}
          name={"title"}
          value={collection.title}
          error={errors.title}
          onChange={onChange}
        />
        <TextField
          label={"Цена"}
          name={"price"}
          value={collection.price}
          error={errors.price}
          onChange={onChange}
        />
        <TextField
          label={"Вес изделия"}
          name={"weight"}
          error={errors.weight}
          value={collection.weight}
          onChange={onChange}
        />
        <SelectedField
          label={"Категория товара"}
          value={collection.category.name}
          onChange={onChange}
          defaultOption={""}
          error={errors.category}
          options={[
            { name: "Мужское", value: "mens" },
            { name: "Женское", value: "woman" },
          ]}
          name={"category"}
        />
        <SelectedField
          error={errors.metal}
          label={"Тип метала"}
          value={collection.metal.name}
          onChange={onChange}
          defaultOption={""}
          options={[
            { name: "Золото", value: "gold" },
            { name: "Серебро", value: "silver" },
          ]}
          name={"metal"}
        />
        <UploadField
          name={"imageLink"}
          onSave={onChange}
          isUrl={collection.imageLink}
        />
        <button
          type="submit"
          disabled={!isValid}
          className="btn btn-primary my-4 "
          onClick={handleSubmitNewProduct}
        >
          Создать товар
        </button>
      </div>
    </div>
  );
};

export default AddProductForm;
