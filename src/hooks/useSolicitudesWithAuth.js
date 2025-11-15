// frontend/src/hooks/useSolicitudesWithAuth.js
import { useState, useEffect } from 'react';
import solicitudesService from '../services/solicitudesService';

export const useSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar solicitudes al montar el componente
  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      setLoading(true);
      const response = await solicitudesService.getAll();
      setSolicitudes(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar solicitudes');
      console.error('Error fetching solicitudes:', err);
    } finally {
      setLoading(false);
    }
  };

  const agregarSolicitud = async (solicitudData) => {
    try {
      const response = await solicitudesService.create(solicitudData);
      setSolicitudes([response.data, ...solicitudes]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear solicitud');
      throw err;
    }
  };

  const actualizarSolicitud = async (id, solicitudData) => {
    try {
      const response = await solicitudesService.update(id, solicitudData);
      setSolicitudes(
        solicitudes.map(s => s._id === id ? response.data : s)
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar solicitud');
      throw err;
    }
  };

  const eliminarSolicitud = async (id) => {
    try {
      await solicitudesService.delete(id);
      setSolicitudes(solicitudes.filter(s => s._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Error al eliminar solicitud');
      throw err;
    }
  };

  const agregarCotizacion = async (solicitudId, cotizacionData) => {
    try {
      const response = await solicitudesService.addCotizacion(solicitudId, cotizacionData);
      setSolicitudes(
        solicitudes.map(s => s._id === solicitudId ? response.data : s)
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al agregar cotización');
      throw err;
    }
  };

  return {
    solicitudes,
    loading,
    error,
    agregarSolicitud,
    actualizarSolicitud,
    eliminarSolicitud,
    agregarCotizacion,
    refetch: fetchSolicitudes
  };
};


// frontend/src/hooks/useProveedoresWithAuth.js
import { useState, useEffect } from 'react';
import proveedoresService from '../services/proveedoresService';

export const useProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      setLoading(true);
      const response = await proveedoresService.getAll();
      setProveedores(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar proveedores');
      console.error('Error fetching proveedores:', err);
    } finally {
      setLoading(false);
    }
  };

  const agregarProveedor = async (proveedorData) => {
    try {
      const response = await proveedoresService.create(proveedorData);
      setProveedores([...proveedores, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear proveedor');
      throw err;
    }
  };

  const actualizarProveedor = async (id, proveedorData) => {
    try {
      const response = await proveedoresService.update(id, proveedorData);
      setProveedores(
        proveedores.map(p => p._id === id ? response.data : p)
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar proveedor');
      throw err;
    }
  };

  const eliminarProveedor = async (id) => {
    try {
      await proveedoresService.delete(id);
      setProveedores(proveedores.filter(p => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Error al eliminar proveedor');
      throw err;
    }
  };

  return {
    proveedores,
    loading,
    error,
    agregarProveedor,
    actualizarProveedor,
    eliminarProveedor,
    refetch: fetchProveedores
  };
};