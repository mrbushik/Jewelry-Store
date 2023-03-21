import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoginForm from "../ui/login";
import RegisterForm from "../ui/registerForm";
import { useSelector } from "react-redux";

const Login: React.FC = ({ ...rest }) => {
  const { type }: any = useParams();
  const history = useHistory();

  const authStatus: any = useSelector((state: any) => state.auth.auth);
  const [userslist, setUsersList] = React.useState();

  useEffect(() => {
    if (authStatus) history.push("/");
  }, [authStatus]);

  React.useEffect(() => {
    fetch(
      `${process.env.REACT_APP_DOMAIN_NAME}/users.json`
    )
      .then((response) => response.json())
      .then((json) => setUsersList(json));
  }, []);

  const [formType, setFormType] = React.useState(
    type === "register" ? type : "login"
  );

  const toggleFormType = () => {
    setFormType((pervState: any) =>
      pervState === "register" ? "login" : "register"
    );
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            {formType === "register" ? (
              <>
                <h3 className="mb-4">Регистрация</h3>
                <RegisterForm usersList={userslist} />
                <p className="mt-1 mb-1">Уже есть аккаунт?</p>
                <a
                  role="button "
                  className="login__switch"
                  onClick={toggleFormType}
                >
                  Войти
                </a>
              </>
            ) : (
              <>
                <h3 className="mb-4">Вход</h3>
                <LoginForm usersList={userslist} />
                <a
                  role="button "
                  className="login__switch"
                  onClick={toggleFormType}
                >
                  Зарегестрироваться
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
