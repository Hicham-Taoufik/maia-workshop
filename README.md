# MAIA 2025 Workshop Registration Website

A professional workshop registration system for MAIA 2025 Professional AI Workshops.

## ✨ Features

- ✅ **Landing Page** - Beautiful hero section with workshop details
- ✅ **Registration Form** - Complete form with required and optional fields
- ✅ **Email Confirmations** - Automatic confirmation emails with Resend
- ✅ **Confirmation Page** - Thank you page with confirmation number
- ✅ **About Page** - Detailed workshop information
- ✅ **Conference Page** - MAIA 2025 conference information
- ✅ **FAQ Page** - Common questions and answers
- ✅ **Contact Page** - Contact form that emails admin directly
- ✅ **Admin Dashboard** - View all registrations, search, filter, and export to CSV
- ✅ **Professional Design** - Custom color palette, typography, and animations
- ✅ **Mobile Responsive** - Works perfectly on all devices

## Registration Form Fields

### Required Fields
- Full Name
- Email
- Phone Number

### Optional Fields
- Organization/Company
- Job Title/Role
- Experience Level (Beginner, Intermediate, Advanced)
- Questions or Comments
- Workshop Session Selection

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Icons** - Icon library

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Resend account (free) - [Sign up here](https://resend.com/signup)

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
Create a `.env.local` file in the root directory:
```env
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=onboarding@resend.dev
ADMIN_EMAIL=hichame.taoufik1@gmail.com
```

> 📖 **Detailed setup instructions**: See [ENV_SETUP.md](./ENV_SETUP.md)

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Visit [http://localhost:3000](http://localhost:3000)

### Testing Email Functionality

After setting up environment variables:
1. Register on the form at `/register`
2. Check the email inbox (confirmation email)
3. Use contact form at `/contact`
4. Check admin email (contact form message)

## 🌐 Deployment to Vercel (Free & Easy)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - MAIA Workshop Website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/workshop.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"New Project"**
3. Import your GitHub repository
4. Click **"Deploy"** (it will auto-detect Next.js settings)

### Step 3: Add Environment Variables
1. Go to your project on Vercel
2. **Settings** → **Environment Variables**
3. Add these three variables:
   - `RESEND_API_KEY` = `re_your_api_key`
   - `EMAIL_FROM` = `onboarding@resend.dev`
   - `ADMIN_EMAIL` = `hichame.taoufik1@gmail.com`
4. Click **Save**
5. **Deployments** → Click the three dots → **Redeploy**

### Step 4: Done! 🎉
Your website is now live at: `https://your-project.vercel.app`

## 📧 Email System

### What's Included
- ✅ **Automatic confirmation emails** to attendees after registration
- ✅ **Contact form emails** sent to admin
- ✅ **Beautiful HTML email templates** with branding
- ✅ **100 free emails/day** with Resend

### Email Examples

**Registration Confirmation:**
- Sent to: Attendee's email
- Contains: Confirmation number, workshop details, calendar reminder
- Design: Professional HTML with MAIA branding

**Contact Form:**
- Sent to: Admin email (`ADMIN_EMAIL`)
- Contains: Sender's message with reply-to
- Design: Clean and organized format

## Data Storage

Currently, registrations are stored in a JSON file (`data/registrations.json`). For production, consider:

- Database (PostgreSQL, MongoDB)
- Vercel KV
- Supabase
- Firebase

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── register/        # Registration API endpoint
│   │   └── registrations/   # Get all registrations
│   ├── admin/              # Admin dashboard
│   ├── about/              # About/Schedule page
│   ├── confirmation/      # Confirmation page
│   ├── contact/            # Contact page
│   ├── faq/                # FAQ page
│   ├── register/           # Registration form
│   └── page.tsx            # Landing page
├── components/
│   ├── Footer.tsx
│   └── Navbar.tsx
├── lib/
│   └── data.ts             # Data management functions
└── types/
    └── registration.ts      # TypeScript types
```

## License

MIT

## Contact

For questions about this project, contact:
- Email: hichame.taoufik1@gmail.com
- Phone: +212 697 068 234

