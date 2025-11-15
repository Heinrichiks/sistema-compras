// src/components/solicitudes/SolicitudForm.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import MaterialSpecs from '../materiales/MaterialSpecs';
import MedidasDinamicas from '../materiales/MedidasDinamicas';
import { statusOptions } from '../../data/catalogos';
import { createRipple } from '../../utils/rippleEffect';

const SolicitudForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    folio: '',
    requisitor: '',
    cliente: '',
    ordenCompra: '',
    status: 'pendiente',
    categoria: '',
    nombre: '',
    acabado: '',
    figura: '',
    espesorFraccion: '',
    espesorDecimal: '',
    diametroFraccion: '',
    diametroDecimal: '',
    anchoFraccion: '',
    anchoDecimal: '',
    largoFraccion: '',
    largoDecimal: '',
    cantidad: '',
    instruccionesEspeciales: ''
  });

  const [mostrarInstrucciones, setMostrarInstrucciones] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "categoria") {
      setFormData({ ...formData, categoria: value, nombre: "" });
    } else if (name === "figura") {
      setFormData({
        ...formData,
        figura: value,
        espesorFraccion: "",
        espesorDecimal: "",
        diametroFraccion: "",
        diametroDecimal: "",
        anchoFraccion: "",
        anchoDecimal: "",
        largoFraccion: "",
        largoDecimal: ""
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputStyle = {
    padding: '7px 7px',
    fontSize: '27px',
    fontWeight: '500',
    border: '3px solid #9ca3af',
    borderRadius: '12px',
    width: '300px',
    transition: 'all 0.3s',
    backgroundColor: 'black'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '21px',
    fontWeight: '700',
    color: '#374151',
    marginBottom: '7px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  // Lista de requisitores
  const requisitores = [
    "ALEXIS MARTINEZ",
    "ALVARO ALCARAZ",
    "ANGEL ACEVEDO",
    "DANIEL RIVERA",
    "DIEGO PRIETO",
    "ERICK RODRIGUEZ",
    "ISABEL GARCIA",
    "JORGE VAZQUEZ",
    "JOSE RODRIGUEZ",
    "MANUEL FARIAS",
    "RENE CRUZ",
    "ROLANDO ARELLANO"
  ];

  // Lista de clientes (puedes agregar más después)
  const clientes = [
    "CLIENTE 1",
    "CLIENTE 2",
    "CLIENTE 3"
    // Agregar más clientes según necesites
  ];

  return (
    <div style={{
      padding: '7px',
      backgroundColor: '#000000ff',
      borderRadius: '16px',
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'flex',
          gap: '17px',
          marginBottom: '17px'
        }}>
        
          {/* SECCIÓN 1: INFORMACIÓN GENERAL - MORADO MACE WINDU */}
          <div style={{
            backgroundColor: '#7b2cbf',
            padding: '7px',
            borderRadius: '17px',
            marginBottom: '7px',
            boxShadow: '0 8px 16px #7b2cbf',
            border: '4px solid #6d28d9',
            width: '700px',
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'white',
              marginTop: '3px',
              marginBottom: '17px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '3px solid #5a189a',
              paddingBottom: '7px'
            }}>
              ⚡ INFORMACIÓN GENERAL
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '7px'
            }}>
              <div>
                <label style={{ ...labelStyle, color: 'white' }}>Número de Folio *</label>
                <input
                  type="number"
                  name="folio"
                  value={formData.folio}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={{ ...labelStyle, color: 'white' }}>Cantidad Requerida *</label>
                <input
                  type="number"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={{ ...labelStyle, color: 'white' }}>Requisitor *</label>
                <input
                  type="text"
                  name="requisitor"
                  value={formData.requisitor}
                  onChange={handleChange}
                  list="lista-requisitores"
                  placeholder="Seleccionar o escribir..."
                  style={inputStyle}
                  required
                />
                <datalist id="lista-requisitores">
                  {requisitores.map(req => (
                    <option key={req} value={req} />
                  ))}
                </datalist>
              </div>

              <div>
                <label style={{ ...labelStyle, color: 'white' }}>Cliente *</label>
                <input
                  type="text"
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleChange}
                  list="lista-clientes"
                  placeholder="Seleccionar o escribir..."
                  style={inputStyle}
                  required
                />
                <datalist id="lista-clientes">
                  {clientes.map(cli => (
                    <option key={cli} value={cli} />
                  ))}
                </datalist>
              </div>

              <div>
                <label style={{ ...labelStyle, color: 'white' }}>Orden de Compra</label>
                <input
                  type="text"
                  name="ordenCompra"
                  value={formData.ordenCompra}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ ...labelStyle, color: 'white' }}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '17px'
          }}>
            {/* SECCIÓN 2: ESPECIFICACIONES DEL MATERIAL - VERDE YODA */}
            <div style={{
              backgroundColor: '#5a189a',
              padding: '7px',
              borderRadius: '17px',
              marginBottom: '7px',
              boxShadow: '0 7px 7px #7b2cbf',
              border: '4px solid #5a189a',
              width: '700px',
              flex: 1
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'white',
                marginTop: '3px',
                marginBottom: '1px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: '3px solid #7b2cbf',
                paddingBottom: '7px'
              }}>
                🌟 ESPECIFICACIONES DEL MATERIAL
              </h2>

              <div style={{
                backgroundColor: '#5a189a',
                padding: '17px',
                borderRadius: '17px'
              }}>
                <MaterialSpecs formData={formData} handleChange={handleChange} />
                <MedidasDinamicas formData={formData} handleChange={handleChange} />
              </div>
            </div>

            {/* BOTONES E INSTRUCCIONES ESPECIALES */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: '17px',
            }}>
            
              {/* Botón Guardar - PRIMERO EN TAB ORDER */}
              <button 
                type="submit"
                tabIndex={0}
                onClick={createRipple}
                style={{
                  width: '300px',
                  background: 'linear-gradient(to right, #240046, #7b2cbf)',
                  color: 'white',
                  padding: '11px 17px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '22px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 8px 16px rgba(252, 253, 255, 0.7)',
                  transition: 'all 0.3s',
                  outline: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(37, 99, 235, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(37, 99, 235, 0.3)';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.5), 0 12px 24px rgba(37, 99, 235, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(37, 99, 235, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {initialData ? '💾 Actualizar Solicitud' : '✅ Guardar Solicitud'}
              </button>
            
              {/* Botón Cancelar - SEGUNDO EN TAB ORDER */}
              <button 
                type="button"
                tabIndex={0}
                onClick={(e) => {
                  createRipple(e);
                  onCancel();
                }}
                style={{
                  width: '300px',
                  padding: '11px 17px',
                  backgroundColor: '#000000ff',
                  color: 'white',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '22px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 8px 16px rgba(107, 114, 128, 0.1)',
                  transition: 'all 0.3s',
                  outline: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4b5563';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#6b7280';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(107, 114, 128, 0.5), 0 12px 24px rgba(107, 114, 128, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(107, 114, 128, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                ❌ Cancelar
              </button>

              {/* Botón para mostrar/ocultar instrucciones especiales - TERCERO EN TAB ORDER */}
              <button 
                type="button"
                tabIndex={0}
                onClick={(e) => {
                  createRipple(e);
                  setMostrarInstrucciones(!mostrarInstrucciones);
                }}
                style={{
                  width: '300px',
                  background: mostrarInstrucciones ? '#f59e0b' : '#0e0017ff',
                  color: 'white',
                  padding: '11px 17px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  outline: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                }}
                onFocus={(e) => {
                  const color = mostrarInstrucciones ? '#f59e0b' : '#8b5cf6';
                  e.currentTarget.style.boxShadow = `0 0 0 4px ${color}40, 0 8px 12px rgba(0, 0, 0, 0.3)`;
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {mostrarInstrucciones ? '📝 Ocultar Instrucciones' : '📋 Instrucciones Especiales'}
              </button>

              {/* Campo de instrucciones especiales (se muestra/oculta) */}
              {mostrarInstrucciones && (
                <div style={{
                  backgroundColor: '#fef3c7',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '3px solid #f59e0b',
                  boxShadow: '0 4px 8px rgba(245, 158, 11, 0.3)'
                }}>
                  <label style={{
                    display: 'block',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#92400e',
                    marginBottom: '8px',
                    textTransform: 'uppercase'
                  }}>
                    📝 Instrucciones Especiales
                  </label>
                  <textarea
                    name="instruccionesEspeciales"
                    value={formData.instruccionesEspeciales}
                    onChange={handleChange}
                    tabIndex={0}
                    placeholder="Escribe aquí cualquier instrucción especial para esta solicitud..."
                    style={{
                      width: '268px',
                      minHeight: '120px',
                      padding: '12px',
                      fontSize: '16px',
                      fontWeight: '500',
                      border: '2px solid #f59e0b',
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      color: '#1f2937',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      outline: 'none',
                      transition: 'all 0.3s'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.3)';
                      e.currentTarget.style.borderColor = '#d97706';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = '#f59e0b';
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>  
      </form>
    </div>
  );
};

export default SolicitudForm;