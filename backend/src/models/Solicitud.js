// backend/src/models/Solicitud.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  cantidad: {
    type: Number,
    required: true,
    min: 0
  },
  unidad: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  observaciones: String
});

const cotizacionSchema = new mongoose.Schema({
  proveedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proveedor',
    required: true
  },
  precioUnitario: {
    type: Number,
    required: true,
    min: 0
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  iva: {
    type: Number,
    required: true,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  tiempoEntrega: String,
  observaciones: String,
  seleccionado: {
    type: Boolean,
    default: false
  }
});

const solicitudSchema = new mongoose.Schema({
  folio: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  proyecto: {
    type: String,
    trim: true
  },
  cliente: {
    type: String,
    required: true,
    trim: true
  },
  items: [itemSchema],
  cotizaciones: [cotizacionSchema],
  estado: {
    type: String,
    enum: ['pendiente', 'cotizado', 'aprobado', 'rechazado', 'completado'],
    default: 'pendiente'
  },
  prioridad: {
    type: String,
    enum: ['baja', 'media', 'alta', 'urgente'],
    default: 'media'
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  observacionesGenerales: String
}, {
  timestamps: true
});

// Índices para mejorar búsquedas
solicitudSchema.index({ folio: 1 });
solicitudSchema.index({ cliente: 1 });
solicitudSchema.index({ estado: 1 });
solicitudSchema.index({ fecha: -1 });

module.exports = mongoose.model('Solicitud', solicitudSchema);