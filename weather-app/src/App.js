import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const isAuthenticated = Cookies.get('isAuthenticated') === 'true';
        setLoggedIn(isAuthenticated);
    }, []);

    const handleLogin = () => {
        setLoggedIn(true);
        Cookies.set('isAuthenticated', 'true'); 
    };

    const handleLogout = () => {
        setLoggedIn(false);
        Cookies.remove('isAuthenticated');
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={loggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
                />
                <Route
                    path="/login"
                    element={<Login onLogin={handleLogin} />} 
                />
                <Route
                    path="/dashboard"
                    element={loggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
