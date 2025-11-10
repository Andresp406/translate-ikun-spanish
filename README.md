# 📖 Diccionario Bilingüe Ikʉn ↔ Español

Aplicación web interactiva para el diccionario de la lengua Ikʉn (Arhuaco) con traducción al español.

## ✨ Características

- 🎙️ **Traductor con Voz**: Traduce de Español a Ikʉn con síntesis de voz (TTS)
- 🔊 **Pronunciación**: Escucha cómo se pronuncian las palabras en Ikʉn
- 🔍 **Búsqueda en tiempo real**: Busca palabras mientras escribes
- 🌓 **Modo oscuro/claro**: Cambia entre temas según tu preferencia
- 📱 **Diseño responsivo**: Funciona en móviles, tablets y escritorio
- 📊 **Estadísticas interactivas**: Visualiza y filtra palabras por categoría
- 🎨 **Interfaz moderna estilo Shazam**: Diseño vibrante con glassmorphism
- ⚡ **API REST**: Backend rápido con FastAPI

## 🏗️ Estructura del Proyecto

```
diccionario-ikun/
├── backend/
│   ├── main.py                  # API con FastAPI
│   ├── requirements.txt         # Dependencias de Python
│   ├── diccionario-ikku.json   # Base de datos del diccionario
│   └── README.md               # Documentación del backend
├── frontend/
│   ├── index.html              # Interfaz de usuario
│   └── app.js                  # Lógica del frontend
├── assets/                     # Recursos gráficos
│   ├── logo.png                # Logo principal
│   ├── favicon.png             # Favicon
│   └── *.svg                   # Logos vectorizados
├── documentation/              # Documentación
│   ├── README.md               # Guía completa
│   ├── MODULO_VOZ.md          # Documentación TTS
│   ├── DISENO_SHAZAM.md       # Guía de diseño
│   ├── LOGOS.md               # Documentación logos
│   └── CHANGELOG.md           # Historial de cambios
├── start.sh                    # Script de inicio rápido
└── README.md                   # Este archivo
```

## 🚀 Inicio Rápido

### Opción 1: Script de inicio automático

```bash
./start.sh
```

### Opción 2: Inicio manual

**Backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

**Frontend:**
```bash
cd frontend
python3 -m http.server 3000
```

Luego visita: `http://localhost:3000`

## 📡 API

La API REST está disponible en `http://localhost:8000`

- **Documentación interactiva**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Endpoints principales

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/diccionario` | GET | Obtener todo el diccionario |
| `/api/buscar?palabra=xxx` | GET | Buscar una palabra |
| `/api/estadisticas` | GET | Obtener estadísticas |

## 🎯 Características Principales

### 🎙️ Traductor con Voz
- Traduce de Español a Ikʉn en tiempo real
- Síntesis de voz con Web Speech API
- Interfaz intuitiva con animaciones

### 📊 Estadísticas Interactivas
- Visualización dinámica de categorías
- Filtrado por categoría con un clic
- Modal personalizado con diseño Shazam

### 🎨 Diseño Moderno
- Inspirado en la app Shazam
- Gradientes vibrantes y animaciones fluidas
- Glassmorphism y efectos visuales

## 🛠️ Tecnologías

**Backend:**
- Python 3.8+
- FastAPI
- Uvicorn

**Frontend:**
- HTML5, CSS3, JavaScript
- TailwindCSS
- Web Speech API

## 📚 Documentación Completa

Para más información, consulta los archivos en `/documentation`:

- [**Guía Completa**](documentation/README.md) - Instalación y uso detallado
- [**Módulo de Voz**](documentation/MODULO_VOZ.md) - TTS y troubleshooting
- [**Diseño Shazam**](documentation/DISENO_SHAZAM.md) - Guía de diseño UI
- [**Logos**](documentation/LOGOS.md) - Documentación de recursos gráficos
- [**Changelog**](documentation/CHANGELOG.md) - Historial de cambios

## 🌍 Sobre el Proyecto

Este proyecto está desarrollado por el **Colectivo de Investigación "Traducciones del Corazón del Mundo"** en colaboración con la **Universidad del Magdalena**, con el objetivo de preservar y facilitar el acceso a la lengua Ikʉn del pueblo Arhuaco de la Sierra Nevada de Santa Marta, Colombia.

## 🤝 Contribuciones

Las contribuciones son bienvenidas:

1. Fork del proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está diseñado para la preservación cultural y educativa de la lengua Ikʉn.

---

✨ **Preservando la lengua del pueblo Arhuaco** • Santa Marta, Colombia
