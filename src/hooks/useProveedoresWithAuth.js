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
