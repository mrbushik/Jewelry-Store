import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminNavBar: React.FC = () => {
  const location = useLocation();
  return (
    <div className='bg-secondary admin__nav'>
      <Link className='text-light mx-3 fw-bolder nav-link' to="/">Главная</Link>
      {location.pathname !== "/adminpanel" && (
        <Link className='text-light mx-3 fw-bolder nav-link' to="/adminpanel">Текущие заказы</Link>
      )}
      {location.pathname !== "/adminproducts" && (
        <Link className='text-light mx-3 fw-bolder nav-link' to="/adminproducts">Редактирование товаров</Link>
      )}
    </div>
  );
};

export default AdminNavBar;
