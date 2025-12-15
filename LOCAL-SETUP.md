# Guía de Configuración Local - Sistema de Compras

Esta guía te ayudará a configurar y ejecutar la aplicación completa (frontend + backend) en tu entorno local.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js** (versión 18 o superior)
   - Verificar: `node --version`
   - Descargar: https://nodejs.org/

2. **MongoDB** (versión 6 o superior)
   - Verificar: `mongod --version`
   - Descargar: https://www.mongodb.com/try/download/community
   - **Alternativa con Docker**: `docker run -d -p 27017:27017 --name mongodb mongo:latest`

3. **npm** (viene con Node.js)
   - Verificar: `npm --version`

## Paso 1: Clonar el Repositorio (si aún no lo has hecho)

```bash
git clone <url-del-repositorio>
cd sistema-compras
```

## Paso 2: Configurar el Backend

### 2.1 Instalar dependencias del backend

```bash
cd backend
npm install
```

### 2.2 Configurar variables de entorno

El archivo `.env` ya está creado en `backend/.env` con valores por defecto para desarrollo local:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sistema-compras
JWT_SECRET=dev_secret_key_change_in_production_12345
JWT_EXPIRE=7d
```

**IMPORTANTE**: Si usas MongoDB Atlas u otro servidor remoto, actualiza `MONGODB_URI` con tu cadena de conexión.

### 2.3 Iniciar MongoDB

**Opción A: MongoDB Local**
```bash
# En una terminal separada
mongod
```

**Opción B: MongoDB con Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 2.4 Sembrar datos iniciales (opcional)

El backend incluye un script para crear usuarios de prueba:

```bash
npm run seed
```

Esto creará usuarios de ejemplo en la base de datos.

### 2.5 Iniciar el servidor backend

```bash
# Modo desarrollo (con auto-reload)
npm run dev

# O modo producción
npm start
```

El backend estará corriendo en: **http://localhost:5000**

Verifica que esté funcionando accediendo a: http://localhost:5000/health

## Paso 3: Configurar el Frontend

### 3.1 Volver a la raíz del proyecto

```bash
cd ..  # Volver a la carpeta raíz sistema-compras
```

### 3.2 Instalar dependencias del frontend

```bash
npm install
```

### 3.3 Iniciar el servidor de desarrollo

```bash
npm run dev
```

El frontend estará corriendo en: **http://localhost:5173**

## Paso 4: Verificar la Aplicación

1. Abre tu navegador en http://localhost:5173
2. Deberías ver la página de login del sistema
3. El frontend se conectará automáticamente al backend en http://localhost:5000

## Estructura de Puertos

- **Frontend (Vite)**: http://localhost:5173
- **Backend (Express)**: http://localhost:5000
- **MongoDB**: localhost:27017

## Scripts Disponibles

### Backend (desde carpeta `backend/`)
- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon
- `npm start` - Inicia el servidor en modo producción
- `npm run seed` - Siembra datos iniciales en la base de datos

### Frontend (desde carpeta raíz)
- `npm run dev` - Inicia el servidor de desarrollo Vite
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la versión de producción
- `npm run lint` - Ejecuta el linter

## Solución de Problemas

### Error: "Cannot connect to MongoDB"

1. Verifica que MongoDB esté corriendo: `mongod --version`
2. Si usas Docker: `docker ps` para ver si el contenedor está activo
3. Verifica la URI en `backend/.env`

### Error: "Port 5000 already in use"

1. Cambia el puerto en `backend/.env`: `PORT=5001`
2. Actualiza la configuración del frontend si es necesario

### Error: "CORS policy"

1. El backend ya está configurado para aceptar conexiones desde localhost:5173
2. Verifica que ambos servidores estén corriendo

### Frontend no se conecta al backend

1. Verifica que el backend esté corriendo en el puerto correcto
2. Revisa la consola del navegador para ver errores
3. Verifica la configuración de proxy en `vite.config.js`

## Siguientes Pasos

1. Familiarízate con la estructura del proyecto
2. Revisa la documentación de las APIs en `backend/src/routes/`
3. Explora los componentes de React en `src/`

## Comandos Útiles de MongoDB

```bash
# Conectarse a MongoDB local
mongosh

# Ver todas las bases de datos
show dbs

# Usar la base de datos del proyecto
use sistema-compras

# Ver colecciones
show collections

# Ver usuarios
db.users.find()

# Limpiar la base de datos (¡CUIDADO!)
db.dropDatabase()
```

## Notas de Seguridad

- **NUNCA** subas el archivo `.env` al repositorio (ya está en `.gitignore`)
- Cambia `JWT_SECRET` en producción por un valor seguro
- Para producción, usa variables de entorno reales, no el archivo `.env`

## Recursos Adicionales

- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de Express](https://expressjs.com/)
- [Documentación de MongoDB](https://www.mongodb.com/docs/)
- [Documentación de React](https://react.dev/)

---

¿Problemas? Abre un issue en el repositorio o contacta al equipo de desarrollo.
