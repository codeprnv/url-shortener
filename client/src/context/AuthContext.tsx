import Cookies from 'js-cookie';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = Cookies.get('user');
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error(`Could not initialize auth: ${error}`);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const login = (token: string) => {
    setUser(token);
    Cookies.set('user', token, {
      secure: true,
      expires: 7,
    });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user');
  };

  // Provide the context value to the children
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider only');
  }
  return context;
};
