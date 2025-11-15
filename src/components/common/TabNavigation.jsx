// src/components/common/TabNavigation.jsx
import React from 'react';
import { Package, FileText } from 'lucide-react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const containerStyle = {
    display: 'flex',
    borderBottom: '3px solid #e5e7eb',
    gap: '16px',
    backgroundColor: '#000000ff',
    padding: '16px 24px'
  };

  const buttonBaseStyle = {
    flex: 1,
    padding: '7px 17px',
    fontSize: '40px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s',
    borderRadius: '8px'
  };

  const activeStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#3c096c',
    color: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
  };

  const inactiveStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#10002b',
    color: '#e5e7eb'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mb-6">
      <div style={containerStyle}>
        <button
          onClick={() => setActiveTab('solicitudes')}
          style={activeTab === 'solicitudes' ? activeStyle : inactiveStyle}
          onMouseEnter={(e) => {
            if (activeTab !== 'solicitudes') {
              e.currentTarget.style.backgroundColor = '#374151';
              e.currentTarget.style.color = 'white';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'solicitudes') {
              e.currentTarget.style.backgroundColor = '#4b5563';
              e.currentTarget.style.color = '#e5e7eb';
            }
          }}
        >
          <Package style={{ marginRight: '8px' }} size={35} />
          Solicitudes
        </button>
        <button
          onClick={() => setActiveTab('proveedores')}
          style={activeTab === 'proveedores' ? activeStyle : inactiveStyle}
          onMouseEnter={(e) => {
            if (activeTab !== 'proveedores') {
              e.currentTarget.style.backgroundColor = '#374151';
              e.currentTarget.style.color = 'white';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'proveedores') {
              e.currentTarget.style.backgroundColor = '#4b5563';
              e.currentTarget.style.color = '#e5e7eb';
            }
          }}
        >
          <FileText style={{ marginRight: '8px' }} size={35} />
          Proveedores
        </button>
      </div>
    </div>
  );
};

export default TabNavigation;