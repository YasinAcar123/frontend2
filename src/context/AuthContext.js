import React, { createContext, useContext, useEffect, useState } from 'react';



const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = document.cookie.includes("access_token");
      if (accessToken) {
        setIsAuthenticated(true);
      }
      setLoading(false); // Auth durumu kontrol edildi
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, setIsAuthenticated, setUserName, userRole, setUserRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};