import React, { useEffect } from "react";
import axios from "axios";
import { debuglog, log } from "util";
import { useDispatch, useSelector } from "react-redux";
import { allOrdersRequest } from "../redux/actions/productData";
import { orderItem } from "../interfaces";
import OrderRender from "../ui/orderRender";

const AdminPanel: React.FC = () => {
  const dispatch: any = useDispatch();
  const allOrders = useSelector((state: any) => state.productData.orders);
  const allOrdersKeys = Object.keys(allOrders);
  const ORDERS_URL =
    "https://jewelry-store-3488f-default-rtdb.europe-west1.firebasedatabase.app/orders/.json";

  const handleUpdate = () => dispatch(allOrdersRequest(ORDERS_URL));

  useEffect(() => {
    handleUpdate();
  }, []);

  const currentOrderList: orderItem[] = Object.values(allOrders);

  const handleDelete = (id: any) => {
    const copiedOrders = JSON.parse(JSON.stringify(allOrders));
    delete copiedOrders[id];
    deleteRequest(copiedOrders);
  };

  const deleteRequest = (items: any) => {
    axios
      .put(ORDERS_URL, items)
      .then(() => handleUpdate())
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="d-flex ms-4 mt-5 flex-column">
        {currentOrderList?.map((item: orderItem, index: number) => (
          <OrderRender
            orderItem={item}
            onDelete={handleDelete}
            id={allOrdersKeys[index]}
            key={index}
          />
        ))}
        {!currentOrderList.length && (
          <h5 className="mt-5 text-center text-danger ">
            На данный момент список заказов пуст
          </h5>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
