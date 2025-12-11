# Deployment Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Visit http://localhost:3000

## Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Your site is live!** 🎉

### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

## Deploy to Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Deploy**
   - Connect your GitHub repository
   - Netlify will auto-detect settings
   - Click "Deploy site"

## Environment Variables (Optional)

If you want to enable email notifications, add these in your hosting platform:

- `EMAIL_API_KEY` - Your email service API key
- `EMAIL_FROM` - Sender email address

## Data Storage

Currently, registrations are stored in `data/registrations.json`. 

**For production**, consider:
- **Vercel KV** (Redis) - Easy integration with Vercel
- **Supabase** - Free PostgreSQL database
- **MongoDB Atlas** - Free MongoDB database
- **PlanetScale** - Free MySQL database

## Custom Domain

Both Vercel and Netlify support custom domains:
- Add your domain in the dashboard
- Update DNS records as instructed
- SSL certificate is automatic

## Need Help?

- Check the [README.md](./README.md) for more details
- Contact: hichame.taoufik1@gmail.com

