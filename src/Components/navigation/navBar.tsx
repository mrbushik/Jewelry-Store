import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const authInfo: string | null = localStorage.getItem("name");
  const [authStatus, setAuthStatus] = React.useState(!authInfo);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Jewelry Store
        </Link>
        <div>
          <ul className="d-flex  nav-list">
            <li className="mx-2">
              <Link className="nav-link" aria-current="page" to="/mans">
                Мужское
              </Link>
            </li>
            <li className="mx-2">
              <Link className="nav-link" to="/woman">
                Женское
              </Link>
            </li>
            <li className="mx-2">
              <Link className="nav-link" to="/cart">
                Корзина
              </Link>
            </li>
            <li className="mx-2">{authStatus ? <p>{authInfo}</p> : <></>}</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
