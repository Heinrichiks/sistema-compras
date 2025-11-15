// src/components/auth/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../../services/authService';

const PrivateRoute = ({ children, requiredRole }) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.rol !== requiredRole) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <h2 style={{ color: '#dc2626', marginBottom: '16px' }}>Acceso Denegado</h2>
          <p style={{ color: '#6b7280' }}>
            No tienes permisos para acceder a esta sección.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;