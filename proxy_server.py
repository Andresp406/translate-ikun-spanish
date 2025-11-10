#!/usr/bin/env python3
"""
Servidor proxy para exponer el diccionario Ikʉn con ngrok
Sirve el frontend y proxy de peticiones al backend
"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.request
import urllib.error
import json
import os

class ProxyHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Cambiar al directorio frontend
        super().__init__(*args, directory='frontend', **kwargs)
    
    def do_GET(self):
        # Si la petición es para la API, hacer proxy al backend
        if self.path.startswith('/api/'):
            self.proxy_to_backend()
        else:
            # Servir archivos del frontend
            super().do_GET()
    
    def proxy_to_backend(self):
        """Hace proxy de las peticiones de la API al backend"""
        backend_url = f'http://localhost:8000{self.path}'
        
        try:
            # Hacer la petición al backend
            with urllib.request.urlopen(backend_url) as response:
                data = response.read()
                
                # Enviar respuesta al cliente
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(data)
                
        except urllib.error.URLError as e:
            # Error al conectar con el backend
            self.send_response(502)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            error_msg = json.dumps({
                'error': 'Backend no disponible',
                'details': str(e)
            }).encode()
            self.wfile.write(error_msg)
    
    def end_headers(self):
        # Agregar headers CORS para todas las respuestas
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def log_message(self, format, *args):
        """Override para logging personalizado"""
        print(f"[Proxy] {self.address_string()} - {format % args}")

if __name__ == '__main__':
    PORT = 5000
    
    print("=" * 60)
    print("🚀 Servidor Proxy - Diccionario Ikʉn ↔ Español")
    print("=" * 60)
    print(f"📡 Servidor corriendo en: http://localhost:{PORT}")
    print(f"🔗 Frontend: http://localhost:{PORT}/")
    print(f"🔗 API (proxy): http://localhost:{PORT}/api/...")
    print("")
    print("⚠️  Asegúrate de que el backend esté corriendo en el puerto 8000")
    print("")
    print("💡 Para exponer con ngrok: ngrok http 5000")
    print("=" * 60)
    print("")
    
    server = HTTPServer(('0.0.0.0', PORT), ProxyHandler)
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n\n✅ Servidor detenido")
        server.shutdown()
