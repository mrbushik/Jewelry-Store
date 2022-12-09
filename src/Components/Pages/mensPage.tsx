import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filteredMensJewelry,
  mensJewelryRequest,
} from "../redux/actions/productData";
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
  const [test, setTest] = useState<productItem[]>();

  const mensJewelryURL =
    "https://jewelry-store-3488f-default-rtdb.europe-west1.firebasedatabase.app/Products/mens.json";

  useEffect(() => {
    dispatch(mensJewelryRequest(mensJewelryURL));
    setTest(mensJewelryItems);
  }, []);

  useEffect(() => {
    dispatch(filteredMensJewelry(mensJewelryItems));
    setTest(mensJewelryItems);
  }, [mensJewelryItems]);
  const handleSort = (items: productItem[]) => {
    setTest(items);
  };

  useEffect(() => {}, [filteredJewelry]);

  return (
    <div>
      <h3 className="text-center px-4 my-4">Украшения для мужчин</h3>
      <FilterProducts products={mensJewelryItems} onSort={handleSort} />
      {/*{filteredJewelry && <ProductRender items={filteredJewelry} />}*/}
    </div>
  );
};

export default MensPage;
