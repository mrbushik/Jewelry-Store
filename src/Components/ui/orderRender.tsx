import React, { useState } from "react";
import { orderItem, productItem } from "../interfaces";
import ProductRender from "./productRender";
import CartItems from "./cartItems";

type orderRenderProps = {
  orderItem: orderItem;
};

const OrderRender: React.FC<orderRenderProps> = ({ orderItem }) => {
  const [showInfo, setShowInfo] = useState(true);

  const orderSum: any = orderItem.order.reduce(
    (acc: number, item: productItem) => acc + Number(item.price),
    0
  );
  return (
    <div className="my-3">
      <div className="d-flex align-items-center justify-content-center">
        <p className=" mb-0">
          Заказчик
          <span className="fw-bolder"> {orderItem.userInfo.firstName}</span>
        </p>
        <p className="ms-3  mb-0">
          Количество товара
          <span className="fw-semibold">{orderItem.order.length} ШТ</span>
        </p>
        <p className="ms-3 mb-0">
          сума <span className="fw-semibold"> {orderSum} BYN</span>
        </p>
        <div className="ms-4">
          <div className="btn btn-outline-primary mx-2">Подробнее</div>
          <div className="btn btn-danger mx-2">Удалить</div>
        </div>
      </div>
      {showInfo && (
        <div>
          <h5 className="fw-bolder">Информация о клиенте</h5>
          <div>
            <p>
              Номер телефона:
              <span className="fw-semibold mx-1">
                {orderItem.userInfo.phone}
              </span>
              почта:
              <span className="fw-semibold mx-1">
                {orderItem.userInfo.email}
              </span>
            </p>
          </div>
          <div>
            <h5 className="fw-bolder">Заказ</h5>
            {orderItem.order.map((item: productItem, index: number) => (
// <CartItems item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderRender;
