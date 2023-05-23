import React from "react";
import { Link, useLocation } from "react-router-dom";
import { adminAuth, isAuth, userData } from "../redux/actions/auth";
import { deleteProductInCart } from "../redux/actions/cart";
import { useDispatch } from "react-redux";

const AdminNavBar: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleClearSession = () => {
    dispatch(isAuth(false));
    dispatch(userData(""));
    dispatch(deleteProductInCart([]));
    dispatch(adminAuth(false));
  };

  return (
    <div className="bg-primary admin__nav justify-content-between align-items-center">
      <div className="d-flex">
        <Link className="text-light mx-3 fw-bolder nav-link" to="/">
          Главная
        </Link>
        {location.pathname !== "/adminpanel" && (
          <Link className="text-light mx-3 fw-bolder nav-link" to="/adminpanel">
            Текущие заказы
          </Link>
        )}
        {location.pathname !== "/adminproducts" && (
          <Link
            className="text-light mx-3 fw-bolder nav-link"
            to="/adminproducts"
          >
            Редактирование товаров
          </Link>
        )}
      </div>
      <div className="d-flex align-items-center">
        <Link
          to="/login"
          className="text-light mb-0 cursor-pointer"
          onClick={handleClearSession}
        >
          Выйти
        </Link>
      </div>
    </div>
  );
};

export default AdminNavBar;
