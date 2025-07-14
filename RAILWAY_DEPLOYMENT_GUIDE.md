# Nelson-GPT Railway Deployment Guide

## 🚀 Quick Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/your-template-id)

## 📋 Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **API Keys**: Obtain the following API keys:
   - Mistral AI API Key
   - OpenAI API Key (optional)
   - Supabase URL and Anon Key

## 🔧 Environment Variables Setup

In your Railway project dashboard, add these environment variables:

### Required Variables
```bash
MISTRAL_API_KEY=your_mistral_api_key_here
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SECRET_KEY=your_secure_secret_key_here
```

### Optional Variables
```bash
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_API_BASE=https://api.openai.com/v1
DATABASE_URL=postgresql://user:pass@host:port/db  # Railway will auto-provide if you add PostgreSQL
FLASK_ENV=production
PORT=5000  # Railway will auto-set this
HOST=0.0.0.0
```

## 🗄️ Database Setup

### Option 1: PostgreSQL (Recommended for Production)
1. In Railway dashboard, click "Add Service" → "Database" → "PostgreSQL"
2. Railway will automatically set the `DATABASE_URL` environment variable
3. Your app will automatically use PostgreSQL

### Option 2: SQLite (Default)
- No additional setup required
- Uses local SQLite database (data may not persist across deployments)

## 🏗️ Deployment Process

### Automatic Deployment
1. Fork this repository
2. Connect your Railway project to your GitHub repository
3. Railway will automatically:
   - Detect the `nixpacks.toml` configuration
   - Install dependencies (Node.js, Python, pnpm)
   - Build the React frontend
   - Copy frontend assets to backend static folder
   - Install Python dependencies
   - Start the application with Gunicorn

### Manual Deployment
```bash
# Clone the repository
git clone https://github.com/your-username/nelson-gpt.git
cd nelson-gpt

# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy
railway up
```

## 🔍 Health Check

Your deployment includes a health check endpoint at `/api/health` that:
- Tests database connectivity
- Reports application status
- Provides environment information

Railway will automatically monitor this endpoint.

## 📁 Project Structure

```
nelson-gpt/
├── nelson-gpt-frontend/     # React frontend (Vite)
├── nelson-gpt-backend/      # Flask backend
│   ├── src/
│   │   ├── main.py         # Main application
│   │   ├── routes/         # API routes
│   │   ├── models/         # Database models
│   │   └── static/         # Frontend build output
│   ├── requirements-cpu.txt # Python dependencies
│   ├── gunicorn.conf.py    # Production server config
│   └── .env.example        # Environment template
├── nixpacks.toml           # Railway build configuration
└── railway.json            # Railway deployment settings
```

## 🔧 Configuration Files

### nixpacks.toml
Defines the build and deployment process:
- Sets up Node.js 20, Python 3.11, and pnpm
- Installs frontend and backend dependencies
- Builds React app and copies to backend static folder
- Starts application with Gunicorn

### gunicorn.conf.py
Production WSGI server configuration:
- Auto-scales workers based on CPU count
- Configures logging and error handling
- Sets up proper timeouts and connection handling

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**: Check that all environment variables are set
2. **Database Connection Error**: Ensure DATABASE_URL is correct or PostgreSQL service is added
3. **Static Files Not Loading**: Verify frontend build completed successfully
4. **API Errors**: Check application logs in Railway dashboard

### Debugging Commands
```bash
# View logs
railway logs

# Check environment variables
railway variables

# Connect to database (if PostgreSQL)
railway connect postgres
```

## 🔒 Security Notes

1. **Never commit `.env` files** - Use Railway's environment variables
2. **Use strong SECRET_KEY** - Generate a secure random key
3. **API Keys** - Store all API keys in Railway environment variables
4. **CORS** - Currently set to allow all origins; restrict in production

## 📊 Monitoring

Railway provides built-in monitoring:
- Application metrics
- Resource usage
- Health check status
- Deployment history

## 🔄 Updates

To update your deployment:
1. Push changes to your connected GitHub repository
2. Railway will automatically redeploy
3. Monitor the deployment in Railway dashboard

## 📞 Support

- **Railway Documentation**: [docs.railway.app](https://docs.railway.app)
- **Project Issues**: Create an issue in this repository
- **Railway Community**: [Discord](https://discord.gg/railway)

---

## 🎯 Production Checklist

- [ ] All environment variables configured
- [ ] Database service added (PostgreSQL recommended)
- [ ] Health check endpoint responding
- [ ] Static files serving correctly
- [ ] API endpoints functional
- [ ] Logs showing no errors
- [ ] Domain configured (optional)
- [ ] SSL certificate active (automatic with Railway)

Your Nelson-GPT application should now be running successfully on Railway! 🎉

