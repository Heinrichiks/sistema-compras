// backend/src/models/Proveedor.js
const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  razonSocial: {
    type: String,
    trim: true
  },
  rfc: {
    type: String,
    required: [true, 'El RFC es requerido'],
    unique: true,
    uppercase: true,
    trim: true,
    match: [
      /^([A-ZÑ&]{3,4})\d{6}([A-Z0-9]{3})$/,
      'Por favor ingresa un RFC válido'
    ]
  },
  direccion: {
    calle: String,
    numero: String,
    colonia: String,
    ciudad: String,
    estado: String,
    codigoPostal: String,
    pais: {
      type: String,
      default: 'México'
    }
  },
  contacto: {
    nombre: String,
    telefono: String,
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Por favor ingresa un email válido'
      ]
    },
    puesto: String
  },
  categoria: {
    type: String,
    enum: ['materiales', 'servicios', 'equipos', 'consumibles', 'otros'],
    default: 'otros'
  },
  condicionesPago: {
    type: String,
    default: '30 días'
  },
  tiempoEntregaPromedio: String,
  calificacion: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  activo: {
    type: Boolean,
    default: true
  },
  notas: String,
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Índices
proveedorSchema.index({ nombre: 1 });
proveedorSchema.index({ rfc: 1 });
proveedorSchema.index({ categoria: 1 });

module.exports = mongoose.model('Proveedor', proveedorSchema);