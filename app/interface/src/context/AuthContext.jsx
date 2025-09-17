import {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
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
      window.localStorage.removeItem('authToken');
    }
  } catch (error) {
    console.warn('Falha ao persistir token no localStorage', error);
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getStoredToken);
  const [user, setUser] = useState(null);

  const logout = useCallback(() => {
    persistToken(null);
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common.Authorization;
  }, []);

  const login = useCallback(
    (newToken) => {
      if (!newToken) {
        logout();
        return;
      }

      persistToken(newToken);
      setToken(newToken);
    },
    [logout],
  );

  useEffect(() => {
    if (!token) {
      setUser(null);
      delete api.defaults.headers.common.Authorization;
      return;
    }

    try {
      const decoded = jwtDecode(token);

      if (decoded?.exp && decoded.exp * 1000 > Date.now()) {
        setUser({ username: decoded.sub });
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        logout();
      }
    } catch (error) {
      console.error('Token inválido:', error);
      logout();
    }
  }, [token, logout]);
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }

  return context;
};
