# 🚀 Complete Deployment Guide

Step-by-step guide to deploy your MAIA Workshop website to production.

## Prerequisites Checklist

Before deploying, make sure you have:
- [x] A GitHub account
- [x] A Vercel account (free) - [Sign up here](https://vercel.com)
- [x] A Resend account (free) - [Sign up here](https://resend.com)
- [x] Resend API key ready
- [x] Your code tested locally

---

## Part 1: Get Your Resend API Key (5 minutes)

### 1.1 Create Resend Account
1. Go to [https://resend.com/signup](https://resend.com/signup)
2. Sign up with your email
3. Verify your email address

### 1.2 Generate API Key
1. Log in to Resend
2. Go to **API Keys** section
3. Click **"Create API Key"**
4. Name it: `MAIA Workshop Production`
5. Select **"Sending access"**
6. Click **"Create"**
7. **IMPORTANT**: Copy the key (starts with `re_`) - you can't see it again!

### 1.3 Note Your Email Settings
For production, you'll use:
- **RESEND_API_KEY**: `re_xxxxxxxxxxxxx` (the key you just copied)
- **EMAIL_FROM**: `onboarding@resend.dev` (for testing)
- **ADMIN_EMAIL**: `hichame.taoufik1@gmail.com`

> 💡 **Tip**: For production with your own domain, see the [Custom Domain Setup](#custom-domain-setup) section below.

---

## Part 2: Push Code to GitHub (5 minutes)

### 2.1 Initialize Git Repository
```bash
# Navigate to your project directory
cd C:\Users\hicha\Downloads\workshop

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - MAIA 2025 Workshop Website"
```

### 2.2 Create GitHub Repository
1. Go to [https://github.com/new](https://github.com/new)
2. Name: `maia-workshop` (or any name you prefer)
3. Description: `MAIA 2025 Professional AI Workshops Registration`
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README (you already have one)
6. Click **"Create repository"**

### 2.3 Push to GitHub
```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/maia-workshop.git

# Rename branch to main
git branch -M main

# Push code
git push -u origin main
```

---

## Part 3: Deploy to Vercel (5 minutes)

### 3.1 Connect Vercel to GitHub
1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel

### 3.2 Import Your Project
1. Click **"New Project"** or **"Add New..."** → **"Project"**
2. Find your repository: `maia-workshop`
3. Click **"Import"**

### 3.3 Configure Project
Vercel will auto-detect Next.js settings:
- **Framework Preset**: Next.js ✅ (auto-detected)
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `.next` ✅

**DO NOT DEPLOY YET!** We need to add environment variables first.

### 3.4 Add Environment Variables
1. Expand **"Environment Variables"** section
2. Add three variables:

**Variable 1:**
- Name: `RESEND_API_KEY`
- Value: `re_your_api_key_here` (paste your Resend API key)

**Variable 2:**
- Name: `EMAIL_FROM`
- Value: `onboarding@resend.dev`

**Variable 3:**
- Name: `ADMIN_EMAIL`
- Value: `hichame.taoufik1@gmail.com`

3. Click **"Deploy"**

### 3.5 Wait for Deployment
- Vercel will build and deploy your site (takes 2-3 minutes)
- You'll see a progress screen
- Once done, you'll get a URL like: `https://maia-workshop-abc123.vercel.app`

### 3.6 Test Your Website
1. Click **"Visit"** or open the URL
2. Test registration form
3. Check if confirmation email arrives
4. Test contact form
5. Check admin email for contact form message

---

## Part 4: Custom Domain (Optional)

### 4.1 Add Custom Domain to Vercel
1. Go to your project **Settings** → **Domains**
2. Enter your domain: `workshop.yourdomain.com`
3. Follow DNS configuration instructions

### 4.2 Configure Custom Email Domain in Resend
1. Go to [Resend Domains](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter your domain: `yourdomain.com`
4. Add DNS records (TXT, MX, CNAME)
5. Wait for verification (usually 5-30 minutes)
6. Once verified, update Vercel environment variable:
   - `EMAIL_FROM` = `noreply@yourdomain.com`
7. Redeploy on Vercel

---

## Part 5: Post-Deployment Checklist

After deployment, verify everything works:

### ✅ Website Pages
- [ ] Homepage loads correctly
- [ ] Registration form works
- [ ] About page displays properly
- [ ] Conference page shows info
- [ ] FAQ page is accessible
- [ ] Contact page loads
- [ ] Admin dashboard accessible at `/admin`

### ✅ Email Functionality
- [ ] Register on form → receive confirmation email
- [ ] Confirmation email has correct details
- [ ] Contact form sends email to admin
- [ ] No errors in browser console

### ✅ Admin Dashboard
- [ ] Can view registrations at `/admin`
- [ ] Export CSV works
- [ ] Search and filter work

### ✅ Mobile Responsive
- [ ] Test on mobile device or Chrome DevTools
- [ ] All pages display correctly
- [ ] Forms are usable on mobile

---

## Monitoring & Maintenance

### View Deployment Logs
1. Go to Vercel dashboard
2. Your project → **Deployments**
3. Click on any deployment to see logs

### Check Email Logs
1. Go to [Resend Dashboard](https://resend.com/emails)
2. View all sent emails
3. Check delivery status
4. Debug any failures

### Update Environment Variables
If you need to change API keys or emails:
1. Vercel → Project → **Settings** → **Environment Variables**
2. Edit the variable
3. Save
4. **Important**: Redeploy the application:
   - Go to **Deployments**
   - Click "..." on latest deployment
   - Click **"Redeploy"**

---

## Troubleshooting

### Problem: Website deployed but emails not working
**Solution:**
1. Check Vercel environment variables are set correctly
2. Verify Resend API key is valid
3. Check Resend dashboard for error logs
4. Redeploy after fixing variables

### Problem: 404 error on pages
**Solution:**
1. Check build logs on Vercel
2. Ensure all pages are in `app/` directory
3. Redeploy

### Problem: Admin dashboard not showing registrations
**Solution:**
1. Registrations are stored in JSON file in production
2. Check Vercel Functions logs for errors
3. Test registration form again
4. Export CSV to verify data

### Problem: Forms not submitting
**Solution:**
1. Check browser console for errors
2. Verify API routes are working (check Vercel Functions)
3. Test locally first to isolate issue

---

## Updating Your Website

When you make changes to your code:

```bash
# Make your changes
# Then commit and push

git add .
git commit -m "Description of changes"
git push
```

Vercel will **automatically redeploy** your website! ✨

---

## Cost Breakdown

### Vercel (Hosting)
- **Free Tier**: Perfect for your workshop
  - Unlimited deployments
  - Automatic HTTPS
  - 100GB bandwidth/month
  - Custom domains

### Resend (Email)
- **Free Tier**: Great for workshops
  - 100 emails/day (3,000/month)
  - All features included
  - Test domain included

### Total Cost: **$0** 🎉

---

## Security Best Practices

1. ✅ Never commit `.env.local` to Git
2. ✅ Use environment variables for all secrets
3. ✅ Regenerate API keys if accidentally exposed
4. ✅ Keep dependencies updated: `npm update`
5. ✅ Review Vercel deployment logs regularly

---

## Getting Help

### Vercel Support
- Docs: [https://vercel.com/docs](https://vercel.com/docs)
- Discord: [https://vercel.com/discord](https://vercel.com/discord)

### Resend Support
- Docs: [https://resend.com/docs](https://resend.com/docs)
- Email: support@resend.com

### Workshop Website Issues
- Email: hichame.taoufik1@gmail.com
- Phone: +212 697 068 234

---

## Success! 🎉

Your workshop website is now live and ready to accept registrations!

**Share your website:**
- Send the URL to potential attendees
- Post on social media
- Include in conference materials

**Monitor registrations:**
- Check admin dashboard regularly
- Export CSV for record-keeping
- Respond to contact form messages

**Before the workshop:**
- Export final attendee list
- Send reminder emails (manually or setup automation)
- Prepare workshop materials

