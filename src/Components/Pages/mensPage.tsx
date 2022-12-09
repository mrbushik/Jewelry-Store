import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mensJewelryRequest } from "../redux/actions/productData";
import ProductRender from "../productRender";
import { productItem } from "../interfaces";
import FilterProducts from "../filterProducts";

const MensPage: React.FC = () => {
  const dispatch: any = useDispatch();
  const mensJewelryItems: productItem[] = useSelector(
    (state: any) => state.productData.mensJewelry
  );
  const filteredJewelry: productItem[] = useSelector(
    (state: any) => state.productData.mensFilteredJewelry
  );
  const [filteredProducts, setFilteredProducts] = useState<productItem[]>(filteredJewelry);

  const mensJewelryURL =
    "https://jewelry-store-3488f-default-rtdb.europe-west1.firebasedatabase.app/Products/mens.json";

  useEffect(() => {
    dispatch(mensJewelryRequest(mensJewelryURL));
    setFilteredProducts(mensJewelryItems);
  }, []);

  useEffect(() => {
    setFilteredProducts(mensJewelryItems);
  }, [mensJewelryItems]);

  const handleSort = (items: productItem[]) => {
    setFilteredProducts(items);
  };

  return (
    <div>
      <h3 className="text-center px-4 my-4">Украшения для мужчин</h3>
      <FilterProducts products={mensJewelryItems}  currentProducts={filteredProducts} onSort={handleSort} />
      <div className="d-flex flex-wrap justify-content-center my-5">
        {filteredProducts &&
            filteredProducts.map((item: productItem, index: number) => (
                <ProductRender item={item} key={index} />
            ))
        }
      </div>
    </div>
  );
};

export default MensPage;
