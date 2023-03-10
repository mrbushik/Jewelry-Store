import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuth, userData } from "../redux/actions/auth";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();

  const authInfo: string | null = localStorage.getItem("name");
  const [authStatus, setAuthStatus] = React.useState(!authInfo);

  const userName = useSelector((state: any) => state.auth.userData);
  console.log(userName);

  const handleClearSession = () => {
    dispatch(isAuth(false));
    dispatch(userData(""));
  };

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
            <li className="user__nav-nick">
              {userName ? (
                <div className="d-flex justify-content-center flex-column">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person mx-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                    </svg>
                    {userName.username}
                  </div>
                  <Link
                    to="/login"
                    onClick={handleClearSession}
                    className="text-center mt-1 cursor-pointer text-decoration-none"
                  >
                    Выйти
                  </Link>
                </div>
              ) : (
                <div>
                  <Link className="text-decoration-none" to={"/login"}>
                    Войти
                  </Link>
                </div>
              )}
            </li>
            <li className="mx-2">{authStatus ? <p>{authInfo}</p> : <></>}</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
