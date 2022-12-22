import React from "react";
import { Link } from "react-router-dom";

const SuccessfulOrder: React.FC = () => {
  return (
    <div className="successful-order-form ">
      <img
        src="https://res.cloudinary.com/drfjcq9hg/image/upload/v1671711699/bushik123/free-png.ru-3-340x340_seklkb.png"
        alt="Successful Order"
        className="successful-img"
      />
      <h3 className="fw-semibold mt-3 text-center px-3">
        Заказ успешно оформлен !
      </h3>
      <p className="px-2">
        В ближайшее время с вами свяжутся
        <Link className="text-primary ms-1" to="/">
          перейти на главную
        </Link>
      </p>
    </div>
  );
};

export default SuccessfulOrder;
