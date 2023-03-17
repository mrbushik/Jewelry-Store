import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import SuccessfulOrder from "../ui/successfulOrder";
import { deleteProductInCart } from "../redux/actions/cart";
import axios from "axios";
import { IFormInputs } from "../interfaces";
import TranslationCurrency from "../ui/translationCurrency";

const OrderPage: React.FC = () => {
  const history = useHistory();
  const dispatch: any = useDispatch();
  const SEND_ORDER_URL =
    "https://jewelry-store-3488f-default-rtdb.europe-west1.firebasedatabase.app/orders/.json";

  const cartPrice = useSelector((state: any) => state.cart.cartPrice);
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const userInfo = useSelector((state: any) => state.auth.userData);

  const [successfulOrder, setSuccessfulOrder] = useState(false);
  const [checkAuth, setCheckAuth] = useState(false);

  useEffect(() => {
    if (!cartItems.length) history.push("/cart");
  }, []);

  useEffect(() => {
    if (userInfo) setCheckAuth(true);
  }, []);

  const getSubmitData = (userData: IFormInputs) => {
    return { userInfo: userData, order: cartItems };
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    setSuccessfulOrder(true);
    dispatch(deleteProductInCart([]));
    handleRequest(getSubmitData(data));
  };

  const handleRequest = (data: any) => {
    axios.post(SEND_ORDER_URL, data).catch((e) => console.log(e));
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({
    defaultValues: {
      firstName: userInfo.username,
      email: userInfo.email,
      phone: userInfo.phone,
    },
  });

  const handleGetClass = (error: any) => {
    if (error) return "form-control is-invalid mt-1 ";
    return "form-control mt-1";
  };

  return (
    <div>
      <Link to="/cart" className="btn btn-secondary m-3">
        Назад
      </Link>
      {checkAuth ? (
        <div>
          {successfulOrder ? (
            <SuccessfulOrder />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="order-form">
              <label className="mt-3">Имя</label>
              <input
                {...register("firstName", { required: true })}
                // placeholder={userInfo.username}
                className={handleGetClass(errors.firstName)}
              />
              {errors.firstName && (
                <span className="invalid-feedback text-danger">
                  Имя не введено
                </span>
              )}
              <label className="mt-3">Электронная почта</label>
              <input
                {...register("email", {
                  required: true,
                  pattern:
                    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                })}
                placeholder={userInfo.email}
                className={handleGetClass(errors.email)}
              />
              {errors.email && (
                <span className="invalid-feedback text-danger">
                  Введите почту правильно
                </span>
              )}
              <label className="mt-3">Номер телефона</label>
              <input
                {...register("phone", {
                  required: true,
                  pattern:
                    /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/,
                })}
                placeholder={userInfo.phone}
                className={handleGetClass(errors.phone)}
              />
              {errors.phone && (
                <span className="invalid-feedback text-danger">
                  Введите мобильный номер правильно
                </span>
              )}
              <div className="d-flex flex-wrap align-items-center mt-3">
                <button
                  type="submit"
                  className="btn btn-primary ms-3 mt-3"
                  disabled={Object.keys(errors).length !== 0}
                >
                  Оформить заказ
                </button>
                <span className="mb-0 ms-3 mt-3 d-flex align-items-center">
                  Итого к оплате <TranslationCurrency price={cartPrice} />
                </span>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="m-4 ">
          <h2 className="order__page-error mb-4">
            Для заказа требуется зарегестрироваться или войти в аккаунт
          </h2>
          <Link to="/login" className="order__page-error-link">
            Войти или зарегестрироваться
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
