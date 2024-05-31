import React from 'react';
import { useAuth } from "../../context/AuthContext";
import { Navigate } from 'react-router-dom';

const ProtectedRouter = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Auth durumu kontrol edilirken yüklenme göstergesi
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRouter;