# 📝 Historial de Cambios

## [v2.0.0] - 2024-11-10

### 🎙️ Añadido - Módulo de Traducción con Voz

#### Nuevas Funcionalidades
- ✨ **Traductor Español → Ikʉn** con interfaz dedicada
- 🔊 **Síntesis de voz (TTS)** usando Web Speech API
- 🎯 **Búsqueda inteligente** desde español a ikʉn
- 📢 **Reproducción automática opcional** de pronunciación
- 🔄 **Múltiples traducciones** cuando existen variantes
- 🎨 **Interfaz verde distintiva** para el módulo de traducción

#### Mejoras Técnicas
- Manejo robusto de errores en TTS
- Sistema de notificaciones temporales (toast notifications)
- Soporte para múltiples voces y idiomas
- Fallback inteligente de voces
- Configuración optimizada de velocidad (0.75x) y tono
- Detección automática de voces en español

#### UI/UX
- Botón de traducción con icono 🔄
- Botón de voz con icono 🔊 y animación pulse
- Diseño responsivo para el módulo de traducción
- Feedback visual durante reproducción
- Mensajes de error específicos según el tipo de problema

#### Documentación
- 📄 Nuevo archivo `MODULO_VOZ.md` con guía completa
- 📖 README actualizado con información del módulo
- 🐛 Sección de troubleshooting para problemas comunes
- 💡 Ejemplos de uso y traducciones comunes

#### Archivos Modificados
- `frontend/index.html` - Añadido módulo de traducción
- `frontend/app.js` - Nuevas funciones de TTS y traducción
- `README.md` - Actualizado con nuevas características
- `MODULO_VOZ.md` - Documentación del módulo (nuevo)
- `CHANGELOG.md` - Este archivo (nuevo)

#### Compatibilidad de Navegadores
- ✅ Chrome/Chromium - Soporte completo
- ✅ Microsoft Edge - Soporte completo
- ✅ Safari (macOS/iOS) - Soporte completo
- ⚠️ Firefox - Soporte limitado

#### Características de Accesibilidad
- Notificaciones visuales para usuarios
- Feedback de estado durante reproducción
- Mensajes de error descriptivos
- Soporte para teclado (Enter para traducir)

---

## [v1.0.0] - 2024-11-10

### Lanzamiento Inicial

#### Backend (FastAPI)
- Servidor API REST con FastAPI
- Endpoint `/api/diccionario` - Diccionario completo
- Endpoint `/api/buscar` - Búsqueda de palabras
- Endpoint `/api/estadisticas` - Estadísticas del diccionario
- CORS configurado para desarrollo
- Búsqueda normalizada (case-insensitive)

#### Frontend
- Interfaz con TailwindCSS
- Búsqueda en tiempo real (debounce 300ms)
- Modo oscuro/claro con persistencia
- Diseño responsivo
- Estadísticas visuales
- Botón "Ver todo el diccionario"
- Animaciones y transiciones suaves

#### Datos
- 700+ entradas del diccionario Ikʉn
- 7 categorías: Vocabulario, Pronombres, Objetos, Direcciones, Saludos, Números, Colores
- Formato JSON estructurado

#### Documentación
- README.md con instrucciones completas
- README del backend
- Script de inicio automático (start.sh)
- .gitignore configurado

---

## 🔮 Futuras Mejoras Planificadas

### Corto Plazo
- [ ] Guardar traducciones favoritas
- [ ] Historial de búsquedas
- [ ] Compartir traducciones

### Medio Plazo
- [ ] Grabaciones de audio nativas (hablantes Arhuaco)
- [ ] Modo offline con Service Workers
- [ ] Control de velocidad de reproducción
- [ ] Descarga de audio en MP3

### Largo Plazo
- [ ] Aplicación móvil (PWA)
- [ ] Modo de aprendizaje con flashcards
- [ ] Frases completas y gramática
- [ ] Integración con API de traducción ML
- [ ] Comunidad y contribuciones de usuarios

---

## 📞 Reportar Problemas

Si encuentras algún problema:
1. Revisa la documentación en `MODULO_VOZ.md`
2. Verifica la compatibilidad de tu navegador
3. Abre un issue en el repositorio
4. Incluye información del navegador y sistema operativo

---

**Mantenido con ❤️ para preservar la lengua Ikʉn del pueblo Arhuaco**
