# ⚡ Quick Start Guide

Get your MAIA Workshop website running in 10 minutes!

## 📋 What You Need
- [ ] Node.js 18+ installed ([Download](https://nodejs.org))
- [ ] Code editor (VS Code recommended)
- [ ] Internet connection

---

## 🚀 Local Development (5 minutes)

### Step 1: Install Dependencies
Open your terminal in the project folder:
```bash
npm install
```

### Step 2: Create Environment File
Create a file named `.env.local` in the root folder:
```env
RESEND_API_KEY=re_test
EMAIL_FROM=onboarding@resend.dev
ADMIN_EMAIL=hichame.taoufik1@gmail.com
```

> 🔔 **Note**: This uses a test API key. Emails won't actually send, but you'll see logs in the console.

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Visit: [http://localhost:3000](http://localhost:3000)

**Test the features:**
- ✅ Browse all pages
- ✅ Try the registration form
- ✅ Check admin dashboard at `/admin`
- ✅ Test contact form

---

## 📧 Enable Real Emails (5 minutes)

### Step 1: Get Resend API Key
1. Sign up at [https://resend.com/signup](https://resend.com/signup) (free)
2. Go to **API Keys** → **Create API Key**
3. Copy the key (starts with `re_`)

### Step 2: Update .env.local
Replace the test key with your real API key:
```env
RESEND_API_KEY=re_your_actual_api_key_here
EMAIL_FROM=onboarding@resend.dev
ADMIN_EMAIL=hichame.taoufik1@gmail.com
```

### Step 3: Restart Server
Stop the server (`Ctrl+C`) and start again:
```bash
npm run dev
```

### Step 4: Test
- Register on the form
- Check your email for confirmation! 📬

---

## 🌐 Deploy to Production (10 minutes)

### Option A: Quick Deploy (Vercel)

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git push
```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Add environment variables (same as `.env.local`)
   - Click Deploy!

Your site will be live at `https://your-project.vercel.app` 🎉

### Option B: Detailed Guide
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete instructions.

---

## 🎯 What's Working Now?

✅ **Registration System**
- Form with validation
- Confirmation numbers
- Email confirmations
- Data saved to JSON file

✅ **Admin Dashboard**
- View all registrations
- Export to CSV
- Search and filter

✅ **Contact Form**
- Sends to admin email
- Professional design

✅ **Beautiful Pages**
- Home, About, Conference, FAQ, Contact
- Mobile responsive
- Professional animations

---

## 📚 Next Steps

1. **Customize Content:**
   - Update workshop details in pages
   - Add second instructor information
   - Modify FAQ questions

2. **Test Everything:**
   - Register with test data
   - Check email delivery
   - Test on mobile device

3. **Prepare for Production:**
   - Get Resend API key
   - Set up custom domain (optional)
   - Deploy to Vercel

4. **Go Live:**
   - Share registration link
   - Monitor admin dashboard
   - Respond to contact forms

---

## 🆘 Need Help?

### Documentation
- **Environment Setup**: [ENV_SETUP.md](./ENV_SETUP.md)
- **Deployment Guide**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Full README**: [README.md](./README.md)

### Common Issues

**Problem: npm install fails**
- Solution: Update Node.js to 18+

**Problem: Can't access localhost:3000**
- Solution: Check if port is in use, try `npm run dev` again

**Problem: Emails not sending**
- Solution: Check `.env.local` has correct API key

### Contact
- 📧 Email: hichame.taoufik1@gmail.com
- 📱 Phone: +212 697 068 234

---

## ✨ You're All Set!

Your workshop website is ready. Happy coding! 🚀

