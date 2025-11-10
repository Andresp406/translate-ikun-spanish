#!/bin/bash

# Script de inicio rápido para el Diccionario Ikʉn

echo "🚀 Iniciando Diccionario Ikʉn ↔ Español"
echo "========================================"

# Verificar si Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python 3 no está instalado"
    exit 1
fi

# Navegar al directorio del backend
cd backend

# Verificar si el entorno virtual existe
if [ ! -d "venv" ]; then
    echo "📦 Creando entorno virtual..."
    python3 -m venv venv
fi

# Activar entorno virtual
echo "🔧 Activando entorno virtual..."
source venv/bin/activate

# Instalar dependencias
echo "📥 Instalando dependencias..."
pip install -q -r requirements.txt

# Iniciar el servidor
echo ""
echo "✅ Todo listo!"
echo ""
echo "📡 Backend: http://localhost:8000"
echo "🌐 Frontend: Abre frontend/index.html en tu navegador"
echo ""
echo "📖 Documentación API: http://localhost:8000/docs"
echo ""
echo "Para detener el servidor, presiona Ctrl+C"
echo ""

# Iniciar el servidor
python main.py
