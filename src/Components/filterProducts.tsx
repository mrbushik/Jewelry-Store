import React, { useEffect, useState } from "react";
import SelectedField from "./form/selectedField";
import {
  filterPrice,
  filterProduct,
  productFilters,
  productItem,
} from "./interfaces";
import { useDispatch, useSelector } from "react-redux";
import { filteredMensJewelry } from "./redux/actions/productData";
import ProductRender from "./productRender";
import { Simulate } from "react-dom/test-utils";

type handleTarget = {
  name: string;
  value: string | productFilters;
};

type filterProductsProps = {
  products: productItem[];
  onSort(items: productItem): void;
};

const FilterProducts: React.FC<filterProductsProps> = ({
  products,
  onSort,
}) => {
  const dispatch: any = useDispatch();
  const filteredJewelry: productItem[] = useSelector(
    (state: any) => state.productData.mensFilteredJewelry
  );
  const [currentElements, setCurrentElements] = useState(filteredJewelry);

  useEffect(() => {
    console.log("change");
    setCurrentElements(filteredJewelry);
  }, [filteredJewelry]);

  const PRICE_FILTER_TYPES: filterPrice[] = [
    { name: "Убыванию", value: false },
    { name: "Возрастанию", value: true },
  ];
  const PRODUCT_FILTER_TYPES: productFilters[] = [
    { text: "Все изделия", value: "all" },
    { text: "Серебрянные изделия", value: "silver" },
    { text: "Золотые изделия", value: "gold" },
  ];

  const [displayingFilters, setDisplayingFilters] = useState<boolean>(true);
  //change to false
  const [sortTypes, setSortTypes] = useState<filterProduct>({
    price: "",
    filter: PRODUCT_FILTER_TYPES[0],
  });

  const handleToggleFilterDisplay = () => setDisplayingFilters((perv) => !perv);

  const handleChange = (target: handleTarget) => {
    setSortTypes((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const priceSort = () => {
    // sortTypes.price.value
    //   ? dispatch(
    //       filteredMensJewelry(
    //         products.sort(
    //           (a: productItem, b: productItem) =>
    //             Number(a.price) - Number(b.price)
    //         )
    //       )
    //     )
    //   : dispatch(
    //       filteredMensJewelry(
    //         products.sort(
    //           (a: productItem, b: productItem) =>
    //             Number(b.price) - Number(a.price)
    //         )
    //       )
    //     );
    sortTypes.price.value
      ? dispatch(
          filteredMensJewelry(
            products.sort(
              (a: productItem, b: productItem) =>
                Number(a.price) - Number(b.price)
            )
          )
        )
      : dispatch(
          filteredMensJewelry(
            products.sort(
              (a: productItem, b: productItem) =>
                Number(b.price) - Number(a.price)
            )
          )
        );
  };

  useEffect(() => {
    if (sortTypes.price) priceSort();
  }, [sortTypes]);

  return (
    <div className="mt-4  px-3">
      <span className="d-flex justify-content-center align-items-center">
        <h5 className="text-center mx-2">Фильтры и сортировка</h5>
        {displayingFilters ? (
          <span
            className="btn btn-secondary"
            onClick={handleToggleFilterDisplay}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-eye-fill pointer"
              viewBox="0 0 16 16"
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg>
          </span>
        ) : (
          <span
            className="btn btn-secondary"
            onClick={handleToggleFilterDisplay}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-eye-slash-fill pointer"
              viewBox="0 0 16 16"
            >
              <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
              <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
            </svg>
          </span>
        )}
      </span>
      {displayingFilters && (
        <div>
          <div className="mb-4">
            <p className="sort-title fs-4 fw-semibold">Сортировать цену по</p>
            <SelectedField
              value={sortTypes.price.name}
              onChange={handleChange}
              defaultOption={"Выберите"}
              options={PRICE_FILTER_TYPES}
              name={"price"}
            />
          </div>
          <div>
            <ul className="nav-list d-flex">
              {PRODUCT_FILTER_TYPES.map(
                (item: productFilters, index: number) => (
                  <li
                    onClick={() =>
                      handleChange({ name: "filter", value: item })
                    }
                    className={`btn mx-2 ${
                      sortTypes.filter.value === item.value
                        ? "bg-danger"
                        : "bg-light"
                    }`}
                    key={index}
                  >
                    {item.text}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
      <div>
        <ProductRender items={currentElements} />
      </div>
    </div>
  );
};

export default FilterProducts;
