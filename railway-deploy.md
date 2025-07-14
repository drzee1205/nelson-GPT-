# 🚀 Deploy Nelson-GPT to Railway

## One-Click Deployment

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/nelson-gpt?referralCode=bonus)

## Manual Deployment Steps

### 1. Prerequisites
- Railway account (sign up at [railway.app](https://railway.app))
- GitHub repository with Nelson-GPT code
- API keys for Mistral AI and Hugging Face

### 2. Environment Variables
After deployment, set these environment variables in Railway dashboard:

```
MISTRAL_API_KEY=your_mistral_api_key_here
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_key_here
PORT=5000
FLASK_ENV=production
```

### 3. Custom Domain (Optional)
1. Go to your Railway project dashboard
2. Click on "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### 4. Monitoring
- View logs in Railway dashboard
- Monitor resource usage
- Set up alerts for downtime

## Railway Configuration Files

The following files are included for Railway deployment:

- `railway.json` - Railway service configuration
- `nixpacks.toml` - Build configuration
- `Procfile` - Process definition

## Deployment Process

1. **Build Phase:**
   - Installs Node.js and Python dependencies
   - Builds React frontend
   - Copies build files to Flask static directory

2. **Runtime Phase:**
   - Starts Flask application with Gunicorn
   - Serves both API and frontend
   - Handles PWA requirements

## Post-Deployment Checklist

- ✅ Application loads successfully
- ✅ PWA install banner appears
- ✅ API endpoints respond correctly
- ✅ Environment variables are set
- ✅ Custom domain configured (if applicable)
- ✅ SSL certificate is active

## Troubleshooting

### Build Failures
- Check build logs in Railway dashboard
- Verify all dependencies are listed correctly
- Ensure environment variables are set

### Runtime Issues
- Check application logs
- Verify API keys are correct
- Test API endpoints individually

### PWA Issues
- Ensure HTTPS is enabled (automatic on Railway)
- Check manifest.json is accessible
- Verify service worker registration

## Scaling

Railway automatically handles:
- **Auto-scaling** based on traffic
- **Load balancing** across instances
- **Health checks** and restarts
- **SSL certificates** and renewals

## Cost Optimization

- Monitor usage in Railway dashboard
- Set spending limits if needed
- Use sleep mode for development deployments
- Optimize resource usage based on metrics

## Support

For Railway-specific issues:
- [Railway Documentation](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [Railway Support](https://railway.app/help)

---

**Note:** Railway provides $5 free credit monthly for hobby projects. Production deployments may require a paid plan.

