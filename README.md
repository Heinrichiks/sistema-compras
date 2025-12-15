# Sistema de Compras

Sistema de gestión de compras, cotizaciones y proveedores desarrollado con React (frontend) y Express + MongoDB (backend).

## 🚀 Inicio Rápido - Desarrollo Local

### Opción 1: Script Automático (Recomendado)

**Linux/Mac:**
```bash
./start-local.sh
```

**Windows:**
```bash
start-local.bat
```

### Opción 2: Manual

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm install
npm run dev
```

### Acceder a la Aplicación

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📚 Documentación Completa

Para instrucciones detalladas de configuración local, incluyendo:
- Instalación de MongoDB
- Configuración de variables de entorno
- Solución de problemas
- Scripts disponibles

👉 **Ver [LOCAL-SETUP.md](./LOCAL-SETUP.md)**

## 🛠️ Tecnologías

### Frontend
- React 19
- Vite
- React Router Dom
- Axios
- Lucide React (iconos)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT para autenticación
- bcryptjs para encriptación
- CORS, Helmet, Rate Limiting

## 📋 Requisitos

- Node.js >= 18.0.0
- MongoDB >= 6.0
- npm

## 🔒 Variables de Entorno

El archivo `backend/.env` ya está configurado para desarrollo local. Para producción, configura estas variables:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto_seguro
JWT_EXPIRE=7d
```

## 📁 Estructura del Proyecto

```
sistema-compras/
├── backend/              # Backend Express
│   ├── src/
│   │   ├── controllers/  # Controladores
│   │   ├── models/       # Modelos MongoDB
│   │   ├── routes/       # Rutas API
│   │   ├── middleware/   # Middleware
│   │   └── server.js     # Servidor principal
│   ├── .env              # Variables de entorno
│   └── package.json
├── src/                  # Frontend React
│   ├── components/       # Componentes React
│   ├── pages/            # Páginas
│   └── ...
├── start-local.sh        # Script inicio Linux/Mac
├── start-local.bat       # Script inicio Windows
└── LOCAL-SETUP.md        # Guía completa setup
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

MIT

---

**Desarrollado por Gustavo** 
