// backend/src/routes/solicitudes.js
const express = require('express');
const router = express.Router();
const {
  getSolicitudes,
  getSolicitud,
  createSolicitud,
  updateSolicitud,
  deleteSolicitud,
  addCotizacion
} = require('../controllers/solicitudesController');
const { protect, authorize } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(protect);

router.route('/')
  .get(getSolicitudes)
  .post(createSolicitud);

router.route('/:id')
  .get(getSolicitud)
  .put(updateSolicitud)
  .delete(authorize('admin'), deleteSolicitud);

router.post('/:id/cotizaciones', addCotizacion);

module.exports = router;