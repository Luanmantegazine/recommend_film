import PropTypes from 'prop-types';
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

      try {
        const decoded = jwtDecode(newToken);

        if (!decoded?.exp || decoded.exp * 1000 <= Date.now()) {
          throw new Error('Token expirado ou inválido');
        }

        const username = decoded?.sub;

        if (typeof username !== 'string' || username.length === 0) {
          throw new Error('Token sem identificador de usuário');
        }

        const authenticatedUser = { username };

        setUser(authenticatedUser);
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        persistToken(newToken);
        setToken(newToken);
      } catch (error) {
        console.error('Falha ao processar token de login:', error);
        logout();
      }
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
        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        const nextUser =
          typeof decoded?.sub === 'string' && decoded.sub.length > 0
            ? { username: decoded.sub }
            : null;

        if (!nextUser) {
          logout();
          return;
        }

        setUser((previousUser) => {
          if (previousUser?.username === nextUser.username) {
            return previousUser;
          }

          return nextUser;
        });
      } else {
        logout();
      }
    } catch (error) {
      console.error('Token inválido:', error);
      logout();
    }
  }, [token, logout]);

  const contextValue = useMemo(
    () => ({
      token,
      user,
      login,
      logout,
    }),
    [token, user, login, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }

  return context;
};
