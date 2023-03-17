import React, { useEffect, useState } from "react";
import TextField from "../form/textField";
import { useDispatch } from "react-redux";
import { isAuth, userData } from "../redux/actions/auth";
import { validator } from "../utils/validator";

type loginInterface = {
  usersList: any;
};

const RegisterForm: React.FC<loginInterface> = ({ usersList }) => {
  const dispatch: any = useDispatch();

  const [data, setData] = useState({
    _id: "",
    email: "",
    name: "",
    password: "",
    lastLoginDate: "",
    registrDate: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "", name: "" });
  const [check, setCheck] = React.useState({
    status: true,
    massage: "",
  });

  React.useEffect(() => {
    setData((prevState: any) => ({
      ...prevState,
      ["_id"]: randomInteger(100000000, 999999999),
    }));
  }, []);

  function randomInteger(min: number, max: number) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  const validatorConfig = {
    password: {
      isRequired: {
        message: "Это обязаельное поле",
      },
    },
    email: {
      isRequired: {
        message: "Это обязаельное поле",
      },
      isEmail: {
        message: "почта введена не правильно",
      },
    },
    name: {
      isRequired: {
        message: "Это обязаельное поле",
      },
    },
  };

  const validate = () => {
    const errors: any = validator(data, validatorConfig);
    setErrors(errors);
    return !Object.keys(errors).length;
  };

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (target: any) => {
    const dateNow = Date().toString().substring(4, 24);
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
      ["lastLoginDate"]: dateNow,
      ["registrDate"]: dateNow,
    }));
  };
  const submitData = async () => {
    await fetch(
      "https://jewelry-store-3488f-default-rtdb.europe-west1.firebasedatabase.app/users.json",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => dispatch(userData(data)))
      .then((json) => dispatch(isAuth(true)));

    handleFindTargetUser();
  };

  const handleFindTargetUser = () => {
    dispatch(userData(data));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let receivedUsers = Object.values(usersList).map((item) => item);
    let checkEmail = receivedUsers.find(
      (item: any) => item.email === data.email
    );
    if (checkEmail) {
      setCheck((pervState) => ({
        status: false,
        massage: "такой емаил уже существует",
      }));

      return;
    }
    if (
      data.email.trim() === "" ||
      data.password.trim() === "" ||
      data.name.trim() === ""
    ) {
      setCheck((pervState) => ({
        status: false,
        massage: "все поля обязательны для заполнения",
      }));
      return;
    } else {
      setCheck((pervState) => ({ ...pervState, status: true }));
      submitData();
    }
  };

  const isValid = !Object.keys(errors).length;

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        placeholder="Электронная почта"
        label="почта"
        name="email"
        value={data.email}
        error={errors?.email}
        onChange={handleChange}
      />
      <TextField
        placeholder={"имя"}
        label="Ваше имя"
        name="name"
        value={data.name}
        error={errors?.name}
        onChange={handleChange}
      />
      <TextField
        placeholder="Придумайте пароль"
        label="Пароль"
        type="password"
        name="password"
        error={errors?.password}
        value={data.password}
        onChange={handleChange}
      />
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        Отправить
      </button>
      {check.status ? "" : <p className="text-danger">{check.massage}</p>}
    </form>
  );
};

export default RegisterForm;
