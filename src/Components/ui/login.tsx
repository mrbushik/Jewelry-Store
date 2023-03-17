import React, { useEffect, useState } from "react";
import TextField from "../form/textField";
import { useDispatch } from "react-redux";
import { validator } from "../utils/validator";
import { isAuth, userData } from "../redux/actions/auth";

type loginInterface = {
  usersList: any;
};

// TO DO: if i have time typifying this

const LoginForm: React.FC<loginInterface> = ({ usersList }) => {
  const dispatch: any = useDispatch();
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [data, setData] = React.useState<any>({
    email: "",
    password: "",
    lastLoginDate: "",
  });

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
  };

  const validate = () => {
    const errors: any = validator(data, validatorConfig);
    setErrors(errors);
    return !Object.keys(errors).length;
  };

  useEffect(() => {
    validate();
  }, [data]);

  const [loginUserData, setLoginUserData] = React.useState<any>([]);
  const [check, setCheck] = React.useState(true);

  const handleChange = (target: any) => {
    const dateNow = Date().toString().substring(4, 24);

    setData((prevState: any) => ({
      ...prevState,
      [target.name]: target.value,
      ["lastLoginDate"]: dateNow,
    }));
  };

  const getLoginObject = (id: string, email: string) => {
    let arr: any = loginUserData;
    arr.push({ id: id, email: email });
    setLoginUserData(arr);
  };
  const handleSubmitNowDate = () => {
    Object.values(usersList).map((user: any, index) =>
      getLoginObject(Object.keys(usersList)[index], user.email)
    );
    let targetIndex: any = loginUserData.findIndex(
      (item: any) => item.email === data.email
    );

    if (targetIndex !== -1) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        lastLoginDate: data.lastLoginDate,
      });

      let requestOptions: any = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `https://jewelry-store-3488f-default-rtdb.europe-west1.firebasedatabase.app/users/${loginUserData[targetIndex].id}.json`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => dispatch(isAuth(true)))
        .catch((error) => console.log("error", error));

      handleFindTargetUser();
    } else {
      return;
    }
  };

  const handleFindTargetUser = () => {
    // to do write types

    const targetUser: any = Object.values(usersList).find(
      (user: any) => user.email === data.email
    );
    dispatch(userData(targetUser));
  };

  const submitData = async () => {
    let receivedUsers = Object.values(usersList).map((item) => item);
    let correctEmail = receivedUsers.find(
      (item: any) => item.email === data.email
    );
    let correctPassword = receivedUsers.find(
      (item: any) => item.password === data.password
    );
    if (correctEmail && correctPassword) {
      setCheck(true);

      handleSubmitNowDate();
    } else {
      setCheck(false);
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (data.username === "" || data.password === "") {
      setCheck(false);
      return;
    } else {
      submitData();
    }
  };

  const isValid = !Object.keys(errors).length;

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="email"
        name="email"
        value={data.email}
        placeholder={"ваша почта"}
        error={errors?.email}
        onChange={handleChange}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        placeholder={"пароль"}
        value={data.password}
        onChange={handleChange}
        error={errors?.password}
      />
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        Отправить
      </button>
      {check ? (
        ""
      ) : (
        <p className="text-danger">
          произошла ошибка заполните данные правильно
        </p>
      )}
    </form>
  );
};

export default LoginForm;
