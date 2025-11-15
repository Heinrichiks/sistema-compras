// src/components/proveedores/ProveedorForm.jsx
import React, { useState, useEffect } from 'react';
import { createRipple } from '../../utils/rippleEffect';

const ProveedorForm = ({ onSubmit, onCancel, initialData = null }) => {
  const inputStyle = {
    padding: '11px 35px',
    fontSize: '24px',
    fontWeight: '500',
    border: '3px solid #9ca3af',
    borderRadius: '12px',
    width: '300px',
    transition: 'all 0.3s',
    backgroundColor: 'black',
    color: '#d6e2ffff'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '16px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const especialidades = [
    "Acero al Carbón",
    "Inoxidable",
    "Aleado",
    "Grado Herramienta",
    "Metal",
    "Plástico",
    "Tipo Molde",
    "Favoritos"
  ];

  const firmas = [
    "Vera",
    "EMI",
    "FYDE"
  ];

  const empty = {
    nombre: '',
    contacto: '',
    email: '',
    telefono: '',
    especialidad: '',
    firma: ''
  };

  const [formData, setFormData] = useState(empty);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...empty, ...initialData });
    } else {
      setFormData(empty);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(empty);
  };

  const handleCancel = () => {
    setFormData(empty);
    onCancel && onCancel();
  };

  const isEditing = Boolean(initialData && initialData.id);

  return (
    <div style={{
      padding: '1px',
      backgroundColor: '#000000ff',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      width: '1500px'
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'flex',
          gap: '17px',
        }}>
          
          {/* SECCIÓN: PROVEEDOR - AZUL LIGHTSABER JEDI */}
          <div style={{
            backgroundColor: '#10002b',
            paddingLeft: '17px',
            paddingTop: '11px',
            paddingBottom: '17px',
            paddingRight: '17px',
            borderRadius: '17px',
            boxShadow: '0 8px 16px rgba(59, 130, 246, 0.1), 0 0 40px rgba(59, 130, 246, 0.1)',
            border: '4px solid #3c096c'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'white',
              marginTop: '1px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '3px solid #93c5fd',
              paddingBottom: '1px'
            }}>
              ⚔️ {isEditing ? 'EDITAR PROVEEDOR' : 'AGREGAR PROVEEDOR'}
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px'
            }}>
              <div>
                <label style={labelStyle}>Nombre de la Empresa *</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Contacto *</label>
                <input
                  type="text"
                  value={formData.contacto}
                  onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Teléfono</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Especialidad / Materiales</label>
                <input
                  type="text"
                  list="especialidades-list"
                  value={formData.especialidad}
                  onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
                  placeholder="Seleccionar o escribir..."
                  style={inputStyle}
                  required
                />
                <datalist id="especialidades-list">
                  {especialidades.map(esp => (
                    <option key={esp} value={esp} />
                  ))}
                </datalist>
                {formData.especialidad && formData.especialidad.toLowerCase().includes('favorito') && (
                  <div style={{
                    marginTop: '8px',
                    padding: '8px 12px',
                    backgroundColor: '#fbbf24',
                    color: '#000000',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    ⭐ Este proveedor aparecerá siempre en sugerencias
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>Firma / Identificación *</label>
                <select
                  value={formData.firma}
                  onChange={(e) => setFormData({ ...formData, firma: e.target.value })}
                  style={{
                    ...inputStyle,
                    cursor: 'pointer'
                  }}
                  required
                >
                  <option value="">Seleccionar firma...</option>
                  {firmas.map(firma => (
                    <option key={firma} value={firma}>
                      {firma}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '17px',
            paddingTop: '7px'
          }}>
            <button 
              type="submit"
              onClick={createRipple}
              style={{
                width: '300px',
                background: 'linear-gradient(to right, #5a189a, #3c096c, #240046)',
                color: 'white',
                padding: '11px 17px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '22px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 8px 16px rgba(37, 99, 235, 0.3)',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(37, 99, 235, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(37, 99, 235, 0.3)';
              }}
            >
              {isEditing ? '💾 Guardar Cambios' : '💾 Guardar Proveedor'}
            </button>
              
            <button 
              type="button"
              onClick={(e) => {
                createRipple(e);
                handleCancel();
              }}
              style={{
                width: '300px',
                padding: '11px 17px',
                backgroundColor: '#6b7280',
                color: 'white',
                borderRadius: '12px',
                border: 'none',
                fontSize: '22px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 8px 16px rgba(107, 114, 128, 0.3)',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4b5563';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#6b7280';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              ❌ Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProveedorForm;