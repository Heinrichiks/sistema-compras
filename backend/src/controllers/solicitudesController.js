// backend/src/controllers/solicitudesController.js
const Solicitud = require('../models/Solicitud');

// @desc    Obtener todas las solicitudes
// @route   GET /api/solicitudes
// @access  Private
exports.getSolicitudes = async (req, res, next) => {
  try {
    const solicitudes = await Solicitud.find()
      .populate('usuario', 'nombre email')
      .populate('cotizaciones.proveedor', 'nombre rfc')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: solicitudes.length,
      data: solicitudes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener una solicitud por ID
// @route   GET /api/solicitudes/:id
// @access  Private
exports.getSolicitud = async (req, res, next) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id)
      .populate('usuario', 'nombre email')
      .populate('cotizaciones.proveedor', 'nombre rfc contacto');

    if (!solicitud) {
      return res.status(404).json({
        success: false,
        message: 'Solicitud no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: solicitud
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear nueva solicitud
// @route   POST /api/solicitudes
// @access  Private
exports.createSolicitud = async (req, res, next) => {
  try {
    // Agregar usuario a la solicitud
    req.body.usuario = req.user.id;

    const solicitud = await Solicitud.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Solicitud creada exitosamente',
      data: solicitud
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar solicitud
// @route   PUT /api/solicitudes/:id
// @access  Private
exports.updateSolicitud = async (req, res, next) => {
  try {
    let solicitud = await Solicitud.findById(req.params.id);

    if (!solicitud) {
      return res.status(404).json({
        success: false,
        message: 'Solicitud no encontrada'
      });
    }

    // Verificar permisos (solo el creador o admin puede editar)
    if (
      solicitud.usuario.toString() !== req.user.id &&
      req.user.rol !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para editar esta solicitud'
      });
    }

    solicitud = await Solicitud.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Solicitud actualizada exitosamente',
      data: solicitud
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar solicitud
// @route   DELETE /api/solicitudes/:id
// @access  Private (Admin only)
exports.deleteSolicitud = async (req, res, next) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id);

    if (!solicitud) {
      return res.status(404).json({
        success: false,
        message: 'Solicitud no encontrada'
      });
    }

    // Solo admin puede eliminar
    if (req.user.rol !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Solo administradores pueden eliminar solicitudes'
      });
    }

    await solicitud.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Solicitud eliminada exitosamente',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Agregar cotización a solicitud
// @route   POST /api/solicitudes/:id/cotizaciones
// @access  Private
exports.addCotizacion = async (req, res, next) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id);

    if (!solicitud) {
      return res.status(404).json({
        success: false,
        message: 'Solicitud no encontrada'
      });
    }

    solicitud.cotizaciones.push(req.body);
    await solicitud.save();

    res.status(200).json({
      success: true,
      message: 'Cotización agregada exitosamente',
      data: solicitud
    });
  } catch (error) {
    next(error);
  }
};