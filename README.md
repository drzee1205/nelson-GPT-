# Nelson-GPT - Smart Pediatric Assistant

A production-ready Progressive Web App (PWA) designed exclusively for **pediatric healthcare professionals and medical students**. Nelson-GPT delivers evidence-based answers sourced solely from the Nelson Textbook of Pediatrics through a Retrieval-Augmented Generation (RAG) pipeline powered by the Mistral API for streaming responses and Hugging Face for embeddings.

## 🚀 Quick Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/nelson-gpt?referralCode=bonus)

*One-click deployment to Railway with automatic HTTPS, scaling, and monitoring.*

## 🎯 Features

### Core Functionality
- **RAG-Powered AI Assistant**: Evidence-based answers from Nelson Textbook of Pediatrics
- **Streaming Responses**: Real-time markdown-formatted responses via Mistral API
- **Drug Dosing Calculator**: Pediatric medication dosage calculator with 8+ common drugs
- **Content Library**: Searchable Nelson Textbook content organized by medical categories
- **Chat History**: Persistent conversation management with search and export

### Mobile-First Design
- **Progressive Web App**: Installable on smartphones with offline capabilities
- **ChatGPT-like UI/UX**: Familiar interface optimized for mobile healthcare professionals
- **Professional Color Scheme**: Charcoal (#121212), White (#FFFFFF), Soft Gray (#B0B0B0)
- **Touch-Optimized**: 44px minimum touch targets, gesture-friendly interactions
- **Safe Area Support**: iPhone notch and Android navigation bar compatibility

### Technical Excellence
- **Full-Stack Architecture**: React frontend + Flask backend
- **Real-time Streaming**: Server-sent events for live AI responses
- **Offline Support**: Service worker with background sync
- **Cross-Platform**: Works on iOS, Android, and desktop browsers
- **Production Ready**: Built with security, scalability, and performance in mind

## 🏗️ Architecture

```
Nelson-GPT/
├── nelson-gpt-frontend/          # React PWA Frontend
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── lib/                  # Zustand store & utilities
│   │   └── styles/               # Mobile-first CSS
│   ├── public/                   # PWA assets & manifest
│   └── dist/                     # Production build
│
└── nelson-gpt-backend/           # Flask Backend
    ├── src/
    │   ├── routes/               # API endpoints
    │   ├── models/               # Database models
    │   ├── static/               # Served frontend files
    │   └── main.py               # Flask application
    └── venv/                     # Python environment
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 20+
- pnpm package manager

### Environment Setup
1. **Clone and navigate to the project:**
   ```bash
   cd nelson-gpt
   ```

2. **Set up backend environment:**
   ```bash
   cd nelson-gpt-backend
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**
   ```bash
   # Create .env file with your API keys
   MISTRAL_API_KEY=your_mistral_api_key_here
   HUGGINGFACE_API_KEY=your_huggingface_api_key_here
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_KEY=your_supabase_key_here
   ```

### Development Mode
1. **Start the backend server:**
   ```bash
   cd nelson-gpt-backend
   source venv/bin/activate
   python src/main.py
   ```

2. **Start the frontend development server:**
   ```bash
   cd nelson-gpt-frontend
   pnpm install
   pnpm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

### Production Deployment
1. **Build the frontend:**
   ```bash
   cd nelson-gpt-frontend
   pnpm run build
   ```

2. **Copy build to backend:**
   ```bash
   cp -r dist/* ../nelson-gpt-backend/src/static/
   ```

3. **Run the integrated application:**
   ```bash
   cd nelson-gpt-backend
   source venv/bin/activate
   python src/main.py
   ```

4. **Access at:** http://localhost:5000

## 📱 PWA Installation

### On Mobile Devices
1. **Open in browser:** Navigate to the deployed URL
2. **Install prompt:** Tap "Install" when the banner appears
3. **Add to home screen:** Follow browser-specific installation steps
4. **Launch:** Use the app icon on your home screen

### Features After Installation
- **Offline access** to previously loaded content
- **Push notifications** for important updates
- **Native app experience** with full-screen mode
- **Background sync** when connection is restored

## 🔧 API Endpoints

### Chat & RAG
- `POST /api/chat/stream` - Stream AI responses
- `GET /api/rag/search` - Search Nelson Textbook content
- `POST /api/rag/query` - RAG-enhanced queries

### User Management
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication
- `GET /api/users/profile` - User profile

### Health Check
- `GET /api/health` - Service health status

## 🎨 Design System

### Color Palette
- **Primary Background:** #121212 (Charcoal)
- **Secondary Background:** #1E1E1E
- **Primary Text:** #FFFFFF (White)
- **Secondary Text:** #B0B0B0 (Soft Gray)
- **Accent Colors:** Blue (#007AFF), Green (#34C759), Red (#FF3B30)

### Typography
- **Font Family:** -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'
- **Mobile Sizes:** 16px base, 1.75rem h1, 1.5rem h2, 1.25rem h3
- **Line Height:** 1.5 for optimal readability

### Components
- **Touch Targets:** Minimum 44px for accessibility
- **Border Radius:** 12px for cards, 24px for inputs
- **Shadows:** Subtle depth with rgba(0,0,0,0.3)
- **Animations:** Smooth 0.3s transitions with ease-in-out

## 🔐 Security Features

- **API Key Management:** Environment-based configuration
- **CORS Protection:** Configured for cross-origin requests
- **Input Validation:** Sanitized user inputs
- **Rate Limiting:** API endpoint protection
- **Secure Headers:** CSP and security headers

## 📊 Performance Optimizations

- **Code Splitting:** Dynamic imports for reduced bundle size
- **Image Optimization:** WebP format with fallbacks
- **Caching Strategy:** Service worker with cache-first approach
- **Lazy Loading:** Components loaded on demand
- **Bundle Analysis:** 535KB main bundle (179KB gzipped)

## 🧪 Testing

### Manual Testing Completed
- ✅ PWA installation and offline functionality
- ✅ Mobile responsiveness across devices
- ✅ Chat interface and streaming responses
- ✅ Drug dosing calculator functionality
- ✅ Library search and content browsing
- ✅ Cross-browser compatibility

### Recommended Testing
- Unit tests for React components
- API endpoint testing
- Performance testing under load
- Accessibility compliance (WCAG 2.1)

## 🚀 Deployment Options

### Option 1: Railway (Recommended)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/nelson-gpt?referralCode=bonus)

**Benefits:**
- ✅ One-click deployment
- ✅ Automatic HTTPS & SSL
- ✅ Auto-scaling & monitoring
- ✅ Free $5 monthly credit
- ✅ Custom domain support

**Setup:**
1. Click the deploy button above
2. Connect your GitHub account
3. Set environment variables (API keys)
4. Deploy automatically builds and launches

### Option 2: Manual Deployment
- Use the detailed [DEPLOYMENT.md](DEPLOYMENT.md) guide
- Deploy to any cloud provider (AWS, GCP, Azure)
- Full control over infrastructure

### Option 3: Local Development
- Use the development servers for testing
- Hot reload for rapid development

### Production Deployment
- Build and serve through Flask backend
- Deploy to cloud platforms (Heroku, AWS, GCP)
- Use production WSGI server (Gunicorn)

### PWA Distribution
- Deploy to web server with HTTPS
- Configure proper MIME types for manifest
- Set up push notification service

## 📝 License & Usage

This application is designed for educational and professional use by pediatric healthcare professionals. Ensure compliance with medical software regulations in your jurisdiction.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Submit a pull request

## 📞 Support

For technical support or feature requests, please contact the development team or create an issue in the repository.

---

**Nelson-GPT** - Empowering pediatric healthcare professionals with AI-driven insights from the Nelson Textbook of Pediatrics.

