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
  const ORDERS_URL =
    "https://jewelry-store-3488f-default-rtdb.europe-west1.firebasedatabase.app/orders/.json";

  useEffect(() => {
    dispatch(allOrdersRequest(ORDERS_URL));
  }, []);

  return (
    <div>
      <div className="d-flex ms-4 flex-column">
        {allOrders.map((item: orderItem, index: number) => (
          <OrderRender orderItem={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
