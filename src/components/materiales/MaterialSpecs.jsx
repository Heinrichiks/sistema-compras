// src/components/materiales/MaterialSpecs.jsx
import React from 'react';
import { categorias, nombrePorCategoria, acabados, figuras } from '../../data/catalogos';

const MaterialSpecs = ({ formData, handleChange }) => {
  const nombresdisponibles = nombrePorCategoria[formData.categoria] || [];
  
  const inputStyle = {
    padding: '5px 7px',
    fontSize: '27px',
    backgroundColor: "black",
    fontWeight: '500',
    border: '3px solid #abb3c1ff',
    borderRadius: '12px',
    width: '310px',
    transition: 'all 0.3s'
  };

  const labelStyle ={
    display: 'block',
    fontSize: '21px',
    fontWeight: '700',
    color: '#dadee6ff',
    marginBottom: '7px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  return (
    <div className="mb-6">
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '7px',
      }}>
        <div>
          <label style={labelStyle}>Categoria</label>
          <input
            type="text"
            name="categoria"
            list='categorias-list'
            value={formData.categoria}
            onChange={handleChange}
            placeholder="Seleccionar o escribir..."
            style={inputStyle}
            className="focus:ring-4 focus:ring-blue-500 focus:border-blue-500"
          />
          <datalist id="categorias-list">
            {categorias.map(cat => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
        </div>

        <div>
          <label style={labelStyle}>Nombre</label>
          <input
            type="text"
            name="nombre"
            list='nombres-list'
            value={formData.nombre}
            onChange={handleChange}
            placeholder='Seleccionar o escribir...'
            style={inputStyle}
            className="focus:ring-4 focus:ring-blue-500 focus:border-blue-500"
            disabled={!formData.categoria}
          />
            <datalist id="nombres-list">
            {nombresdisponibles.map(nom => (
              <option key={nom} value={nom} />
            ))}
          </datalist>
        </div>

        <div>
          <label style={labelStyle}>Acabado</label>
          <input    
            type="text"
            name="acabado"
            list="acabados-list"
            value={formData.acabado}
            onChange={handleChange}
            style={inputStyle}
            className="focus:ring-4 focus:ring-blue-500 focus:border-blue-500"
          />
          <datalist id="acabados-list"> 
            {acabados.map(acab => (
              <option key={acab} value={acab} />
            ))}
          </datalist>
        </div>

        <div>
          <label style={labelStyle}>Figura</label>
          <input
            type="text"
            name="figura"
            list="figuras-list"
            value={formData.figura}
            onChange={handleChange}
            placeholder='Seleccionar o escribir...'
            style={inputStyle}
            className="focus:ring-4 focus:ring-blue-500 focus:border-blue-500"
          />
          <datalist id="figuras-list">
            {figuras.map(fig => (
              <option key={fig} value={fig} />
            ))}
          </datalist>
        </div>
      </div>
    </div>
  );
};

export default MaterialSpecs;