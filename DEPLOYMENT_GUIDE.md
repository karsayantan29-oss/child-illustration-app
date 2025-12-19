# 🚀 Deployment Guide

Complete guide for deploying your Child Illustration Personalizer to Vercel.

## Prerequisites

- Git repository (GitHub, GitLab, or Bitbucket)
- Vercel account ([sign up free](https://vercel.com/signup))
- API keys from Replicate or fal.ai

## Method 1: Vercel Dashboard (Recommended)

### Step 1: Push to Git

```bash
cd child-illustration-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-repo-url
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your Git provider (GitHub/GitLab/Bitbucket)
4. Choose your repository
5. Click "Import"

### Step 3: Configure Project

**Framework Preset:** Next.js (auto-detected)

**Build Settings:**
- Build Command: `next build`
- Output Directory: `.next`
- Install Command: `npm install`

### Step 4: Add Environment Variables

In the deployment configuration:

1. Click "Environment Variables"
2. Add your variables:

```
Name: REPLICATE_API_TOKEN
Value: r8_your_token_here
Environment: Production, Preview, Development
```

And/or:

```
Name: FAL_KEY
Value: your_fal_key_here
Environment: Production, Preview, Development
```

3. Click "Deploy"

### Step 5: Wait for Deployment

- First deployment takes 2-5 minutes
- You'll get a URL like `your-project.vercel.app`
- Vercel automatically sets up SSL certificate

## Method 2: Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

### Step 3: Deploy

```bash
cd child-illustration-app
vercel
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Your account
- **Link to existing project?** No
- **Project name?** child-illustration-app (or your choice)
- **Directory?** ./
- **Override settings?** No

### Step 4: Add Environment Variables

```bash
vercel env add REPLICATE_API_TOKEN
# Paste your token when prompted
# Select: Production, Preview, Development

vercel env add FAL_KEY
# Paste your key when prompted
# Select: Production, Preview, Development
```

### Step 5: Redeploy

```bash
vercel --prod
```

## Method 3: GitHub Integration (Auto-Deploy)

### Step 1: Connect Repository

1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Add environment variables
5. Deploy

### Step 2: Auto-Deploy Setup

Vercel automatically:
- Deploys on every push to main branch
- Creates preview deployments for pull requests
- Runs builds in isolated environments

### Configuration

Create `.github/workflows/deploy.yml` (optional):
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Post-Deployment

### Verify Deployment

1. **Check Deployment Status**
   - Go to Vercel dashboard
   - View deployment logs
   - Check for errors

2. **Test the Application**
   - Open deployed URL
   - Upload a test photo
   - Verify AI processing works
   - Test download functionality

3. **Monitor Performance**
   - Check function execution time
   - Monitor API usage
   - Review error logs

### Custom Domain (Optional)

1. **Add Domain in Vercel:**
   - Go to Project Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions

2. **Configure DNS:**
   ```
   Type: CNAME
   Name: www (or @)
   Value: cname.vercel-dns.com
   ```

3. **Wait for SSL:**
   - Vercel automatically provisions SSL
   - Usually takes 5-10 minutes

## Environment Variables Management

### Production vs Development

```bash
# Production only
vercel env add REPLICATE_API_TOKEN production

# Development only
vercel env add REPLICATE_API_TOKEN development

# Preview (for PR branches)
vercel env add REPLICATE_API_TOKEN preview
```

### Pull Environment Variables Locally

```bash
vercel env pull
```

This creates `.env.local` with your Vercel environment variables.

## Troubleshooting

### Build Fails

**Error:** "Module not found"
```bash
# Solution: Ensure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

**Error:** "Function timeout"
```json
// Add to vercel.json
{
  "functions": {
    "pages/api/**/*.ts": {
      "maxDuration": 60
    }
  }
}
```

### Runtime Errors

**Error:** "Environment variable not found"
- Check Vercel dashboard → Settings → Environment Variables
- Ensure variable is added to correct environment
- Redeploy after adding variables

**Error:** "API request failed"
- Verify API keys are correct
- Check API service status (Replicate/fal.ai)
- Review function logs in Vercel dashboard

### Performance Issues

**Slow Function Execution:**
1. Check AI service response time
2. Consider upgrading Vercel plan for more function duration
3. Implement caching for repeated requests

**High Costs:**
1. Monitor AI API usage in provider dashboard
2. Implement rate limiting
3. Add authentication to prevent abuse

## Scaling Considerations

### Free Tier Limits
- 100GB bandwidth/month
- 100 hours function execution
- Unlimited deployments

### Pro Plan Benefits ($20/month)
- 1TB bandwidth
- 1000 hours function execution
- Advanced analytics
- Better DDoS protection

### Enterprise
- Custom limits
- SLA guarantees
- Priority support

## Monitoring & Analytics

### Built-in Vercel Analytics

Enable in project settings:
```bash
vercel analytics
```

### Custom Analytics

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Error Tracking

Install Sentry:
```bash
npm install @sentry/nextjs
```

Configure:
```bash
npx @sentry/wizard@latest -i nextjs
```

## Security Checklist

- [ ] Environment variables set (not in code)
- [ ] API keys have restricted permissions
- [ ] CORS configured properly
- [ ] File upload validation enabled
- [ ] Rate limiting implemented (optional)
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Security headers configured

Add to `next.config.js`:
```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}
```

## Maintenance

### Update Dependencies

```bash
npm update
npm audit fix
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### Monitor Costs

- Check Vercel usage dashboard monthly
- Monitor AI API usage (Replicate/fal.ai)
- Set up billing alerts

### Backup Strategy

- Git repository contains all code
- Consider backing up user-generated illustrations
- Document environment variable values securely

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Replicate Docs](https://replicate.com/docs)
- [fal.ai Docs](https://fal.ai/docs)

---

**Need Help?** Check Vercel's excellent support or community forums.
