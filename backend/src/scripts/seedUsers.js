// backend/src/scripts/seedUsers.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const usuarios = [
  {
    nombre: 'Administrador',
    email: 'admin@sistemacompras.com',
    password: 'Admin123!',
    rol: 'admin',
    departamento: 'Administración',
    activo: true
  },
  {
    nombre: 'Usuario Compras',
    email: 'compras@sistemacompras.com',
    password: 'Compras123!',
    rol: 'comprador',
    departamento: 'Compras',
    activo: true
  },
  {
    nombre: 'Usuario Normal',
    email: 'usuario@sistemacompras.com',
    password: 'User123!',
    rol: 'usuario',
    departamento: 'Operaciones',
    activo: true
  }
];

const seedUsers = async () => {
  try {
    console.log('🔌 Conectando a MongoDB...');
    console.log('URI:', process.env.MONGODB_URI ? 'Configurada ✓' : 'NO CONFIGURADA ✗');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Eliminar usuarios existentes (opcional)
    const deleteResult = await User.deleteMany({});
    console.log(`🗑️  ${deleteResult.deletedCount} usuarios existentes eliminados`);

    // Crear usuarios
    console.log('📝 Creando usuarios...');
    const createdUsers = await User.create(usuarios);
    console.log(`✅ ${createdUsers.length} usuarios creados exitosamente`);

    console.log('\n📋 USUARIOS CREADOS:');
    console.log('═══════════════════════════════════════════════════');
    usuarios.forEach(user => {
      console.log(`
👤 ${user.nombre}
   📧 Email:    ${user.email}
   🔑 Password: ${user.password}
   👔 Rol:      ${user.rol}
   🏢 Depto:    ${user.departamento}
      `);
    });
    console.log('═══════════════════════════════════════════════════');
    console.log('\n💡 Usa estas credenciales para iniciar sesión en el frontend');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('\n🔐 Error de autenticación MongoDB:');
      console.error('   - Verifica tu MONGODB_URI en el archivo .env');
      console.error('   - Asegúrate de que la contraseña sea correcta');
      console.error('   - Verifica que el usuario tenga permisos');
    }
    
    if (error.message.includes('connect ECONNREFUSED')) {
      console.error('\n📡 Error de conexión:');
      console.error('   - MongoDB no está corriendo localmente');
      console.error('   - O la URI de MongoDB Atlas es incorrecta');
    }
    
    console.error('\n📄 Stack trace completo:');
    console.error(error);
    
    process.exit(1);
  }
};

seedUsers();