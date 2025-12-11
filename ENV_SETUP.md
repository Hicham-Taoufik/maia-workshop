# Environment Variables Setup

This file contains instructions for setting up the required environment variables for the workshop website.

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Resend Email Service
# Get your API key from: https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email sender address (must be verified domain in Resend)
# For testing, you can use: onboarding@resend.dev
# For production, use your own domain: noreply@yourdomain.com
EMAIL_FROM=onboarding@resend.dev

# Admin email to receive contact form messages
ADMIN_EMAIL=hichame.taoufik1@gmail.com
```

## How to Get Resend API Key

### Step 1: Create a Resend Account (Free)
1. Go to [https://resend.com/signup](https://resend.com/signup)
2. Sign up with your email
3. Verify your email address

### Step 2: Get Your API Key
1. Go to [https://resend.com/api-keys](https://resend.com/api-keys)
2. Click **"Create API Key"**
3. Give it a name (e.g., "MAIA Workshop")
4. Select **"Full access"** or **"Sending access"**
5. Click **"Create"**
6. Copy the API key (starts with `re_`)

### Step 3: Configure Email Sender

#### For Testing (Quick & Easy)
Use Resend's test domain:
```env
EMAIL_FROM=onboarding@resend.dev
```

#### For Production (Recommended)
1. Go to [https://resend.com/domains](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter your domain (e.g., `yourdomain.com`)
4. Follow DNS verification instructions
5. Once verified, use your domain:
```env
EMAIL_FROM=noreply@yourdomain.com
```

## Resend Free Tier Limits
- ✅ **100 emails per day** (Perfect for your workshop!)
- ✅ Unlimited API keys
- ✅ All features included
- ✅ Test domain provided

## Testing Email Configuration

### Local Development
1. Create `.env.local` file with your API key
2. Restart the development server: `npm run dev`
3. Try registering on the form
4. Check console for success/error messages

### Vercel Deployment
1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add all three variables:
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `ADMIN_EMAIL`
4. Redeploy your application

## What Emails Will Be Sent?

### 1. Registration Confirmation (to attendee)
- Sent immediately after registration
- Contains confirmation number
- Includes workshop details and location
- Beautifully formatted HTML email

### 2. Contact Form (to admin)
- Sent when someone uses the contact form
- Contains sender's message
- Reply-to is set to sender's email
- Received at your `ADMIN_EMAIL`

## Troubleshooting

### "Email would be sent to..." in console
- **Cause**: `RESEND_API_KEY` not set
- **Fix**: Add API key to `.env.local` and restart server

### Email not arriving
- Check spam folder
- Verify API key is correct
- Check Resend dashboard for logs: [https://resend.com/emails](https://resend.com/emails)
- Ensure sender domain is verified (if not using `onboarding@resend.dev`)

### "Invalid API key" error
- Make sure API key starts with `re_`
- Check for extra spaces in `.env.local`
- Regenerate API key in Resend dashboard

## Security Notes

⚠️ **IMPORTANT**:
- Never commit `.env.local` to Git (it's already in `.gitignore`)
- Never share your API key publicly
- Regenerate API key if accidentally exposed
- Use environment variables in Vercel (not hardcoded in code)

## Support

For Resend support:
- Documentation: [https://resend.com/docs](https://resend.com/docs)
- Support: [support@resend.com](mailto:support@resend.com)

For workshop website issues:
- Email: hichame.taoufik1@gmail.com
- Phone: +212 697 068 234

