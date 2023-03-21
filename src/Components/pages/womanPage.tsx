import React, { useEffect, useState } from "react";
import { productItem } from "../interfaces";
import ProductRender from "../ui/productRender";
import { useDispatch, useSelector } from "react-redux";
import { womanJewelryRequest } from "../redux/actions/productData";
import FilterProducts from "../filterProducts";

const WomanPage: React.FC = () => {
  const dispatch: any = useDispatch();
  const womanJewelryItems: productItem[] = useSelector(
    (state: any) => state.productData.womanJewelry
  );
  const womanJewelryURL: string = `${process.env.REACT_APP_DOMAIN_NAME}/Products/woman.json`;

  const [womanFilterProducts, setWomanFilterProducts] =
    useState<productItem[]>(womanJewelryItems);

  useEffect(() => {
    dispatch(womanJewelryRequest(womanJewelryURL));
  }, []);

  useEffect(() => {
    setWomanFilterProducts(womanJewelryItems);
  }, [womanJewelryItems]);

  const handleSort = (items: productItem[]) => {
    setWomanFilterProducts(items);
  };

  return (
    <div>
      <h3 className="text-center px-4 my-4">Украшения для женщин</h3>
      <FilterProducts
        products={womanJewelryItems}
        onSort={handleSort}
        currentProducts={womanFilterProducts}
      />
      <div className="d-flex flex-wrap justify-content-center my-5">
        {womanFilterProducts?.map((item: productItem, index: number) => (
          <ProductRender item={item} id={index} key={index + item.imageLink} />
        ))}
      </div>
    </div>
  );
};

export default WomanPage;
