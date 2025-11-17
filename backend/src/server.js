// backend/src/server.js

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const solicitudesRoutes = require('./routes/solicitudes');
const proveedoresRoutes = require('./routes/proveedores');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ===== NUEVO: Trust proxy para Railway =====
app.set('trust proxy', 1);

// CORS - Configuración para producción
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://sistema-compras-gilt.vercel.app'
];

// CORS - TEMPORAL SUPER PERMISIVO PARA DEBUG
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helmet comentado temporalmente
// app.use(helmet());

// Rate limiting...
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones...'
});
app.use('/api/', limiter);


// Rate limiting específico para login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 intentos de login cada 15 minutos
  message: 'Demasiados intentos de inicio de sesión, por favor intenta de nuevo más tarde.'
});

// Rutas
app.use('/api/auth', loginLimiter, authRoutes);
app.use('/api/solicitudes', solicitudesRoutes);
app.use('/api/proveedores', proveedoresRoutes);

// Ruta de health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// Middleware de manejo de errores
app.use(errorHandler);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    console.error('⚠️  El servidor seguirá corriendo pero sin base de datos');
  }
};

// Iniciar servidor PRIMERO
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('🚀 Servidor corriendo en puerto', PORT);
  console.log('🌍 Entorno:', process.env.NODE_ENV || 'development');
  console.log('🔗 http://localhost:' + PORT);
  
  // Conectar a MongoDB después de que el servidor esté corriendo
  connectDB();
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ Error no manejado:', err);
  server.close(() => {
    console.log('🔴 Servidor cerrado debido a error no manejado');
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.error('❌ Excepción no capturada:', err);
  server.close(() => {
    console.log('🔴 Servidor cerrado debido a excepción no capturada');
    process.exit(1);
  });
});

module.exports = app;