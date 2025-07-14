import os
import sys
import json
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory, request, jsonify, Response
from flask_cors import CORS
from src.models.user import db
from src.routes.user import user_bp
from src.routes.chat import chat_bp
from src.routes.rag import rag_bp
from src.routes.frontend import frontend_bp

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))

# Configuration from environment variables
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['FLASK_ENV'] = os.environ.get('FLASK_ENV', 'production')

# Enable CORS for all routes
CORS(app, origins="*")

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(chat_bp, url_prefix='/api')
app.register_blueprint(rag_bp, url_prefix='/api')
app.register_blueprint(frontend_bp)

# Database configuration
database_url = os.environ.get('DATABASE_URL')
if database_url:
    # Handle Railway PostgreSQL URL format
    if database_url.startswith('postgres://'):
        database_url = database_url.replace('postgres://', 'postgresql://', 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
else:
    # Default to SQLite for development
    db_path = os.path.join(os.path.dirname(__file__), 'database', 'app.db')
    os.makedirs(os.path.dirname(db_path), exist_ok=True)
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Create database tables
with app.app_context():
    try:
        db.create_all()
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Error creating database tables: {e}")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404

@app.route('/api/health')
def health_check():
    """Enhanced health check endpoint for Railway monitoring"""
    try:
        # Test database connection
        with app.app_context():
            db.engine.execute('SELECT 1')
        
        return jsonify({
            "status": "healthy", 
            "message": "Nelson-GPT Backend is running",
            "database": "connected",
            "environment": app.config.get('FLASK_ENV', 'unknown')
        }), 200
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return jsonify({
            "status": "unhealthy",
            "message": "Nelson-GPT Backend has issues",
            "error": str(e)
        }), 503

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    host = os.environ.get('HOST', '0.0.0.0')
    debug = app.config['FLASK_ENV'] == 'development'
    
    logger.info(f"Starting Nelson-GPT on {host}:{port} (debug={debug})")
    app.run(host=host, port=port, debug=debug)
