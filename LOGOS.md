# 🎨 Logos y Branding - Diccionario Ikʉn

## 📋 Archivos Creados

### 1. **logo.svg** - Logo Principal
**Ubicación**: `frontend/logo.svg`  
**Dimensiones**: 200x200px  
**Formato**: SVG vectorial escalable

#### Elementos del Diseño:
- ✅ **Indígena Arhuaco estilizado**
  - Sombrero tradicional cónico con patrones geométricos
  - Rostro simplificado con expresión amigable
  - Túnica tradicional con decoraciones
  - Mochila Arhuaca (detalle lateral)
  
- ✅ **Paleta de Colores**
  - Gradiente azul (#0080FF → #00D4FF)
  - Gradiente púrpura (#8B5CF6 → #EC4899)
  - Gradiente teal (#06B6D4 → #10B981)
  - Tono piel: #FFA07A
  
- ✅ **Elementos Simbólicos**
  - Letra "I" en el centro (marca del diccionario)
  - Montañas estilizadas (Sierra Nevada)
  - Patrones tradicionales Arhuacos
  - Círculos concéntricos (cosmología)

#### Usos:
- Header de la aplicación (animado con bounce)
- Footer
- Redes sociales
- Material promocional

---

### 2. **favicon.svg** - Favicon
**Ubicación**: `frontend/favicon.svg`  
**Dimensiones**: 64x64px  
**Formato**: SVG optimizado para favicon

#### Características:
- Versión simplificada del logo principal
- Optimizado para tamaños pequeños (16x16, 32x32, 64x64)
- Elementos esenciales:
  - Sombrero Arhuaco
  - Rostro simplificado
  - Túnica con decoración
  - Letra "I" central

#### Usos:
- Pestaña del navegador
- Favoritos
- Barra de direcciones
- PWA icon (si se implementa)

---

### 3. **unimagdalena-logo.svg** - Logo Universidad
**Ubicación**: `frontend/unimagdalena-logo.svg`  
**Dimensiones**: 300x100px  
**Formato**: SVG vectorial

#### Elementos del Diseño:
- ✅ **Escudo institucional**
  - Forma de escudo tradicional
  - Libro abierto (educación)
  - Ondas del mar (río Magdalena)
  - Estrella dorada (excelencia)
  
- ✅ **Texto institucional**
  - "UNIVERSIDAD" (azul, bold)
  - "DEL MAGDALENA" (rojo, semibold)
  - Lema: "Conocimiento, Innovación y Transformación"
  - Ubicación: "Santa Marta, Colombia"
  
- ✅ **Colores institucionales**
  - Azul institucional: #1e40af → #3b82f6
  - Rojo institucional: #dc2626 → #ef4444
  - Dorado: #fbbf24

#### Usos:
- Footer de la aplicación
- Página "Acerca de"
- Documentación oficial
- Créditos del proyecto

---

## 🎨 Guía de Uso

### Integración en HTML

```html
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="favicon.svg">

<!-- Logo en Header -->
<img src="logo.svg" alt="Logo Ikʉn" class="w-20 h-20">

<!-- Logo Universidad en Footer -->
<img src="unimagdalena-logo.svg" alt="Universidad del Magdalena" class="h-20">
```

### Tamaños Recomendados

| Ubicación | Logo Principal | Favicon | Logo Universidad |
|-----------|---------------|---------|------------------|
| Header móvil | 56px (w-14) | - | - |
| Header desktop | 80px (w-20) | - | - |
| Footer | 40px (w-10) | - | 64-80px (h-16/20) |
| Favicon browser | - | 16px, 32px, 64px | - |

---

## 🎭 Significado Cultural

### Indígena Arhuaco
Representa al pueblo indígena de la Sierra Nevada de Santa Marta, guardianes de la lengua Ikʉn.

**Elementos tradicionales incluidos:**
1. **Sombrero cónico**: Símbolo distintivo Arhuaco
2. **Túnica blanca**: Vestimenta tradicional
3. **Patrones geométricos**: Inspirados en las mochilas Arhuacas
4. **Mochila**: Elemento cultural significativo

### Universidad del Magdalena
Institución de educación superior de Santa Marta, Colombia.

**Elementos representados:**
1. **Libro abierto**: Conocimiento y educación
2. **Ondas del mar**: Río Magdalena y mar Caribe
3. **Estrella**: Excelencia académica
4. **Colores**: Azul (seriedad), rojo (pasión)

---

## 🔧 Modificaciones

### Cambiar Colores del Logo Principal

Editar `logo.svg` gradientes:
```xml
<linearGradient id="grad1">
  <stop offset="0%" style="stop-color:#TU_COLOR"/>
  <stop offset="100%" style="stop-color:#TU_COLOR"/>
</linearGradient>
```

### Exportar a PNG

Para crear versiones PNG (si es necesario):
```bash
# Usando Inkscape
inkscape logo.svg --export-filename=logo.png --export-width=512

# Usando ImageMagick
convert -density 300 logo.svg -resize 512x512 logo.png
```

### Optimizar SVG

```bash
# Usando svgo (Node.js)
npx svgo logo.svg -o logo.min.svg
```

---

## 📱 Responsive

Los logos son completamente responsivos:
- SVG escala sin pérdida de calidad
- Se adaptan a cualquier resolución
- Soportan temas claro/oscuro
- Animaciones CSS compatibles

---

## ♿ Accesibilidad

- ✅ Incluyen atributo `alt` descriptivo
- ✅ Contraste adecuado en todos los elementos
- ✅ Funcionan sin JavaScript
- ✅ Compatible con lectores de pantalla

---

## 📄 Licencia

Los logos están diseñados específicamente para el proyecto "Diccionario Ikʉn" y su uso está restringido al contexto del proyecto educativo y cultural.

- **Logo Indígena Arhuaco**: Diseño original para el proyecto
- **Logo Universidad del Magdalena**: Representación estilizada con fines educativos

---

## 🎯 Checklist de Implementación

- [x] Logo principal creado (logo.svg)
- [x] Favicon creado (favicon.svg)
- [x] Logo Universidad creado (unimagdalena-logo.svg)
- [x] Integrado en HTML (header)
- [x] Integrado en HTML (footer)
- [x] Favicon añadido al <head>
- [x] Animaciones CSS aplicadas
- [x] Responsive verificado
- [x] Documentación completa

---

**Resultado**: Identidad visual completa, culturalmente significativa y técnicamente optimizada para el Diccionario Ikʉn.
