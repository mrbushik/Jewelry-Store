import React, { useState } from "react";
import { orderItem, productItem } from "../interfaces";
import ProductRender from "./productRender";
import CartItems from "./cartItems";

type orderRenderProps = {
  orderItem: orderItem;
  onDelete(id: any): void;
  id: string;
};

const OrderRender: React.FC<orderRenderProps> = ({
  orderItem,
  onDelete,
  id,
}) => {
  const [showInfo, setShowInfo] = useState(false);

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
          <span className="fw-semibold mx-1">{orderItem.order.length} ШТ</span>
        </p>
        <p className="ms-3 mb-0">
          сума <span className="fw-semibold"> {orderSum} BYN</span>
        </p>
        <div className="ms-4">
          {!showInfo && (
            <div
              className="btn btn-outline-primary mx-2"
              onClick={() => setShowInfo(true)}
            >
              Подробнее
            </div>
          )}
          <div className="btn btn-danger mx-2" onClick={() => onDelete(id)}>
            Удалить
          </div>
        </div>
      </div>
      {showInfo && (
        <div className="mt-3">
          <h5 className="fw-bolder">Информация о клиенте</h5>
          <div>
            <p>
              Номер телефона:
              <a
                href={`tel: ${orderItem.userInfo.phone}`}
                className="fw-semibold mx-1 text-decoration-none"
              >
                {orderItem.userInfo.phone}
              </a>
              почта:
              <a
                href={`mailto:${orderItem.userInfo.email}`}
                className="fw-semibold mx-1 text-decoration-none"
              >
                {orderItem.userInfo.email}
              </a>
            </p>
          </div>
          <div>
            <h5 className="fw-bolder">Заказ</h5>
            {orderItem.order.map((item: productItem, index: number) => (
              <CartItems item={item} key={index} />
            ))}
          </div>
        </div>
      )}
      {showInfo && (
        <div className="btn btn-secondary" onClick={() => setShowInfo(false)}>
          Закрыть
        </div>
      )}
    </div>
  );
};

export default OrderRender;
