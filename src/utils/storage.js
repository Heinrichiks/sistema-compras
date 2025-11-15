// src/utils/storage.js

export const loadSolicitudes = async () => {
  try {
    // Intentar usar window.storage si está disponible (Claude.ai)
    if (window.storage) {
      const result = await window.storage.get('solicitudes_data');
      return result && result.value ? JSON.parse(result.value) : [];
    }
    
    // Fallback a localStorage (desarrollo local)
    const data = localStorage.getItem('solicitudes_data');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('No hay datos previos de solicitudes');
    return [];
  }
};

export const saveSolicitudes = async (solicitudes) => {
  try {
    // Intentar usar window.storage si está disponible (Claude.ai)
    if (window.storage) {
      await window.storage.set('solicitudes_data', JSON.stringify(solicitudes));
      return true;
    }
    
    // Fallback a localStorage (desarrollo local)
    localStorage.setItem('solicitudes_data', JSON.stringify(solicitudes));
    return true;
  } catch (error) {
    console.error('Error guardando solicitudes:', error);
    return false;
  }
};

export const loadProveedores = async () => {
  try {
    // Intentar usar window.storage si está disponible (Claude.ai)
    if (window.storage) {
      const result = await window.storage.get('proveedores_data');
      return result && result.value ? JSON.parse(result.value) : [];
    }
    
    // Fallback a localStorage (desarrollo local)
    const data = localStorage.getItem('proveedores_data');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('No hay datos previos de proveedores');
    return [];
  }
};

export const saveProveedores = async (proveedores) => {
  try {
    // Intentar usar window.storage si está disponible (Claude.ai)
    if (window.storage) {
      await window.storage.set('proveedores_data', JSON.stringify(proveedores));
      return true;
    }
    
    // Fallback a localStorage (desarrollo local)
    localStorage.setItem('proveedores_data', JSON.stringify(proveedores));
    return true;
  } catch (error) {
    console.error('Error guardando proveedores:', error);
    return false;
  }
};