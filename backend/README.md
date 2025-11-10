# Backend - API del Diccionario Ikʉn ↔ Español

Backend desarrollado con **FastAPI** para servir el diccionario bilingüe.

## 🚀 Instalación

1. Crea un entorno virtual:
```bash
python3 -m venv venv
source venv/bin/activate  # En Linux/Mac
# venv\Scripts\activate  # En Windows
```

2. Instala las dependencias:
```bash
pip install -r requirements.txt
```

## ▶️ Ejecución

```bash
python main.py
```

O usando uvicorn directamente:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

El servidor estará disponible en: `http://localhost:8000`

## 📡 Endpoints

- `GET /` - Información de la API
- `GET /api/diccionario` - Obtener el diccionario completo
- `GET /api/buscar?palabra=xxx` - Buscar una palabra
- `GET /api/estadisticas` - Estadísticas del diccionario

## 📖 Documentación automática

FastAPI genera documentación interactiva automáticamente:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🧪 Pruebas de endpoints

```bash
# Obtener todo el diccionario
curl http://localhost:8000/api/diccionario

# Buscar una palabra
curl "http://localhost:8000/api/buscar?palabra=agua"

# Obtener estadísticas
curl http://localhost:8000/api/estadisticas
```
