# 🎙️ Módulo de Traducción con Voz

## ✨ Características

El diccionario ahora incluye un **módulo de traducción con síntesis de voz (TTS)** que permite:

- Traducir palabras de **Español → Ikʉn**
- **Escuchar la pronunciación** de las palabras en Ikʉn
- Ver **múltiples traducciones** cuando existen variantes
- Reproducir el audio haciendo clic en el botón 🔊

## 🎯 Cómo usar

1. **Escribe una palabra en español** en el campo "Traductor con Voz"
   - Ejemplo: agua, madre, hola, cerdo, etc.

2. **Haz clic en "🔄 Traducir"** o presiona Enter

3. **Se mostrará**:
   - La palabra en Ikʉn (en letras grandes)
   - Su significado en español
   - Traducciones adicionales (si existen)

4. **Haz clic en el botón 🔊** para escuchar la pronunciación

## 🔊 Sobre la Síntesis de Voz

### Navegadores compatibles
- ✅ **Chrome/Chromium** (mejor soporte)
- ✅ **Edge**
- ✅ **Safari** (macOS/iOS)
- ⚠️ **Firefox** (soporte limitado)

### Cómo funciona
- Usa la **Web Speech API** del navegador
- Intenta usar voces en español para mejor pronunciación
- Velocidad reducida (0.75x) para pronunciación clara
- Los caracteres especiales del Ikʉn (ʉ, Ɉ) se pronuncian lo mejor posible

### Solución de problemas

#### ❌ "Error al reproducir el audio"
**Causas posibles:**
1. **Permisos del navegador**: Algunos navegadores requieren que interactúes con la página primero
2. **Navegador no compatible**: Usa Chrome o Edge para mejor compatibilidad
3. **Sin conexión a internet**: Algunas voces necesitan conexión

**Soluciones:**
- Haz clic en cualquier parte de la página antes de usar el TTS
- Actualiza tu navegador a la última versión
- Prueba con otro navegador (Chrome recomendado)
- Verifica tu conexión a internet

#### 🔇 "No se escucha nada"
- Verifica el volumen del sistema
- Revisa que no esté en silencio la pestaña
- Abre la consola del navegador (F12) y busca mensajes de error

#### ⚠️ "Permiso denegado"
- Haz clic en la página primero
- Permite el uso de audio en la configuración del navegador

## 🛠️ Características técnicas

### Configuración de voz
```javascript
utterance.rate = 0.75;  // Velocidad lenta para claridad
utterance.pitch = 1.0;  // Tono normal
utterance.volume = 1.0; // Volumen máximo
```

### Selección de voz
1. Busca voces en español (es-ES, es-MX, es-AR, etc.)
2. Si no encuentra, usa la voz predeterminada del sistema
3. Fallback a cualquier voz disponible

### Notificaciones
- 🔵 **Azul**: Información (reproduciendo)
- 🔴 **Rojo**: Error
- 🟢 **Verde**: Éxito

## 📝 Ejemplos de uso

### Traducciones comunes
```
Español → Ikʉn
--------------
agua     → Ɉe
madre    → Zaku
cerdo    → Chinu
agua     → Ɉe
coca     → Ayu
corazón  → Ɉwawika
```

## 🐛 Debugging

Para ver información de debug en la consola:
1. Presiona **F12** para abrir DevTools
2. Ve a la pestaña **Console**
3. Verás mensajes como:
   - "✅ X voces disponibles para TTS"
   - "🇪🇸 X voces en español encontradas"
   - "Reproduciendo: [palabra]"

## 🔧 Mejoras futuras

- [ ] Soporte offline con voces descargadas
- [ ] Grabaciones nativas de hablantes Arhuaco
- [ ] Control de velocidad de reproducción
- [ ] Descarga de audio en MP3
- [ ] Modo de aprendizaje con repetición

## 📞 Soporte

Si tienes problemas:
1. Verifica que estés usando un navegador moderno
2. Revisa la consola del navegador (F12)
3. Prueba con Chrome/Edge
4. Asegúrate de que el backend esté corriendo

---

**Nota**: La síntesis de voz es una aproximación. Para pronunciación auténtica, se recomienda consultar con hablantes nativos del pueblo Arhuaco.
