import React from "react";
import { useParams } from "react-router-dom";
// import LoginForm from '../ui/loginForm';
// import RegisterForm from '../ui/registerForm';

const Login: React.FC = ({ ...rest }) => {
  const [userslist, setUsersList] = React.useState();
  React.useEffect(() => {
    fetch(
      "https://task4-2cc24-default-rtdb.europe-west1.firebasedatabase.app/users.json"
    )
      .then((response) => response.json())
      .then((json) => setUsersList(json));
  }, []);
  const { type }: any = useParams();
  const [formType, setFormType] = React.useState(
    type === "register" ? type : "login"
  );
  const togleFormType = () => {
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
                <h3 className="mb-4">Register</h3>
                <RegisterForm {...rest} usersList={userslist} />
                <p>Already have account?</p>{" "}
                <a role="button" onClick={togleFormType}>
                  Sing In
                </a>
              </>
            ) : (
              <>
                <h3 className="mb-4">Login</h3>
                <LoginForm {...rest} usersList={userslist} />
                <a role="button" onClick={togleFormType}>
                  Sing Un
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
