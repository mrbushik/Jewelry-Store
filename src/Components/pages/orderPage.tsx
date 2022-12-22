import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import SuccessfulOrder from "../layout/successfulOrder";

interface IFormInputs {
  firstName: string;
  email: string;
  phone: string;
}

const OrderPage: React.FC = () => {
  const cartPrice = useSelector((state: any) => state.cart.cartPrice);
  const cartItems = useSelector((state: any) => state.cart.cartItems);

  const [successfulOrder, setSuccessfulOrder] = useState(true);

  const getSubmitData = (userData: IFormInputs) => {
    return { userInfo: userData, order: cartItems };
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    setSuccessfulOrder(true);
    console.log(getSubmitData(data));
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const handleGetClass = (error: any) => {
    if (error) return "form-control is-invalid mt-1 ";
    return "form-control mt-1";
  };

  return (
    <div>
      <Link to="/cart" className="btn btn-secondary m-3">
        Назад
      </Link>
      {successfulOrder ? (
        <SuccessfulOrder />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="order-form">
          <label className="mt-3">Имя</label>
          <input
            {...register("firstName", { required: true })}
            className={handleGetClass(errors.firstName)}
          />
          {errors.firstName && (
            <p className="invalid-feedback text-danger">Имя не введено</p>
          )}
          <label className="mt-3">Электронная почта</label>
          <input
            {...register("email", {
              required: true,
              pattern:
                /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
            })}
            className={handleGetClass(errors.email)}
          />
          {errors.email && (
            <p className="invalid-feedback text-danger">
              Введите почту правильно
            </p>
          )}
          <label className="mt-3">Номер телефона</label>
          <input
            {...register("phone", {
              required: true,
              pattern:
                /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/,
            })}
            className={handleGetClass(errors.phone)}
          />
          {errors.phone && (
            <p className="invalid-feedback text-danger">
              Введите мобильный номер правильно
            </p>
          )}
          <div className="d-flex flex-wrap align-items-center mt-3">
            <button
              type="submit"
              className="btn btn-primary ms-3 mt-3"
              disabled={Object.keys(errors).length !== 0}
            >
              Оформить заказ
            </button>
            <p className="mb-0 ms-3 mt-3">
              Итого к оплате <span className="fw-semibold">{cartPrice}</span>{" "}
              BYN
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default OrderPage;
