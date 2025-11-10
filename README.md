# 📖 Diccionario Bilingüe Ikʉn ↔ Español

Aplicación web interactiva para el diccionario de la lengua Ikʉn (Arhuaco) con traducción al español.

## ✨ Características

- 🎙️ **Traductor con Voz (NUEVO)**: Traduce de Español a Ikʉn con síntesis de voz (TTS)
- 🔊 **Pronunciación**: Escucha cómo se pronuncian las palabras en Ikʉn
- 🔍 **Búsqueda en tiempo real**: Busca palabras mientras escribes
- 🌓 **Modo oscuro/claro**: Cambia entre temas según tu preferencia
- 📱 **Diseño responsivo**: Funciona en móviles, tablets y escritorio
- 📊 **Estadísticas**: Visualiza la cantidad de palabras por categoría
- 🎨 **Interfaz moderna**: Diseño limpio con TailwindCSS
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
└── README.md                   # Este archivo
```

## 🚀 Instalación y Uso

### Backend (FastAPI)

1. **Navega al directorio del backend**:
   ```bash
   cd backend
   ```

2. **Crea un entorno virtual** (recomendado):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # En Linux/Mac
   # venv\Scripts\activate   # En Windows
   ```

3. **Instala las dependencias**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Ejecuta el servidor**:
   ```bash
   python main.py
   ```
   
   El servidor estará disponible en: `http://localhost:8000`

### Frontend

1. **Navega al directorio del frontend**:
   ```bash
   cd frontend
   ```

2. **Abre el archivo HTML**:
   - Simplemente abre `index.html` en tu navegador
   - O usa un servidor local (recomendado):
   
   ```bash
   # Con Python 3
   python3 -m http.server 3000
   
   # Con Node.js (si tienes http-server instalado)
   npx http-server -p 3000
   ```
   
   Luego visita: `http://localhost:3000`

## 📡 Endpoints de la API

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/` | GET | Información de la API |
| `/api/diccionario` | GET | Obtener todo el diccionario |
| `/api/buscar?palabra=xxx` | GET | Buscar una palabra |
| `/api/estadisticas` | GET | Obtener estadísticas del diccionario |

### Ejemplos de uso

```bash
# Obtener todo el diccionario
curl http://localhost:8000/api/diccionario

# Buscar la palabra "agua"
curl "http://localhost:8000/api/buscar?palabra=agua"

# Obtener estadísticas
curl http://localhost:8000/api/estadisticas
```

## 🎯 Uso de la Aplicación

1. **🎙️ Traductor con Voz (NUEVO)**:
   - Escribe una palabra en español en el campo verde "Traductor con Voz"
   - Haz clic en "🔄 Traducir" o presiona Enter
   - Verás la traducción en Ikʉn
   - Haz clic en el botón 🔊 para escuchar la pronunciación
   - **Navegadores recomendados**: Chrome, Edge, Safari

2. **Búsqueda en tiempo real**: 
   - Escribe en el campo de búsqueda
   - Los resultados aparecen automáticamente
   - Funciona tanto para palabras en Ikʉn como en Español

3. **Ver todo el diccionario**:
   - Haz clic en "📖 Ver todo el diccionario"
   - Muestra todas las palabras organizadas por categoría

4. **Modo oscuro**:
   - Haz clic en el ícono de sol/luna en la esquina superior derecha
   - La preferencia se guarda en el navegador

## 📊 Categorías del Diccionario

- **Vocabulario**: Palabras generales
- **Pronombres y Sufijos**: Elementos gramaticales
- **Objetos**: Nombres de objetos
- **Direcciones**: Ubicaciones y posiciones
- **Saludos y Peticiones**: Frases comunes
- **Números**: Sistema numérico
- **Colores**: Nombres de colores

## 🛠️ Tecnologías Utilizadas

### Backend
- **Python 3.8+**
- **FastAPI**: Framework web moderno y rápido
- **Uvicorn**: Servidor ASGI

### Frontend
- **HTML5**
- **TailwindCSS**: Framework CSS utility-first
- **JavaScript (Vanilla)**: Sin dependencias externas
- **Web Speech API**: Síntesis de voz (Text-to-Speech)

## 📝 Documentación

### Documentación de la API

FastAPI genera documentación interactiva automáticamente:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Módulo de Voz

Para información detallada sobre el módulo de traducción con voz:
- **Guía completa**: [MODULO_VOZ.md](MODULO_VOZ.md)
- Incluye troubleshooting y compatibilidad de navegadores

## 🔧 Desarrollo

### Ejecutar en modo desarrollo

Backend con auto-reload:
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Modificar el diccionario

Edita el archivo `backend/diccionario-ikku.json` con la estructura:

```json
{
  "seccion": [
    {
      "ikʉn": "palabra en ikʉn",
      "espanol": "traducción al español"
    }
  ]
}
```

## 🌐 CORS

El backend está configurado para aceptar peticiones desde cualquier origen. Para producción, considera limitar los orígenes permitidos en `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://tu-dominio.com"],
    # ...
)
```

## 📄 Licencia

Este proyecto está diseñado para preservar y facilitar el acceso a la lengua Ikʉn del pueblo Arhuaco.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📧 Contacto

Para preguntas o sugerencias sobre el diccionario, por favor contacta a los mantenedores del proyecto.

---

**Nota**: Este diccionario tiene como objetivo preservar y promover la lengua Ikʉn del pueblo Arhuaco de la Sierra Nevada de Santa Marta, Colombia.
