// src/services/proveedoresService.js
import api from './api';

class ProveedoresService {
  async getAll() {
    const response = await api.get('/proveedores');
    return response.data;
  }

  async getById(id) {
    const response = await api.get(`/proveedores/${id}`);
    return response.data;
  }

  async create(proveedorData) {
    const response = await api.post('/proveedores', proveedorData);
    return response.data;
  }

  async update(id, proveedorData) {
    const response = await api.put(`/proveedores/${id}`, proveedorData);
    return response.data;
  }

  async delete(id) {
    const response = await api.delete(`/proveedores/${id}`);
    return response.data;
  }
}

export default new ProveedoresService();