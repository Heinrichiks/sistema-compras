// src/components/common/SearchBar.jsx
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder = "Buscar..." }) => {
  const containerStyle = {
    position: 'relative',
    height: '35px', // h-16 equivalente -> cambia a '80px' si quieres más
    minWidth: '100px'
  };

  const iconStyle = {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none'
  };

  const inputStyle = {
    width: '350px',
    height: '100%',
    paddingLeft: '64px', // suficiente para el icono
    paddingRight: '12px',
    fontSize: '20px', // visualmente más grande
    lineHeight: '1',
    borderRadius: '10px',
    border: '1px solid #d1d5db', // gray-300
    boxSizing: 'border-box'
  };

  return (
    <div style={containerStyle}>
      <Search style={iconStyle} size={28} />
      <input
        style={inputStyle}
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
