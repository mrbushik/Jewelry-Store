import React from "react";
import TextField from "../form/textField";
import SelectedField from "../form/selectedField";
import UploadField from "../form/uploadField";
import axios from "axios";

interface addProductFormProps {
  onChange: any;
  collection: any;
  isValid: any;
  errors: any;
  onClean(): void;
  isEdit?: boolean;
  handleSubmit?(): void;
}

const AddProductForm: React.FC<addProductFormProps> = ({
  onChange,
  collection,
  isValid,
  errors,
  onClean,
  isEdit,
  handleSubmit,
}) => {
  const mansJewelryURL: string = `${process.env.REACT_APP_DOMAIN_NAME}/Products/mens.json`;
  const womanJewelryURL: string = `${process.env.REACT_APP_DOMAIN_NAME}/Products/woman.json`;

  const handleSubmitNewProduct = async () => {
    if (collection.category.value === "mens") {
      await addManProduct();
    } else {
      await addWomanProduct();
    }
  };

  const addManProduct = () => {
    axios
      .post(mansJewelryURL, {
        title: collection.title,
        imageLink: collection.imageLink,
        category: collection.category.value,
        metal: collection.metal.value,
        price: collection.price,
        weight: collection.weight,
        type: "",
      })
      .then(() => onClean())
      .catch((error) => {});
  };

  const addWomanProduct = () => {
    axios
      .post(womanJewelryURL, {
        title: collection.title,
        imageLink: collection.imageLink,
        category: collection.category.value,
        metal: collection.metal.value,
        price: collection.price,
        weight: collection.weight,
        type: "",
      })
      .then(() => onClean())
      .catch((error) => {});
  };

  let categorySelect;
  let typeSelect;
  if (collection) {
    categorySelect = collection.category === "woman" ? "Женское" : "Мужское";
    typeSelect = collection.metal === "gold" ? "Золото" : "Серебро";
    if (!collection.category) categorySelect = "";
    if (!collection.metal) typeSelect = "";
  }

  return (
    <div>
      {collection && (
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
            value={
              collection.category.name
                ? collection.category.name
                : categorySelect
            }
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
            value={collection.metal.name ? collection.metal.name : typeSelect}
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
            onClick={isEdit ? handleSubmit : handleSubmitNewProduct}
          >
            {isEdit ? "Редактировать" : "Создать товар"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProductForm;
