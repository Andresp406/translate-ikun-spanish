from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Optional
import json
import uvicorn

app = FastAPI(title="Diccionario Ikʉn ↔ Español API")

# Configurar CORS para permitir peticiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cargar el diccionario desde el archivo JSON
with open("diccionario-ikku.json", "r", encoding="utf-8") as f:
    diccionario_data = json.load(f)


def normalizar_texto(texto: str) -> str:
    """Normaliza el texto para búsqueda (minúsculas, sin espacios extras)"""
    return texto.lower().strip()


def buscar_en_seccion(seccion: List[Dict], palabra: str) -> List[Dict]:
    """Busca coincidencias en una sección del diccionario"""
    palabra_norm = normalizar_texto(palabra)
    resultados = []
    
    for item in seccion:
        ikun = item.get("ikʉn", "")
        espanol = item.get("espanol", "")
        
        # Buscar coincidencias parciales en ikʉn o español
        if palabra_norm in normalizar_texto(ikun) or palabra_norm in normalizar_texto(espanol):
            resultados.append(item)
    
    return resultados


@app.get("/")
def root():
    """Endpoint raíz con información de la API"""
    return {
        "mensaje": "API del Diccionario Ikʉn ↔ Español",
        "endpoints": {
            "/api/diccionario": "Obtener todo el diccionario",
            "/api/buscar?palabra=xxx": "Buscar una palabra",
            "/api/estadisticas": "Obtener estadísticas del diccionario"
        }
    }


@app.get("/api/diccionario")
def obtener_diccionario():
    """Devuelve el contenido completo del diccionario"""
    return diccionario_data


@app.get("/api/buscar")
def buscar_palabra(palabra: Optional[str] = None):
    """
    Busca coincidencias parciales en todo el diccionario
    
    Args:
        palabra: Palabra a buscar (en ikʉn o español)
    
    Returns:
        Lista de coincidencias encontradas
    """
    if not palabra or palabra.strip() == "":
        return {"resultados": [], "total": 0, "mensaje": "Por favor ingresa una palabra para buscar"}
    
    resultados = []
    
    # Buscar en todas las secciones del diccionario
    for seccion_nombre, seccion_contenido in diccionario_data.items():
        if isinstance(seccion_contenido, list):
            coincidencias = buscar_en_seccion(seccion_contenido, palabra)
            for item in coincidencias:
                # Agregar la sección a cada resultado
                resultado = item.copy()
                resultado["seccion"] = seccion_nombre
                resultados.append(resultado)
    
    return {
        "resultados": resultados,
        "total": len(resultados),
        "palabra_buscada": palabra
    }


@app.get("/api/estadisticas")
def obtener_estadisticas():
    """Devuelve estadísticas del diccionario"""
    estadisticas = {}
    total_entradas = 0
    
    for seccion_nombre, seccion_contenido in diccionario_data.items():
        if isinstance(seccion_contenido, list):
            cantidad = len(seccion_contenido)
            estadisticas[seccion_nombre] = cantidad
            total_entradas += cantidad
    
    return {
        "total_entradas": total_entradas,
        "por_seccion": estadisticas
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
