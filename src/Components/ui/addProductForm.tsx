import React from "react";
import TextField from "../form/textField";
import SelectedField from "../form/selectedField";

interface addProductFormProps {
  onChange: any;
  collection: any;
}

const AddProductForm: React.FC<addProductFormProps> = ({
  onChange,
  collection,
}) => {
  return (
    <div>
      <TextField
        label={"Название товара"}
        name={"title"}
        value={collection.title}
        onChange={onChange}
      />
      <TextField
        label={"Цена"}
        name={"price"}
        value={collection.price}
        onChange={onChange}
      />
      <TextField
        label={"Вес изделия"}
        name={"weight"}
        value={collection.weight}
        onChange={onChange}
      />
      <SelectedField
        label={"Категория товара"}
        value={collection.category.name}
        onChange={onChange}
        defaultOption={""}
        options={[
          { name: "Мужское", value: "mans" },
          { name: "Женское", value: "woman" },
        ]}
        name={"category"}
      />
      <SelectedField
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
      {/*<SelectedField value={collection.metal} onChange={onChange} defaultOption={''} options={[]} name={}/>*/}
      {/*<SelectedField value={collection.} onChange={onChange} defaultOption={} options={[]} name={}/>*/}
    </div>
  );
};

export default AddProductForm;
