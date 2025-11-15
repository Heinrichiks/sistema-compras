// src/services/solicitudesService.js
import api from './api';

class SolicitudesService {
  async getAll() {
    const response = await api.get('/solicitudes');
    return response.data;
  }

  async getById(id) {
    const response = await api.get(`/solicitudes/${id}`);
    return response.data;
  }

  async create(solicitudData) {
    const response = await api.post('/solicitudes', solicitudData);
    return response.data;
  }

  async update(id, solicitudData) {
    const response = await api.put(`/solicitudes/${id}`, solicitudData);
    return response.data;
  }

  async delete(id) {
    const response = await api.delete(`/solicitudes/${id}`);
    return response.data;
  }

  async addCotizacion(id, cotizacionData) {
    const response = await api.post(`/solicitudes/${id}/cotizaciones`, cotizacionData);
    return response.data;
  }
}

export default new SolicitudesService();