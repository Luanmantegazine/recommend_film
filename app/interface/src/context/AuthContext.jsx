import React, { createContext, useState, useContext, useEffect, useMemo, useCallback} from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api';

const AuthContext = createContext(null);

const getStoredToken = () => {
    if (typeof window === 'undefined') {
        return null;
    }
    try {
        return window.localStorage.getItem('authToken');
    } catch (error) {
        console.warn('Não foi possível acessar o localStorage', error);
        return null;
    }
};

    const persistToken = (token) => {
        if (typeof window === 'undefined') {
            return;
        }
        try {
            if (token) {
                window.localStorage.setItem('authToken', token);
            } else {
                window.localStorage.removeItem('authToken')
            }
        } catch (error) {
            console.warn('Falha ao persistir token no localStorage', error)

        }
    };

    export const AuthProvider = ({ children }) => {
        const [token, setToken] = useState(getStoredToken);
        const [user, setUser] = useState(null)

    const logout = useCallback (() => {
        persistToken(null);
        setToken(null);
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
    }, []);

            const login = useCallback((newToken) => {
        persistToken(newToken);
        setToken(newToken);
    }, []);

    useEffect(() => {
        if (!token) {
            setUser(null);
            delete api.defaults.headers.common['Authorization'];
            return;
        }

        try {
            const decoded = jwtDecode(token);

            if (decoded.exp * 1000 > Date.now()) {
                setUser({ username: decoded.sub });
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                logout();
            }
        } catch (error) {
            console.error('Token inválido:', error);
            logout();
        }
    }, [token, logout]);

    const value = useMemo(() => ({
        user,
        token,
        login,
        logout,
    }), [user, token, login, logout]);

    return (
        <AuthContext.Provider value={{ value }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);