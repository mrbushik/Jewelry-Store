import React, { useEffect, useState } from "react";
import axios from "axios";

type translationCurrencyType = {
  price: number;
};

const TranslationCurrency: React.FC<translationCurrencyType> = ({ price }) => {
  const [inDollarsPrice, setInDollarsPrice] = useState(false);

  const handleChangeCurrency = (state: boolean) => setInDollarsPrice(state);

  return (
    <div className="d-flex align-items-center">
      <p className="ms-1 mb-0 currency__value">
        {inDollarsPrice ? (price / 2.8).toFixed(2) : price}
      </p>
      <ul className="d-flex align-items-center currency__switch mb-0">
        <li
          onClick={() => handleChangeCurrency(false)}
          className={!inDollarsPrice ? "bg-success text-light" : ""}
        >
          BYN
        </li>
        <li
          onClick={() => handleChangeCurrency(true)}
          className={inDollarsPrice ? "bg-success text-light" : ""}
        >
          $
        </li>
      </ul>
    </div>
  );
};

export default TranslationCurrency;
