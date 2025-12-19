# ⚡ Quick Start Guide

Get your Child Illustration Personalizer running in 5 minutes!

## 🚀 Super Quick Setup

### 1. Install Dependencies
```bash
cd child-illustration-app
npm install
```

### 2. Get API Key

**Option A: Replicate (Recommended)**
1. Go to [replicate.com](https://replicate.com)
2. Sign up (free tier available)
3. Go to [API Tokens](https://replicate.com/account/api-tokens)
4. Create token → Copy it

**Option B: fal.ai**
1. Go to [fal.ai](https://fal.ai)
2. Sign up
3. Get API key from dashboard

### 3. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and paste your API key:
```env
REPLICATE_API_TOKEN=r8_your_actual_token_here
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Open Browser
Navigate to: [http://localhost:3000](http://localhost:3000)

## 🎨 First Test

1. **Upload a photo** (drag & drop or click)
2. **Choose a style** (e.g., "Cartoon Adventure")
3. **Click "Personalize Illustration"**
4. **Wait 30-60 seconds**
5. **Download your result!**

## 🐛 Troubleshooting

### "No AI service configured"
- Check your API key in `.env`
- Make sure it starts with correct prefix:
  - Replicate: `r8_...`
  - fal.ai: no specific prefix
- Restart server: `Ctrl+C` then `npm run dev`

### Upload not working
- Check file size < 10MB
- Use JPG, PNG, or WebP format
- Try different browser

### Processing takes forever
- First run is slower (models loading)
- Check internet connection
- Verify API key has credits

## 📤 Deploy to Vercel

### One Command Deploy
```bash
npm install -g vercel
vercel
```

Follow prompts, then add environment variables in Vercel dashboard!

## 🎯 What's Next?

- ✅ Read [README.md](README.md) for full documentation
- ✅ Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for production setup
- ✅ Customize illustration styles
- ✅ Add your own branding

## 💡 Tips

- **Better Results**: Use clear, front-facing photos
- **Faster Processing**: Choose styles wisely
- **Save Costs**: Implement rate limiting
- **Go Live**: Deploy to Vercel in minutes

## 🆘 Need Help?

1. Check console for errors (F12)
2. Review API service status
3. Test API keys: `node scripts/test-api.js`
4. Read troubleshooting sections

---

**You're all set! Start creating magical illustrations! ✨**
