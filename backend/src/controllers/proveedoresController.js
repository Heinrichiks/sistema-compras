// backend/src/controllers/proveedoresController.js
const Proveedor = require('../models/Proveedor');

// @desc    Obtener todos los proveedores
// @route   GET /api/proveedores
// @access  Private
exports.getProveedores = async (req, res, next) => {
  try {
    const proveedores = await Proveedor.find()
      .populate('usuario', 'nombre email')
      .sort({ nombre: 1 });

    res.status(200).json({
      success: true,
      count: proveedores.length,
      data: proveedores
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener un proveedor por ID
// @route   GET /api/proveedores/:id
// @access  Private
exports.getProveedor = async (req, res, next) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id)
      .populate('usuario', 'nombre email');

    if (!proveedor) {
      return res.status(404).json({
        success: false,
        message: 'Proveedor no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: proveedor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear nuevo proveedor
// @route   POST /api/proveedores
// @access  Private
exports.createProveedor = async (req, res, next) => {
  try {
    req.body.usuario = req.user.id;

    const proveedor = await Proveedor.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Proveedor creado exitosamente',
      data: proveedor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar proveedor
// @route   PUT /api/proveedores/:id
// @access  Private
exports.updateProveedor = async (req, res, next) => {
  try {
    let proveedor = await Proveedor.findById(req.params.id);

    if (!proveedor) {
      return res.status(404).json({
        success: false,
        message: 'Proveedor no encontrado'
      });
    }

    proveedor = await Proveedor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Proveedor actualizado exitosamente',
      data: proveedor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar proveedor
// @route   DELETE /api/proveedores/:id
// @access  Private (Admin only)
exports.deleteProveedor = async (req, res, next) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);

    if (!proveedor) {
      return res.status(404).json({
        success: false,
        message: 'Proveedor no encontrado'
      });
    }

    if (req.user.rol !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Solo administradores pueden eliminar proveedores'
      });
    }

    await proveedor.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Proveedor eliminado exitosamente',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};