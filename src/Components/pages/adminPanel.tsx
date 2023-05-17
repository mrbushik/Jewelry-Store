import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allOrdersRequest } from "../redux/actions/productData";
import { orderItem } from "../interfaces";
import OrderRender from "../ui/orderRender";
import TextField from "../form/textField";
import { validator } from "../utils/validator";

const AdminPanel: React.FC = () => {
  const dispatch: any = useDispatch();
  const history = useHistory();
  const allOrders = useSelector((state: any) => state.productData.orders);
  const userInfo = useSelector((state: any) => state.auth.userData);
  const [adminRights, setAdminRights] = useState<boolean>(false);
  const [field, setField] = useState({ password: "" });
  const [errors, setErrors] = useState(false);

  const allOrdersKeys = Object.keys(allOrders);
  const password = "111111";
  const ORDERS_URL = `${process.env.REACT_APP_DOMAIN_NAME}/orders/.json`;

  const handleUpdate = () => dispatch(allOrdersRequest(ORDERS_URL));

  useEffect(() => {
    if (userInfo.statusUser !== "ADMIN") history.push("/");
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

  const handleChange = (target: any) => {
    setField((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = () => {
    field.password === password ? setAdminRights(true) : setErrors(true);
  };

  return (
    <div>
      {adminRights ? (
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
      ) : (
        <div className="admin__password_form">
          <h2 className="mb-4">Введите пароль</h2>
          <TextField
            name="password"
            value={field.password}
            onChange={handleChange}
          />
          {errors && (
            <p className="text-danger mt-1">Ошибка при вводе пароля</p>
          )}
          <div className="btn btn-primary mt-2" onClick={handleSubmit}>
            Отправить
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
