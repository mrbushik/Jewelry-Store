import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mensJewelryRequest } from "../redux/actions/productData";
import ProductRender from "../ui/productRender";
import { productItem } from "../interfaces";
import FilterProducts from "../filterProducts";

const MansPage: React.FC = () => {
  const dispatch: any = useDispatch();
  const mansJewelryItems: productItem[] = useSelector(
    (state: any) => state.productData.mensJewelry
  );
  const [filteredProducts, setFilteredProducts] =
    useState<productItem[]>(mansJewelryItems);

  const mansJewelryURL: string = `${process.env.REACT_APP_DOMAIN_NAME}/Products/mens.json`;

  useEffect(() => {
    dispatch(mensJewelryRequest(mansJewelryURL));
    setFilteredProducts(mansJewelryItems);
  }, []);

  useEffect(() => {
    setFilteredProducts(mansJewelryItems);
  }, [mansJewelryItems]);

  const handleSort = (items: productItem[]) => {
    setFilteredProducts(items);
  };

  return (
    <div>
      <h3 className="text-center px-4 my-4">Украшения для мужчин</h3>
      <FilterProducts
        products={mansJewelryItems}
        currentProducts={filteredProducts}
        onSort={handleSort}
      />
      <div className="d-flex flex-wrap justify-content-center my-5">
        {filteredProducts?.map((item: productItem, index: number) => (
          <ProductRender item={item} id={index} key={index + item.imageLink} />
        ))}
      </div>
    </div>
  );
};

export default MansPage;
