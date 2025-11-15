// src/hooks/useProveedores.js
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'proveedores_v1';

export const useProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setProveedores(parsed);
    } catch (err) {
      console.error('Error cargando proveedores desde localStorage', err);
      setProveedores([]);
    } finally {
      setLoading(false);
    }
  };

  const persist = async (list) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.error('Error guardando proveedores en localStorage', err);
    }
  };

  const agregarProveedor = async (proveedor) => {
    const nuevo = { id: Date.now(), ...proveedor };
    const nuevas = [nuevo, ...proveedores];
    setProveedores(nuevas);
    await persist(nuevas);
    return nuevo;
  };

  const actualizarProveedor = async (id, proveedorActualizado) => {
    const nuevas = proveedores.map(p => (p.id === id ? { ...p, ...proveedorActualizado, id } : p));
    setProveedores(nuevas);
    await persist(nuevas);
  };

  const eliminarProveedor = async (id) => {
    const nuevas = proveedores.filter(p => p.id !== id);
    setProveedores(nuevas);
    await persist(nuevas);
  };

  return {
    proveedores,
    loading,
    agregarProveedor,
    actualizarProveedor,
    eliminarProveedor,
    setProveedores, // expongo el setter por si necesitas operaciones masivas
  };
};
