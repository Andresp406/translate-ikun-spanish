// Configuración de la API
// Usar la misma URL base para que funcione tanto localmente como con proxy/ngrok
const API_URL = window.location.origin.includes('ngrok') || window.location.origin.includes(':5000') 
    ? window.location.origin 
    : 'http://localhost:8000';

// Referencias a elementos del DOM
const searchInput = document.getElementById('search-input');
const clearButton = document.getElementById('clear-button');
const showAllButton = document.getElementById('show-all-button');
const clearResultsButton = document.getElementById('clear-results-button');
const resultsContainer = document.getElementById('results');
const resultsInfo = document.getElementById('results-info');
const resultsCount = document.getElementById('results-count');
const loadingIndicator = document.getElementById('loading');
const noResultsIndicator = document.getElementById('no-results');
const themeToggle = document.getElementById('theme-toggle');
const themeIconDark = document.getElementById('theme-icon-dark');
const themeIconLight = document.getElementById('theme-icon-light');
const statsSection = document.getElementById('stats-section');

// Referencias para el módulo de traducción
const translateInput = document.getElementById('translate-input');
const translateButton = document.getElementById('translate-button');
const translationResult = document.getElementById('translation-result');
const palabraIkun = document.getElementById('palabra-ikun');
const significadoIkun = document.getElementById('significado-ikun');
const btnVoz = document.getElementById('btn-voz');
const additionalTranslations = document.getElementById('additional-translations');

// Variable para almacenar el timeout de búsqueda
let searchTimeout;

// Variable para almacenar la última traducción
let currentTranslation = null;

// Inicializar síntesis de voz
const synth = window.speechSynthesis;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    // No cargar estadísticas al inicio
    setupEventListeners();
    setupTranslationListeners();
});

// Configurar event listeners
function setupEventListeners() {
    // Búsqueda en tiempo real
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        // Mostrar/ocultar botón de limpiar
        if (query) {
            clearButton.classList.remove('hidden');
        } else {
            clearButton.classList.add('hidden');
        }
        
        // Debounce: esperar 300ms después de que el usuario deje de escribir
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (query) {
                searchWord(query);
            } else {
                clearResults();
            }
        }, 300);
    });
    
    // Limpiar input
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        clearButton.classList.add('hidden');
        clearResults();
        searchInput.focus();
    });
    
    // Ver todo el diccionario
    showAllButton.addEventListener('click', showAllDictionary);
    
    // Limpiar resultados
    clearResultsButton.addEventListener('click', () => {
        clearResults();
        searchInput.value = '';
        clearButton.classList.add('hidden');
    });
    
    // Toggle tema
    themeToggle.addEventListener('click', toggleTheme);
}

// Configurar listeners para el módulo de traducción
function setupTranslationListeners() {
    // Traducir al presionar el botón
    translateButton.addEventListener('click', translateToIkun);
    
    // Traducir al presionar Enter
    translateInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            translateToIkun();
        }
    });
    
    // Reproducir voz
    btnVoz.addEventListener('click', speakIkunWord);
}

