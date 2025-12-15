#!/bin/bash

# Script para iniciar el backend y frontend en desarrollo local
# Para usar: chmod +x start-local.sh && ./start-local.sh

echo "🚀 Iniciando Sistema de Compras en modo desarrollo..."
echo ""

# Verificar que node_modules estén instalados
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias del frontend..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Instalando dependencias del backend..."
    cd backend && npm install && cd ..
fi

# Verificar que el archivo .env exista en el backend
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Advertencia: No se encontró backend/.env"
    echo "📝 Creando backend/.env desde .env.example..."
    cp backend/.env.example backend/.env
    echo "✅ Archivo .env creado. Por favor, revisa y ajusta las variables si es necesario."
fi

echo ""
echo "🟢 Iniciando Backend (Puerto 5000)..."
echo "🔵 Iniciando Frontend (Puerto 5173)..."
echo ""
echo "Para detener los servidores, presiona Ctrl+C"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Iniciar ambos procesos en paralelo
trap 'kill 0' EXIT

# Iniciar backend en el puerto 5000
cd backend && npm run dev &

# Esperar 2 segundos para que el backend inicie primero
sleep 2

# Iniciar frontend en el puerto 5173
cd .. && npm run dev &

# Esperar a que ambos procesos terminen
wait
