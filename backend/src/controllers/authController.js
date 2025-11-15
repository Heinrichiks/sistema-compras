// backend/src/controllers/authController.js
const User = require('../models/User');
const { generarToken } = require('../middleware/auth');

// @desc    Registrar nuevo usuario
// @route   POST /api/auth/register
// @access  Public (en producción, solo admin debería poder crear usuarios)
exports.register = async (req, res, next) => {
  try {
    const { nombre, email, password, rol, departamento } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    // Crear usuario
    const usuario = await User.create({
      nombre,
      email,
      password,
      rol: rol || 'usuario',
      departamento
    });

    // Generar token
    const token = generarToken(usuario._id);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        token,
        usuario: {
          id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
          departamento: usuario.departamento
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login de usuario
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor proporciona email y contraseña'
      });
    }

    // Buscar usuario (incluir password)
    const usuario = await User.findOne({ email }).select('+password');

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.activo) {
      return res.status(401).json({
        success: false,
        message: 'Usuario inactivo. Contacta al administrador'
      });
    }

    // Verificar contraseña
    const esPasswordCorrecto = await usuario.compararPassword(password);

    if (!esPasswordCorrecto) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Actualizar último acceso
    usuario.ultimoAcceso = Date.now();
    await usuario.save({ validateBeforeSave: false });

    // Generar token
    const token = generarToken(usuario._id);

    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      data: {
        token,
        usuario: {
          id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
          departamento: usuario.departamento
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener usuario actual
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const usuario = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: usuario
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar perfil
// @route   PUT /api/auth/updateprofile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const camposActualizar = {
      nombre: req.body.nombre,
      email: req.body.email,
      departamento: req.body.departamento
    };

    const usuario = await User.findByIdAndUpdate(
      req.user.id,
      camposActualizar,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: usuario
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cambiar contraseña
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = async (req, res, next) => {
  try {
    const { passwordActual, passwordNuevo } = req.body;

    if (!passwordActual || !passwordNuevo) {
      return res.status(400).json({
        success: false,
        message: 'Por favor proporciona la contraseña actual y la nueva'
      });
    }

    const usuario = await User.findById(req.user.id).select('+password');

    // Verificar contraseña actual
    const esPasswordCorrecto = await usuario.compararPassword(passwordActual);

    if (!esPasswordCorrecto) {
      return res.status(401).json({
        success: false,
        message: 'Contraseña actual incorrecta'
      });
    }

    // Actualizar contraseña
    usuario.password = passwordNuevo;
    await usuario.save();

    // Generar nuevo token
    const token = generarToken(usuario._id);

    res.status(200).json({
      success: true,
      message: 'Contraseña actualizada exitosamente',
      data: {
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  try {
    // En una implementación con tokens en cookies, aquí se limpiaría la cookie
    // Como usamos JWT en el frontend, simplemente retornamos success
    res.status(200).json({
      success: true,
      message: 'Logout exitoso',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};