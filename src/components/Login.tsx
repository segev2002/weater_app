import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { login, logout } from '../store/LoginSlice';

const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
    const username = useSelector((state: RootState) => state.login.username);

    const handleLogin = () => {
        const user = prompt('Enter username:');
        if (user) {
            dispatch(login(user));
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <h3>Welcome, {username}!</h3>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h3>Please log in.</h3>
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
};

export default Login;