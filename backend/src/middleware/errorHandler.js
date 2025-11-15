// backend/src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error('Error:', err);

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = {
      message: message.join(', '),
      statusCode: 400
    };
  }

  // Error de duplicado de Mongoose
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    error = {
      message: `El ${field} ya existe en la base de datos`,
      statusCode: 400
    };
  }

  // Error de CastError de Mongoose (ID inválido)
  if (err.name === 'CastError') {
    error = {
      message: 'ID de recurso inválido',
      statusCode: 400
    };
  }

  // Error de JWT
  if (err.name === 'JsonWebTokenError') {
    error = {
      message: 'Token inválido',
      statusCode: 401
    };
  }

  // Error de JWT expirado
  if (err.name === 'TokenExpiredError') {
    error = {
      message: 'Token expirado',
      statusCode: 401
    };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Error del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;