// Modo oscuro
function initTheme() {
    const isDark = localStorage.getItem('theme') === 'dark' || 
                   (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
        document.documentElement.classList.add('dark');
        themeIconLight.classList.add('hidden');
        themeIconDark.classList.remove('hidden');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    themeIconLight.classList.toggle('hidden');
    themeIconDark.classList.toggle('hidden');
}

// Cargar estadísticas
async function loadStatistics(currentResults = []) {
    try {
        const response = await fetch(`${API_URL}/api/estadisticas`);
        const data = await response.json();
        
        displayStatistics(data, currentResults);
    } catch (error) {
        console.error('Error al cargar estadísticas:', error);
    }
}

function displayStatistics(data, currentResults = []) {
    const seccionesNombres = {
        'vocabulario': 'Vocabulario',
        'pronombres_y_sufijos': 'Pronombres y Sufijos',
        'objetos': 'Objetos',
        'direcciones': 'Direcciones',
        'saludos_y_peticiones': 'Saludos y Peticiones',
        'numeros': 'Números',
        'colores': 'Colores'
    };
    
    // Mostrar la sección de estadísticas
    statsSection.classList.remove('hidden');
    
    statsSection.innerHTML = `
        <div class="glass-dark rounded-3xl p-6 md:p-8 card-shazam shadow-2xl fade-in cursor-pointer hover:ring-2 hover:ring-cyan-400" onclick="showAllDictionary()">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-white/60 text-xs md:text-sm font-semibold uppercase tracking-wide mb-2">Total de Palabras</p>
                    <p class="text-4xl md:text-5xl font-black text-white">${currentResults.length > 0 ? currentResults.length : data.total_entradas}</p>
                    ${currentResults.length > 0 ? '<p class="text-white/50 text-xs mt-1">en resultados actuales</p>' : '<p class="text-white/50 text-xs mt-1">Click para ver todas</p>'}
                </div>
                <div class="w-14 h-14 md:w-16 md:h-16 shazam-gradient-blue rounded-2xl flex items-center justify-center shadow-xl">
                    <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                    </svg>
                </div>
            </div>
        </div>
        <div class="glass-dark rounded-3xl p-6 md:p-8 card-shazam shadow-2xl fade-in">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg md:text-xl font-bold text-white">Categorías</h3>
                <div class="w-10 h-10 md:w-12 md:h-12 shazam-gradient-purple rounded-2xl flex items-center justify-center">
                    <svg class="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                    </svg>
                </div>
            </div>
            <div class="space-y-3">
                ${Object.entries(data.por_seccion)
                    .slice(0, 3)
                    .map(([key, value]) => `
                        <div class="flex justify-between items-center cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-all" onclick="filterByCategory('${key}')">
                            <span class="text-white/70 font-medium text-sm md:text-base">${seccionesNombres[key] || key}</span>
                            <span class="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full font-bold text-white text-sm transition-all">${value}</span>
                        </div>
                    `).join('')}
                ${Object.keys(data.por_seccion).length > 3 ? 
                    `<button onclick="showAllCategories()" class="text-white/50 hover:text-white/80 text-xs md:text-sm mt-3 font-medium transition-colors">+ Ver ${Object.keys(data.por_seccion).length - 3} categorías más</button>` : ''}
            </div>
        </div>
        <div class="glass-dark rounded-3xl p-6 md:p-8 card-shazam shadow-2xl fade-in cursor-pointer hover:ring-2 hover:ring-teal-400" onclick="toggleCategoriesInfo()">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-white/60 text-xs md:text-sm font-semibold uppercase tracking-wide mb-2">Secciones</p>
                    <p class="text-4xl md:text-5xl font-black text-white">${Object.keys(data.por_seccion).length}</p>
                    <p class="text-white/50 text-xs mt-1">Click para detalles</p>
                </div>
                <div class="w-14 h-14 md:w-16 md:h-16 shazam-gradient-teal rounded-2xl flex items-center justify-center shadow-xl">
                    <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                    </svg>
                </div>
            </div>
        </div>
    `;
}

// Buscar palabra
async function searchWord(query) {
    showLoading();
    
    try {
        const response = await fetch(`${API_URL}/api/buscar?palabra=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        displayResults(data.resultados, data.palabra_buscada);
    } catch (error) {
        console.error('Error al buscar:', error);
        showError('Error al conectar con el servidor. Asegúrate de que el backend esté corriendo.');
    }
}

// Mostrar todo el diccionario
async function showAllDictionary() {
    showLoading();
    
    try {
        const response = await fetch(`${API_URL}/api/diccionario`);
        const data = await response.json();
        
        // Convertir el objeto en un array de resultados
        const allResults = [];
        for (const [seccion, items] of Object.entries(data)) {
            if (Array.isArray(items)) {
                items.forEach(item => {
                    allResults.push({
                        ...item,
                        seccion: seccion
                    });
                });
            }
        }
        
        displayResults(allResults, 'Todo el diccionario');
    } catch (error) {
        console.error('Error al cargar diccionario:', error);
        showError('Error al conectar con el servidor. Asegúrate de que el backend esté corriendo.');
    }
}

// Mostrar resultados
function displayResults(results, searchTerm) {
    hideLoading();
    
    if (results.length === 0) {
        showNoResults();
        return;
    }
    
    // Cargar y mostrar estadísticas después de buscar
    loadStatistics(results);
    
    // Mostrar información de resultados
    resultsInfo.classList.remove('hidden');
    resultsCount.textContent = searchTerm === 'Todo el diccionario' 
        ? `${results.length} palabras en total`
        : `${results.length} resultado${results.length !== 1 ? 's' : ''} para "${searchTerm}"`;
    
    clearResultsButton.classList.remove('hidden');
    noResultsIndicator.classList.add('hidden');
    
    // Generar HTML de resultados - Estilo Shazam
    resultsContainer.innerHTML = results.map((item, index) => {
        const seccionNombres = {
            'vocabulario': 'Vocabulario',
            'pronombres_y_sufijos': 'Pronombres',
            'objetos': 'Objetos',
            'direcciones': 'Direcciones',
            'saludos_y_peticiones': 'Saludos',
            'numeros': 'Números',
            'colores': 'Colores'
        };
        
        const gradientes = [
            'shazam-gradient-blue',
            'shazam-gradient-purple',
            'shazam-gradient-teal',
            'shazam-gradient'
        ];
        const gradiente = gradientes[index % gradientes.length];
        
        return `
            <div class="glass-dark rounded-3xl p-6 card-shazam fade-in shadow-xl" style="animation-delay: ${index * 0.05}s">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                        <h3 class="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">${item.ikʉn || 'N/A'}</h3>
                        <p class="text-base md:text-lg text-white/80 font-medium">${item.espanol || 'N/A'}</p>
                    </div>
                    <button onclick="speakWord('${(item.ikʉn || '').replace(/'/g, "\\'")}')"
                            class="p-3 ${gradiente} rounded-2xl hover:scale-110 transition-all duration-300 shadow-lg">
                        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                ${item.seccion ? `
                    <div class="mt-4 pt-4 border-t border-white/10">
                        <span class="inline-block px-4 py-1.5 text-xs font-bold text-white bg-white/10 rounded-full backdrop-blur-sm">
                            ${seccionNombres[item.seccion] || item.seccion}
                        </span>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Limpiar resultados
function clearResults() {
    resultsContainer.innerHTML = '';
    resultsInfo.classList.add('hidden');
    noResultsIndicator.classList.add('hidden');
    clearResultsButton.classList.add('hidden');
}

// Mostrar loading
function showLoading() {
    loadingIndicator.classList.remove('hidden');
    resultsContainer.innerHTML = '';
    noResultsIndicator.classList.add('hidden');
    resultsInfo.classList.add('hidden');
}

// Ocultar loading
function hideLoading() {
    loadingIndicator.classList.add('hidden');
}

// Mostrar sin resultados
function showNoResults() {
    noResultsIndicator.classList.remove('hidden');
    resultsInfo.classList.add('hidden');
    clearResultsButton.classList.add('hidden');
}

// Mostrar error
function showError(message) {
    hideLoading();
    resultsContainer.innerHTML = `
        <div class="col-span-full bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            <p class="font-bold">Error</p>
            <p>${message}</p>
        </div>
    `;
}

// ========== MÓDULO DE TRADUCCIÓN CON VOZ ==========

// Traducir de Español a Ikʉn
async function translateToIkun() {
    const palabra = translateInput.value.trim();
    
    if (!palabra) {
        showNotification('✏️ Por favor, escribe una palabra en español', 'error');
        return;
    }
    
    try {
        // Buscar la palabra en el backend
        const response = await fetch(`${API_URL}/api/buscar?palabra=${encodeURIComponent(palabra)}`);
        const data = await response.json();
        
        if (data.resultados && data.resultados.length > 0) {
            // Mostrar el primer resultado
            const primeraTraduccion = data.resultados[0];
            currentTranslation = primeraTraduccion;
            
            // Mostrar la traducción principal
            palabraIkun.textContent = primeraTraduccion.ikʉn || 'No disponible';
            significadoIkun.textContent = `Español: ${primeraTraduccion.espanol || 'No disponible'}`;
            
            // Mostrar resultados adicionales si existen - Estilo Shazam
            if (data.resultados.length > 1) {
                additionalTranslations.innerHTML = `
                    <div class="border-t border-white/20 pt-4 mt-4">
                        <p class="text-white/70 text-xs md:text-sm font-bold mb-3 uppercase tracking-wide">✨ Otras traducciones</p>
                        ${data.resultados.slice(1).map((item, idx) => `
                            <div class="flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-2xl px-4 py-3 mb-2 transition-all duration-300 group">
                                <div class="flex-1">
                                    <span class="text-white font-bold text-base md:text-lg">${item.ikʉn}</span>
                                    <span class="text-white/60 text-sm md:text-base ml-2">→</span>
                                    <span class="text-white/70 text-sm md:text-base ml-1">${item.espanol}</span>
                                </div>
                                <button onclick="speakWord('${item.ikʉn.replace(/'/g, "\\'")}')"
                                        class="ml-3 p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 group-hover:scale-110">
                                    <svg class="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                additionalTranslations.innerHTML = '';
            }
            
            // Mostrar el contenedor de resultados
            translationResult.classList.remove('hidden');
            
            // No reproducir automáticamente - dejar que el usuario haga clic
            // setTimeout(() => speakIkunWord(), 500);
            
        } else {
            // No se encontraron resultados
            translationResult.classList.remove('hidden');
            palabraIkun.textContent = '❌ No encontrado';
            significadoIkun.textContent = `No se encontró traducción para "${palabra}"`;
            additionalTranslations.innerHTML = '';
            currentTranslation = null;
        }
        
    } catch (error) {
        console.error('Error al traducir:', error);
        alert('Error al conectar con el servidor. Asegúrate de que el backend esté corriendo.');
    }
}

// Reproducir pronunciación de la palabra actual
function speakIkunWord() {
    if (!currentTranslation || !currentTranslation.ikʉn) {
        showNotification('⚠️ No hay traducción para reproducir', 'error');
        return;
    }
    
    speakWord(currentTranslation.ikʉn);
}

// Función auxiliar para reproducir cualquier palabra
function speakWord(text) {
    // Verificar si el navegador soporta síntesis de voz
    if (!synth) {
        showNotification('Tu navegador no soporta síntesis de voz (Text-to-Speech)', 'error');
        return;
    }
    
    // Cancelar cualquier síntesis en curso
    synth.cancel();
    
    // Esperar un momento para asegurar que se canceló
    setTimeout(() => {
        try {
            // Crear el utterance
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Obtener voces disponibles
            let voices = synth.getVoices();
            
            // Si no hay voces, esperar a que se carguen
            if (voices.length === 0) {
                synth.addEventListener('voiceschanged', () => {
                    voices = synth.getVoices();
                    setupAndSpeak(utterance, voices, text);
                });
            } else {
                setupAndSpeak(utterance, voices, text);
            }
        } catch (error) {
            console.error('Error al inicializar síntesis de voz:', error);
            showNotification('Error al reproducir el audio', 'error');
        }
    }, 100);
}

// Configurar y reproducir el utterance
function setupAndSpeak(utterance, voices, text) {
    // Intentar encontrar una voz en español
    const spanishVoice = voices.find(voice => 
        voice.lang.includes('es') || 
        voice.lang.includes('ES') ||
        voice.lang.includes('spa')
    ) || voices[0]; // Si no hay voz en español, usar la primera disponible
    
    if (spanishVoice) {
        utterance.voice = spanishVoice;
        utterance.lang = spanishVoice.lang;
    } else {
        utterance.lang = 'es-ES'; // Español por defecto
    }
    
    // Configurar parámetros de voz
    utterance.rate = 0.75;  // Velocidad más lenta para mejor pronunciación
    utterance.pitch = 1.0;  // Tono normal
    utterance.volume = 1.0; // Volumen máximo
    
    // Feedback visual
    const speakerButton = document.querySelector('#btn-voz, [onclick*="speakWord"]');
    if (speakerButton) {
        speakerButton.classList.add('animate-pulse');
    }
    
    utterance.onstart = () => {
        console.log('Reproduciendo:', text);
        showNotification(`🔊 Reproduciendo: ${text}`, 'info');
    };
    
    utterance.onend = () => {
        if (speakerButton) {
            speakerButton.classList.remove('animate-pulse');
        }
        console.log('Reproducción completada');
    };
    
    utterance.onerror = (event) => {
        console.error('Error en la síntesis de voz:', event);
        if (speakerButton) {
            speakerButton.classList.remove('animate-pulse');
        }
        
        // Mostrar un mensaje más específico según el tipo de error
        let mensaje = 'Error al reproducir el audio.';
        if (event.error === 'not-allowed') {
            mensaje = 'Permiso denegado. Interactúa con la página primero.';
        } else if (event.error === 'network') {
            mensaje = 'Error de red al cargar la voz.';
        }
        
        showNotification(mensaje, 'error');
    };
    
    // Reproducir
    try {
        synth.speak(utterance);
    } catch (error) {
        console.error('Error al ejecutar speak():', error);
        showNotification('Error al reproducir. Intenta de nuevo.', 'error');
    }
}

// Mostrar notificación temporal
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-0 ${
        type === 'error' ? 'bg-red-500' : 
        type === 'success' ? 'bg-green-500' : 
        'bg-blue-500'
    } text-white font-semibold`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Inicializar voces al cargar
function initVoices() {
    // Obtener voces disponibles
    const voices = synth.getVoices();
    if (voices.length > 0) {
        console.log(`✅ ${voices.length} voces disponibles para TTS`);
        const spanishVoices = voices.filter(v => v.lang.includes('es') || v.lang.includes('ES'));
        if (spanishVoices.length > 0) {
            console.log(`🇪🇸 ${spanishVoices.length} voces en español encontradas`);
        }
    }
}

// Cargar las voces disponibles cuando estén listas
if (synth) {
    // Intentar cargar inmediatamente
    initVoices();
    
    // Y también cuando cambien (algunos navegadores las cargan asíncronamente)
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = initVoices;
    }
}

// ========== FUNCIONES INTERACTIVAS PARA ESTADÍSTICAS ==========

// Filtrar por categoría
async function filterByCategory(categoria) {
    showLoading();
    
    try {
        const response = await fetch(`${API_URL}/api/diccionario`);
        const data = await response.json();
        
        const seccionData = data[categoria];
        if (seccionData && Array.isArray(seccionData)) {
            const results = seccionData.map(item => ({
                ...item,
                seccion: categoria
            }));
            
            const seccionesNombres = {
                'vocabulario': 'Vocabulario',
                'pronombres_y_sufijos': 'Pronombres',
                'objetos': 'Objetos',
                'direcciones': 'Direcciones',
                'saludos_y_peticiones': 'Saludos',
                'numeros': 'Números',
                'colores': 'Colores'
            };
            
            displayResults(results, seccionesNombres[categoria] || categoria);
            showNotification(`📂 Mostrando: ${seccionesNombres[categoria] || categoria}`, 'info');
        }
    } catch (error) {
        console.error('Error al filtrar:', error);
        showError('Error al filtrar por categoría');
    }
}

// Mostrar todas las categorías
async function showAllCategories() {
    try {
        const response = await fetch(`${API_URL}/api/estadisticas`);
        const data = await response.json();
        
        const seccionesNombres = {
            'vocabulario': 'Vocabulario',
            'pronombres_y_sufijos': 'Pronombres y Sufijos',
            'objetos': 'Objetos',
            'direcciones': 'Direcciones',
            'saludos_y_peticiones': 'Saludos y Peticiones',
            'numeros': 'Números',
            'colores': 'Colores'
        };
        
        // Crear contenido HTML para el modal
        let content = '<div class="space-y-4">';
        
        Object.entries(data.por_seccion).forEach(([key, value]) => {
            content += `
                <div class="glass rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer group" onclick="filterByCategory('${key}'); closeModal();">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 rounded-xl shazam-gradient-purple flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                                </svg>
                            </div>
                            <span class="text-lg font-semibold text-white">${seccionesNombres[key] || key}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="px-4 py-2 rounded-xl bg-white/20 font-bold text-white text-sm">${value}</span>
                            <svg class="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            `;
        });
        
        content += '</div>';
        content += `<div class="mt-6 p-4 glass-dark rounded-2xl border border-white/10"><p class="text-white/70 text-sm text-center"><strong class="text-white">Total:</strong> ${data.total_entradas} palabras en ${Object.keys(data.por_seccion).length} categorías</p></div>`;
        
        openModal('Todas las Categorías', content, '📂');
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al cargar categorías', 'error');
    }
}

// Toggle información de categorías
function toggleCategoriesInfo() {
    showAllCategories();
}

// ========== SISTEMA DE MODAL PERSONALIZADO ==========

function openModal(title, content, icon = '📊') {
    const modal = document.getElementById('custom-modal');
    const modalContent = document.getElementById('modal-content');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalIcon = document.getElementById('modal-icon');
    
    // Configurar contenido
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modalIcon.querySelector('span').textContent = icon;
    
    // Mostrar modal con animación
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Animar entrada
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 10);
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('custom-modal');
    const modalContent = document.getElementById('modal-content');
    
    // Animar salida
    modalContent.style.transform = 'scale(0.95)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
