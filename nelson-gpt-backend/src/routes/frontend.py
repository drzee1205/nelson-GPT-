from flask import Blueprint, send_from_directory, current_app
import os

frontend_bp = Blueprint('frontend', __name__)

@frontend_bp.route('/')
def serve_index():
    """Serve the main React app"""
    return send_from_directory(current_app.static_folder, 'index.html')

@frontend_bp.route('/<path:path>')
def serve_static_files(path):
    """Serve static files or fallback to index.html for SPA routing"""
    static_file_path = os.path.join(current_app.static_folder, path)
    
    # If the file exists, serve it
    if os.path.exists(static_file_path):
        return send_from_directory(current_app.static_folder, path)
    
    # Otherwise, serve index.html for SPA routing
    return send_from_directory(current_app.static_folder, 'index.html')

@frontend_bp.route('/manifest.json')
def serve_manifest():
    """Serve PWA manifest"""
    return send_from_directory(current_app.static_folder, 'manifest.json')

@frontend_bp.route('/sw.js')
def serve_service_worker():
    """Serve service worker"""
    return send_from_directory(current_app.static_folder, 'sw.js')

@frontend_bp.route('/icon-<size>.png')
def serve_icons(size):
    """Serve PWA icons"""
    return send_from_directory(current_app.static_folder, f'icon-{size}.png')

