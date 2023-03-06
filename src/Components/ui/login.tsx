import React from 'react';
import TextField from '../form/textField';
const LoginForm: React.FC = ({ onChangeAuth, usersList, onEmail }) =>{
    const [data, setData] = React.useState({
        email: '',
        password: '',
        lastLoginDate: '',
    });
    const [loginUserData, setLoginUserData] = React.useState([]);
    const [check, setCheck] = React.useState(true);
    const handleChange = (target) => {
        const dateNow = Date().toString().substring(4, 24);

        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
            ['lastLoginDate']: dateNow,
        }));
    };
    const getLoginObject = (id, email) => {
        let arr = loginUserData;
        arr.push({ id: id, email: email });
        setLoginUserData(arr);
    };
    const handleSubmitNowDate = () => {
        Object.values(usersList).map((user, index) =>
            getLoginObject(Object.keys(usersList)[index], user.email),
        );
        let targetIndex = loginUserData.findIndex((item) => item.email === data.email);
        if (targetIndex !== -1) {
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            let raw = JSON.stringify({
                lastLoginDate: data.lastLoginDate,
            });

            let requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            };

            fetch(
                `https://task4-2cc24-default-rtdb.europe-west1.firebasedatabase.app/users/${loginUserData[targetIndex].id}.json`,
                requestOptions,
            )
                .then((response) => response.text())
                .then((result) => onChangeAuth(true))
                .then((result) => onEmail(data.email))
                .catch((error) => console.log('error', error));
        } else {
            return;
        }
    };
    const submitData = async () => {
        let receivedUsers = Object.values(usersList).map((item) => item);
        let correctEmail = receivedUsers.find((item) => item.email === data.email);
        let correctPassword = receivedUsers.find((item) => item.password === data.password);
        if (correctEmail && correctPassword) {
            setCheck(true);
            handleSubmitNowDate();
        } else {
            setCheck(false);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.username === '' || data.password === '') {
            setCheck(false);
            return;
        } else {
            submitData();
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField label="email" name="email" value={data.email} onChange={handleChange} />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
            />

            <button className="btn btn-primary w-100 mx-auto" type="submit">
                Submit
            </button>
            {check ? '' : <p className="text-danger">произошла ошибка заполните данные правильно</p>}
        </form>
    );
}

export default LoginForm;