import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginStyles.css'; // Adjust the path as needed


const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const correctLogin = 'mark5';  // Example correct login
        const correctPassword = 'mark5';  // Example correct password

        if (login === correctLogin && password === correctPassword) {
            navigate('/dashboard');
        } else {
            setError('Некоректний логін або пароль');
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2 className="title">Sign in</h2>
                <p className="subtitle">Please enter your login and password!</p>
                <form onSubmit={handleLogin} className="form">
                    <input
                        className="input"
                        type="text"
                        placeholder="Логін"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="error">{error}</p>}

                    <button className="button" type="submit">Увійти</button>
                </form>
                <p className="signupText">
                    Don`t have account? <a href="#!" className="link">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;