// src/components/materiales/MedidasDinamicas.jsx
import React from 'react';
import { fraccionesComunes } from '../../data/catalogos';
import { obtenerCamposVisibles } from '../../utils/materialUtils';

const MedidasDinamicas = ({ formData, handleChange }) => {
  const camposVisibles = obtenerCamposVisibles(formData.figura);
  
  const inputStyle = {
    padding: '7px 7px',
    fontSize: '27px',
    fontWeight: '500',
    backgroundColor: 'black',
    border: '3px solid #fb3131ff',
    borderRadius: '16px',
    width: '300px',
    transition: 'all 0.3s'
  };

  if (!formData.figura) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-blue-700 mb-4 uppercase border-b-2 border-blue-200 pb-2">
        📏 Medidas
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        {/* Espesor */}
        {camposVisibles.mostrarEspesor && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px' }}>
            <input
              type="text"
              name="espesorFraccion"
              value={formData.espesorFraccion}
              onChange={handleChange}
              placeholder="Espesor (Fracción)"
              list="espesor-fracciones"
              style={inputStyle}
              className="focus:ring-4 focus:ring-blue-500 focus:border-blue-500"
            />
            <datalist id="espesor-fracciones">
              {fraccionesComunes.map(frac => (
                <option key={frac} value={frac} />
              ))}
            </datalist>
            <input
              type="text"
              name="espesorDecimal"
              placeholder='Espesor (0.250" o 6.35mm)'
              value={formData.espesorDecimal}
              onChange={handleChange}
              style={inputStyle}
              className="focus:ring-4 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {/* Diámetro */}
        {camposVisibles.mostrarDiametro && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px' }}>
            <input
              type="text"
              name="diametroFraccion"
              value={formData.diametroFraccion}
              onChange={handleChange}
              placeholder="Diámetro (Fracción)"
              list="diametro-fracciones"
              style={inputStyle}
              className="focus:ring-4 focus:ring-blue-500 focus:border-blue-500"
            />
            <datalist id="diametro-fracciones">
              {fraccionesComunes.map(frac => (
                <option key={frac} value={frac} />
              ))}
            </datalist>
            <input
              type="text"
              name="diametroDecimal"
              placeholder='Diámetro (2.500" o 63.5mm)'
              value={formData.diametroDecimal}
              onChange={handleChange}
              style={inputStyle}
              className="focus:ring-4 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {/* Ancho */}
        {camposVisibles.mostrarAncho && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px' }}>
            <input
              type="text"
              name="anchoFraccion"
              value={formData.anchoFraccion}
              onChange={handleChange}
              placeholder="Ancho (Fracción)"
              list="ancho-fracciones"
              style={inputStyle}
              className="focus:ring-4 focus:ring-blue-500 focus:border-blue-500"
            />
            <datalist id="ancho-fracciones">
              {fraccionesComunes.map(frac => (
                <option key={frac} value={frac} />
              ))}
            </datalist>
            <input
              type="text"
              name="anchoDecimal"
              placeholder='Ancho (6.000" o 152.4mm)'
              value={formData.anchoDecimal}
              onChange={handleChange}
              style={inputStyle}
              className="focus:ring-4 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {/* Largo */}
        {camposVisibles.mostrarLargo && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px' }}>
            <input
              type="text"
              name="largoFraccion"
              value={formData.largoFraccion}
              onChange={handleChange}
              placeholder="Largo (Fracción)"
              list="largo-fracciones"
              style={inputStyle}
              className="focus:ring-4 focus:ring-blue-500 focus:border-blue-500"
            />
            <datalist id="largo-fracciones">
              {fraccionesComunes.map(frac => (
                <option key={frac} value={frac} />
              ))}
            </datalist>
            <input
              type="text"
              name="largoDecimal"
              placeholder='Largo (12.000" o 304.8mm)'
              value={formData.largoDecimal}
              onChange={handleChange}
              style={inputStyle}
              className="focus:ring-4 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MedidasDinamicas;