import React, { useEffect, useState } from "react";
import axios from "axios";
import { productItem } from "../interfaces";
import ProductRender from "../productRender";

const WomanPage: React.FC = () => {
  const [womanProducts, setWomanProducts] = useState<any>();

  useEffect(() => {
    axios
      .get(
        "https://jewelry-store-3488f-default-rtdb.europe-west1.firebasedatabase.app/Products/woman.json"
      )
      .then((response) => setWomanProducts(Object.values(response.data)));
  }, []);

  const onPriceSort = (typeSort: boolean) => {
    // typeSort
    //   ? setWomanProducts((perv: any) =>
    //       perv.sort(
    //         (a: productItem, b: productItem) =>
    //           Number(a.price) - Number(b.price)
    //       )
    //     )
    //   : setWomanProducts((perv: any) =>
    //       perv.sort(
    //         (a: productItem, b: productItem) =>
    //           Number(b.price) - Number(a.price)
    //       )
    //     );
    const test = womanProducts.sort(
      (a: productItem, b: productItem) => Number(b.price) - Number(a.price)
    );

    setWomanProducts((perv: productItem[]) =>
      perv.filter((item: productItem) => item.title === "Браслет")
    );
    console.log(womanProducts);
  };

  return (
    <div>
      <div>
        <p onClick={() => onPriceSort(true)}>возрастание</p>
        <p onClick={() => onPriceSort(false)}>убывание</p>
      </div>
      {womanProducts?.map((item: productItem, index: number) => (
        <div className="product-cart" key={index}>
          <img className="product-img" src={item.imageLink} />
          <p>{item.title}</p>
          <p>{item.price} BYN</p>
        </div>
        // <ProductRender item={item} key={index} />
      ))}
    </div>
  );
};

export default WomanPage;
