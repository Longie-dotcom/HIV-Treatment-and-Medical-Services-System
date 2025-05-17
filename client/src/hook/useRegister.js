import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function useRegister() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [name, setName] = useState('');
    const [sexualBehavior, setSexualBehavior] = useState('use_protection');
    const [pregnancyStatus, setPregnancyStatus] = useState('pregnant');
    const [age, setAge] = useState(1);
    const [sex, setSex] = useState('male');

    const navigate = useNavigate();

    const serverApi = process.env.REACT_APP_SERVER_API;
    const userControllerApi = process.env.REACT_APP_USER_CONTROLLER_API;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (confirmedPassword !== password) {
            setError('Confirmed password does not match!');
            return;
        }

        const patient = {
            name: name,
            email: email,
            password: password,
            role: 'patient',
            age: age,
            gender: sex,
            pregnancyStatus: pregnancyStatus,
            sexualBehavior: sexualBehavior
        }

        axios.post(`${serverApi}${userControllerApi}/register`, patient).then((response) => {
            navigate('/login');
            console.log(response.data.message);
        }).catch((error) => {
            setError(error.response.data.message);
            console.log(error.response.data.message);
        });
    };

    return ({
        error,
        email, setEmail,
        password, setPassword,
        confirmedPassword, setConfirmedPassword,
        name, setName,
        sexualBehavior, setSexualBehavior,
        pregnancyStatus, setPregnancyStatus,
        age, setAge,
        sex, setSex,
        handleSubmit
    });
}

export default useRegister;