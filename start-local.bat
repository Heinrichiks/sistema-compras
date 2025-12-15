@echo off
REM Script para iniciar el backend y frontend en desarrollo local (Windows)
REM Para usar: Doble click en start-local.bat o ejecutar desde cmd

echo 🚀 Iniciando Sistema de Compras en modo desarrollo...
echo.

REM Verificar que node_modules esten instalados
if not exist "node_modules\" (
    echo 📦 Instalando dependencias del frontend...
    call npm install
)

if not exist "backend\node_modules\" (
    echo 📦 Instalando dependencias del backend...
    cd backend
    call npm install
    cd ..
)

REM Verificar que el archivo .env exista en el backend
if not exist "backend\.env" (
    echo ⚠️  Advertencia: No se encontro backend\.env
    echo 📝 Creando backend\.env desde .env.example...
    copy "backend\.env.example" "backend\.env"
    echo ✅ Archivo .env creado. Por favor, revisa y ajusta las variables si es necesario.
)

echo.
echo 🟢 Iniciando Backend (Puerto 5000)...
echo 🔵 Iniciando Frontend (Puerto 5173)...
echo.
echo Para detener los servidores, cierra esta ventana o presiona Ctrl+C
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM Iniciar backend en una nueva ventana
start "Backend - Puerto 5000" cmd /k "cd backend && npm run dev"

REM Esperar 3 segundos para que el backend inicie primero
timeout /t 3 /nobreak > nul

REM Iniciar frontend en una nueva ventana
start "Frontend - Puerto 5173" cmd /k "npm run dev"

echo.
echo ✅ Servidores iniciados en ventanas separadas
echo    - Backend: http://localhost:5000
echo    - Frontend: http://localhost:5173
echo.
pause
