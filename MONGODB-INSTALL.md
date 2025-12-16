# Guía de Instalación de MongoDB

Esta guía te ayudará a instalar MongoDB en tu computadora del trabajo.

## Windows (Recomendado para tu caso)

### Opción 1: Instalador MSI (Más Fácil)

1. **Descargar MongoDB**
   - Ve a: https://www.mongodb.com/try/download/community
   - Selecciona:
     - Version: 8.0.x (current)
     - Platform: Windows
     - Package: msi
   - Click "Download"

2. **Instalar MongoDB**
   - Ejecuta el archivo .msi descargado
   - Selecciona "Complete" installation
   - **IMPORTANTE**: Marca "Install MongoDB as a Service"
   - **IMPORTANTE**: Marca "Install MongoDB Compass" (interfaz gráfica útil)
   - Click "Next" y luego "Install"

3. **Verificar la Instalación**
   - Abre PowerShell o CMD
   - Ejecuta: `mongod --version`
   - Deberías ver la versión instalada

4. **Iniciar MongoDB**
   - Si instalaste como servicio, MongoDB ya está corriendo
   - Verifica con: `mongosh` (debería conectarse a MongoDB)

### Opción 2: Docker (Si tienes Docker Desktop)

```powershell
# Ejecutar en PowerShell
docker run -d -p 27017:27017 --name mongodb-local mongo:latest

# Verificar que está corriendo
docker ps
```

---

## Linux (Ubuntu/Debian)

```bash
# Importar la clave GPG de MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor

# Crear el archivo de lista para MongoDB
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

# Actualizar el índice de paquetes
sudo apt-get update

# Instalar MongoDB
sudo apt-get install -y mongodb-org

# Iniciar MongoDB
sudo systemctl start mongod

# Habilitar MongoDB para que inicie al arrancar
sudo systemctl enable mongod

# Verificar el estado
sudo systemctl status mongod
```

---

## macOS

### Con Homebrew:

```bash
# Instalar MongoDB
brew tap mongodb/brew
brew install mongodb-community@8.0

# Iniciar MongoDB
brew services start mongodb-community@8.0

# Verificar
mongosh
```

---

## Verificación Post-Instalación

Una vez instalado MongoDB, verifica que funciona:

```bash
# Conectarse a MongoDB
mongosh

# Dentro de mongosh:
show dbs
exit
```

---

## Configuración para el Proyecto

Una vez instalado MongoDB, **NO necesitas hacer nada más**. El archivo `backend/.env` ya está configurado para:

```env
MONGODB_URI=mongodb://localhost:27017/sistema-compras
```

Simplemente ejecuta:

```bash
./start-local.sh      # Linux/Mac
# o
start-local.bat       # Windows
```

¡Y listo! La aplicación se conectará automáticamente a tu MongoDB local.

---

## Solución de Problemas

### Windows: "mongod no se reconoce como comando"

Añade MongoDB al PATH:
1. Busca "Variables de entorno" en Windows
2. Edita la variable "Path"
3. Añade: `C:\Program Files\MongoDB\Server\8.0\bin`
4. Reinicia la terminal

### Linux: MongoDB no inicia

```bash
# Ver logs de error
sudo journalctl -u mongod -n 50

# Verificar permisos
sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown mongodb:mongodb /tmp/mongodb-27017.sock

# Reiniciar
sudo systemctl restart mongod
```

### Puerto 27017 ocupado

```bash
# Ver qué está usando el puerto
sudo lsof -i :27017

# Matar el proceso si es necesario
sudo kill -9 <PID>
```

---

## Herramientas Útiles

### MongoDB Compass (GUI)
- Descarga: https://www.mongodb.com/products/compass
- Conéctate a: `mongodb://localhost:27017`
- Te permite ver/editar datos gráficamente

### Mongosh (CLI)
- Ya viene con MongoDB
- Ejecuta: `mongosh`
- Comandos útiles:
  ```bash
  show dbs              # Ver bases de datos
  use sistema-compras   # Usar nuestra BD
  show collections      # Ver colecciones
  db.users.find()       # Ver usuarios
  ```

---

## Alternativa: Seguir usando MongoDB Atlas

Si prefieres no instalar MongoDB localmente, puedes seguir usando MongoDB Atlas. Solo necesitas:

1. Configurar el Network Access en Atlas para permitir tu IP
2. El archivo `.env` ya tiene la configuración de Atlas

Ambas opciones funcionan perfectamente.
