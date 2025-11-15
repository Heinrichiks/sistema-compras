// src/components/common/Navbar.jsx
import React from 'react';
import { LogOut, User } from 'lucide-react';
import authService from '../../services/authService';

const Navbar = () => {
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      authService.logout();
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '16px 24px',
      marginBottom: '24px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <User size={20} color="#2563eb" />
        <div>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
            {user?.nombre || 'Usuario'}
          </p>
          <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
            {user?.email} • {user?.rol || 'usuario'}
          </p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
      >
        <LogOut size={16} />
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Navbar;