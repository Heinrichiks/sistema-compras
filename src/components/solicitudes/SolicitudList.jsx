// src/components/solicitudes/SolicitudList.jsx - VERSIÓN TEXTO PLANO
import React, { useState, useMemo } from 'react';
import { Edit2, Trash2, Mail, MessageCircle, Copy, CheckSquare, Square, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { construirDescripcionMaterial, getStatusColor } from '../../utils/materialUtils';
import { createRipple } from '../../utils/rippleEffect';
import { obtenerFirmaEmail } from '../../utils/firmasEmail';

const SolicitudList = ({ solicitudes, onEdit, onDelete, proveedores = [] }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });


  // Toggle selección individual
  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Toggle selección todos
  const toggleSelectAll = () => {
    setSelectedIds(prev => 
      prev.length === solicitudes.length ? [] : solicitudes.map(s => s.id)
    );
  };

  // 🆕 Función para manejar el ordenamiento
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // 🆕 Ordenar solicitudes usando useMemo para optimización
  const solicitudesOrdenadas = useMemo(() => {
    if (!sortConfig.key) return solicitudes;

    const sorted = [...solicitudes].sort((a, b) => {
      let aValue, bValue;

      switch (sortConfig.key) {
        case 'folio':
          aValue = a.folio || '';
          bValue = b.folio || '';
          break;
        case 'cantidad':
          aValue = parseInt(a.cantidad) || 0;
          bValue = parseInt(b.cantidad) || 0;
          break;
        case 'material':
          aValue = construirDescripcionMaterial(a).toLowerCase();
          bValue = construirDescripcionMaterial(b).toLowerCase();
          break;
        case 'requisitor':
          aValue = (a.requisitor || '').toLowerCase();
          bValue = (b.requisitor || '').toLowerCase();
          break;
        case 'cliente':
          aValue = (a.cliente || '').toLowerCase();
          bValue = (b.cliente || '').toLowerCase();
          break;
        case 'status':
          aValue = (a.status || '').toLowerCase();
          bValue = (b.status || '').toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [solicitudes, sortConfig]);

  if (solicitudes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-12 text-center text-gray-500">
        No hay solicitudes registradas
      </div>
    );
  }

  // 🆕 Componente para renderizar el icono de ordenamiento
  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown size={16} style={{ opacity: 0.3, marginLeft: '8px' }} />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp size={16} style={{ marginLeft: '8px', color: '#10b981' }} />
      : <ArrowDown size={16} style={{ marginLeft: '8px', color: '#10b981' }} />;
  };

  // Obtener solicitudes seleccionadas
  const selectedSolicitudes = solicitudes.filter(s => selectedIds.includes(s.id));

  // Generar texto para compartir
  const generarTexto = () => {
    let texto = '📋 SOLICITUD DE COTIZACIÓN\n\n';
    
    selectedSolicitudes.forEach((sol, index) => {
      texto += `${index + 1}. Folio: ${sol.folio}\n`;
      texto += `   Cantidad: ${sol.cantidad}\n`;
      texto += `   Material: ${construirDescripcionMaterial(sol)}\n`;

      if (sol.instruccionesEspeciales) {
        texto += `   📝 Instrucciones Especiales:\n   ${sol.instruccionesEspeciales}\n`;
      }
    });

    return texto;
  };

  // Copiar al portapapeles
  const handleCopiar = () => {
    const texto = generarTexto();
    navigator.clipboard.writeText(texto);
    alert('✅ Información copiada al portapapeles');
  };

  // Enviar por WhatsApp
  const handleWhatsApp = () => {
    const texto = generarTexto();
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  // ✨ FUNCIÓN MEJORADA: Enviar por Email con "Favoritos" como especialidad
  const handleEmail = () => {
    if (selectedSolicitudes.length === 0) {
      alert('⚠️ Selecciona al menos una solicitud');
      return;
    }

    // Obtener categorías de materiales únicos
    const categoriasSeleccionadas = [...new Set(
      selectedSolicitudes
        .map(s => s.categoria)
        .filter(Boolean)
    )];

    // 🌟 NUEVO: Identificar favoritos por especialidad "Favoritos"
    const esFavorito = (proveedor) => {
      return proveedor.especialidad && 
             proveedor.especialidad.toLowerCase().includes('favorito');
    };

    // Obtener TODOS los favoritos (sin importar otra especialidad)
    const proveedoresFavoritos = proveedores
      .filter(p => esFavorito(p))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));

    // Obtener proveedores relacionados por especialidad (excluyendo favoritos)
    const proveedoresRelacionados = proveedores.filter(p => 
      !esFavorito(p) && // No incluir favoritos aquí
      p.especialidad && 
      categoriasSeleccionadas.some(cat => 
        p.especialidad.toLowerCase().includes(cat.toLowerCase())
      )
    ).sort((a, b) => a.nombre.localeCompare(b.nombre));

    // Combinar: favoritos primero + relacionados después
    const proveedoresOrdenados = [
      ...proveedoresFavoritos,
      ...proveedoresRelacionados
    ];

    // Si hay proveedores, mostrar opciones para seleccionar UNO
    let emailSeleccionado = '';
    let proveedorSeleccionado = null; // ⭐ NUEVO: Guardar proveedor completo
    
    if (proveedoresOrdenados.length > 0) {
      let mensaje = '';
      
      // Construir mensaje con secciones
      if (proveedoresFavoritos.length > 0) {
        mensaje += '⭐ PROVEEDORES FAVORITOS (siempre disponibles):\n';
        proveedoresFavoritos.forEach((p, index) => {
          const numero = index + 1;
          mensaje += `${numero}. ⭐ ${p.nombre} - ${p.email}\n`;
        });
        mensaje += '\n';
      }
      
      // Mostrar proveedores relacionados por especialidad
      if (proveedoresRelacionados.length > 0) {
        mensaje += `PROVEEDORES RELACIONADOS (${categoriasSeleccionadas.join(', ')}):\n`;
        proveedoresRelacionados.forEach((p, index) => {
          const numero = proveedoresFavoritos.length + index + 1;
          mensaje += `${numero}. ${p.nombre} - ${p.email}\n`;
          if (p.especialidad) {
            mensaje += `   📦 ${p.especialidad}\n`;
          }
        });
        mensaje += '\n';
      }
      
      mensaje += `Total: ${proveedoresOrdenados.length} proveedor(es) disponible(s)\n\n`;
      mensaje += '¿Deseas seleccionar un proveedor?\n';
      mensaje += 'Si seleccionas "Cancelar", se abrirá el correo sin destinatario.';
      
      const seleccionar = window.confirm(mensaje);
      
      if (seleccionar) {
        // Pedir al usuario que seleccione el número del proveedor
        let promptMensaje = `Ingresa el número del proveedor (1-${proveedoresOrdenados.length}):\n\n`;
        
        if (proveedoresFavoritos.length > 0) {
          promptMensaje += '⭐ FAVORITOS:\n';
          proveedoresFavoritos.forEach((p, index) => {
            promptMensaje += `${index + 1}. ⭐ ${p.nombre}\n`;
          });
          promptMensaje += '\n';
        }
        
        if (proveedoresRelacionados.length > 0) {
          promptMensaje += 'RELACIONADOS:\n';
          proveedoresRelacionados.forEach((p, index) => {
            const numero = proveedoresFavoritos.length + index + 1;
            promptMensaje += `${numero}. ${p.nombre}`;
            if (p.especialidad) promptMensaje += ` (${p.especialidad})`;
            promptMensaje += '\n';
          });
        }
        
        const numeroProveedor = window.prompt(promptMensaje);
        
        if (numeroProveedor) {
          const indice = parseInt(numeroProveedor) - 1;
          if (indice >= 0 && indice < proveedoresOrdenados.length) {
            proveedorSeleccionado = proveedoresOrdenados[indice]; // ⭐ NUEVO: Guardar proveedor completo
            emailSeleccionado = proveedorSeleccionado.email;
          } else {
            alert('⚠️ Número inválido. Se abrirá el correo sin destinatario.');
          }
        }
      }
    } else {
      // No hay proveedores relacionados, verificar si hay favoritos
      if (proveedoresFavoritos.length > 0) {
        let mensaje = '⚠️ No hay proveedores especializados en estas categorías.\n\n';
        mensaje += `Categorías: ${categoriasSeleccionadas.join(', ')}\n\n`;
        mensaje += `⭐ Pero tienes ${proveedoresFavoritos.length} proveedor(es) favorito(s):\n\n`;
        
        proveedoresFavoritos.forEach((p, index) => {
          mensaje += `${index + 1}. ⭐ ${p.nombre} - ${p.email}\n`;
        });
        
        mensaje += '\n¿Deseas seleccionar uno de tus favoritos o abrir sin destinatario?';
        
        const usarFavorito = window.confirm(mensaje);
        
        if (usarFavorito) {
          const numeroProveedor = window.prompt(
            `Ingresa el número del proveedor favorito (1-${proveedoresFavoritos.length}):\n\n` +
            proveedoresFavoritos.map((p, index) => 
              `${index + 1}. ⭐ ${p.nombre}`
            ).join('\n')
          );
          
          if (numeroProveedor) {
            const indice = parseInt(numeroProveedor) - 1;
            if (indice >= 0 && indice < proveedoresFavoritos.length) {
              proveedorSeleccionado = proveedoresFavoritos[indice]; // ⭐ NUEVO: Guardar proveedor completo
              emailSeleccionado = proveedorSeleccionado.email;
            } else {
              alert('⚠️ Número inválido. Se abrirá el correo sin destinatario.');
            }
          }
        }
      } else {
        // No hay ni relacionados ni favoritos
        const continuar = window.confirm(
          '⚠️ No se encontraron proveedores para estas categorías.\n\n' +
          `Categorías: ${categoriasSeleccionadas.join(', ')}\n\n` +
          '💡 Tip: Marca proveedores con especialidad "Favoritos" para tener acceso rápido siempre.\n\n' +
          'Se abrirá el correo sin destinatario. ¿Continuar?'
        );
        
        if (!continuar) return;
      }
    }

    // Generar el asunto del correo
    let asunto = '';
    if (selectedSolicitudes.length === 1) {
      const sol = selectedSolicitudes[0];
      const tipoMaterial = sol.categoria || sol.nombre || 'Material';
      asunto = `Cotización - Folio ${sol.folio} - ${tipoMaterial}`;
    } else {
      const tipos = [...new Set(selectedSolicitudes.map(s => s.categoria || s.nombre).filter(Boolean))];
      const tipoMaterial = tipos.length > 0 ? tipos.join(', ') : 'Varios Materiales';
      asunto = `Cotización - ${selectedSolicitudes.length} Items - ${tipoMaterial}`;
    }

    // Generar el cuerpo del correo
    let cuerpoCorreo = 'Buen día,\n\n';
    cuerpoCorreo += 'Me podrías por favor cotizar lo siguiente:\n\n';

    selectedSolicitudes.forEach((sol, index) => {
      cuerpoCorreo += `Folio: ${sol.folio}\n`;
      cuerpoCorreo += `Cantidad: ${sol.cantidad}\n`;
      cuerpoCorreo += `Material: ${construirDescripcionMaterial(sol)}\n`;
      
      if (sol.instruccionesEspeciales) {
        cuerpoCorreo += `\n📝 Instrucciones Especiales:\n${sol.instruccionesEspeciales}\n`;
      }
      
      cuerpoCorreo += '\n';
    });

    cuerpoCorreo += 'Saludos.';

    // ⭐ NUEVO: Agregar firma de texto si el proveedor tiene campo firma
    if (proveedorSeleccionado && proveedorSeleccionado.firma) {
      const firma = obtenerFirmaEmail(proveedorSeleccionado.firma);
      if (firma) {
        cuerpoCorreo += firma;
      }
    }

    // Crear el enlace mailto con el email seleccionado (o vacío)
    const mailtoLink = `mailto:${emailSeleccionado}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpoCorreo)}`;
    
    console.log('Email seleccionado:', emailSeleccionado || 'Ninguno');
    console.log('Firma incluida:', proveedorSeleccionado?.firma || 'Sin firma');
    console.log('Longitud del enlace:', mailtoLink.length);
    
    // Verificar longitud del URL
    if (mailtoLink.length > 2000) {
      const mailtoSimple = `mailto:${emailSeleccionado}?subject=${encodeURIComponent(asunto)}`;
      
      navigator.clipboard.writeText(cuerpoCorreo).then(() => {
        alert('⚠️ El correo es muy largo.\n\n✅ El contenido se copió al portapapeles.\n\nSe abrirá tu cliente de correo. Por favor pega el contenido en el cuerpo del mensaje.');
        window.location.href = mailtoSimple;
      }).catch(err => {
        console.error('Error al copiar:', err);
        alert('No se pudo copiar al portapapeles.');
      });
    } else {
      try {
        window.location.href = mailtoLink;
      } catch (error) {
        console.error('Error al abrir mailto:', error);
        alert('No se pudo abrir el cliente de correo.');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-200">
      {/* Encabezado de la tabla */}
      <div style={{
        background: 'linear-gradient(to right, #10002b, #240046, #3c096c)',
        padding: '11px',
        marginBottom: "17px",
        marginLeft: '17px',
        borderRadius: '17px',
        maxWidth: '96%'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{
            fontSize: '25px',
            fontWeight: 'bold',
            color: 'white',
            margin: 0
          }}>
            📋 Lista de Solicitudes
          </h2>
          
          {selectedIds.length > 0 && (
            <span style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              {selectedIds.length} seleccionada(s)
            </span>
          )}
        </div>
      </div>

      {/* Barra de acciones */}
      {selectedIds.length > 0 && (
        <div style={{
          backgroundColor: '#010914ff',
          padding: '16px 24px',
          marginBottom: '16px',
          borderRadius: '8px',
          marginLeft: '24px',
          marginRight: '24px',
          border: '2px solid #3b82f6'
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#1e40af', marginRight: '16px' }}>
              Acciones:
            </span>
            
            <button
              onClick={(e) => {
                createRipple(e);
                handleEmail()
              }}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            >
              <Mail size={20} />
              Enviar Email
            </button>

            <button
              onClick={(e) => {
                createRipple(e);
                handleWhatsApp();
              }}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              <MessageCircle size={20} />
              WhatsApp
            </button>

            <button
              onClick={(e) => {
                createRipple(e);
                handleCopiar;
              }}
              style={{
                backgroundColor: '#6b7280',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6b7280'}
            >
              <Copy size={20} />
              Copiar
            </button>

            <button
              onClick={() => setSelectedIds([])}
              style={{
                marginLeft: 'auto',
                backgroundColor: '#ef4444',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
            >
              Limpiar selección
            </button>
          </div>
        </div>
      )}

      {/* Tabla */}
      <div style={{ overflowX: 'auto', padding: "0 24px 24px 24px" }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{
              background: 'linear-gradient(to right, #1b1c1dff, #1f2429ff)',
              borderBottom: '4px solid #7b2cbf',
            }}>
              <th style={{
                padding: '9px 3px',
                textAlign: 'center',
                fontSize: '17px',
                fontWeight: 'bold',
                color: 'white',
                textTransform: 'uppercase',
                borderRight: '2px solid #4b5563',
                width: '60px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%'
                }}>
                <button
                  onClick={toggleSelectAll}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    margin: 0,
                    width: '24px',
                    height: '24px'
                  }}
                  title="Seleccionar todos"
                >
                  {selectedIds.length === solicitudes.length ? 
                    <CheckSquare size={24} /> : 
                    <Square size={24} />
                  }
                </button>
              </div>
            </th>
              <th 
                onClick={() => handleSort('folio')}
                style={{
                  padding: '7px 17px',
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'white',
                  textTransform: 'uppercase',
                  borderRight: '2px solid #4b5563',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Folio
                  <SortIcon columnKey="folio" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('cantidad')}
                style={{
                  padding: '7px 17px',
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'white',
                  textTransform: 'uppercase',
                  borderRight: '2px solid #4b5563',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Cantidad
                  <SortIcon columnKey="cantidad" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('material')}
                style={{
                  padding: '7px 17px',
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'white',
                  textTransform: 'uppercase',
                  borderRight: '2px solid #4b5563',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Material
                  <SortIcon columnKey="material" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('requisitor')}
                style={{
                  padding: '7px 17px',
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'white',
                  textTransform: 'uppercase',
                  borderRight: '2px solid #4b5563',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Requisitor
                  <SortIcon columnKey="requisitor" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('cliente')}
                style={{
                  padding: '7px 17px',
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'white',
                  textTransform: 'uppercase',
                  borderRight: '2px solid #4b5563',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Cliente
                  <SortIcon columnKey="cliente" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('status')}
                style={{
                  padding: '7px 17px',
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'white',
                  textTransform: 'uppercase',
                  borderRight: '2px solid #4b5563',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Status
                  <SortIcon columnKey="status" />
                </div>
              </th>
              <th style={{
                padding: '7px 17px',
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'white',
                textTransform: 'uppercase'
              }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {solicitudesOrdenadas.map((solicitud, index) => (
              <tr 
                key={solicitud.id}
                style={{
                  backgroundColor: selectedIds.includes(solicitud.id) ? '#dbeafe' : (index % 2 === 0 ? '#f9fafb' : 'white'),
                  borderBottom: '2px solid #d1d5db',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!selectedIds.includes(solicitud.id)) {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedIds.includes(solicitud.id)) {
                    e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f9fafb' : 'white';
                  }
                }}
              >
                <td style={{
                  padding: '11px 5px',
                  textAlign: 'center',
                  borderRight: '2px solid #e5e7eb',
                  verticalAlign: 'middle',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%'
                  }}>
                  <button
                    onClick={() => toggleSelect(solicitud.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: selectedIds.includes(solicitud.id) ? '#2563eb' : '#9ca3af',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0,
                      margin: 0,
                      width: '24px',
                      height: '24px'
                    }}
                  >
                    {selectedIds.includes(solicitud.id) ? 
                      <CheckSquare size={24} /> : 
                      <Square size={24} />
                    }
                  </button>
                </div>
              </td>
                <td style={{
                  padding: '7px 17px',
                  borderRight: '2px solid #e5e7eb',
                  textAlign: 'center',
                  verticalAlign: 'middle'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#10002b',
                      borderRadius: '50%',
                      marginRight: '12px'
                    }}></span>
                    <span style={{
                      fontWeight: 'bold',
                      color: '#10002b',
                      fontSize: '24px'
                    }}>
                      {solicitud.folio}
                    </span>
                  </div>
                </td>
                <td style={{
                  padding: '7px 17px',
                  borderRight: '2px solid #e5e7eb',
                  textAlign: 'center',
                  verticalAlign: 'center'
                }}>
                  <div style={{
                    backgroundColor: '#dbeafe',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    display: 'inline-block'
                  }}>
                    <span style={{
                      fontWeight: 'bold',
                      color: '#1e3a8a',
                      fontSize: '20px'
                    }}>
                      {solicitud.cantidad}
                    </span>
                  </div>
                </td>
                <td style={{
                  padding: '7px 17px',
                  borderRight: '2px solid #e5e7eb',
                  textAlign: 'center',
                  verticalAlign: 'middle'
                }}>
                  <div style={{
                    color: '#1f2937',
                    fontSize: '17px',
                    fontWeight: 'bold',
                    lineHeight: '1.6'
                  }}>
                    {construirDescripcionMaterial(solicitud)}
                  </div>
                </td>
                <td style={{
                  padding: '7px 17px',
                  borderRight: '2px solid #e5e7eb',
                  textAlign: 'center',
                  verticalAlign: 'center'
                }}>
                  <span style={{
                    color: '#374151',
                    fontSize: '18px',
                    fontWeight: '500'
                  }}>
                    {solicitud.requisitor}
                  </span>
                </td>
                <td style={{
                  padding: '7px 17px',
                  borderRight: '2px solid #e5e7eb',
                  textAlign: 'center',
                  verticalAlign: 'center'
                }}>
                  <span style={{
                    color: '#374151',
                    fontSize: '18px',
                    fontWeight: '500'
                  }}>
                    {solicitud.cliente}
                  </span>
                </td>
                <td style={{
                  padding: '7px 17px',
                  borderRight: '2px solid #e5e7eb',
                  textAlign: 'center',
                  verticalAlign: 'center'
                }}>
                  <span className={`badge-estado ${getStatusColor(solicitud.status)}`}>
                    {solicitud.status ? solicitud.status.toUpperCase() : '-'}
                  </span>
                </td>
                <td style={{ padding: '7px 17px' }}>
                  <div style={{
                    display: 'flex',
                    gap: '17px',
                    justifyContent: 'center'
                  }}>
                    <button 
                      onClick={(e) => {
                        createRipple(e);
                        onEdit(solicitud);
                      }}
                      style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '7px 11px',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#2563eb';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#3b82f6';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      title="Editar"
                    >
                      <Edit2 size={17} />
                    </button>
                    <button 
                      onClick={(e) => {
                        createRipple(e);
                        onDelete(solicitud.id);
                      }}
                      style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        padding: '7px 11px',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#dc2626';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ef4444';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      title="Eliminar"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer de la tabla */}
      <div style={{
        backgroundColor: '#f3f4f6',
        padding: '16px 24px',
        borderTop: '4px solid #3b82f6'
      }}>
        <p style={{
          color: '#4b5563',
          fontSize: '18px',
          fontWeight: '600',
          margin: 0
        }}>
          Total de solicitudes: <span style={{
            color: '#1d4ed8',
            fontWeight: 'bold'
          }}>{solicitudes.length}</span>
        </p>
      </div>
    </div>
  );
};

export default SolicitudList;