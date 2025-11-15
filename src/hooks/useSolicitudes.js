// src/hooks/useSolicitudes.js
import { useState, useEffect } from 'react';
import { loadSolicitudes, saveSolicitudes } from '../utils/storage';

export const useSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await loadSolicitudes();
    setSolicitudes(data);
    setLoading(false);
  };

  const agregarSolicitud = async (solicitud) => {
    const nueva = { ...solicitud, id: Date.now(), fecha: new Date().toISOString() };
    const nuevasSolicitudes = [...solicitudes, nueva];
    setSolicitudes(nuevasSolicitudes);
    await saveSolicitudes(nuevasSolicitudes);
    return nueva;
  };

  const actualizarSolicitud = async (id, solicitudActualizada) => {
    const nuevasSolicitudes = solicitudes.map(s => 
      s.id === id ? { ...solicitudActualizada, id } : s
    );
    setSolicitudes(nuevasSolicitudes);
    await saveSolicitudes(nuevasSolicitudes);
  };

  const eliminarSolicitud = async (id) => {
    const nuevasSolicitudes = solicitudes.filter(s => s.id !== id);
    setSolicitudes(nuevasSolicitudes);
    await saveSolicitudes(nuevasSolicitudes);
  };

  return {
    solicitudes,
    loading,
    agregarSolicitud,
    actualizarSolicitud,
    eliminarSolicitud
  };
};