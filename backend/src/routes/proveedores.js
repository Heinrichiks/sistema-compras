// backend/src/routes/proveedores.js
const express = require('express');
const router = express.Router();
const {
  getProveedores,
  getProveedor,
  createProveedor,
  updateProveedor,
  deleteProveedor
} = require('../controllers/proveedoresController');
const { protect, authorize } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(protect);

router.route('/')
  .get(getProveedores)
  .post(createProveedor);

router.route('/:id')
  .get(getProveedor)
  .put(updateProveedor)
  .delete(authorize('admin'), deleteProveedor);

module.exports = router;
