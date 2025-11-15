// src/App.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TabNavigation from './components/common/TabNavigation';
import SearchBar from './components/common/SearchBar';
import SolicitudForm from './components/solicitudes/SolicitudForm';
import SolicitudList from './components/solicitudes/SolicitudList';
import ProveedorForm from './components/proveedores/ProveedorForm';
import ProveedorList from './components/proveedores/ProveedorList';
import { useSolicitudes } from './hooks/useSolicitudes';
import { useProveedores } from './hooks/useProveedores';
import { createRipple } from './utils/rippleEffect';



function App() {
  const [activeTab, setActiveTab] = useState('solicitudes');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSolicitudForm, setShowSolicitudForm] = useState(false);
  const [showProveedorForm, setShowProveedorForm] = useState(false);
  const [editingSolicitud, setEditingSolicitud] = useState(null);

  // nuevo estado para edición de proveedor
  const [editingProveedor, setEditingProveedor] = useState(null);

  const { 
    solicitudes, 
    agregarSolicitud, 
    actualizarSolicitud, 
    eliminarSolicitud 
  } = useSolicitudes();

  const { 
    proveedores, 
    agregarProveedor, 
    actualizarProveedor, 
    eliminarProveedor 
  } = useProveedores();

  // Filtrar solicitudes
  const filteredSolicitudes = solicitudes.filter(s =>
    (s.folio || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.nombre && s.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (s.cliente || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers de Solicitudes
  const handleSolicitudSubmit = async (formData) => {
    if (editingSolicitud) {
      await actualizarSolicitud(editingSolicitud.id, formData);
      setEditingSolicitud(null);
    } else {
      await agregarSolicitud(formData);
    }
    setShowSolicitudForm(false);
  };

  const handleEditSolicitud = (solicitud) => {
    setEditingSolicitud(solicitud);
    setShowSolicitudForm(true);
  };

  const handleDeleteSolicitud = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta solicitud?')) {
      await eliminarSolicitud(id);
    }
  };

  const handleCancelSolicitud = () => {
    setShowSolicitudForm(false);
    setEditingSolicitud(null);
  };

  // Handlers de Proveedores
  const handleProveedorSubmit = async (formData) => {
    if (editingProveedor) {
      // actualizar
      await actualizarProveedor(editingProveedor.id, formData);
      setEditingProveedor(null);
    } else {
      // agregar nuevo
      await agregarProveedor(formData);
    }
    setShowProveedorForm(false);
  };

  const handleEditProveedor = (proveedor) => {
    setEditingProveedor(proveedor);
    setShowProveedorForm(true);
    // Si quieres hacer scroll al formulario, descomenta:
    // setTimeout(() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleDeleteProveedor = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este proveedor?')) {
      await eliminarProveedor(id);
      // si estamos editando el mismo proveedor, limpiarlo
      if (editingProveedor && editingProveedor.id === id) {
        setEditingProveedor(null);
        setShowProveedorForm(false);
      }
    }
  };

  const handleCancelProveedor = () => {
    setShowProveedorForm(false);
    setEditingProveedor(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8), 0 0 100px rgba(59, 130, 246, 0.1)',
          padding: '32px',
          marginBottom: '24px',
          border: '2px solid #1a1a2e',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Efecto de estrellas de fondo */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(2px 2px at 20% 30%, white, transparent), radial-gradient(2px 2px at 60% 70%, white, transparent), radial-gradient(1px 1px at 50% 50%, white, transparent), radial-gradient(1px 1px at 80% 10%, white, transparent), radial-gradient(2px 2px at 90% 60%, white, transparent), radial-gradient(1px 1px at 33% 80%, white, transparent)',
            backgroundSize: '200% 200%',
            opacity: 0.3,
            pointerEvents: 'none'
          }}></div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Logo estilo Beskar con lightsabers */}
            <div style={{
              width: '100px',
              height: '100px',
              position: 'relative'
            }}>
              <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                {/* Anillo exterior negro con detalles de colores */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="90" 
                  fill="none" 
                  stroke="#1a1a1a" 
                  strokeWidth="8"
                />
                
                {/* Segmentos de colores lightsaber en el anillo */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="90" 
                  fill="none" 
                  stroke="url(#lightsaberGlow)" 
                  strokeWidth="3" 
                  strokeDasharray="40 10"
                  style={{
                    filter: 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.8))'
                  }}
                />

                {/* Hexágono central de Beskar (negro mate) */}
                <polygon
                  points="100,50 135,75 135,125 100,150 65,125 65,75"
                  fill="#0f0f0f"
                  stroke="#2a2a2a"
                  strokeWidth="2"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.8))'
                  }}
                />

                {/* Detalles internos del hexágono */}
                <circle cx="100" cy="100" r="20" fill="#1a1a1a" stroke="#3a3a3a" strokeWidth="2" />
                <circle cx="100" cy="100" r="15" fill="#0a0a0a" />

                {/* 6 brazos estilo Beskar con acentos de color */}
                <g>
                  {[
                    { angle: 0, color: '#3b82f6' },    // Azul
                    { angle: 60, color: '#8b5cf6' },   // Morado
                    { angle: 120, color: '#10b981' },  // Verde
                    { angle: 180, color: '#ef4444' },  // Rojo
                    { angle: 240, color: '#3b82f6' },  // Azul
                    { angle: 300, color: '#10b981' }   // Verde
                  ].map((item, i) => (
                    <g key={i}>
                      {/* Brazo principal negro */}
                      <rect
                        x="96"
                        y="50"
                        width="8"
                        height="35"
                        fill="#1a1a1a"
                        stroke="#2a2a2a"
                        strokeWidth="1"
                        style={{
                          transformOrigin: '100px 100px',
                          transform: `rotate(${item.angle}deg)`
                        }}
                      />
                      {/* Acento de color en la punta */}
                      <rect
                        x="97"
                        y="50"
                        width="6"
                        height="8"
                        fill={item.color}
                        style={{
                          transformOrigin: '100px 100px',
                          transform: `rotate(${item.angle}deg)`,
                          filter: `drop-shadow(0 0 3px ${item.color})`
                        }}
                      />
                    </g>
                  ))}
                </g>

                {/* Definiciones de gradientes */}
                <defs>
                  {/* Gradiente alternado de colores para el anillo */}
                  <linearGradient id="lightsaberGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                    <stop offset="25%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
                    <stop offset="75%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </svg>

              {/* Efecto de brillo sutil giratorio */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                animation: 'spin 15s linear infinite',
                pointerEvents: 'none'
              }}></div>
            </div>

            {/* Título sin gradiente, color sólido */}
            <div>
              <h1 style={{
                fontSize: '48px',
                fontWeight: 'bold',
                margin: 0,
                marginBottom: '8px',
                color: '#e5e7eb',
                textShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
                letterSpacing: '2px',
                fontFamily: '"Orbitron", sans-serif'
              }}>
                 Sistema de Gestión de Compras
              </h1>
              <p style={{
                color: '#9ca3af',
                fontSize: '18px',
                margin: 0,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
                letterSpacing: '1px'
              }}>
                Control profesional de solicitudes y proveedores
              </p>
            </div>
          </div>

          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>

        {/* Tabs */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Contenido de Solicitudes */}
        {activeTab === 'solicitudes' && (
          <>
            <div style={{
              backgroundColor: '#000000ff',
              borderRadius: '12px',
              padding: '1px',
              marginTop: '17px',
              marginLeft: '20px'
            }}>
              <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '7px'
              }}>
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  placeholder="Buscar por folio, material o cliente..."
                />
                <button
                  onClick={(e) => {
                    createRipple(e);
                    setShowSolicitudForm(!showSolicitudForm);
                    setEditingSolicitud(null);
                  }}
                  style={{
                    backgroundColor: '#093518ff',
                    color: 'white',
                    padding: '8px 17px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer,',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8' }
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#036666' }
                >
                  <Plus size={20} />
                  Nueva Solicitud
                </button>
              </div>

              {showSolicitudForm && (
                <div style={{ marginTop: '32px'}}> 
                  <SolicitudForm
                    onSubmit={handleSolicitudSubmit}
                    onCancel={handleCancelSolicitud}
                    initialData={editingSolicitud}
                  />
                </div>
              )}
            </div>

            <div style={{ marginTop: '32px' }}>
              <SolicitudList
                solicitudes={filteredSolicitudes}
                onEdit={handleEditSolicitud}
                onDelete={handleDeleteSolicitud}
                proveedores={proveedores}
              />
            </div>
          </>
        )}

            {/* Contenido de Proveedores */}
        {activeTab === 'proveedores' && (
          <>
            <div style={{
              backgroundColor: '#000000ff',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: '24px',
              marginBottom: '32px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  margin: 0
                }}>Base de Proveedores</h2>
                <button
                  onClick={() => { setShowProveedorForm(!showProveedorForm); setEditingProveedor(null); }}
                  style={{
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '8px 17px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                >
                  <Plus size={20} />
                  Nuevo Proveedor
                </button>
              </div>

              {showProveedorForm && (
                <div style={{ marginTop: '32px' }}>
                  <ProveedorForm
                    onSubmit={handleProveedorSubmit}
                    onCancel={handleCancelProveedor}
                    initialData={editingProveedor}
                  />
                </div>
              )}
            </div>

            <div style={{ marginTop: '32px' }}>
              <ProveedorList
                proveedores={proveedores}
                onEdit={handleEditProveedor}
                onDelete={handleDeleteProveedor}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
